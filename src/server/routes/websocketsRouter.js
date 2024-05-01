const chatController = require('../controllers/chatController');

/*
looks at the path of the websocket connection url and  use it to decide
which middleware functions to invoke. If a middleware function
returns false, do not invoke the next one.
*/
const handleWebsocketConnections = (socket, request, wss) => {
  const path = request.url.split('/')[1];

  const invokeMiddleware = async (...funcs) => {
    for (const func of funcs) {
      if (!await func(socket, request, wss)) break;
    }
  };

  switch (path) {
  case 'chat':
    invokeMiddleware(
      chatController.setClientId,
      chatController.getPreviousMessages,
      chatController.listenForNewMessages
    );
    break;
  default:
    console.log('Error in websocketRouter. Websocket connection path not recognized');
    socket.send('Websocket connection path not recognized');
    break;
  }
};

module.exports = handleWebsocketConnections;
