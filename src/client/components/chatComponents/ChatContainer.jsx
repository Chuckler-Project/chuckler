/* eslint-disable no-restricted-syntax */
import React, { createContext, useState, useEffect } from 'react';
import SentMessages from './SentMessages.jsx';
import TypeMessages from './TypeMessage.jsx';

/*
Looks at the url parameters of the page and returns and object of the form:
{user: {userId}, receiver: {receiverId}}
*/
const getParamsFromUrl = () => {
  try {
    const output = {};

    const url = document.URL;
    const urlParams = url.split('?')[1];
    const paramsArray = urlParams.split('&');

    for (const element of paramsArray) {
      const keyValue = element.split('=');
      output[keyValue[0]] = keyValue[1];
    }
    return output;
  } catch (err) {
    return {user: undefined, receiver: undefined};
  }
};

const ChatContainer = () => {
  // specifies chatroom context - user ids of user who is sending messages and user who is recieving
  // Logic still has to be implmented to set values of sender and reciever from auth data
  const [usersData] = useState(getParamsFromUrl());
  const [users, setUsers] = useState([]);



  // create connetion to wss to be used by all child props
  const socket = new WebSocket(`ws://localhost:3000/chat/${usersData.user}/${usersData.receiver}`);

  console.log('userdata=>>>', usersData)
  console.log('helloooo', socket, usersData, usersData.user, usersData.receiver)
return (
  <div className='test'>
    {/* <div className='close-chat'>
     <a style={{color:"red"}  } href='/main' >
   X
 </a>
     </div> */}

    <div className='messages-component'>
      <SentMessages usersData={usersData} socket={socket} />
    </div>
    <div className='input-component'>
      <TypeMessages usersData={usersData} socket={socket} />
    </div>
  </div>

);
};

export default ChatContainer;

// /* eslint-disable no-restricted-syntax */
// import React, { createContext, useState, useEffect } from 'react';
// import SentMessages from './SentMessages.jsx';
// import TypeMessages from './TypeMessage.jsx';

// /*
// Looks at the url parameters of the page and returns and object of the form:
// {user: {userId}, receiver: {receiverId}}
// */
// const getParamsFromUrl = () => {
//   try {
//     const output = {};

//     const url = document.URL;
//     const urlParams = url.split('?')[1];
//     const paramsArray = urlParams.split('&');

//     for (const element of paramsArray) {
//       const keyValue = element.split('=');
//       output[keyValue[0]] = keyValue[1];
//     }
//     return output;
//   } catch (err) {
//     return {user: undefined, receiver: undefined};
//   }
// };

// const ChatContainer = () => {
//   // specifies chatroom context - user ids of user who is sending messages and user who is recieving
//   // Logic still has to be implmented to set values of sender and reciever from auth data
//   const [usersData] = useState(getParamsFromUrl());

//   // create connetion to wss to be used by all child props
//   const socket = new WebSocket(`ws://localhost:3000/chat/${usersData.user}/${usersData.receiver}`);

//   useEffect(() => {
//     const markMessagesAsRead = async () => {
//       try {
//         await fetch('/markMessagesAsRead', {
//           method: 'POST',
//           headers: {
//             'Content-Type': 'application/json',
//           },
//           body: JSON.stringify({ userId: usersData.receiver }),
//         });
//       } catch (err) {
//         console.error('Error marking messages as read: ', err);
//       }
//     };
//     markMessagesAsRead();

//     socket.removeEventListener('messagesRead', { userId: usersData.receiver });

//     // return () => {

//     // }
//   })

//   console.log('helloooo', socket, usersData, usersData.user, usersData.receiver)
// return (
//   <div className='test'>
//     <div className='messages-component'>
//       <SentMessages usersData={usersData} socket={socket} />
//     </div>
//     <div className='input-component'>
//       <TypeMessages usersData={usersData} socket={socket} />
//     </div>
//   </div>

// );
// };

// export default ChatContainer;
