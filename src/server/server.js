const express = require('express');

require('dotenv').config();

const WebSocket = require('ws');
const path = require('path');
const http = require('http');
const cookieParser = require('cookie-parser');

const PORT = 3000;

// require in controllers and routers
const userController = require('./controllers/userController');
const jokeRouter = require('./routes/jokeRouter');
const userRouter = require('./routes/userRouter');
const matchRouter = require('./routes/matchRouter');

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

// set up the server to handle websocket connections
const wss = new WebSocket.WebSocketServer({ server });

// array to store all connected client sockets
const clients = [];

wss.on('connection', (socket) => {
  clients.push(socket);

  // for now, just a test event handler to send the same message back to all clients
  socket.on('message', (e) => {
    clients.forEach((client) => {
      client.send(e.toString());
    });
  });
});

// set up the server to listen for http requests
server.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});

module.exports = app;
