import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import supabase from "../../config/supabaseClient.js";
import Jokes from '../components/Jokes.jsx'
import InputJoke from "../components/InputJoke.jsx";


export default function Main () {
    const [jokes, setJokes] = useState('');

    // const fetchJokes = async () => {
    //     const { data } = await supabase
    //         .from('jokes') //name of the table
    //         .select() //get all records

            
    //         if (data) {
    //             setJokes(data) //response
    //         }
    // }
    
    async function fetchJokes() {
        try {
            const data = await supabase
                // .from('jokes')
                // .select('*')
            console.log('data', data)
        } catch {
            console.log('you got an error')
        }
    }
    fetchJokes();
    console.log('jokes', jokes)

    
    return (
        <div id="main-container">
            <div id="jokes">
                {/* <Jokes /> */}
                <p>hi</p>
                {jokes && (
                    <div>
                        {jokes.map(joke => {
                            <p>{joke.title}</p>
                        })}
                    </div>
                )}
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


