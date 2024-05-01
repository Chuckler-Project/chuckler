/* eslint-disable react/jsx-one-expression-per-line */
import React from 'react';
import '../../stylesheets/profile.css';
import { useNavigate } from 'react-router-dom';
import userProfileIcon from '../../images/userProfile.png';

// eslint-disable-next-line react/function-component-definition
export default function Profile({ userData }) {
  const navigate = useNavigate();
  const goToBio = () => { return navigate('/bio/:userID'); };
  return (
    <div className="profile-container">
      <img src={userProfileIcon} alt="user-profile" style={{ width: '370px' }} />
      <div className="info">
        <p>Username: {userData.username} </p>
        <p>User ID: {userData.id}</p>
        <button onClick={goToBio}>Click here for more info!</button>
      </div>
      {/* <button onClick={() => navigate()}>Metrics</button> */}
    </div>
  );
}