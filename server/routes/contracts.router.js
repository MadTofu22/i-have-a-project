const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();


// Get all of the contract requests a manager has sent out
router.get('/outbox/:id', async (req, res) => {
    if (req.isAuthenticated) {
        const contractQueryText = `
            SELECT * FROM contract_requests
            JOIN projects ON projects.id = contract_requests.project_id
            JOIN software ON software.id = contract_requests.software_id
            WHERE requesting_manager_id = $1
            GROUP BY contract_requests.id, projects.id, software.id;`;

        const designerQueryText = `
            SELECT "user".*, designers.* FROM "designers"
            JOIN "user" ON "user".designer_id = designers.id
            WHERE designers.id = $1;`;

        const managerQueryText = `
            SELECT "user".* FROM "user"
            WHERE id = $1;`;

        let resultArr = [];

        const connection = await pool.connect();
        try{
            await connection.query('BEGIN;');
            const contractResponse = await connection.query(contractQueryText, [req.params.id]);
            
            for (let contract of contractResponse.rows) {

                const managerResponse = await connection.query(managerQueryText, [contract.contracted_manager_id]);
                const designerResponse = await connection.query(designerQueryText, [contract.contracted_designer_id]);

                resultArr.push({
                    contractData: contract,
                    managerData: managerResponse.rows[0],
                    designerData: designerResponse.rows[0],
                });
            }
            await connection.query('COMMIT');
            console.log('in contract outbox GET - resultArr:', resultArr);
            res.send(resultArr);
        } catch (error) {
            await connection.query('ROLLBACK;');
            console.log('error in contract outbox get', error);
            res.sendStatus(500);
        } finally {
            connection.release();
        }
    } else {
        res.sendStatus(403);
    }
});

// Get all of the contract requests for a managers designers
router.get('/inbox/:id', (req, res) => {
    const responses = {
        projectResponse: [],
        designerResponse: [],
        managerResponse: [],
    };

    const projectQueryText = `
        SELECT * FROM contract_requests
        JOIN projects ON projects.id = contract_requests.project_id
        JOIN software ON software.id = contract_requests.software_id
        WHERE contracted_manager_id = $1
        GROUP BY contract_requests.id, projects.id, software.id;`;

    const designerQueryText = `
        SELECT designers.*, "user".* FROM contract_requests
        JOIN designers ON designers.id = contract_requests.contracted_designer_id
        JOIN "user" ON "user".designer_id = designers.id
        WHERE contracted_manager_id = $1;`;

    const managerQueryText = `
        SELECT "user".* FROM contract_requests
        JOIN "user" ON "user".id = contract_requests.requesting_manager_id
        WHERE contracted_manager_id = $1
        group by "user".id;`;

    

    pool.query(projectQueryText, [req.params.id])
        .then(response1 => {
            responses.projectResponse = response1.rows;
            console.log('outbox GET - projectQuery SUCCESS - reponses=', responses);
            pool.query(designerQueryText, [req.params.id])
                .then(response2 => {
                    responses.designerResponse = response2.rows;
                    console.log('outbox GET - designerQuery SUCCESS - reponses=', responses);
                    pool.query(managerQueryText, [req.params.id])
                        .then(response3 => {
                            responses.managerResponse = response3.rows;
                            console.log('outbox GET - managerQuery SUCCESS - reponses=', responses);
                            res.send(responses);
                        }).catch(error => {
                            console.log('Error in contracts.router /outgoing GET:', error)
                            res.sendStatus(500);
                        });
                }).catch(error => {
                    console.log('Error in contracts.router /outgoing GET:', error)
                    res.sendStatus(500);
                });
        }).catch(error => {
            console.log('Error in contracts.router /outgoing GET:', error)
            res.sendStatus(500);
        });
});

// Handles updating a contract request state
router.put('/:request_id', (req, res) => {
    const queryText = `
        UPDATE contract_requests 
        SET request_status = $1
        WHERE id=$2;`;

    pool.query(queryText, [req.body.newStatus, req.params.request_id])
        .then(response => {
            console.log('in contracts.router PUT, request', req.params.request_id, 'has been updated to status', req.body.newStatus);
            res.sendStatus(200);
        }).catch(error => {
            console.log('Error in contracts.router PUT', error);
        });
});

// Handles creating a new contract request
router.post('/', (req, res) => {

    const queryParams = [
        req.user.id,
        req.body.contracted_manager_id,
        req.body.contracted_designer_id,
        req.body.project_id,
        req.body.software_id,
        req.body.requested_hours,
        req.body.date_sent,
    ];
    const queryText = `
        INSERT INTO contract_requests (requesting_manager_id, contracted_manager_id, contracted_designer_id, project_id, software_id, requested_hours, date_sent, request_status)
        VALUES ($1, $2, $3, $4, $5, $6, $7, 'pending');`;

    pool.query(queryText, queryParams)
        .then(response => {
            console.log('in contracts.router POST - SUCCESS - contract_data', queryParams);
            res.sendStatus(200);
        }).catch(error => {
            console.log('Error in contracts.router POST', error);
        });
});



module.exports = router;