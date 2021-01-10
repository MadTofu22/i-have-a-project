const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const encryptLib = require('../modules/encryption');

const {checkAvailByDateAndEvents} = require('../modules/checkAvail')

// This route returns an array of all of the managers registered designers
router.get('/', (req, res) => {
    console.log('get designers for manager');

    if (req.isAuthenticated) {
        const queryText = `SELECT "first_name", "last_name", "rate", "designer_id" AS "id" FROM "designers"
                                    JOIN "user" on "user"."designer_id" = "designers"."id"
                                    WHERE "manager_id" = $1;`
        pool.query(queryText, [req.user.id])
        .then( (response) => {
            console.log(response.rows);
            res.send(response.rows)
        })
        .catch( ( error ) => {
            console.log(error);
            res.sendStatus(500);
        })
    } else {
      res.sendStatus(403);
    }
});


router.get('/desinger/:designer_id', (req, res) => {

    if (req.isAuthenticated) {
        const queryText = `SELECT "first_name", "last_name" FROM "user"
                                    WHERE "designer_id" = $1;`
        pool.query(queryText, [req.params.designer_id])
        .then( (response) => {
            console.log(response.rows[0]);
            res.send(response.rows[0])
        })
        .catch( ( error ) => {
            console.log(error);
            res.sendStatus(500);
        })
    } else {
      res.sendStatus(403);
    }
});

router.get('/availability/:designer_id', async (req, res) => {
    /*
    req.body = {
        start: 'date' //start time of avail request
        due_date: 'date' // end time of avail request
    }
    req.params = {
        desinger_id: int //desinger_id ("designer"."id")
    }
    */
    
    const getBaseAvailability = `SELECT "id", "availability_hours", "weekend_availability" FROM "designers"
    WHERE "id" = $1`

    const getEventsForDesigner = `SELECT * FROM "designer_calendar_item"
                                        WHERE "designer_id" = $1
                                            AND "available" = FALSE`
    if (req.isAuthenticated) {

        const connection = await pool.connect();
        
        try {
            await connection.query("BEGIN")
            const baseAvail = await pool.query(getBaseAvailability, [req.params.designer_id])
            const events = await pool.query(getEventsForDesigner, [req.params.designer_id])
            
            const avail = await checkAvailByDateAndEvents(req.body.start, req.body.due_date, baseAvail.rows[0], events.rows)
            res.send(avail)
            await connection.query("COMMIT")
        } catch (error) {
            console.log(error);
            res.sendStatus(500)
        } finally {
            connection.release()
        }
    
    } else {
        res.sendStatus(403)
    }
})
// Handles POST request for a new user being added by a manager
router.post('/register/:designer_id', (req, res) => {
    
    if (req.isAuthenticated) {
        const queryParams = [
            req.body.email,
            encryptLib.encryptPassword(req.body.password),
            req.body.user_type,
            req.body.first_name,
            req.body.last_name,
            req.body.company,
            req.params.designer_id, // Designer's ID
        ];
        const queryText = `INSERT INTO "user" (email, password, user_type, first_name, last_name, company, designer_id)
            VALUES ($1, $2, $3, $4, $5, $6, $7);`;
        
        pool.query(queryText, queryParams)
            .then(() => res.sendStatus(201))
            .catch((err) => {
                console.log('Designer registration failed: ', err);
                res.sendStatus(500);
        });
    }
});

router.get('/contract', async (req, res) => {    
    
    const getContracts = ` SELECT * FROM "contract_requests"
                                    WHERE "requesting_manager_id" = $1
                                    AND "request_status" = 'completed'`

    const getDesignerInfo = `SELECT "first_name", "last_name", "user"."designer_id", "rate" FROM "designers"
                                JOIN "user" on "designers"."id" = "user"."designer_id"
                                WHERE "designers"."id" = $1;`
                                
    const getManagerInfo = `SELECT "company" from "user" WHERE "id" = $1`
    
    if (req.isAuthenticated) {
        const connection = await pool.connect();
        
        try {
            let response = []

            await connection.query("BEGIN")

            const managerContracts = await connection.query(getContracts, [req.user.id])
            console.log(managerContracts.rows);
            
            for (const contract of managerContracts.rows) {
                const designerInfo = await connection.query(getDesignerInfo, [contract.contracted_designer_id])
                const managerInfo = await connection.query(getManagerInfo, [contract.contracted_manager_id])
                let contractObj = {
                    info: contract,
                    designer: designerInfo.rows[0],
                    manager: managerInfo.rows[0]
                }
                
                response.push(contractObj)
            }
            await connection.query("COMMIT")

            res.send(response)
        } catch (error) {
            console.log(error);
            res.sendStatus(500)
        } finally {
            connection.release()
        }
    } else {
        res.sendStatus(403)
    }
})

// THROW UPDATE ROUTE HERE FOR RATE (NEED ID AND RATE)

module.exports = router;
