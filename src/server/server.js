const express = require('express');

require('dotenv').config();

const WebSocket = require('ws');
const path = require('path');
const http = require('http');
require('dotenv').config();
const cookieParser = require('cookie-parser');

const PORT = process.env.PORT;

// require in controllers and routers
const userController = require('./controllers/userController');
const sessionController = require('./controllers/tokenController');
const jokeRouter = require('./routes/jokeRouter');
const userRouter = require('./routes/userRouter');
const matchRouter = require('./routes/matchRouter');
const usernameRouter = require('./routes/usernameRouter');
const reactionRouter = require('./routes/reactionRouter');
const websocketRouter = require('./routes/websocketsRouter');
const messagesRouter = require('./routes/messagesRouter');

// create the express server
const app = express();
const server = http.createServer(app);

// parse incoming json
app.use(express.json());

// serve static files from the build file
app.use(express.static('build'));

// routers
app.use('/api/user', userRouter);
app.use('/api/joke', jokeRouter);
app.use('/api/match', matchRouter);
app.use('/api/username', usernameRouter);
app.use('/api/reaction', reactionRouter);
app.use('/api/messages', messagesRouter);

// catch-all route handler
app.use((req, res) => {
  res.status(404).send('!!Page not found!!');
});

// global error handler
app.use((err, req, res) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 500,
    message: { err: 'An error occurred' },
  };
  const errorObj = Object.assign({}, defaultErr, err);
  console.log(errorObj.log);
  return res.status(errorObj.status).json(errorObj.message);
});

// set up the server to handle websocket connections
const wss = new WebSocket.WebSocketServer({ server });

wss.on('connection', (socket, request) => {
  websocketRouter(socket, request, wss);
});

// set up the server to listen for http requests
server.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});

module.exports = app;
