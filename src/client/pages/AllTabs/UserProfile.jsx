import React from "react";
import userProfileIcon from '../../images/userProfile.png'

export default function UserProfile({userData}) {
    return (
        <div>
            <img src={userProfileIcon} alt="user-profile"  style={{width:'400px'}}/>
            <p>USERNAME: {userData.username} </p>
            <p>USER ID: {userData.id} </p>
        </div>
    )
}