import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Axios from 'axios';
import '../stylesheets/signup.css';
import user from '../images/user.png';
import password from '../images/password.png';
import logo from '../images/logo.png';
import joke from '../images/joke.png';


export default function Signup({closeModal}) {
    let navigate = useNavigate();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [signUpStatus, setSignUpStatus] = useState('');
    const [joke, setJoke] = useState('');

    const signupAction = () => {
        if (username === '' || password === '' || joke === '') {
            setSignUpStatus('Please complete every field');
            return;
        } else setSignUpStatus('');

        Axios.post('/api/user/signup', {
          username: username,
          password: password,
          joke: joke,
        }).then((response) => {
          if (response.data === 'username exists') {
            setSignUpStatus('Username taken');
          } else {
            setSignUpStatus('');
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
                            setPassword(e.target.value);
                          }}
                        />
                    </div>
                    <div className="input">
                        <img src={joke} alt="joke-emoji" style={{width:'30px'}}/>
                        <input type="text" placeholder="Please enter a joke"
                           onChange={(e) => {
                            setJoke(e.target.value);
                          }}
                        />
                    </div>
                </div>
                <h1>{signUpStatus}</h1>
                <div className="signup-btn">
                    <button onClick={signupAction}>
                        <div className="signup-btn" to='/main'>Sign Up</div>
                    </button>
                </div>
            </div>
        </div>
    )
}