import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx';
import './stylesheets/styles.css';

const root = createRoot(document.getElementById('root'));

root.render(
  // <React.StrictMode> was causing useEffect to run twice. We should uncomment in the prod phase.
    <BrowserRouter> 
        <App/> 
    </BrowserRouter>
);