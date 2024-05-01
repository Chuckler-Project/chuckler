const WebSocket = require("ws");
const cookieParser = require("cookie-parser");
const sql = require("../../db/db");
const jwt = require("jsonwebtoken");
const chatController = {};
const secretKey = process.env.JWT_SECRET;
const chatModel = require("../models/chatModel");
const { UNSAFE_NavigationContext } = require("react-router-dom");
// grab the user id of the message sender and reciever from params and use to set id
(chatController.setClientId = async (socket, request, wss) => {
  try {
    const userId = request.url.split("/")[2];
    const receiverId = request.url.split("/")[3];
    socket.id = `messages${userId}/${receiverId}`;
    return true;
  } catch (err) {
    console.log(`Error in chatController.setClientId, ${err}`);
    socket.send("Error: invalid path");
    return false;
  }
}),
(chatController.getPreviousMessages = async (socket, req, wss) => {
  try {
    const userId = jwt.verify(
      Object.values(req)[28].cookies.jwt,
      secretKey
    ).id;
    chatModel.getMessages(userId);
  } catch (err) {
    console.log(`Error in chatController.getPreviousMessages, ${err}`);
    return false;
  }
}),
(chatController.sendMessage = async (socket, req, wss) => {
  try {
    const request = Object.values(req)[28];
    const message = request.body.message;
    const userId = jwt.verify(request.cookies.jwt, secretKey).id;
    chatModel.sendMessage(userId, message);
  } catch (err) {
    console.log(`Error in chatController.sendMessage middleware, ${err}`);
  }
});
chatController.listenForNewMessages = async (socket, request, wss) => {
  try {
    socket.on("message", async (data) => {
      const { content, user, receiver } = JSON.parse(data.toString());
      // send message back to both parties (if they're connected to wss)
      wss.clients.forEach((client) => {
        if (
          client.id === `messages${user}/${receiver}` ||
          client.id === `messages${receiver}/${user}`
        ) {
          client.send(JSON.stringify(storeMessageResponse));
        }
      });
    });
  } catch (err) {
    console.log(`Error in chatController.listenForNewMessages, ${err}`);
    socket.send(err);
  }
};
module.exports = chatController;
