import React, { useState, useEffect } from 'react';

const SentMessages = ({ usersData, socket }) => {
  const [messages, setMessages] = useState([]);
  const [user, receiver] = [usersData.user, usersData.receiver];

  // content of div that stores messages
  const messagesDiv = messages.map((message, index) => {
    // give user's messages and receiver's messages different classnames for styling
    const messageSender = message.from_user_id === user ? 'user' : 'sender';
    return <div key={index} className={`${messageSender}Message`}>{message.content}</div>;
  });

  // handle recieving a message
  socket.onmessage = (e) => {
    try {
      const receivedMessages = JSON.parse(e.data);
      if (Array.isArray(receivedMessages)) {
        setMessages((previousMessages) => [...previousMessages, ...JSON.parse(e.data)]);
      }
      else throw new Error(`Failed to load new messages\n${receivedMessages}`);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div style={{display: 'flex', flexDirection: 'column'}}>
      Area where previous messages render
      {messagesDiv}
    </div>

  );
};

export default SentMessages;
