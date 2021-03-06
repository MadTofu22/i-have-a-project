const express = require('express');
const {
  rejectUnauthenticated,
} = require('../modules/authentication-middleware');
const encryptLib = require('../modules/encryption');
const pool = require('../modules/pool');
const userStrategy = require('../strategies/user.strategy');

const router = express.Router();

// Handles Ajax request for user information if user is authenticated
router.get('/', rejectUnauthenticated, (req, res) => {
  // Send back user object from the session (previously queried from the database)
  res.send(req.user);
});

// Handles POST request with new user data
// The only thing different from this and every other post we've seen
// is that the password gets encrypted before being inserted
router.post('/register', (req, res, next) => {
  const email = req.body.username;
  const password = encryptLib.encryptPassword(req.body.password);
  const first_name = req.body.firstName;
  const last_name = req.body.lastName;
  const company = req.body.company;

  const queryText = `INSERT INTO "user" (email, password, user_type, last_name, first_name, company)
    VALUES ($1, $2, 'manager', $3, $4, $5) RETURNING id`;
  pool
    .query(queryText, [email, password, last_name, first_name, company])
    .then(() => res.sendStatus(201))
    .catch((err) => {
      console.log('User registration failed: ', err);
      res.sendStatus(500);
    });
});

router.put('/updatePassword', rejectUnauthenticated, async (req, res, next) => {
  console.log(req.body);
  
    
    const password = encryptLib.encryptPassword(req.body.password);

    const queryText = `UPDATE "user" 
                          SET "password" = $1
                        WHERE "id" = $2 `
      pool.query(queryText, [password, req.user.id])
      .then( () => {
        res.sendStatus(201)
      })
      .catch( (error) => {
        console.log(error);
        res.sendStatus(500)
      })
});

// Handles login form authenticate/login POST
// userStrategy.authenticate('local') is middleware that we run on this route
// this middleware will run our POST if successful
// this middleware will send a 404 if not successful
router.post('/login', userStrategy.authenticate('local'), (req, res) => {
  res.sendStatus(200);
});

// clear all server session information about this user
router.post('/logout', (req, res) => {
  // Use passport's built-in method to log out the user
  req.logout();
  res.sendStatus(200);
});

// TEST ROUTE USED FOR TESTING
router.get('/test', (req, res) => {
  pool.query('SELECT * FROM "skills";')
    .then(response => {
      res.send(response);
    }).catch(error => {
      console.log(error);
      res.sendStatus(500);
    });
});

module.exports = router;
