import React, { useState, useEffect } from 'react';

const SentMessages = ({ usersData, socket }) => {
  const [messages, setMessages] = useState([]);
  const [sender, receiver] = [usersData.sender, usersData.receiver];

  // fetch previous messages from database on page load
  useEffect(() => {
  }, []);

  // handle recieving a message
  socket.onmessage = (e) => {
    console.log('data', JSON.parse(e.data));
    console.log('messages', messages);
    setMessages((previousMessages) => [...previousMessages, JSON.parse(e.data)]);
  };

  return (
    <div>
      Area where previous messages render
      {messages.map((message, index) => (
        <div key={index}>{message.content}</div>
      ))};
    </div>

  );
};

export default SentMessages;
