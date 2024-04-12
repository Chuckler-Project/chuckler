import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import Jokes from '../components/Joke.jsx'
import InputJoke from "../components/InputJoke.jsx";


export default function Main () {
    const [jokes, setJokes] = useState('');

    
    return (
        <div id="main-container">
            <div id="jokes">
                <Jokes />
            </div> 
            <div className="buttons">
                <button>
                    NO
                </button>
                <button>
                    YES
                </button>
            </div>
            <InputJoke />
        </div>
    ); 
}


