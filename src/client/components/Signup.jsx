import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Axios from 'axios';
import '../stylesheets/signup.css';
import userIcon from '../images/user.png';
import passwordIcon from '../images/password.png';
import jokeIcon from '../images/joke.png';
import logo from '../images/logo.png';

const Signup = ({ closeModal }) => {
  const navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [signUpStatus, setSignUpStatus] = useState('');
  const [joke, setJoke] = useState('');
  const [currUser, setCurrUser] = useState({
    id: '',
    username: '',
  });

  useEffect(() => {
    console.log('user state', currUser);
    if (currUser.username !== '') navigate('/main', { state: currUser });
  }, [currUser]);

  const signupAction = () => {
    if (username === '' || password === '' || joke === '') {
      setSignUpStatus('Please complete every field');
      return;
    } setSignUpStatus('');

    Axios.post('/api/user/signup', {
      username,
      password,
      joke,
    }).then((response) => {
      if (response.data === 'username exists') alert('Username already exists')
      else {
        console.log('RESPONSE SIGNUP', response);
        setCurrUser({
          id: response.data.id,
          username: response.data.username,
        });
    }
      // if (response.data === 'username exists') {
      //     setSignUpStatus('Username taken');
      //   } else {
      //     setSignUpStatus('');
      //     navigate('/main');
      //   }
    });
  };

  const handleClick = () => {
    navigate('/main', { state: currUser });
  };

  return (
    <div className="modalBackground">
      <div className="login-container">
        <div className="closeModal">
          <img src={logo} alt="chuckler" className="logo" style={{ width: '150px' }} />
          <button
            className="closeModal-btn"
            onClick={() => closeModal(false)}
          >
            {' '}
            X
          </button>
        </div>
        <div className="logo-title">
          <div className="title">Get Started</div>
        </div>

        <div className="inputs">
          <div className="input">
            <img src={userIcon} alt="" style={{ width: '30px' }} />
            <input
              type="text"
              placeholder="Name"
              onChange={(e) => {
                setUsername(e.target.value);
              }}
            />
          </div>
          <div className="input">
            <img src={passwordIcon} alt="password-icon" style={{ width: '30px' }} />
            <input
              type="password"
              placeholder="Password"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </div>
          <div className="input">
            <img src={jokeIcon} alt="joke-emoji" style={{ width: '30px' }} />
            <input
              type="text"
              placeholder="Please enter a joke"
              onChange={(e) => {
                setJoke(e.target.value);
              }}
            />
          </div>
        </div>
        <h1>{signUpStatus}</h1>
        <div className="signup-btn">
          <button onClick={signupAction}>
            {/* <div className="signup-btn" to='/main'>Sign Up</div> */}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Signup;
