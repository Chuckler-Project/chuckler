import React, { useState, useEffect } from 'react';
import {useLocation} from 'react-router-dom';
import '../../stylesheets/home.css';
import InputJoke from "../../components/InputJoke.jsx";
import MatchMessage from '../../components/MatchMessage.jsx';
import Axios from 'axios';
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext.jsx';

export default function Home () {
    const [joke, setJoke] = useState('');
    const [userId,setUser] = useState(15);
    const [match, setMatch] = useState(false);
    let currUserId;
    
    const { user } = useContext(AuthContext);
    const token = user.token;
    const header = { headers: { Authorization: `Bearer ${token}` } };

    // const getJoke = async () => {
    //     const noobRes = await fetch('/api/user/verify');

    //     await Axios.get('/api/user/verify', header).then(request=>currUserId = request.data)
    //     console.log('CURRENT USER ID', currUserId );
    //     try {
    //         if(currUserId){
    //             const joke = await fetch('/api/joke/retrieveJoke', {
    //                 method: 'POST',
    //                 headers: { 'Content-Type': 'application/json' },
    //                 body: JSON.stringify({ 'userId': currUserId }) 
    //             })
    //             const parsedJoke = await joke.json();
    //             console.log('joke here',parsedJoke);
    //             setJoke(parsedJoke);
    //     }
    //     } catch (error) {console.log('Error trying to fetch joke', error)}
    // };

    const likeAction = async () => {
        try {
            const likeResponse = await fetch(
                '/api/match/like',
                {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ likedUserId: match.id}),
                    Authorization : `Bearer ${token}`,
                }
            )
            console.log('likeResponse', likeResponse);
            getMatch();

        } catch (error) {console.log('Error trying to like user', error)}
    }
    
    const skipAction = async () => {
        try {
            const skipResponse = await fetch(
                '/api/match/skip',
                {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ userId: match.id}),
                    Authorization : `Bearer ${token}`,
                }
            )
            console.log('skipResponse', skipResponse);
            getMatch();
        } catch (error) {console.log('Error trying to skip user', error)}
    }

    const getMatch = async () => {
        try {
            const matchResponse = await fetch('/api/match/fetch', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json',
                'Authorization' : `Bearer ${token}`}
            });
            const parsedMatch = await matchResponse.json();
            console.log("parsedMatch", parsedMatch);
            parsedMatch.jokes_posted_id.forEach(id => {
                //todo: get the joke content from the id
            })
            setMatch(parsedMatch);
        } catch (error) {console.log('Error trying to fetch match', error)}
    }
    useEffect(() => {
        getMatch();
    }, [])
    const handleYesClick = async (e) => {
        e.preventDefault();
        try {
            const likeResponse = await fetch('/api/joke/like', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 
                Authorization : `Bearer ${token}`
            },
                body: JSON.stringify({ userId: currUserId, jokeId: joke.id }) 
            });

            const likeResponseMessage = await likeResponse.json();

            console.log('likeResponse',likeResponseMessage);
        } catch (err) { console.log('error liking joke', err) };

        try {
            const matchResponse = await fetch('/api/match', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json',
                    'Authorization' : `Bearer ${token}`
            },
                body: JSON.stringify({ userId: currUserId, creatorId: joke.creator_id }) 
            });
            if (!matchResponse.ok) {
                throw new Error('Failed to fetch match data');
            }
        
            const message = await matchResponse.json();
            console.log('Match message:', message);
            if (message !== 'No new matches') alert(message);
        } catch (err) { console.log('error checking for match', err) };
        getMatch();
    }
    
    return (
        <div>
            <div className='home'>
                <div id="jokes" >
                    <p className='joke'>{match.username} says {match.jokes_posted_id}</p>
                </div> 
                <div className="buttons">
                    <button className='dislike-btn' onClick={skipAction}></button>
                    <button className='like-btn' onClick={likeAction}></button>
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


