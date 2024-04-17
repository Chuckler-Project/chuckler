import React, { useState, useEffect } from "react";
import '../stylesheets/joke.css';
import laughingFace from '../images/laughing-face.png';


export default function Joke(props) {
 
    
    return (
        <div>
            {/* <img src={laughingFace} alt="laughing-face" style={{width:'80px'}} /> */}
            <p id='joke' >{props.joke}</p>
        </div>
    )
}