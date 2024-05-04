import React, { useState, useEffect, useRef } from 'react';
import ReactionMenu from './ReactionMenu.jsx';
import Reaction from './Reaction.jsx';

const SentMessages = ({ usersData, socket }) => {
  const [messages, setMessages] = useState([]);
  const messagesEndRef = useRef(null);  //PALOMA
  const [user, receiver] = [usersData.user, usersData.receiver];
  const [receiverNameState, setReceiverNameState] =  useState('')

  //paloma
  useEffect(() => {
    scrollToBottom();
    fetchUsername();
  }, [messages]);
  //paloma
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // useEffect(() => {
  //   Notification.requestPermission();
  // }, []);


  //get name from usernameController
const fetchUsername = async ()=>{
//NOTE: cannot get the parsed data properly
//   const usernameResponse = await fetch('http://localhost:8080/api/username/getname',{
//   method: 'POST',
//   headers: {'Content-Type':'application/json'},
//   body: JSON.stringify({to_user_id: receiver})
// })
fetch('http://localhost:8080/api/username/getname',{
  method: 'POST',
  headers: {'Content-Type':'application/json'},
  body: JSON.stringify({to_user_id: receiver})
}).then((response)=>response.text()).then((result)=>setReceiverNameState(result)
).catch((error)=>console.log(error))

// catch(err){
//   console.error('err in fetchUsername',err)
// }
}

 

  // handle recieving a message
    socket.onmessage = (e) => {
      try {
        const receivedMessages = JSON.parse(e.data);
        console.log(receivedMessages);
        // [ {} ]
        if (receivedMessages.length === 1) {
          // const newMessage = receivedMessages[0];
          // console.log('NEW MESSAGE---->', receivedMessages[0].content)
          console.log('line 26 msg obj', receivedMessages[0]);
          // console.log('line 27 emoji:', receivedMessages[0].reaction_emoji);
          // setNewEmoji(receivedMessages[0].reaction_emoji);
          setNewEmoji(`${receivedMessages[0].id}/${receivedMessages[0].reaction_emoji.split('/')[1]}`);
    
          if (Array.isArray(receivedMessages)) {
            setMessages((previousMessages) => [...previousMessages, ...JSON.parse(e.data)]);
          }
          else throw new Error(`Failed to load new messages\n${receivedMessages}`);
        } else {
          console.log(receivedMessages.pop());
          setMessages(receivedMessages);
          setNewEmoji(`emoji refresh update`);
        }
      } catch (err) {
        console.log(err);
      }
    };

  const [showReactionMenu, setShowReactionMenu] = useState(false);
  const [messageClicked, setMessageClicked] = useState();
  function handleRightClick(e) {
    e.preventDefault();
    // console.log('target: ', e.target);
    // console.log('class: ', e.target.className)
    if(e.target.className === 'senderMessage') {
      setMessageClicked(e.target.title);
      setShowReactionMenu(true);
    }
    // setMessageClicked(e.target.title);
    // setShowReactionMenu(true);
  }

  const [newEmoji, setNewEmoji] = useState();

  // console.log('MESSAGES', messages, user)

  return (
    <div className='chat-container'>
     <div className='revNamefield'> {receiverNameState} </div>
      <div className='messages-container'>
        {messages.map((message, index) => {
          const messageSender = message.from_user_id === user ? 'user' : 'sender';
          return (
          <div className='message-and-reaction'>
            <div id='msg' key={index} title={index} className={`${messageSender}Message`} onContextMenu={handleRightClick}>
              {message.content}
            </div>
            <div title='reaction-container'>
              <Reaction title={index} className={`${messageSender}Reaction`} newEmoji={newEmoji} setNewEmoji={setNewEmoji} messageId={message.id} messages={messages} usersData={usersData} socket={socket}/>
            </div>
            {(showReactionMenu && (index === Number(messageClicked))) && (
              <ReactionMenu setShowReactionMenu={setShowReactionMenu} setNewEmoji={setNewEmoji} messageId={message.id} usersData={usersData} socket={socket}/>
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