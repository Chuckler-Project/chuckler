import React, { useNavigate } from "react";
import { Link } from 'react-router-dom';
import userProfile from '../images/userProfile.png';



export default function MatchProfile({name, status, userId, username}) {

    console.log('match profile USER', userId, username)
    const currUser = {id: userId, name: username}




    return (
        <div className="user-profile">
            <img src={userProfile} alt="profile" style={{width:'50px'}}/>
            <div className="name-container">
                <Link to= '/chat' className="profile-link">
                    <h3 className="name">{name}</h3>
                    <p className="status">{status}</p>
                </Link>
            </div>
        </div>
    )
}