import React, { useState, useEffect } from "react";
import TabContent from "./Components/TabContent.jsx";
import Home from './AllTabs/Home.jsx'
import Matches from "./AllTabs/Matches.jsx";
import Profile from "./AllTabs/Profile.jsx";
import {useLocation} from 'react-router-dom';
import MatchMessage from "../components/MatchMessage.jsx";

 
const Tabs = ({userData, activeTab}) => {

  const [hasNewMatches, setHasNewMatches] = useState(false);
  // const [newMessages, setNewMessages] = useState(false);

  // const location = useLocation();
  // const userData = location.state;

  const checkForNewMatches = async () => {
    try {
        const newMatchesResponse = await fetch('/api/match/checkForNewMatches', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ userId: userData.id })
        });
        if (!newMatchesResponse.ok) {
            throw new Error('Failed to fetch new matches');
        }
        const hasNewMatches = await newMatchesResponse.json();
        console.log("has new matches ? ===> ", hasNewMatches);
        setHasNewMatches(hasNewMatches);
        } catch (err) {
            console.log('Error checking for new matches: ', err);
        }
    
};

// const checkForNewMessages = async () => {
//   try {
//       const newMessagesResponse = await fetch('/api/messages/getNewMessagesStatus', {
//           method: 'POST',
//           headers: { 'Content-Type': 'application/json' },
//           body: JSON.stringify({ userId: userData.id })
//       });
//       if (!newMessagesResponse.ok) {
//           throw new Error('Failed to fetch new msg status');
//       };
//       const newMessageStatus = await newMessagesResponse.json();
//       console.log("has new messages ?? ==> ", newMessageStatus);
//       // console.log("new message from which ID ?? ==> ", newMessageId)
//       setNewMessages(newMessageStatus);

//   } catch (error) {
//       console.log('Error checking new msg status: ', error);
//   }
// }  

useEffect(() => {
  checkForNewMatches();
  // checkForNewMessages();
}, [])

  // children components are passed down
  // similarly to props
  // in TabContent -> {children}

 
  return (
    <div className="tabs">
      <div className="outlet">
        <TabContent id="tab1" activeTab={activeTab}>
          <Home
            userData={userData}
            hasNewMatches={hasNewMatches}
            setHasNewMatches={setHasNewMatches}
            // newMessages={newMessages}
            // setNewMessages={setNewMessages}
          />
        </TabContent>
        <TabContent id="tab2" activeTab={activeTab}>
          <Matches userData={userData}
          hasNewMatches={hasNewMatches}
          setHasNewMatches={setHasNewMatches}
          // newMessages={newMessages}
          // setNewMessages={setNewMessages}
          />
          </TabContent>
        <TabContent id="tab3" activeTab={activeTab}>
          <Profile userData={userData}/>
        </TabContent>
      </div>
      {hasNewMatches &&
      <MatchMessage
      hasNewMatches={hasNewMatches}
      // newMessages={newMessages}
      />}
    </div>
  );
};
 
export default Tabs;