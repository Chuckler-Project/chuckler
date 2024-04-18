import React, {useState} from "react";
import { useLocation } from 'react-router-dom'
import '../stylesheets/main.css';
import homeIcon from '../images/home.png';
import profileIcon from '../images/profileIcon.png';
import chatIcon from '../images/chatIcon.png';
import Tabs from "./Tabs.jsx";
import TabNavItem from "./Components/TabNavItem.jsx";

export default function Main() {
    const [activeTab, setActiveTab] = useState("tab1");

    const location = useLocation();
    const data = location.state;

    console.log(location, 'DATA MAIN LINE 16', data)



   

    return (
        <div className='background'>
        <div id="main-container">
                <Tabs data={data} activeTab={activeTab}/>
            <ul className="nav">
                <TabNavItem title={homeIcon} id="tab1" activeTab={activeTab} setActiveTab={setActiveTab}/>
                <TabNavItem title={chatIcon} id="tab2" activeTab={activeTab} setActiveTab={setActiveTab}/>
                <TabNavItem title={profileIcon} id="tab3" activeTab={activeTab} setActiveTab={setActiveTab}/>
            </ul>
        </div>
    </div>
       
    )
}


















// import React, { useState, useEffect } from 'react';
// import '../stylesheets/main.css';
// import Joke from '../components/Joke.jsx';
// import InputJoke from "../components/InputJoke.jsx";


// export default function Main () {
//     const [joke, setJoke] = useState('');
//     const [userId, setUser] = useState(15);



//     useEffect(() => {
//         const getJoke = async () => {
//             try {
//                 const joke = await fetch('/api/joke/retrieveJoke', {
//                     method: 'POST',
//                     headers: { 'Content-Type': 'application/json' },
//                     body: JSON.stringify({ userId: userId }) 
//                 });
//                 const parsedJoke = await joke.json();
//                 console.log('joke here ->', parsedJoke);
//                 setJoke(parsedJoke);
//             } catch (error) {console.log('Error trying to fetch joke', error)}
//         };
//         getJoke();
//     }, [])

//     const handleYesClick = async (e) => {
//         e.preventDefault();
//         try {
//             const likeResponse = await fetch('/api/joke/like', {
//                 method: 'POST',
//                 headers: { 'Content-Type': 'application/json' },
//                 body: JSON.stringify({ userId: userId, jokeId: joke.id }) 
//             });

//             const likeResponseMessage = await likeResponse.json();

//             console.log('likeResponse',likeResponseMessage);
//         } catch (err) { console.log('error liking joke', err) };

//         try {
//             const matchResponse = await fetch('/api/match', {
//                 method: 'POST',
//                 headers: { 'Content-Type': 'application/json' },
//                 body: JSON.stringify({ userId: userId, creatorId: joke.creator_id }) 
//             });

//             const matchResponseMessage = await matchResponse.json();
            
//             console.log('match response', matchResponseMessage);
//         } catch (err) { console.log('error checking for match', err) };
//     }
    
    
//     return (
//         <div className='background'>
//             <div id="main-container">
//                 <div id="jokes">
//                     <Joke joke={joke.content}/>
//                 </div> 
//                 <div className="buttons">
//                     <button className='dislike-btn'></button>
//                     <button className='like-btn' onClick={handleYesClick}></button>
//                 </div>
//                 <InputJoke userId={userId}/>
//             </div>
//         </div>
//     ); 
// }


