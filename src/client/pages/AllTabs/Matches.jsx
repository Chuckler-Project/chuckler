import React, { useEffect, useState } from "react";
import '../../stylesheets/matches.css';
import MatchProfile from "../../components/MatchProfile.jsx";


export default function Matches() {
    const [users, setUsers] = useState([]);
    const [currUser, setCurrUser] = useState('');
   
    // useEffect(() => {
    //     const getMatches = async () => {
    //         try {
    //             const dataMatches = await fetch('/api/match/matches');
    //             const matches = await dataMatches.json();
    //             console.log('MATCHEEEEES', matches)
               
    //         } catch (error) {console.log('Error trying to fetch matches', error)}
    //     };
    //     getMatches();
    // }, [])

//testing
    const getMatches = async () => {
        console.log('hellooooo')
        try {
            const data = await fetch('/api/match/matches');
        //     const matches = await dataMatches.json();
        //     console.log('MATCHEEEEES', matches)
            
        } catch (error) {console.log('Error trying to fetch matches', error)}
    };

    const users1 = [
        {
        name: 'Paloma', 
        status: 'Online'
        }, 
        {
        name: 'Will', 
        status: 'Online'
        }, 
        {
        name: 'Paloma', 
        status: 'Offline'
        }
]
    const matches = [];

    users1.forEach((user, i) => {
        matches.push(
            <MatchProfile
                key={i}
                name={user.name}
                status={user.status}
            />
        )
    })
  
    return (
        <div id="matches">
            {matches}
            <button onClick={getMatches}>TEST</button>
        </div> 
    )
}