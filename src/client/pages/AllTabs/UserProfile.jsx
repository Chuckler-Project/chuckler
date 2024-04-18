import React from "react";
import userProfileIcon from '../../images/userProfile.png'

export default function UserProfile({data}) {
    return (
        <div>
            <img src={userProfileIcon} alt="user-profile"  style={{width:'400px'}}/>
            <p>USERNAME: {data.username} </p>
            <p>USER ID: {data.id} </p>
        </div>
    )
}