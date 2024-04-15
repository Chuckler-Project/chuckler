import React, { useState } from "react";



export default function InputJoke() {
    const [joke, setJoke] = useState('')
    const [user, setUser] = useState('will');


    const handleInputChange = (e) => {
        const { value } = e.target;
        //should we attach the user name to the joke?
        setJoke(
           value
        )
    };
    async function submit() {
        //Make a post req to store the joke + user to the db
        console.log('Store the joke in db', joke)
        try {
            await fetch('/api/joke', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ user: user, content: joke })
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