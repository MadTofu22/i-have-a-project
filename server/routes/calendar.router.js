const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
/**
 * GET Calendar Events by Designer login ID
 */
router.get('/', (req, res) => {

    if (req.isAuthenticated) {
        const queryText = `SELECT * FROM "designer_calendar_item" 
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
                            WHERE "event_Id" = $5`

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
                            WHERE "event_Id" = $4
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


        // pool.query( queryText, [ req.user.designer_id] )
        // .then( ( response ) => {
        //     console.log(response.rows);
            
        //     res.send( response.rows )
        // })
        // .catch( ( error ) => {
        //     console.log(error);
        //     res.sendStatus(500)
        // })
    } else {
        res.sendStatus(403)
    }
});

/**
 * delete route template
 */
router.delete('/', (req, res) => {
    if (req.isAuthenticated) {
        console.log(req.body);
        
        
        const queryText = `SELECT * FROM "designer_calendar_item" 
                            left join "projects" on "projects"."id" = "designer_calendar_item"."project_id"
                        WHERE "designer_id" = $1`

        // pool.query( queryText, [ req.user.designer_id] )
        // .then( ( response ) => {
        //     console.log(response.rows);
            
        //     res.send( response.rows )
        // })
        // .catch( ( error ) => {
        //     console.log(error);
        //     res.sendStatus(500)
        // })
    } else {
        res.sendStatus(403)
    }
});

module.exports = router;
