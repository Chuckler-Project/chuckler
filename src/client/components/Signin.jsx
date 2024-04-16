import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Axios from 'axios';
import '../stylesheets/signup.css';
import user from '../images/user.png';
import password from '../images/password.png';
import logo from '../images/logo.png';


export default function Signin({closeModal}) {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const signinAction = () => {
    Axios.post('localhost:8080/login', {
      username: username,
      password: password,
    }).then((response) => {
      console.log(response);
    });
  };


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
                        <input type="text" placeholder="Name" 
                          onChange={(e) => {
                            setUsername(e.target.value);
                          }}
                        />
                    </div>
                    <div className="input">
                        <img src={password} alt="password-icon"  style={{width:'30px'}}/>
                        <input type="password" placeholder="Password"
                          onChange={(e) => {
                            setUsername(e.target.value);
                          }}
                        />
                    </div>
                </div>
                <div className="signup-btn">
                    <button onClick={signinAction}>
                        <Link className="signup-btn" to='/main'>Login</Link>
                    </button>
                </div>
            </div>
        </div>
    )
}