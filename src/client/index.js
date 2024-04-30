import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx';
import './stylesheets/styles.css';
import { AuthContextProvider } from './context/AuthContext.jsx';

const root = createRoot(document.getElementById('root'));

root.render(
  // <React.StrictMode> was causing useEffect to run twice. We should uncomment in the prod phase.
    <BrowserRouter> 
        <AuthContextProvider>
          <App/> 
        </AuthContextProvider>
    </BrowserRouter>
);