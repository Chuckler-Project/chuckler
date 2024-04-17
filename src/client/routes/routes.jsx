import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Main from '../pages/Main.jsx';
import Joke from '../components/Joke.jsx';
import LandingPage from '../pages/LandingPage.jsx';
import ChatContainer from '../components/chatComponents/ChatContainer.jsx'

const Router = () => {
  return (
    <Routes>
      <Route path="/main" element={<Main />} />
      <Route path="/" element={<LandingPage />} />
      <Route path="/chat" element={<ChatContainer />} />
    </Routes>
  );
};

export default Router;
