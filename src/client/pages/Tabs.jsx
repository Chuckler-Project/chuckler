import React, { useState } from "react";
// import '../stylesheets/mainPage.css';
import TabContent from "./Components/TabContent.jsx";
import Home from './AllTabs/Home.jsx'
import Matches from "./AllTabs/Matches.jsx";
import UserProfile from "./AllTabs/UserProfile.jsx";
 
const Tabs = ({data, activeTab}) => {
 
  return (
    <div className="tabs">
      <div className="outlet">
        <TabContent id="tab1" activeTab={activeTab}>
          <Home data={data}/>
        </TabContent>
        <TabContent id="tab2" activeTab={activeTab}>
          <Matches data={data}/>
        </TabContent>
        <TabContent id="tab3" activeTab={activeTab}>
          <UserProfile data={data}/>
         
        </TabContent>
      </div>
    </div>
  );
};
 
export default Tabs;