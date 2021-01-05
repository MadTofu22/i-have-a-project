const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

router.get('/admin', (req, res) => {
    console.log('in admin.router');
    const queryText = `SELECT * FROM "users";`;
    pool.query(queryText).then(response => {
        res.send(response);
    }).catch(error => {
        console.log(error);
        res.sendStatus(500);
    });
});

router.delete('/', async (req, res) => {
    const connection = await pool.connect()    
    try {
        await connection.query('BEGIN');
        console.log("the user is",req.user.id);

        // IF IT'S A MANAGER, DO THE FOLLOWING STEPS.
        // IF IT'S A DESIGNER, GET THE ASSOCIATED DESIGNER_ID AND SKIP TO STEP 3.


        // 1. Use id from table user to delete from contract_requests (?) using id in requesting_manager_id and contracted_manager_id, 
        const sqlOne = `DELETE FROM "contract_requests" WHERE requesting_manager_id = $1 OR contracted_manager_id = $1` ;
        await connection.query(sqlOne, [req.body.id]);

        // 2. Use user id to get designer list
        const sqlTwo = `SELECT 'id' FROM "designers" WHERE manager_id = $1`;
        let designerIdArray = await connection.query( sqlTwo, [req.body.id]);

        // 1a. Use id to get designer_id
        // const sqlAltOne = `SELECT designer_id FROM "users" WHERE 'id' = $1`;
        // let designerIdArray = [];
        // let altReference = await connection.query( sqlAltOne, [req.body.id]);
        // designerIdArray.push(altReference);

        // 3. Use designer id list to eliminate values from the following table using designer_id:
        array.forEach(element => {
            
        
        //     1. Users
        const sqlDesignerUsers = `DELETE FROM "users" WHERE 'designer_id' = $1` ;
        await connection.query( sqlDesignerUsers, [element]);
        //     2. Skills
        const sqlDesignerSkills = `DELETE FROM "skills" WHERE 'designer_id' = $1` ;
        await connection.query( sqlDesignerSkills, [element]);
        //     3. projects_designers_join
        const sqlDesignerProjectsDesignerJoin = `DELETE FROM "projects_designers_join" WHERE 'designer_id' = $1` ;
        await connection.query( sqlDesignerProjectsDesignerJoin, [element]);
        //     4. designer_calendar_item
        const sqlDesignerDesignerCalendarItem = `DELETE FROM "designer_calendar_item" WHERE 'designer_id' = $1` ;
        await connection.query( sqlDesignerDesignerCalendarItem, [element]);
        //     5. Career
        const sqlDesignerCareer = `DELETE FROM "career" WHERE 'designer_id' = $1` ;
        await connection.query( sqlDesignerCareer, [element]);
        //     6. Education
        const sqlDesignerEducation = `DELETE FROM "education" WHERE 'designer_id' = $1` ;
        await connection.query( sqlDesignerEducation, [element]);
        //     7. designer_software_join
        const sqlDesignerDesignerSoftwareJoin = `DELETE FROM "designer_software_join" WHERE 'designer_id' = $1` ;
        await connection.query( sqlDesignerDesignerSoftwareJoin, [element]);
        //     8. contract_requests
        const sqlDesignerContractRequests = `DELETE FROM "contract_requests" WHERE 'designer_id' = $1` ;
        await connection.query( sqlDesignerContractRequests, [element]);
        });
        // 4. Delete from “designers”
        const sqlThree = `` ;
        // 5. Use manager_id from “projects” to get id, use to delete from projects_designer_join.
        const sqlFour = `` ;
        // 6. Delete from “projects”
        const sqlFive = `` ;
        // 7. Delete from Users using manager_id
        const sqlSix = `` ;

        // Check if the user is authenticated
        let projListSQL = ``;

        

        let rawFiles = await connection.query( managerDelSQL, [1]);

        const fileList = rawFiles.rows

        console.log(fileList);
        
        await connection.query('COMMIT');
        res.send(fileList);
    } catch ( error ) {
        await connection.query('ROLLBACK');
        console.log(`Transaction Error - Rolling back new account`, error);
        res.sendStatus(500); 
    } finally {
        connection.release()
    }
});

module.exports = router;
