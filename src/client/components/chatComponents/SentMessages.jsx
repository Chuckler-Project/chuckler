import React, { useState, useEffect, useRef } from 'react';

const SentMessages = ({ usersData, socket }) => {
  const [messages, setMessages] = useState([]);
  const messagesEndRef = useRef(null);  //PALOMA
  const [user, receiver] = [usersData.user, usersData.receiver];

  //paloma
  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  //paloma
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };




  // content of div that stores messages
  // const messagesDiv = messages.map((message, index) => {
  //   // console.log('MESSAGE', message)
  //   // give user's messages and receiver's messages different classnames for styling
  //   const messageSender = message.from_user_id === user ? 'user' : 'sender';
  //   return <div id='msg' key={index} className={`${messageSender}Message`}>{message.content}</div>;
    
  // });

  // handle recieving a message
  socket.onmessage = (e) => {
    try {
      const receivedMessages = JSON.parse(e.data);
      const newMessage = receivedMessages[0];
      console.log('NEW MESSAGE---->', receivedMessages[0].content)


      if (Array.isArray(receivedMessages)) {
        setMessages((previousMessages) => [...previousMessages, ...JSON.parse(e.data)]);
      }
      else throw new Error(`Failed to load new messages\n${receivedMessages}`);
    } catch (err) {
      console.log(err);
    }
  };

  // console.log('MESSAGES', messages, user)

  return (
    <div className='chat-container'>
      <div className='messages-container'>
        {messages.map((message, index) => {
          const messageSender = message.from_user_id === user ? 'user' : 'sender';
          return <div id='msg' key={index} className={`${messageSender}Message`}>{message.content}</div>;
        })
        }
        <div ref={messagesEndRef}></div>
      </div>
    </div>

  );
};

export default SentMessages;
