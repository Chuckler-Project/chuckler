import React, { useState } from "react";



export default function InputJoke() {
    const [joke, setJoke] = useState('')


    const handleInputChange = (e) => {
        const { value } = e.target;
        //should I attach the user name to the joke?
        setJoke(
           value
        )
    };
    async function submit() {
        //Make a post req to store the joke + user to the db
        console.log('Store the joke in db', joke)

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