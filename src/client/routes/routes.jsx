import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Main from '../pages/Main.jsx';
import LandingPage from '../pages/LandingPage.jsx';
import ChatContainer from '../components/chatComponents/ChatContainer.jsx';
import Chat from '../components/Chat.jsx';
import Axios from 'axios';
import { useState, useEffect } from 'react';
const Router = () => {
  const [userData,updUserData] = useState({});
  useEffect(()=>{
    Axios.get('/api/user/verify').then(request=>{
      if(request.data!=false){
        Axios.post('/api/user/username',{id:request.data}).then(requests=>{
            updUserData({'username':requests.data[0].username,'id':request.data})
          })
        }
    })},[])
  return (
    <Routes>
      <Route path="/" element={<LandingPage/>} />
      {userData && <Route path="/main" element={<Main userData={userData}/>} />}
     {userData && <Route path="/chat/*" element={<Chat userData={userData}/>} />}
    </Routes>
  );
};

export default Router;
