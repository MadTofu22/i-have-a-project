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
    const queryText = `SELECT designers.id, career."location", career.title, career.start_date, career.end_date
    FROM designers
    JOIN career ON career.designer_id = designers.id
    where designers.id=$1
    GROUP BY designers.id, career."location", career.title, career.start_date, career.end_date;`;

    pool.query(queryText, [req.params.id])
    .then(response => {
        res.send(response);
    }).catch(error => {
        console.log(error);
        res.sendStatus(500);
    });
});

router.get('/certification/:id', (req, res) => {
    console.log('in profile.router - retrieving certification data, id=', req.params.id);
    const queryText = `
        SELECT designers.id, certification."location", certification.certification, certification.graduation_date
        FROM designers
        JOIN certification ON certification.designer_id = designers.id
        where designers.id=$1
        GROUP BY designers.id, certification."location", certification.certification, certification.graduation_date;`;

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
        SELECT designers.id, education."location", education."degree", education.graduation_date, education."degree"
        FROM designers
        JOIN education ON education.designer_id = designers.id
        where designers.id=$1
        GROUP BY designers.id, education."location", education."degree", education.graduation_date, education."degree";`;

    pool.query(queryText, [req.params.id])
    .then(response => {
        res.send(response);
    }).catch(error => {
        console.log(error);
        res.sendStatus(500);
    });
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