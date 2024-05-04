import React from "react";



const TabNavItem = ({ id, title, activeTab, setActiveTab }) => {
 
    const handleClick = () => {
    setActiveTab(id);
    };


    
    return (
    <li onClick={handleClick} className={activeTab === id ? "active" : ""}>
        <img src={title} alt="tab-icon" style={{width:'50px'}}/>
    </li>
    );
};

export default TabNavItem;