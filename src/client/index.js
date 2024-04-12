console.log("Hello World!");
import React from 'react';
import { createRoot } from 'react-dom/client';
import TestComponent from './components/test.jsx';
import ChatContainer from './components/ChatContainer.jsx';

const domNode = document.getElementById('root');
const root = createRoot(domNode);

root.render(
  <React.StrictMode>
    <ChatContainer />
  </React.StrictMode>
);