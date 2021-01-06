const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

router.get('/', (req, res) => {
    console.log('in admin.router');
    const queryText = `SELECT * FROM "users";`;
    pool.query(queryText).then(response => {
        res.send(response);
    }).catch(error => {
        console.log(error);
        res.sendStatus(500);
    });
});

router.delete('/delete', async (req, res) => {
    const connection = await pool.connect(); 
    try {
        await connection.query('BEGIN');

        // IF IT'S A MANAGER, DO THE FOLLOWING STEPS.
        // IF IT'S A DESIGNER, GET THE ASSOCIATED DESIGNER_ID AND SKIP TO STEP 3.

        let designerIdArray = [];

        if (req.body.user_type === 'manager') {
            // 1. Use id from table user to delete from contract_requests (?) using id in requesting_manager_id and contracted_manager_id, 
            const sqlOne = `DELETE FROM "contract_requests" WHERE requesting_manager_id = $1 OR contracted_manager_id = $1;` ;
            await connection.query(sqlOne, [req.body.id]);
            

            // 2. Use user id to get designer list
            const sqlTwo = `SELECT 'id' FROM "designers" WHERE manager_id = $1;`;
            designerIdArray = await connection.query( sqlTwo, [req.body.id]);
        }
        
        if (req.body.user_type === 'designer') {
            // 1a. Use id to get designer_id
            const sqlAltOne = `SELECT designer_id FROM "users" WHERE 'id' = $1`;
            designerIdArray = await connection.query( sqlAltOne, [req.body.id]);
        }
        
        // 3. Use designer id list to eliminate values from the following table using designer_id:
        for (const element of designerIdArray.rows) {
            //     A. Users
            const sqlDesignerUsers = `DELETE FROM "users" WHERE 'designer_id' = $1;` ;
            await connection.query( sqlDesignerUsers, [element.id]);
            //     B. Skills
            const sqlDesignerSkills = `DELETE FROM "skills" WHERE 'designer_id' = $1;` ;
            await connection.query( sqlDesignerSkills, [element.id]);
            //     C. projects_designers_join
            const sqlDesignerProjectsDesignerJoin = `DELETE FROM "projects_designers_join" WHERE 'designer_id' = $1;` ;
            await connection.query( sqlDesignerProjectsDesignerJoin, [element.id]);
            //     D. designer_calendar_item
            const sqlDesignerDesignerCalendarItem = `DELETE FROM "designer_calendar_item" WHERE 'designer_id' = $1;` ;
            await connection.query( sqlDesignerDesignerCalendarItem, [element.id]);
            //     E. Career
            const sqlDesignerCareer = `DELETE FROM "career" WHERE 'designer_id' = $1;` ;
            await connection.query( sqlDesignerCareer, [element.id]);
            //     F. Education
            const sqlDesignerEducation = `DELETE FROM "education" WHERE 'designer_id' = $1;` ;
            await connection.query( sqlDesignerEducation, [element.id]);
            //     G. designer_software_join
            const sqlDesignerDesignerSoftwareJoin = `DELETE FROM "designer_software_join" WHERE 'designer_id' = $1;` ;
            await connection.query( sqlDesignerDesignerSoftwareJoin, [element.id]);
            //     H. contract_requests
            const sqlDesignerContractRequests = `DELETE FROM "contract_requests" WHERE 'designer_id' = $1;` ;
            await connection.query( sqlDesignerContractRequests, [element.id]);
            // 4. Delete from “designers”
            const sqlFour = `DELETE FROM "designers" WHERE 'id' = $1;` ;
            await connection.query( sqlFour, [element.id]);
            
        }
        
        
        
        // ONLY DO THESE IF IT'S A MANAGER
        if (req.body.user_type === 'Manager') {
            // 5. Use manager_id from “projects” to get id, use to delete from projects_designer_join.
            const sqlFive = `SELECT 'id' FROM "projects" WHERE manager_id = $1;` ;
            let projectsArray = await connection.query( sqlFive, [req.body.id]);

            for (const element of projectsArray.rows) {
                const sqlFiveElement = `DELETE FROM projects_designer_join WHERE project_id = $1;`;
                await connection.query(sqlFiveElement, [element.id]);
                // 6. Delete from “projects”
                const sqlSix = `DELETE FROM "projects" WHERE manager_id = $1;` ;
                await connection.query( sqlSix, [element.id]);
            };
            
            // 7. Delete manager from Users
            const sqlSeven = `DELETE FROM "users" WHERE 'id' = $1;` ;
            await connection.query( sqlSeven, [req.body.id]);
        }

        await connection.query('COMMIT');
        res.sendStatus(200);
    } catch ( error ) {
        await connection.query('ROLLBACK');
        console.log(`Transaction Error - Rolling back new account`, error);
        res.sendStatus(500); 
    } finally {
        connection.release()
    }
});

module.exports = router;
