import React from 'react';
import { Link } from 'react-router-dom';
import '../stylesheets/signup.css';
import user from '../images/user.png';
import password from '../images/password.png';
import logo from '../images/logo.png';


export default function Signin({closeModal}) {

    return (
        <div className="modalBackground">
            <div className="login-container">
                <div className="closeModal">
                    <img src={logo} alt="chuckler" className='logo' style={{width:'150px'}} />
                    <button 
                        className='closeModal-btn' 
                        onClick={() => closeModal(false)}> X </button>
                </div>
                <div className="logo-title">
                    <div className="title">Get Started</div>
                </div>
               
                <div className="inputs">
                    <div className="input">
                        <img src={user} alt="" style={{width:'30px'}}/>
                        <input type="text" placeholder="Name" />
                    </div>
                    <div className="input">
                        <img src={password} alt="password-icon"  style={{width:'30px'}}/>
                        <input type="password" placeholder="Password" />
                    </div>
                </div>
                <div className="signup-btn">
                    <button>
                        <Link className="signup-btn" to='/main'>Login</Link>
                    </button>
                </div>
            </div>
        </div>
    )
}