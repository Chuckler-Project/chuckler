import React, { useState, useEffect, useRef } from 'react';

const SentMessages = ({ usersData, socket }) => {
  const [messages, setMessages] = useState([]);
  const messagesEndRef = useRef(null);  //PALOMA
  const [user, receiver] = [usersData.user, usersData.receiver];
  const [receiverNameState, setReceiverNameState] =  useState('')

  //paloma
  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  //paloma
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };


  // handle recieving a message
  socket.onmessage = (e) => {
    try {
      const receivedMessages = JSON.parse(e.data);
      const newMessage = receivedMessages[0];
      console.log('line 24 receivedMessages[0]',receivedMessages[0])
      console.log('line 25 NEW MESSAGE---->', receivedMessages[0].content)
      
      const receiverName = receivedMessages[0].receiver_username
      setReceiverNameState(receiverName)
      console.log('line 29 receiverNameState',receiverNameState)
      console.log('line 30 receiverName',receiverName)


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
      {/* <div className='receiverName'>{receiverNameState}</div> */}
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
