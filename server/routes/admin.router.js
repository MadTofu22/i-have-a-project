const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

router.get('/', (req, res) => {
    console.log('in admin.router');
    const queryText = `SELECT * FROM "user" WHERE NOT user_type = 'admin';`;
    pool.query(queryText).then(response => {
        // console.log(response.rows);
        res.send(response.rows);
    }).catch(error => {
        console.log(error);
        res.sendStatus(500);
    });
});

router.post('/delete', async (req, res) => {
    const connection = await pool.connect(); 
    try {
        await connection.query('BEGIN');

        // IF IT'S A MANAGER, DO THE FOLLOWING STEPS.
        // IF IT'S A DESIGNER, GET THE ASSOCIATED DESIGNER_ID AND SKIP TO STEP 3.
        
        let designerIdArray = [];

        // TEST
        console.log(req.body.id, req.body.user_type);

        if (req.body.user_type === 'manager') {
            // 1. Use id from table user to delete from contract_requests (?) using id in requesting_manager_id and contracted_manager_id, 
            console.log("Hit 1");
            const sqlOne = `DELETE FROM "contract_requests" WHERE requesting_manager_id = $1 OR contracted_manager_id = $1;` ;
            await connection.query(sqlOne, [req.body.id]);
            

            // 2. Use user id to get designer list
            console.log("Hit 2");
            const sqlTwo = `SELECT "id" FROM "designers" WHERE manager_id = $1;`;
            designerIdArray = await connection.query( sqlTwo, [req.body.id]);

            // TEST
            console.log(designerIdArray.rows);

            // 3. Use designer id list to eliminate values from the following table using designer_id:
            for (const element of designerIdArray.rows) {
                //     A. user
                console.log("Hit A");
                const sqlDesignerUser = `DELETE FROM "user" WHERE "designer_id" = $1;` ;
                await connection.query( sqlDesignerUser, [element.id]);
                //     B. Skills
                console.log("Hit B");
                const sqlDesignerSkills = `DELETE FROM "skills" WHERE "designer_id" = $1;` ;
                await connection.query( sqlDesignerSkills, [element.id]);
                //     C. projects_designers_join
                console.log("Hit C");
                const sqlDesignerProjectsDesignerJoin = `DELETE FROM "projects_designers_join" WHERE "designer_id" = $1;` ;
                await connection.query( sqlDesignerProjectsDesignerJoin, [element.id]);
                //     D. designer_calendar_item
                console.log("Hit D");
                const sqlDesignerDesignerCalendarItem = `DELETE FROM "designer_calendar_item" WHERE "designer_id" = $1;` ;
                await connection.query( sqlDesignerDesignerCalendarItem, [element.id]);
                //     E. Career
                console.log("Hit E");
                const sqlDesignerCareer = `DELETE FROM "career" WHERE "designer_id" = $1;` ;
                await connection.query( sqlDesignerCareer, [element.id]);
                //     F. Education
                console.log("Hit F");
                const sqlDesignerEducation = `DELETE FROM "education" WHERE "designer_id" = $1;` ;
                await connection.query( sqlDesignerEducation, [element.id]);
                //     G. designer_software_join
                console.log("Hit G");
                const sqlDesignerDesignerSoftwareJoin = `DELETE FROM "designer_software_join" WHERE "designer_id" = $1;` ;
                await connection.query( sqlDesignerDesignerSoftwareJoin, [element.id]);
                //     H. contract_requests
                console.log("Hit H");
                const sqlDesignerContractRequests = `DELETE FROM "contract_requests" WHERE "contracted_designer_id" = $1;` ;
                await connection.query( sqlDesignerContractRequests, [element.id]);
                // 4. Delete from “designers”
                console.log("Hit 4");
                const sqlFour = `DELETE FROM "designers" WHERE "id" = $1;` ;
                await connection.query( sqlFour, [element.id]);
                console.log("Finished Loop ititeration");
            }
        }
        
        if (req.body.user_type === 'designer') {
            // 1a. Use id to get designer_id
            console.log("Hit 1a");
            const sqlAltOne = `SELECT "designer_id" FROM "user" WHERE "id" = $1`;
            designerIdArray = await connection.query( sqlAltOne, [req.body.id]);

            // TEST
            console.log(designerIdArray.rows);
            
            for (const element of designerIdArray.rows) {
                
                //     B. Skills
                console.log("Hit B");
                const sqlDesignerSkills = `DELETE FROM "skills" WHERE "designer_id" = $1;` ;
                await connection.query( sqlDesignerSkills, [element.designer_id]);
                //     C. projects_designers_join
                console.log("Hit C");
                const sqlDesignerProjectsDesignerJoin = `DELETE FROM "projects_designers_join" WHERE "designer_id" = $1;` ;
                await connection.query( sqlDesignerProjectsDesignerJoin, [element.designer_id]);
                //     D. designer_calendar_item
                console.log("Hit D");
                const sqlDesignerDesignerCalendarItem = `DELETE FROM "designer_calendar_item" WHERE "designer_id" = $1;` ;
                await connection.query( sqlDesignerDesignerCalendarItem, [element.designer_id]);
                //     E. Career
                console.log("Hit E");
                const sqlDesignerCareer = `DELETE FROM "career" WHERE "designer_id" = $1;` ;
                await connection.query( sqlDesignerCareer, [element.designer_id]);
                //     F. Education
                console.log("Hit F");
                const sqlDesignerEducation = `DELETE FROM "education" WHERE "designer_id" = $1;` ;
                await connection.query( sqlDesignerEducation, [element.designer_id]);
                //     G. designer_software_join
                console.log("Hit G");
                const sqlDesignerDesignerSoftwareJoin = `DELETE FROM "designer_software_join" WHERE "designer_id" = $1;` ;
                await connection.query( sqlDesignerDesignerSoftwareJoin, [element.designer_id]);
                //     H. contract_requests
                console.log("Hit H");
                const sqlDesignerContractRequests = `DELETE FROM "contract_requests" WHERE "contracted_designer_id" = $1;` ;
                await connection.query( sqlDesignerContractRequests, [element.designer_id]);
                // 4. Delete from “designers”
                console.log("Hit 4");
                const sqlFour = `DELETE FROM "designers" WHERE "id" = $1;` ;
                await connection.query( sqlFour, [element.designer_id]);
                //     A. user
                console.log("Hit A");
                const sqlDesignerUser = `DELETE FROM "user" WHERE "designer_id" = $1;` ;
                await connection.query( sqlDesignerUser, [element.designer_id]);
                console.log("Finished Loop ititeration");
            }
        }
        
        
        
        
        
        // ONLY DO THESE IF IT'S A MANAGER
        if (req.body.user_type === 'manager') {
            // 5. Use manager_id from “projects” to get id, use to delete from projects_designer_join.
            const sqlFive = `SELECT "id" FROM "projects" WHERE manager_id = $1;` ;
            let projectsArray = await connection.query( sqlFive, [req.body.id]);

            for (const element of projectsArray.rows) {
                const sqlFiveElement = `DELETE FROM projects_designers_join WHERE project_id = $1;`;
                await connection.query(sqlFiveElement, [element.id]);
                // 6. Delete from “projects”
                const sqlSix = `DELETE FROM "projects" WHERE manager_id = $1;` ;
                await connection.query( sqlSix, [element.id]);
            };
            
            // 7. Delete manager from User
            const sqlSeven = `DELETE FROM "user" WHERE "id" = $1;` ;
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
