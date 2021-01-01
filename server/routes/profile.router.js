const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

// This route updates the Users profile data
router.get('/designers/:id', (req, res) => {
    console.log('in profile.router - retrieving designers data, id=', req.params.id);
    const queryText = `
        SELECT designers.id, designers.phone, designers.photo, designers.linkedin, designers.availability_hours, designers.weekend_availability
        FROM designers where id=$1
        GROUP BY designers.id;`;

    pool.query(queryText, [req.params.id])
    .then(response => {
        res.send(response);
    }).catch(error => {
        console.log(error);
        res.sendStatus(500);
    });
});

// This route gets the specified user's career history
router.get('/career/:id', (req, res) => {
    console.log('in profile.router - retrieving career data, id=', req.params.id);
    const queryText = `SELECT designers.id, career."location", career.title
    FROM designers
    JOIN career ON career.designer_id = designers.id
    where designers.id=$1
    GROUP BY designers.id, career."location", career.title;`;

    pool.query(queryText, [req.params.id])
    .then(response => {
        res.send(response);
    }).catch(error => {
        console.log(error);
        res.sendStatus(500);
    });
});

router.get('/education/:id', (req, res) => {
    console.log('in profile.router - retrieving education data, id=', req.params.id);
    const queryText = `
        SELECT designers.id, education."location", education."degree"
        FROM designers
        JOIN education ON education.designer_id = designers.id
        where designers.id=$1
        GROUP BY designers.id, education."location", education."degree";`;

    pool.query(queryText, [req.params.id])
    .then(response => {
        res.send(response);
    }).catch(error => {
        console.log(error);
        res.sendStatus(500);
    });
});

router.get('/skills/:id', (req, res) => {
    console.log('in profile.router - retrieving skills data, id=', req.params.id);
    const queryText = `SELECT * FROM skills WHERE designer_id = $1;`;

    pool.query(queryText, [req.params.id])
    .then(response => {
        res.send(response);
    }).catch(error => {
        console.log(error);
        res.sendStatus(500);
    });
});

router.get('/software/:id', (req, res) => {
    console.log('in profile.router - retrieving software data, id=', req.params.id);
    const queryText = `SELECT * FROM software WHERE designer_id = $1;`;

    pool.query(queryText, [req.params.id])
    .then(response => {
        res.send(response);
    }).catch(error => {
        console.log(error);
        res.sendStatus(500);
    });
});

router.put('/', (req, res) => {

    const queryParams = [
        req.body.designer.linkedin,
        req.body.designer.phone,
        req.body.designer.photo,
        req.body.designer.availability_hours,

    ];
    const queryText = `
        BEGIN;
            UPDATE designer SET
                linkedin = $1,
                phone = $2,
                photo = $3,
                availability_hours = $4
    `
});

// TEST ROUTE USED FOR TESTING
router.get('/test', (req, res) => {
    pool.query('SELECT * FROM "user";')
    .then(response => {
        res.send(response);
    }).catch(error => {
        console.log(error);
        res.sendStatus(500);
    });
});

module.exports = router;