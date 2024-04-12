import React from 'react';
import SentMessages from './SentMessages.jsx';
import TypeMessages from './TypeMessage.jsx';

const ChatContainer = () => {
  return (
    <div>
      <SentMessages></SentMessages>
      <TypeMessages></TypeMessages>
    </div>


  )
}

export default ChatContainer;