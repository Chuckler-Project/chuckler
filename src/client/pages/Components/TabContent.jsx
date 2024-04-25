import React from "react";
 
const TabContent = ({id, activeTab, children}) => {

  // children are the children components (Home, Matches, Profile)
  // will render the specific child for specific id
 return (
   activeTab === id ? <div className="TabContent">
     { children }
   </div>
   : null
 );
};
 
export default TabContent;