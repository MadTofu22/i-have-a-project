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
                        WHERE "designer_id" = $1`

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
  // POST route code here
});

module.exports = router;
