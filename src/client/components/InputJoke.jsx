import React, { useState } from "react";



export default function InputJoke({userId}) {
    const [joke, setJoke] = useState('')

    const handleInputChange = (e) => {
        const { value } = e.target;
        setJoke(
           value
        )
    };

    async function submit() {
        console.log('Store the joke in db', joke)
        try {
            await fetch('/api/joke', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ userId: userId, content: joke })
            })
        } catch (err) { console.error('Error occured trying to post joke', err) };
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