const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const encryptLib = require('../modules/encryption');

// This route returns an array of all of the managers registered designers
router.get('/', (req, res) => {
    console.log('get designers for manager');

    if (req.isAuthenticated) {
        const queryText = `SELECT "first_name", "last_name", "designer_id" FROM "designers"
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

router.get('/availability/:designer_id', (req, res) => {

    const getBaseAvailability = `SELECT "availability_hours", "weekend_availability" FROM "designers"
                                WHERE "id" = $1`
    if (req.isAuthenticated) {
        
        pool.query(getBaseAvailability, [req.params.designer_id])
        .then( ( response ) => {
            res.send(response.rows)
        })
        .catch( ( error ) => {
            console.log(error);
            res.sendStatus(500)
        })
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

module.exports = router;
