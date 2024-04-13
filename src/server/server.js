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

app.listen(PORT, () => { console.log(`Server listening on ${PORT}`); });

module.exports = app;
