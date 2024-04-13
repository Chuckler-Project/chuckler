import React, { createContext, useState } from 'react';
import SentMessages from './SentMessages.jsx';
import TypeMessages from './TypeMessage.jsx';

const ChatContainer = () => {
  // specifies chatroom context - user ids of user who is sending messages and user who is recieving
  // Logic still has to be implmented to set values of sender and reciever from auth data
  const [usersData, setUsersData] = useState({
    sender: '',
    receiver: '',
  });

  // create connetion to wss to be used by all child props
  const socket = new WebSocket('ws://localhost:3000');

  return (
    <div>
      <SentMessages usersData={usersData} socket={socket}></SentMessages>
      <TypeMessages usersData={usersData} socket={socket}></TypeMessages>
    </div>

  );
};

export default ChatContainer;
