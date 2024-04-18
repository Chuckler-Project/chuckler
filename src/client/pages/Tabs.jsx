import React, { useState } from "react";
// import '../stylesheets/mainPage.css';
import TabContent from "./Components/TabContent.jsx";
import Home from './AllTabs/Home.jsx'
import Matches from "./AllTabs/Matches.jsx";
import UserProfile from "./AllTabs/UserProfile.jsx";
 
const Tabs = ({userData, activeTab}) => {
 
  return (
    <div className="tabs">
      <div className="outlet">
        <TabContent id="tab1" activeTab={activeTab}>
          <Home userData={userData}/>
        </TabContent>
        <TabContent id="tab2" activeTab={activeTab}>
          <Matches userData={userData}/>
        </TabContent>
        <TabContent id="tab3" activeTab={activeTab}>
          <UserProfile userData={userData}/>
         
        </TabContent>
      </div>
    </div>
  );
};
 
export default Tabs;