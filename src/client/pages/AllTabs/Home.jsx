import React, { useState, useEffect } from 'react';
import {useLocation} from 'react-router-dom';
import '../../stylesheets/home.css';
import InputJoke from "../../components/InputJoke.jsx";
import MatchMessage from '../../components/MatchMessage.jsx';


export default function Home ({hasNewMatches, setHasNewMatches}) {
    const [joke, setJoke] = useState('');
    const [userId, setUser] = useState(15);
    const [match, setMatch] = useState(false);

    //CHECK IF WE NEED THIS 
    const location = useLocation();
    const userData = location.state;
console.log('HOME.JSX location.state;',location.state)
console.log('HOME.JSX location;',location)
    const getJoke = async () => {
        // console.log('CURRENT USER DATA', userData)

        // why a post request? need to investigate
        try {
            const joke = await fetch('/api/joke/retrieveJoke', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ userId: userData.id }) 
            });
            const parsedJoke = await joke.json();
            console.log('joke here ->', parsedJoke);
            setJoke(parsedJoke);
        } catch (error) {console.log('Error trying to fetch joke', error)}
    };

  

    useEffect(() => {
        getJoke();
    }, []);

    const handleYesClick = async (e) => {
        e.preventDefault();
        try {
            const likeResponse = await fetch('/api/joke/like', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ userId: userData.id, jokeId: joke.id }) 
            });

            const likeResponseMessage = await likeResponse.json();
            // console.log("has new match ???? => ", hasNewMatches);
            console.log('likeResponse',likeResponseMessage);
        } catch (err) { console.log('error liking joke', err) };

        try {
            const matchResponse = await fetch('/api/match', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ userId: userData.id, creatorId: joke.creator_id }) 
            });
            if (!matchResponse.ok) {
                throw new Error('Failed to fetch match data');
            }
        
            const message = await matchResponse.json();
            console.log('Match message:', message);
            if (message !== 'No new matches') {
                setMatch(true)
                setHasNewMatches(true);
            }
        } catch (err) { console.log('error checking for match', err) };
        getJoke();
    };


    
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

        </div>
    ); 
}


