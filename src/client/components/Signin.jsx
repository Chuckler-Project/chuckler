import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Axios from 'axios';
import '../stylesheets/signup.css';
import user from '../images/user.png';
import password from '../images/password.png';
import logo from '../images/logo.png';


export default function Signin({closeModal}) {
  let navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginStatus, setLoginStatus] = useState('');

  const signinAction = () => {
    if (username === '' || password === '') {
      setLoginStatus('Please complete every field');
      return;
  } else setLoginStatus('');


    Axios.post('/api/user/login', {
      username: username,
      password: password,
    }).then((response) => {
      if (response.data === 'incorrect password') {
        setLoginStatus('Incorrect username password combination');
      } else {
        setLoginStatus('');
        navigate('/main');
      }
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
                    <div className="title">Welcome Back</div>
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
                            setPassword(e.target.value);
                          }}
                        />
                    </div>
                </div>
                <div className="signup-btn">
                    <button onClick={signinAction}>
                        <div className="signup-btn" to='/main'>Login</div>
                    </button>
                </div>
                <h1>{loginStatus}</h1>
            </div>
        </div>
    )
}