const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
/**
 * GET Calendar Events by Designer login ID
 */
router.get('/', (req, res) => {

    if (req.isAuthenticated) {
        const queryText = `SELECT  
                            "event_id",
                            "designer_id",
                            "project_id",
                            "designer_calendar_item".start,
                            "hoursCommitted",
                            "available",
                            "name",
                            "status",
                            "due_date",
                            "notes",
                            "project_name",
                            "manager_id"
                        FROM "designer_calendar_item" 
                            left join "projects" on "projects"."id" = "designer_calendar_item"."project_id"
                            WHERE "designer_id" = $1
                            ORDER BY "id" DESC`

        pool.query( queryText, [ req.user.designer_id] )
        .then( ( response ) => {
            console.log(response.rows);
            
            res.send( response.rows )
        })
        .catch( ( error ) => {
            console.log(error);
            res.sendStatus(500)
        })
    } else {
        res.sendStatus(403)
    }
});
router.get('/manager', async (req, res) => {

    if (req.isAuthenticated) {
        const getDesigners = `SELECT 
                                    "designer_id",
                                    "first_name",
                                    "last_name",
                                    "rate"
                                FROM "designers"
                                JOIN "user" ON "user".designer_id = designers.id
                            WHERE manager_id = $1;`;
        const getDesignerProjects = `SELECT * FROM "projects_designers_join" WHERE "designer_id" = $1`
        const desingerCalendarItems = `SELECT * FROM "designer_calendar_item"
                                            WHERE "designer_id" = $1;`


        const connection = await pool.connect();
        let desingerInfo = []
        try {
            await connection.query('BEGIN;');
            const designers = await connection.query(getDesigners, [req.user.id])
            for (const designer of designers.rows) {
                const desingerProjects = await connection.query(getDesignerProjects, [designer.designer_id])
                const desingerCalendar = await connection.query(desingerCalendarItems, [designer.designer_id])
                let designerObj = {
                    projects: desingerProjects.rows,
                    calendar: desingerCalendar.rows,
                    designerInfo: designer
                }
                desingerInfo.push(designerObj)
            }
            await connection.query('COMMIT');
            console.log(desingerInfo[0].designerInfo.first_name);
            
            res.send(desingerInfo);
        } catch (error) {
            await connection.query('ROLLBACK;');
            console.log(error);
            res.sendStatus(500);
        } finally {
            connection.release();
        }
    } else {
        res.sendStatus(403)
    }
})

/**
 * POST route template
 */
router.post('/', (req, res) => {
    if (req.isAuthenticated) {
        console.log(req.body);
        let project_id = req.body.project_id
        let start = req.body.start
        let hoursCommitted = req.body.hoursCommitted
        let designer_id = req.body.designer_id
        let name = req.body.title
        let available = false
        
        const queryText = `INSERT INTO "designer_calendar_item"  ("designer_id", "project_id", "start", "hoursCommitted", "name", "available" )
        VALUES ($1, $2, $3, $4, $5, $6); 
        `

        pool.query( queryText, [ 
            designer_id,
            project_id,
            start,
            hoursCommitted,
            name,
            available
        ])
        .then( ( response ) => {
            console.log(response.rows);
            
            res.send( response.rows )
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
 * PUT route template
 */
router.put('/', (req, res) => {
    if (req.isAuthenticated) {
        console.log(req.body);
        let queryText;
        let project_id = req.body.project_id
        let start = req.body.start
        let hoursCommitted = req.body.hoursCommitted
        let id = req.body.id
        let name;

        if (req.body.project_id != null) {

            queryText = `UPDATE "designer_calendar_item" 
                            SET "project_id" = $1,
                                "start" = $2,
                                "hoursCommitted" = $3,
                                "name" = $4
                            WHERE "event_id" = $5`

            const getProjectDetails = `SELECT "project_name" from "projects" WHERE "id" = $1`

            pool.query(getProjectDetails, [project_id])
            .then( (response) => {
                console.log(response.rows[0].project_name)
                name = response.rows[0].project_name

                pool.query(queryText, [
                    project_id,
                    start,
                    hoursCommitted,
                    name,
                    id,
                ])
                .then( (response) => {
                    console.log(response.rows);
                    res.sendStatus(201)
                })
                .catch( (error) => {
                    console.log(error)
                    res.sendStatus(500)
                })
            })
            .catch( (error) => {
                console.log(error);
                res.sendStatus(500)
            })
        } else {
            queryText = `UPDATE "designer_calendar_item" 
                            SET "start" = $1,
                                "hoursCommitted" = $2,
                                "name" = $3
                            WHERE "event_id" = $4
                            `
                                
            name = req.body.title
            pool.query(queryText, [
                start,
                hoursCommitted,
                name,
                id
            ])
            .then( (response) => {
                console.log(response.rows);
                res.sendStatus(201)
            })
            .catch( (error) => {
                console.log(error);
                res.sendStatus(500)
            })
        }


    } else {
        res.sendStatus(403)
    }
});

/**
 * delete route template
 */
router.delete('/:event_id', (req, res) => {
    if (req.isAuthenticated) {        
            console.log('request body', req.body);
            
        const queryText = `DELETE FROM "designer_calendar_item"
                                WHERE "event_id" = $1 AND designer_id = $2`

        pool.query( queryText, [req.params.event_id, req.user.designer_id] )
        .then( () => {
            res.sendStatus(200)
        })
        .catch( ( error ) => {
            console.log(error);
            res.sendStatus(500)
        })
    } else {
        res.sendStatus(403)
    }
});

module.exports = router;
