const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/* GET ROUTES */
// Gets the specified, by id, designer's profile information
router.get('/designers/:id', (req, res) => {
    console.log('in profile.router - retrieving designers data, id=', req.params.id);
    const queryText = `
        SELECT * FROM designers WHERE id = $1;`;

    pool.query(queryText, [req.params.id])
    .then(response => {
        res.send(response);
    }).catch(error => {
        console.log(error);
        res.sendStatus(500);
    });
});

// Gets the specified, by id, designer's career hisotry
router.get('/career/:id', (req, res) => {
    console.log('in profile.router - retrieving career data, id=', req.params.id);
    const queryText = `SELECT * FROM career WHERE designer_id = $1;`;

    pool.query(queryText, [req.params.id])
    .then(response => {
        res.send(response);
    }).catch(error => {
        console.log(error);
        res.sendStatus(500);
    });
});

// gets the list of software 
router.get('/software', (req, res) => {
    if (req.isAuthenticated) {
        const queryText = `SELECT * FROM "software"`
        pool.query(queryText)
        .then( (response) => {
            res.send(response.rows)
        })
        .catch( (error) => {
            console.log(error);
            res.sendStatus(500)
        })
    } else {
        res.sendStatus(403)
    }
})

// Gets the specified, by id, designer's education hisotry
router.get('/education/:id', (req, res) => {
    console.log('in profile.router - retrieving education data, id=', req.params.id);
    const queryText = `SELECT * FROM education WHERE designer_id = $1;`;

    pool.query(queryText, [req.params.id])
    .then(response => {
        res.send(response);
    }).catch(error => {
        console.log(error);
        res.sendStatus(500);
    });
});

// Gets the specified, by id, designer's listed and rated skills
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

// Gets the specified, by id, designer's software proficiencies
router.get('/software/:id', (req, res) => {
    console.log('in profile.router - retrieving software data, id=', req.params.id);
    const queryText = `SELECT * FROM "software" 
                            JOIN "designer_software_join" on "designer_software_join"."software_id" = "software"."id"
                            WHERE designer_id = $1;`;

    pool.query(queryText, [req.params.id])
    .then(response => {
        res.send(response);
    }).catch(error => {
        console.log(error);
        res.sendStatus(500);
    });
});

/* PUT ROUTES */
// Updates the specified, by id, designer's profile information
router.put('/designers/:id', (req, res) => {

    const queryParams = [
        req.params.id,
        req.body.designer.linkedin,
        req.body.designer.phone,
        req.body.designer.photo,
        req.body.designer.availability_hours,
    ];
    const queryText = `
        UPDATE designers SET
            linkedin = $2,
            phone = $3,
            photo = $4,
            availability_hours = $5
        WHERE id=$1;`;
    pool.query(queryText, queryParams)
    .then(response => {
        res.sendStatus(200);
    }).catch(error => {
        console.log(error);
        res.sendStatus(500);
    });
});

// Updates the specified, by id, designer's career history 
router.put('/career/:id', (req, res) => {

    const queryParams = [
        req.body.title,
        req.body.location,
        req.body.id,
    ];
    const queryText = `
        UPDATE career SET
            title = $1,
            location = $2
        WHERE id = $3;`;
    pool.query(queryText, queryParams)
    .then(response => {
        res.sendStatus(200);
    }).catch(error => {
        console.log(error);
        res.sendStatus(500);
    });
});

// Updates the specified, by id, designer's career history 
router.put('/education/:id', (req, res) => {

    const queryParams = [
        req.body.degree,
        req.body.location,
        req.body.id,
    ];
    const queryText = `
        UPDATE education SET
            degree = $1,
            location = $2
        WHERE id = $3;`;
    pool.query(queryText, queryParams)
    .then(response => {
        res.sendStatus(200);
    }).catch(error => {
        console.log(error);
        res.sendStatus(500);
    });
});

// Updates the specified, by id, designer's added skills and proficiencies
router.put('/skills/:id', (req, res) => {

    const queryParams = [
        
        req.body.id,
        req.body.proficiency,
        req.body.label,
    ];
    const queryText = `
        UPDATE skills SET
            proficiency = $2,
            label = $3
        WHERE id = $1;`;
    pool.query(queryText, queryParams)
    .then(response => {
        res.sendStatus(200);
    }).catch(error => {
        console.log(error);
        res.sendStatus(500);
    });
});

