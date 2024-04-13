const express = require('express');
const jokeRouter = require('./routes/jokeRouter');
const userRouter = require('./routes/userRouter');

const PORT = 3000;

const app = express();

// parse incoming json
app.use(express.json());

// serve static files from the build file
app.use(express.static('build'));

// routers
app.use('/api/user', userRouter);
app.use('/api/joke', jokeRouter);

app.use((req, res) => { res.status(404).send('!!Page not found!!'); });

app.use((err, req, res) => {
  const defaultErr = {
    log: 'Server error handler caught unknow middleware error',
    status: 500,
    message: { err: 'A server error occurred' },
  };
  const errorObj = Object.assign(defaultErr, err);
  console.log(errorObj.log);
  res.status(errorObj.status).json(errorObj.message);
});

app.listen(PORT, () => { console.log(`Server listening on ${PORT}`); });

module.exports = app;
