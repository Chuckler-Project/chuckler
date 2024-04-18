import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Axios from 'axios';
import '../stylesheets/signup.css';
import userIcon from '../images/user.png';
import passwordIcon from '../images/password.png';
import jokeIcon from '../images/joke.png';
import logo from '../images/logo.png';


export default function Signup({closeModal}) {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [joke, setJoke] = useState('');

    const signupAction = () => {
        Axios.post('/api/user/signup', {
          username: username,
          password: password,
          joke: joke,
        }).then((response) => {
          console.log(response);
        });
      };

    const navigate = useNavigate();
    const handleClick = () => {
    navigate("/main", { state: currUser });
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
                        <img src={userIcon} alt="" style={{width:'30px'}}/>
                        <input type="text" placeholder="Name" 
                           onChange={(e) => {
                            setUsername(e.target.value);
                          }}
                        />
                    </div>
                    <div className="input">
                        <img src={passwordIcon} alt="password-icon"  style={{width:'30px'}}/>
                        <input type="password" placeholder="Password"
                           onChange={(e) => {
                            setPassword(e.target.value);
                          }}
                        />
                    </div>
                    <div className="input">
                        <img src={jokeIcon} alt="joke-emoji" style={{width:'30px'}}/>
                        <input type="text" placeholder="Please enter a joke"
                           onChange={(e) => {
                            setJoke(e.target.value);
                          }}
                        />
                    </div>
                </div>
                <div className="signup-btn">
                    <button onClick={signupAction}>
                        <Link className="signup-btn" to='/main'>Sign Up</Link>
                    </button>
                </div>
               
            </div>
        </div>
    )
}