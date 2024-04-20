import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import '../stylesheets/landing.css';
import chuckler from '../images/chuckler-word.png';
import Signup from '../components/Signup.jsx';
import Signin from "../components/Signin.jsx";



export default function LandingPage() {
    const [openSignUp, setOpenSignUp] = useState(false);
    const [openSignIn, setOpenSignIn] = useState(false);

   

    return (
        <div className="chuckler-container">
            <div className="about">
                <button 
                    id='login-btn'
                    className='btn-login'  
                    onClick={() => {
                        setOpenSignIn(true)
                        }
                    } >
                    Login
                </button>   
            </div>
            <div className="create">
                <img src={chuckler} alt="logo" style={{width:'500px'}} />
              <button 
                    className='btn-login' 
                    onClick={() => {
                        setOpenSignUp(true)
                        }
                    } >
                   Get Started
                </button>   
                {openSignUp && <Signup closeModal={setOpenSignUp}/>}
              {openSignIn && <Signin closeModal={setOpenSignIn}/>}
            </div>   
        </div>
    )

}