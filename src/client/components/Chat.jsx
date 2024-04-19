import React from "react";
import {Link} from 'react-router-dom'
import '../stylesheets/chat.css'
import ChatContainer from "./chatComponents/ChatContainer.jsx";
import SentMessages from "./chatComponents/SentMessages.jsx";


export default function Chat() {

    return (
        <div className="background">
            <div className="main-container">
                <div className='close-chat'>
                    <Link  to='/main'>x</Link>
                </div>
                {/* <p>user info</p> */}
                <div className="msg-container">
                        <ChatContainer />
                </div>
            </div>
        </div>
    )
}