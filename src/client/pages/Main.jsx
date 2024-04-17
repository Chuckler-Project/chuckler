import React, { useState, useEffect } from 'react';
import '../stylesheets/main.css';
import Joke from '../components/Joke.jsx';
import InputJoke from "../components/InputJoke.jsx";
import ChatBox from '../components/chatComponents/Tabs.jsx';
import Tabs from '../components/chatComponents/Tabs.jsx';


export default function Main () {
    const [joke, setJoke] = useState('');
    const [userId, setUser] = useState(15);

    const tabData = [
        { label: "Home" },
        { label: "Chat" },
        { label: "Profile" },
    ];


    useEffect(() => {
        const getJoke = async () => {
            try {
                const joke = await fetch('/api/joke/retrieveJoke', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ userId: userId }) 
                });
                const parsedJoke = await joke.json();
                console.log('joke here ->', parsedJoke);
                setJoke(parsedJoke);
            } catch (error) {console.log('Error trying to fetch joke', error)}
        };
        getJoke();
    }, [])

    const handleYesClick = async (e) => {
        e.preventDefault();
        try {
            const likeResponse = await fetch('/api/joke/like', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ userId: userId, jokeId: joke.id }) 
            });

            const likeResponseMessage = await likeResponse.json();

            console.log('likeResponse',likeResponseMessage);
        } catch (err) { console.log('error liking joke', err) };

        try {
            const matchResponse = await fetch('/api/match', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ userId: userId, creatorId: joke.creator_id }) 
            });

            const matchResponseMessage = await matchResponse.json();
            
            console.log('match response', matchResponseMessage);
        } catch (err) { console.log('error checking for match', err) };
    }
    


    
    return (
        <div className='background'>
            <div id="main-container">
                <div id="jokes">
                    <Joke joke={joke.content}/>
                </div> 
                <div className="buttons">
                    <button className='dislike-btn'></button>
                    <button className='like-btn' onClick={handleYesClick}></button>
                </div>
                <InputJoke userId={userId}/>
                <Tabs 
                    tabs={tabData} 
                />
            </div>


        </div>
    ); 
}


