const WebSocket = require('ws');
const cookieParser = require('cookie-parser');
const sql = require('../../db/db');

module.exports = {
  // grab the user id of the message sender and reciever from params and use to set id
  setClientId: async (socket, request, wss) => {
    try {
      const userId = request.url.split('/')[2];
      const receiverId = request.url.split('/')[3]; 
      socket.id = `messages${userId}/${receiverId}`;
      return true;
    } catch (err) {
      console.log(`Error in chatController.setClientId, ${err}`);
      socket.send('Error: invalid path');
      return false;
    }
  },
  getPreviousMessages: async (socket, request, wss) => {
    const userId = socket.id.slice(8, socket.id.indexOf('/'));
    const receiverId = socket.id.slice(socket.id.indexOf('/') + 1);
    try {
      // get jwt from cookies
      // cookie takes the form "name1=value; name2=...", so we want the chunk after jwt= and before ;
      const cookies = request.headers.cookie.split(' ');
      const getJWTFromCookies = (cookies) => {
        const jwtCookie = cookies.find((s) => { return s.slice(0, 4) === 'jwt=' }).slice(4);
        if (!jwtCookie) throw new Error('user not logged in');
        const removeTrailingSemicolon = (string) => string[string.length - 1] === ';' ? string.slice(0, string.length - 1) : string;
        const jwt = removeTrailingSemicolon(jwtCookie);
        return jwt;
      }
      const jwt = getJWTFromCookies(cookies);

      // get userid from jwt
      const userIdFromJWT = 16; // hardcoded value for now until auth ready 
      
      // verify that userid from jwt matches the given user id stored in client id 
      if (userId != userIdFromJWT) throw new Error('user not authorized to view this chat');

      // get previous messages in this chat. only 10 for faster load times 
      // (need to add functionality later for loading more comments)
      const storedMessages = await sql`SELECT * FROM messages WHERE 
      (from_user_id=${userId} AND to_user_id=${receiverId}) 
      OR (from_user_id=${receiverId} AND to_user_id=${userId})
      ORDER BY created_at ASC LIMIT 10`;
      socket.send(JSON.stringify(storedMessages));
      return true;
      
    } catch (err) {
      console.log(`Error in chatController.getPreviousMessages, ${err}`);
      socket.send(JSON.stringify(err));
      return false;
    } 
  },
  listenForNewMessages: async (socket, request, wss) => {
    try {
      socket.on('message', async (data) => {
        const {content, user, receiver} = JSON.parse(data.toString());

        // store message data in db
        const storeMessageResponse = await sql`INSERT INTO messages (content, from_user_id, to_user_id) 
        VALUES(${content}, ${user}, ${receiver}) 
        RETURNING *`; 

        // send message back to both parties (if they're connected to wss)
        wss.clients.forEach((client) => {
          if (client.id === `messages${user}/${receiver}` || client.id === `messages${receiver}/${user}`) {
            client.send(JSON.stringify(storeMessageResponse));
          }
        })
      })  
    } catch (err) {
      console.log(`Error in chatController.listenForNewMessages, ${err}`);
      socket.send(err);
    }
  }
} 