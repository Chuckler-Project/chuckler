import React, { useState } from 'react';

const TypeMessages = ({ usersData, socket }) => {
  const [error, setError] = useState('');
  const [messageContent, setMessageContent] = useState('');
  const [user, receiver] = [usersData.user, usersData.receiver]; 

  const sendMessage = async (e) => {
    e.preventDefault();
 
    // clear lingering error messages
    setError('');

    const isValidMessage = () => {
      if (messageContent.length === 0) {
        setError('Message must not be empty');
        return false;
      }
      return true;
    };

    if (!isValidMessage) return;

    // create an object with the data to be sent in request to server
    const content = messageContent;
    const requestBody = { content, user, receiver };

    // send the request and clear the input field
    try {
      socket.send(JSON.stringify(requestBody));
      setMessageContent('');
    } catch (err) {
      console.log(err);
      setError('Failed to send message data');
    }
  };

  return (
    <form onSubmit={sendMessage}>
      <input type='text'
      value={messageContent}
      onChange={(e) => setMessageContent(e.target.value)}
      />
      {error && <p>{error}</p>}
    </form>

  );
};

export default TypeMessages;