import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Axios from 'axios';
import '../stylesheets/signup.css';
import userIcon from '../images/user.png';
import passwordIcon from '../images/password.png';
import logo from '../images/logo.png';


export default function Signin({closeModal}) {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [currUser, setCurrUser] = useState({
    id:'',
    username:''
  })



  const signinAction = () => {
    Axios.post('/api/user/login', {
      username: username,
      password: password,
    }).then((response) => {
      console.log('response from signin LINE 24', response.data);
      setCurrUser({
        id: response.data.id, 
        username: response.data.username
      })
    });

  };


  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/main", { state: currUser });
    console.log('current user ', currUser)
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
                </div>
                <div className="signup-btn">
                    <button onClick={signinAction}>
                      LOGIN
                        {/* <Link className="signup-btn" to={{pathname:'/main',  state:data}}>Login</Link> */}
                    </button>
                    <button onClick={handleClick}>TESTINg</button>
                </div>
            </div>
        </div>
    )
}