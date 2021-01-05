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

        // Check if the user is authenticated
        let projListSQL = '';

        
        managerDelSQL = `SELECT * FROM "" WHERE "user_id" = $1`;
        

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
