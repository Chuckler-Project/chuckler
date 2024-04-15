import React from 'react';
import { Routes, Route } from 'react-router-dom';
import TestComponent from '../components/test.jsx';
import Main from '../pages/Main.jsx';
import Joke from '../components/Joke.jsx';
import LandingPage from '../pages/LandingPage.jsx';
import Login from '../pages/Login.jsx';
import Signup from '../pages/Signup.jsx';
import ChatContainer from '../components/chatComponents/ChatContainer.jsx'

const Router = () => {
  return (
    <Routes>
      <Route path="/test" element={<TestComponent />} />
      <Route path="/main" element={<Main />} />
      <Route path="/main" element={<Joke />} />
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/chat" element={<ChatContainer />} />
    </Routes>
  );
};

export default Router;
