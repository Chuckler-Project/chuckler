import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Axios from 'axios';
import '../stylesheets/signup.css';
import userIcon from '../images/user.png';
import passwordIcon from '../images/password.png';
import logo from '../images/logo.png';


export default function Signin({closeModal}) {
  let navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [currUser, setCurrUser] = useState({
    id:'',
    username:''
  })


  const [loginStatus, setLoginStatus] = useState('');

  const signinAction = () => {
    if (username === '' || password === '') {
      setLoginStatus('Please complete every field');
      return;
  } else setLoginStatus('');

    Axios.post('/api/user/login', {
      username: username,
      password: password,
    })
      .then((response) => {
        console.log('response from signin LINE 24', response.data);
        setCurrUser({
          id: response.data.id, 
          username: response.data.username
        });
        return response;
      })
      // .then((response) => {
      //   console.log('currUser', currUser,'RESPONSEEEEE',  response.data);
      //   handleClick();
      // })
  

      
       
      
  }


  const handleClick = () => {
    navigate("/main", { state: currUser });
      console.log('CHECK FOR THIS current user ', currUser)
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
                    <button onClick={signinAction}> LOGIN
                        {/* <Link className="signup-btn" to='/main'>Login</Link> */}
                    </button>
                    <button onClick={handleClick}>TESTING</button>
                </div>
                <h1>{loginStatus}</h1>
            </div>
        </div>
    )
}