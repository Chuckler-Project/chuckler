import React from "react";
import {Link} from 'react-router-dom'
import '../stylesheets/chat.css'
import ChatContainer from "./chatComponents/ChatContainer.jsx";



export default function Chat() {

// console.log('#####Chat.jsx######',userData)

//move the x botton to the chatContainer 
// margin right -- 
// margin top -- 
    return (
        <div className="background">
            <div className="main-container">
                <div className='close-chat'>
                {/* < Link to={{ pathname: '/main', state: { id: 7 } }}>x</Link> */}
                </div>
                <div className="msg-container">
                        <ChatContainer />
                </div>
            </div>
        </div>
    )
}