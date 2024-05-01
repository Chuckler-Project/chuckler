import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "../stylesheets/landing.css";
import chuckler from "../images/chuckler-word.png";
import Signup from "../components/Signup.jsx";
import Signin from "../components/Signin.jsx";
import Axios from 'axios';
import { useEffect } from 'react';
import { AuthContext } from '../context/AuthContext.jsx';

export default function LandingPage() {
  const [openSignUp, setOpenSignUp] = useState(false);
  const [openSignIn, setOpenSignIn] = useState(false);
  const [activeIndex, setActiveIndex] = useState(null);
  const { user } = React.useContext(AuthContext);


  useEffect(() => {

    const token = user.token;
    if (token) {
      header = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      Axios.get('/api/user/verify', header).then((request) => {
        if (request.data) {
          location.assign('/main');
          return;
        }
      });
    }
  }, []);

  return (
    <div className='chuckler-container'>
      <div className='about'>
        <button
          id='login-btn'
          className='btn-login'
          onClick={() => {
            setActiveIndex(0);
            setOpenSignIn(true);
          }}
        >
          Login
        </button>
      </div>
      <div className='create'>
        <img src={chuckler} alt='logo' style={{ width: '500px' }} />
        <button
          id='signup-btn'
          className='btn-login'
          onClick={() => {
            setActiveIndex(1);
            setOpenSignUp(true);
          }}
        >
          Get Started
        </button>
        {openSignIn && <Signin setIndex={setActiveIndex} closeModal={setOpenSignIn} />}
        {activeIndex && openSignUp && <Signup setIndex={setActiveIndex} closeModal={setOpenSignUp} />}
      </div>
    </div>
  );
}
