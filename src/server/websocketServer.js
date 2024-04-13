const WebSocket = require('ws');
const express = require('express');
const http = require('http');

const PORT = 3000;

// create the express server
const app = express();
const server = http.createServer(app);

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

// set up the server to handle http requests
server.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
