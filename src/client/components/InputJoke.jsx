import React, { useState } from "react";
import {useLocation} from 'react-router-dom';



export default function InputJoke({userId}) {
    const [joke, setJoke] = useState('')

    const location = useLocation();
    const userData = location.state;

    const handleInputChange = (e) => {
        const { value } = e.target;
        setJoke(
           value
        )
    };

    async function submit() {
        try {
            await fetch('/api/joke', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ userId: userData.id, content: joke })
            })
        } catch (err) { console.error('Error occured trying to post joke', err) };
        alert('joke submitted');
    }
    
    return (
        <div id="input-joke">
            <input 
                type="text"
                placeholder="Enter your joke!"
                onChange={handleInputChange}
            />
            <button id="submit" onClick={submit}>Submit</button>
        </div>
    )
}