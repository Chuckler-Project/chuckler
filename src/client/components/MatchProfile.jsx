import React from "react";
import { Link } from 'react-router-dom';
import userProfile from '../images/userProfile.png';



export default function MatchProfile({ name, status, matchId, userId }) {


  return (
    <div className="user-profile" className={status === 'Offline' ? 'offline' : 'online'} >
      <img src={userProfile} alt="profile" style={{ width: '50px' }} />
      <div className="name-container">
        <Link to={`/chat/?user=${userId}&receiver=${matchId}`} className="profile-link" >
          <h3 className="name">{name}</h3>
          <p className="status">{status}</p>
        </Link>
      </div>
    </div>
  )
}