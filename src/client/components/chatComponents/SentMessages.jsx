import React, { useState, useEffect, useRef } from 'react';
import ReactionMenu from './ReactionMenu.jsx';
import Reaction from './reaction.jsx';

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

  const [showReactionMenu, setShowReactionMenu] = useState(false);
  const [messageClicked, setMessageClicked] = useState();
  function handleRightClick(e) {
    e.preventDefault();
    console.log('target: ', e.target.title);
    setMessageClicked(e.target.title);
    setShowReactionMenu(true);
  }

  const [newEmoji, setNewEmoji] = useState();

  // console.log('MESSAGES', messages, user)

  return (
    <div className='chat-container'>
      <div className='messages-container'>
        {messages.map((message, index) => {
          const messageSender = message.from_user_id === user ? 'user' : 'sender';
          // console.log('emoji number:', message.reaction_emoji, typeof message.reaction_emoji);
          // console.log('message id:', message.id);
          return (
          <div>
            <div id='msg' key={index} title={index} className={`${messageSender}Message`} onContextMenu={handleRightClick}>
              {message.content}
            </div>
            <div title='reaction-container'>
              <Reaction title={index} newEmoji={newEmoji} setNewEmoji={setNewEmoji} showReactionMenu={showReactionMenu} messageId={message.id}/>
            </div>
            {(showReactionMenu && (index === Number(messageClicked))) && (
              <ReactionMenu setShowReactionMenu={setShowReactionMenu} setNewEmoji={setNewEmoji} messageId={message.id}/>
            )}
          </div>);
        })
        }
        <div ref={messagesEndRef}></div>
      </div>
    </div>

  );
};

export default SentMessages;
