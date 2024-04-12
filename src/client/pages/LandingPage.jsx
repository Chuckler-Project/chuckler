import React from "react";
import { Link } from 'react-router-dom'
import logo from '../images/chuckler.png';
import landing from '../images/3028327.jpg';

export default function LandingPage() {
    return (
       <div>
         <div className="landing-page">
            <img src={logo} alt="logo" style={{width:'200px'}} />
            <Link to='/'> Products </Link>
            <Link to='/'> Learn </Link>
            <Link to='/'> Download </Link>
            <Link to='/'> About </Link>
            <button className='btn-login'>Login</button>
        </div>
    
       </div>
    )

}