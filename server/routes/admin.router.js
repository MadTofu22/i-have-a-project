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

router.delete('/', (req, res) => {
    if (req.isAuthenticated) {
        console.log(req.body);
        const queryText = `DELETE FROM "designer_calendar_item" WHERE "id" =  $1 AND designer_id = $2`

        pool.query( queryText, [req.body.id, req.user.designer_id] )
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

module.exports = router;
