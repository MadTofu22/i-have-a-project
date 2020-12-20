const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/**
 * GET Calendar Events by Designer login ID
 */
router.get('/:id', (req, res) => {

    if (req.isAuthenticated) {
        const queryText = `SELECT * FROM "designer_calendar_item" WHERE "designer_id" = $1`

        pool.query( queryText, [ req.user.id ] )
        .then( ( response ) => {
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
