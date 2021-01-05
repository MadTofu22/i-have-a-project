
const express = require('express');
require('dotenv').config();

const app = express();
const bodyParser = require('body-parser');
const sessionMiddleware = require('./modules/session-middleware');

const passport = require('./strategies/user.strategy');

// Route includes
const userRouter = require('./routes/user.router');
const calendarRouter = require('./routes/calendar.router')
const projectRouter = require('./routes/projects.router')
const designerRouter = require('./routes/designer.router')
const profileRouter = require('./routes/profile.router');
const searchRouter = require('./routes/search.router')

// Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Passport Session Configuration //
app.use(sessionMiddleware);

// start up passport sessions
app.use(passport.initialize());
app.use(passport.session());

/* Routes */
app.use('/api/user', userRouter);
app.use('/api/calendar', calendarRouter)
app.use('/api/projects', projectRouter)
app.use('/api/designers', designerRouter)
app.use('/api/calendar', calendarRouter);
app.use('/api/projects', projectRouter);
app.use('/api/profile', profileRouter);
app.use('/api/search', searchRouter)

// Serve static files
app.use(express.static('build'));

// App Set //
const PORT = process.env.PORT || 5000;

/** Listen * */
app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
