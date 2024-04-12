import React, { useState } from "react";
import laughingFace from '../images/laughing-face.png';



export default function Jokes() {
    //TEST
    const [joke, setJoke] = useState('');
    const jokes = ['joke a', 'joke b', 'joke c', 'joke d', 'joke e'];

    const random = Math.floor(Math.random() * jokes.length);

    
    return (
        <div>
            <img src={laughingFace} alt="laughing-face" style={{width:'100px'}} />

            <h2>RANDOM JOKE HERE</h2>
            <p>{jokes[random]}</p>
        </div>
    )
}