import React from 'react';
import '../stylesheets/main.css';
import Jokes from '../components/Joke.jsx';
import InputJoke from "../components/InputJoke.jsx";


export default function Main () {

    
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


