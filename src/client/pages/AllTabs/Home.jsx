import React, { useState, useEffect } from 'react';
import {useLocation} from 'react-router-dom';
import '../../stylesheets/home.css';
import InputJoke from "../../components/InputJoke.jsx";
import MatchMessage from '../../components/MatchMessage.jsx';
import Axios from 'axios';

export default function Home () {
    const [joke, setJoke] = useState('');
    const [userId,setUser] = useState(15);
    const [match, setMatch] = useState(false);
    let currUserId;
    const getJoke = async () => {
        const noobRes = await fetch('/api/user/verify');

        await Axios.get('/api/user/verify').then(request=>currUserId = request.data)
        console.log('CURRENT USER ID', currUserId );
        try {
            if(currUserId){
                const joke = await fetch('/api/joke/retrieveJoke', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ 'userId': currUserId }) 
                })
                const parsedJoke = await joke.json();
                console.log('joke here',parsedJoke);
                setJoke(parsedJoke);
        }
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
                body: JSON.stringify({ userId: currUserId, jokeId: joke.id }) 
            });

            const likeResponseMessage = await likeResponse.json();

            console.log('likeResponse',likeResponseMessage);
        } catch (err) { console.log('error liking joke', err) };

        try {
            const matchResponse = await fetch('/api/match', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ userId: currUserId, creatorId: joke.creator_id }) 
            });
            if (!matchResponse.ok) {
                throw new Error('Failed to fetch match data');
            }
        
            const message = await matchResponse.json();
            console.log('Match message:', message);
            if (message !== 'No new matches') alert(message);
        } catch (err) { console.log('error checking for match', err) };
        getJoke();
    }
    
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
                userId={currUserId} 
                jokeCreator={joke.creator_id}
                closeModal={setMatch}
                />}
        </div>
    ); 
}


