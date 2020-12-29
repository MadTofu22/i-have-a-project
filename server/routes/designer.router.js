const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();



router.get('/', (req, res) => {
    console.log('get designers for manager');
    
  // POST route code here
  if (req.isAuthenticated) {
        const queryText = `SELECT "first_name", "last_name", "designer_id" FROM "designers"
                                    JOIN "user" on "user"."designer_id" = "designers"."id"
                                    WHERE "manager_id" = $1;`
        pool.query(queryText, [req.user.id])
        .then( (response) => {
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

module.exports = router;
