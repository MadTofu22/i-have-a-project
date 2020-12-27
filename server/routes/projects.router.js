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

router.get('/details/:project_id', (req, res) => {
    console.log(req.params)
    
    if(req.isAuthenticated){
        
        const queryText = `SELECT * FROM "projects" 
                            WHERE "project_id" = $1`
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

/**
 * POST route template
 */
router.post('/', (req, res) => {
  // POST route code here
});

module.exports = router;
