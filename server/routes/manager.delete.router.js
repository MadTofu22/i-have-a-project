const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

// router.get('/', async (req, res) => {
//     const connection = await pool.connect();
//     try {
//         console.log('in manager.delete.router', req.user.id);
//         const statusCheck = `SELECT "user_type" FROM "user" WHERE "id" = $1;`
//         const authorizedCheck = await connection.query(statusCheck, [req.user.id]);
//         console.log(authorizedCheck.rows[0].user_type);
//         if (authorizedCheck.rows[0].user_type === 'manager') {
//             const queryText = `SELECT * FROM "designers" WHERE manager_id = $1;`;
//             // console.log(response.rows);
//             const response = await connection.query(queryText);
//             console.log(response.rows);
//             await connection.query('COMMIT');
//             res.send(response.rows);
//         }
//         else {
//             res.sendStatus(403);
//         }
        
//     } catch ( error ) {
//         await connection.query('ROLLBACK');
//         console.log(`Transaction Error - Rolling back new account`, error);
//         res.sendStatus(500); 
//     } finally {
//         connection.release()
//     }
// });

router.post('/delete', async (req, res) => {
    const connection = await pool.connect(); 
    try {
        await connection.query('BEGIN');

        const statusCheck = `SELECT "user_type" FROM "user" WHERE "id" = $1;`
        const authorizedCheck = await connection.query(statusCheck, [req.user.id]);
        console.log(authorizedCheck.rows[0].user_type);

        const relationCheck = `SELECT "manager_id" FROM "designers" WHERE "id" = $1;`
        const authorizedCheckTwo = await connection.query(relationCheck, [req.body.designer_id]);

        if (authorizedCheck.rows[0].user_type === 'manager' && authorizedCheckTwo.rows[0].manager_id == req.user.id) {

            //     B. Skills
            console.log("Hit B");
            const sqlDesignerSkills = `DELETE FROM "skills" WHERE "designer_id" = $1;` ;
            await connection.query( sqlDesignerSkills, [req.body.designer_id]);
            //     C. projects_designers_join
            console.log("Hit C");
            const sqlDesignerProjectsDesignerJoin = `DELETE FROM "projects_designers_join" WHERE "designer_id" = $1;` ;
            await connection.query( sqlDesignerProjectsDesignerJoin, [req.body.designer_id]);
            //     D. designer_calendar_item
            console.log("Hit D");
            const sqlDesignerDesignerCalendarItem = `DELETE FROM "designer_calendar_item" WHERE "designer_id" = $1;` ;
            await connection.query( sqlDesignerDesignerCalendarItem, [req.body.designer_id]);
            //     E. Career
            console.log("Hit E");
            const sqlDesignerCareer = `DELETE FROM "career" WHERE "designer_id" = $1;` ;
            await connection.query( sqlDesignerCareer, [req.body.designer_id]);
            //     F. Education
            console.log("Hit F");
            const sqlDesignerEducation = `DELETE FROM "education" WHERE "designer_id" = $1;` ;
            await connection.query( sqlDesignerEducation, [req.body.designer_id]);
            //     G. designer_software_join
            console.log("Hit G");
            const sqlDesignerDesignerSoftwareJoin = `DELETE FROM "designer_software_join" WHERE "designer_id" = $1;` ;
            await connection.query( sqlDesignerDesignerSoftwareJoin, [req.body.designer_id]);
            //     H. contract_requests
            console.log("Hit H");
            const sqlDesignerContractRequests = `DELETE FROM "contract_requests" WHERE "contracted_designer_id" = $1;` ;
            await connection.query( sqlDesignerContractRequests, [req.body.designer_id]);
            // 4. Delete from “designers”
            console.log("Hit 4");
            const sqlFour = `DELETE FROM "designers" WHERE "id" = $1;` ;
            await connection.query( sqlFour, [req.body.designer_id]);
            //     A. user
            console.log("Hit A");
            const sqlDesignerUser = `DELETE FROM "user" WHERE "designer_id" = $1;` ;
            await connection.query( sqlDesignerUser, [req.body.designer_id]);
            console.log("Deletions Completed");
            
            await connection.query('COMMIT');
            res.sendStatus(200);
        }

        else {
            res.sendStatus(403);
        }
    } catch ( error ) {
        await connection.query('ROLLBACK');
        console.log(`Transaction Error - Rolling back new account`, error);
        res.sendStatus(500); 
    } finally {
        connection.release()
    }
});

module.exports = router;
