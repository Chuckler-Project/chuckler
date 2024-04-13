const express = require('express');
require('dotenv').config();
const jokeRouter = require('./routes/jokeRouter');
const userRouter = require('./routes/userRouter');
const matchRouter = require('./routes/matchRouter');

const PORT = process.env.PORT;

const app = express();

// parse incoming json
app.use(express.json());

// serve static files from the build file
app.use(express.static('build'));

// routers
app.use('/api/user', userRouter);
app.use('/api/joke', jokeRouter);
app.use('api/match', matchRouter);

// catch-all route handler
app.use((req, res) => { res.status(404).send('!!Page not found!!'); });

// global error handler
app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 500,
    message: { err: 'An error occurred' },
  };
  const errorObj = Object.assign({}, defaultErr, err);
  console.log(errorObj.log);
  return res.status(errorObj.status).json(errorObj.message);
});

app.listen(PORT, () => { console.log(`Server listening on ${PORT}`); });

module.exports = app;
