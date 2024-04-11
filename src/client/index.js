console.log("Hello World!");
import React from 'react';
import { createRoot } from 'react-dom/client';
import TestComponent from './components/test.jsx';

const domNode = document.getElementById('root');
const root = createRoot(domNode);

root.render(
  <React.StrictMode>
    <TestComponent />
  </React.StrictMode>
);