import React from "react";
import {Link} from 'react-router-dom'
import '../stylesheets/chat.css'
import ChatContainer from "./chatComponents/ChatContainer.jsx";
import SentMessages from "./chatComponents/SentMessages.jsx";
import { useEffect } from "react";
import Axios from "axios";
import { useLocation } from "react-router-dom";
export default function Chat() {

    useEffect(()=>{Axios.get('/api/user/verify').then(request=>{if(request.data==false) location.assign('/')})},[]);  
    return (
        <div className="background">
            <div className="main-container">
                <div className='close-chat'>
                <input action="action" style={{padding:'0',border:'none',background:'none'}}type="button" value="x" onClick={()=>{window.history.go(-1); return false;}} />
                </div>
                <div className="msg-container">
                        <ChatContainer />
                </div>
            </div>
        </div>
    )
}