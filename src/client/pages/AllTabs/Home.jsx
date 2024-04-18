import React, { useState, useEffect } from 'react';
import '../../stylesheets/home.css';
import InputJoke from "../../components/InputJoke.jsx";
import MatchMessage from '../../components/MatchMessage.jsx';


export default function Home () {
    const [joke, setJoke] = useState('');
    const [userId, setUser] = useState(15);
    const [match, setMatch] = useState(false);

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

    useEffect(() => {
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
            setMatch(matchResponseMessage)
            console.log('match response', matchResponseMessage);
        } catch (err) { console.log('error checking for match', err) };
    }

    console.log('current state', joke.content, joke.creator_id, userId, match)
    
    return (
        <div>
            <div className='home'>
                <div id="jokes" >
                    <p className='joke'>{joke.content}</p>
                </div> 
                <div className="buttons">
                    <button className='dislike-btn' onClick={getJoke}></button>
                    <button className='like-btn' onClick={handleYesClick}></button>
                </div>
                <InputJoke userId={userId}/>
            </div>
            {match && <MatchMessage 
                match={match} 
                userId={userId} 
                jokeCreator={joke.creator_id}
                closeModal={setMatch}
                />}
        </div>
    ); 
}


