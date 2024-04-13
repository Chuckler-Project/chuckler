import React from "react";
import { Link } from 'react-router-dom';
import '../stylesheets/landing.css';
import chuckler from '../images/chuckler-word.png';
import Modal from "../components/Modal.jsx";


export default function LandingPage() {
    return (
        <div className="chuckler-container">
            <div className="about">
                <Link to='/about' className="link">About</Link>
                <button className='btn-login' >
                    <Link to='/login' className="link-login">Login</Link>
                   {/* Get Started */}
                </button>   
            </div>
            <div className="create">
                <img src={chuckler} alt="logo" style={{width:'500px'}} />
                <button className='btn-login' >
                    <Link to='/signup' className="link-login">Get Started</Link>
                   {/* Get Started */}
                </button>   
                {/* <Modal /> */}
            </div>   
        </div>
    )

}