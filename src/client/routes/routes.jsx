import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Main from '../pages/Main.jsx';
import LandingPage from '../pages/LandingPage.jsx';
import ChatContainer from '../components/chatComponents/ChatContainer.jsx'
import Signin from '../components/Signin.jsx';

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/main" element={<Main />} />
      <Route path="/chat" element={<ChatContainer />} />
    </Routes>
  );
};

export default Router;
