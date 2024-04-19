import React from "react";
import '../../stylesheets/profile.css'
import userProfileIcon from '../../images/userProfile.png';
import {useNavigate} from 'react-router-dom';

export default function Profile({userData}) {
    return (
        <div className="profile-container">
            <img src={userProfileIcon} alt="user-profile"  style={{width:'370px'}}/>
            <div className="info">
                <p>Username: {userData.username} </p>
                <p>User ID: {userData.id}</p>
            </div>
            <button onClick={() => navigate}>Metrics</button>
        </div>
    )
}