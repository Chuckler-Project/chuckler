import React, { useEffect, useState } from "react";
import '../../stylesheets/matches.css';
import MatchProfile from "../../components/MatchProfile.jsx";


export default function Matches({userData}) {
    const [user, setUser] = useState(userData);
    const [matches, setMatches] = useState([]);
    useEffect(() => {
        setMatches([]);
        const getMatches = async () => {
            try {
                const response = await fetch(`/api/match/${user.id}`);
                const parsedResponse = await response.json();
                setMatches(parsedResponse)
            
            } catch (error) {console.log('Error trying to fetch matches', error)}
        };
        getMatches();
    }, [])

    console.log('USER MATCHES', user)

    let renderMatches = [];
    if (Array.isArray(matches)) {
        matches.forEach((match, i) => {        
            if (match.isOnline) {
                renderMatches.push(
                    <MatchProfile
                        key={i}
                        name={match.username}
                        matchId={match.id}
                        userId={user.id}
                        status='Online'
                    />
                )
            } else {
                renderMatches.push(
                    <MatchProfile
                        key={i}
                        name={match.username}
                        matchId={match.id}
                        userId={user.id}
                        status='Offline'
                    />
                )
            }
            
        })
    } else {
        renderMatches = matches;
    }
   
    return (
        <div id="matches">
            {renderMatches}
        </div> 
    )
}