const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/**
 * GET route template
 */
router.get('/:designer_id', (req, res) => {
    console.log(req.params)
    
    if(req.isAuthenticated){
        
        const queryText = `SELECT * FROM "projects" 
                            JOIN "projects_designers_join" ON "projects_designers_join"."project_id" = "projects"."id" 
                            WHERE "designer_id" = $1`
        pool.query(queryText, [req.params.designer_id])
        .then( ( response ) => {
            console.log(response.rows);
            
            res.send(response.rows)
        })
        .catch( ( error ) => {
            console.log(error);
            res.sendStatus(500)
        })
    } else {
        res.sendStatus(403)
    }
});

router.get('/details/:project_id', async (req, res) => {    
    if(req.isAuthenticated){
        
        const getProjectInfo =      `SELECT * FROM "projects" 
                                        WHERE "id" = $1`
        const getProjectEvents =    `SELECT * FROM "designer_calendar_item"
                                        Where "project_id" = $1`
        const getProjectDesigners = `SELECT "user"."designer_id" AS id, "rate", "hours_est", "first_name", "last_name" FROM "projects_designers_join" 
                                        Join "user" on "projects_designers_join"."designer_id" = "user"."designer_id"
                                        WHERE project_id = $1 
                                        `


        const connection = await pool.connect();
        try {
            await connection.query("BEGIN")
                const projectInfo = await connection.query(getProjectInfo, [req.params.project_id])
                const projectDesigners = await connection.query(getProjectDesigners, [req.params.project_id])
                const designerProjectEvents  = await connection.query(getProjectEvents, [req.params.project_id])

                console.log({
                    projectDetails: projectInfo.rows,
                    designerEvents: designerProjectEvents.rows,
                    projectDesigners: projectDesigners.rows
                });
                let results = {
                    projectDetails: projectInfo.rows[0],
                    designerEvents: designerProjectEvents.rows,
                    projectDesigners: projectDesigners.rows
                }
                
                res.send(results);

        } catch (error) {
            console.log(error);
            res.sendStatus(500)
        } finally {
            connection.release()
        }
    }
});

router.get('/', (req, res) => {
    console.log(req.params)
    
    if(req.isAuthenticated){
        
        const queryText = `SELECT * FROM "projects" 
                            WHERE "manager_id" = $1`
        pool.query(queryText, [req.user.id])
        .then( ( response ) => {
            console.log(response.rows);
            
            res.send(response.rows)
        })
        .catch( ( error ) => {
            console.log(error);
            res.sendStatus(500)
        })
    } else {
        res.sendStatus(403)
    }
});

/**
 * POST route template
 */
router.post('/', async (req, res) => {
    if (req.isAuthenticated) {
        let projectInformation = [
            req.body.status,
            req.body.due_date,
            req.body.start,
            req.body.notes,
            req.body.project_name,
            req.user.id
        ]
        let teamDesigners = req.body.TeamDesigners
        console.log(teamDesigners);
        

        const createProject = `INSERT INTO "projects" (
                                "status",
                                "due_date",
                                "start",
                                "notes",
                                "project_name",
                                "manager_id"
                            )
                            Values($1, $2, $3, $4, $5, $6)
                            RETURNING "id"`
        const addDesigner = `INSERT INTO "projects_designers_join" 
                                ("designer_id", "project_id", "hours_est")
                                Values($1, $2, $3)`
            
        const connection = await pool.connect();
        try {
            await connection.query("BEGIN")
            const newprojID = await connection.query(createProject, projectInformation)
            await teamDesigners.forEach(designer => {
                connection.query(addDesigner, [designer.designer_id, newprojID.rows[0].id, designer.hours_est])
            })
            await connection.query('COMMIT')
            res.sendStatus(201)
        } catch (error) {
            await connection.query('ROLLBACK')
            console.log(error);
            res.sendStatus(500)
        } finally {
            connection.release()
        }
        
    } else {
        res.sendStatus(403)
    }
});

router.post('/addDesigner', (req, res) => {

    console.log(req.body);
    

    const addDesigner = `INSERT INTO "projects_designers_join" 
                                ("designer_id", "project_id")
                                Values($1, $2)`

    if (req.isAuthenticated) {
        pool.query(addDesigner, [req.body.designer_id, req.body.project_id])
        .then( (response) => {
            console.log(response)
            res.sendStatus(201)
        })
        .catch( (error) => {
            console.log(error);
            res.sendStatus(500)
        })
    } else {
        res.sendStatus(403)
    }
})
router.delete('/removeDesigner/:designer_id/:project_id', (req, res) => {

    console.log('remove desinger', req.params);
    
    const removeDesigner = `DELETE FROM "projects_designers_join" 
                                WHERE "designer_id" = $1
                                AND "project_id" = $2`

    if (req.isAuthenticated) {
        pool.query(removeDesigner, [req.params.designer_id, req.params.project_id])
        .then( (response) => {
            console.log(response)
            res.sendStatus(200)
        })
        .catch( (error) => {
            console.log(error);
            res.sendStatus(500)
        })
    } else {
        res.sendStatus(403)
    }
})

router.put('/hours_est', (req, res) => {

    console.log('update hours', req.body);
    
    const updateHours = `UPDATE "projects_designers_join" 
                            SET "hours_est" = $1
                            WHERE "project_id" = $2
                            AND "designer_id" = $3`
    if (req.isAuthenticated) {

        pool.query(updateHours, [
            req.body.hours_est,
            req.body.project_id,
            req.body.designer_id
        ])
        .then( (response) => {
            console.log(response);
            res.sendStatus(201)
        })
        .catch( (error) => {
            console.log(error);
            res.sendStatus(500)
        })
    } else {
        res.sendStatus(403)
    }
})

/**
 * put route template
 */
router.put('/', async (req, res) => {
    if (req.isAuthenticated) {
        console.log(req.body);
        
        let projectInformation = [
            req.body.status,
            req.body.due_date,
            req.body.start,
            req.body.notes,
            req.body.project_name,
            req.user.id,
            req.body.id,
        ]

        const updateProject = ` UPDATE "projects" 
                                SET
                                "status" = $1,
                                "due_date" = $2,
                                "start" = $3,
                                "notes" = $4,
                                "project_name" = $5,
                                "manager_id" = $6
                            WHERE "id" = $7`
            
       pool.query(updateProject, projectInformation)
       .then( (response) => {
           console.log(response);
           res.sendStatus(200)
       })
       .catch( (error) => {
           console.log(error);
           res.sendStatus(500)
       })
    } else {
        res.sendStatus(403)
    }
});

module.exports = router;