// Updates the specified, by id, designer's software proficiencies
router.put('/software/:id', (req, res) => {

    const queryParams = [
        req.params.id,
        req.body.proficient,
        req.body.index,
    ];
    console.log('in the software put route, queryParams=', queryParams)
    const queryText = `
        UPDATE "designer_software_join" SET
            proficient = $2
            WHERE designer_id = $1 AND software_id = $3;`;
    pool.query(queryText, queryParams)
    .then(response => {
        res.sendStatus(200);
    }).catch(error => {
        console.log(error);
        res.sendStatus(500);
    });
});

/* POST ROUTES */
// Creates an entry for a new designer when an invite is sent by the manager
router.post('/designers/:manager_id', (req, res) => {
    const queryParams = [
        req.params.manager_id,
        req.body.rate,
    ];
    const queryText = `
        INSERT INTO designers (manager_id, rate)
        VALUES ($1, $2)
        RETURNING id;`;

    pool.query(queryText, queryParams)
    .then(response => {
        res.send(response);
    }).catch(error => {
        console.log(error);
        res.sendStatus(500);
    });    
});

// Creates a new entry for the specified, by id, designer's career history
router.post('/career/:id', (req, res) => {
    const queryParams = [
        req.params.id,
        req.body.title,
        req.body.location,
    ];
    const queryText = `
        INSERT INTO career (designer_id, title, location)
        VALUES ($1, $2, $3);`;

    pool.query(queryText, queryParams)
    .then(response => {
        res.sendStatus(200);
    }).catch(error => {
        console.log(error);
        res.sendStatus(500);
    });    
});

// Creates a new entry for the specified, by id, designer's education history
router.post('/education/:id', (req, res) => {
    const queryParams = [
        req.params.id,
        req.body.degree,
        req.body.location,
    ];
    const queryText = `
        INSERT INTO education (designer_id, degree, location)
        VALUES ($1, $2, $3);`;

    pool.query(queryText, queryParams)
    .then(response => {
        res.sendStatus(200);
    }).catch(error => {
        console.log(error);
        res.sendStatus(500);
    });    
});

// Creates a new entry for the specified, by id, designer's career history
router.post('/skills/:id', (req, res) => {
    const queryParams = [
        req.params.id,
        req.body.proficiency,
        req.body.label,
    ];
    const queryText = `
        INSERT INTO skills (designer_id, proficiency, label)
        VALUES ($1, $2, $3);`;

    pool.query(queryText, queryParams)
    .then(response => {
        res.sendStatus(200);
    }).catch(error => {
        console.log(error);
        res.sendStatus(500);
    });    
});

// Creates a new entry for the specified, by id, designer's career history
router.post('/software/:id', (req, res) => {
    const queryParams = [
        req.params.id,
        req.body.software_id,
        req.body.proficient,
    ];
    const queryText = `
        INSERT INTO "designer_software_join" (designer_id, software_id, proficient)
        VALUES ($1, $2, $3);`;

    pool.query(queryText, queryParams)
    .then(response => {
        res.sendStatus(200);
    }).catch(error => {
        console.log(error);
        res.sendStatus(500);
    });    
});

router.delete('/skills/:id', (req, res) => {
    const queryText = `DELETE FROM "skills" WHERE id = $1;`;
    
    pool.query(queryText, [req.params.id])
    .then(response => {
        res.sendStatus(200);
    }).catch(error => {
        console.log(error);
        res.sendStatus(500);
    });    
});

router.delete('/career/:id', (req, res) => {
    const queryText = `DELETE FROM "career" WHERE id = $1;`;
    
    pool.query(queryText, [req.params.id])
    .then(response => {
        res.sendStatus(200);
    }).catch(error => {
        console.log(error);
        res.sendStatus(500);
    });    
});

router.delete('/education/:id', (req, res) => {
    const queryText = `DELETE FROM "education" WHERE id = $1;`;
    
    pool.query(queryText, [req.params.id])
    .then(response => {
        res.sendStatus(200);
    }).catch(error => {
        console.log(error);
        res.sendStatus(500);
    });    
});

module.exports = router;