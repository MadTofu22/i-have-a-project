const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

const  dayjs = require('dayjs')



// Get all of the contract requests a manager has sent out
router.get('/outbox/:id', async (req, res) => {
    if (req.isAuthenticated) {
        const contractQueryText = `
            SELECT *, contract_requests.id AS contract_id FROM contract_requests
            JOIN projects ON projects.id = contract_requests.project_id
            JOIN software ON software.id = contract_requests.software_id
            WHERE requesting_manager_id = $1;`;
            // GROUP BY contract_requests.id, projects.id, software.id

        const designerQueryText = `
            SELECT "user".*, designers.* FROM "designers"
            LEFT JOIN "user" ON "user".designer_id = designers.id
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
router.get('/inbox/:id', async (req, res) => {
    if (req.isAuthenticated) {
        const contractQueryText = `
            SELECT * FROM contract_requests
            JOIN projects ON projects.id = contract_requests.project_id
            JOIN software ON software.id = contract_requests.software_id
            WHERE contracted_manager_id = $1
            GROUP BY contract_requests.id, projects.id, software.id;`;

        const designerQueryText = `
            SELECT "user".*, designers.* FROM "designers"
            Left JOIN "user" ON "user".designer_id = designers.id
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

                const managerResponse = await connection.query(managerQueryText, [contract.requesting_manager_id]);
                const designerResponse = await connection.query(designerQueryText, [contract.contracted_designer_id]);

                resultArr.push({
                    contractData: contract,
                    managerData: managerResponse.rows[0],
                    designerData: designerResponse.rows[0],
                });
            }
            await connection.query('COMMIT');
            // console.log('in contract inbox GET - resultArr:', resultArr);
            res.send(resultArr);
        } catch (error) {
            await connection.query('ROLLBACK;');
            console.log('error in contract inbox get', error);
            res.sendStatus(500);
        } finally {
            connection.release();
        }
    } else {
        res.sendStatus(403);
    }
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
    let now = new Date()

    const queryParams = [
        req.user.id,
        req.body.contracted_manager_id,
        req.body.contracted_designer_id,
        req.body.project_id,
        req.body.software_id,
        req.body.requested_hours,
        now,
    ];
    console.log(queryParams);
    
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

router.delete('/:id', (req, res) => {
    const queryText = `DELETE FROM contract_requests where id = $1;`;

    pool.query(queryText, [req.params.id])
        .then(response => {
            console.log('in contracts.router DELETE - SUCCESS');
            res.sendStatus(200);
        }).catch(error => {
            console.log('Error in contracts.router DELETE', error);
        });
});

module.exports = router;