import React, { useState, useEffect } from "react";
import laughingFace from '../images/laughing-face.png';


//Returns a joke from database
export default function Joke(props) {
    // const [joke, setJoke] = useState('');

    // // useEffect(() => {
    //     const getJoke = async () => {
    //         try {
    //             const joke = await fetch('/api/joke');
    //             const parsedJoke = await joke.json();
    //             console.log('joke here ->', parsedJoke);
    //             setJoke(parsedJoke);
    //         } catch (error) {console.log('Error trying to fetch joke', error)}
    //     };
    // //     getJoke();
    // // }, [])



    
    return (
        <div>
            <img src={laughingFace} alt="laughing-face" style={{width:'100px'}} />

            <h2>RANDOM JOKE HERE</h2>
            <p>{props.joke}</p>
        </div>
    )
}