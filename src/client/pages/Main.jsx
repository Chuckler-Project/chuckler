import React, {useState} from "react";
import { useLocation, useNavigate } from 'react-router-dom'
import '../stylesheets/main.css';
import homeIcon from '../images/home.png';
import profileIcon from '../images/profileIcon.png';
import chatIcon from '../images/chatIcon.png';
import Tabs from "./Tabs.jsx";
import TabNavItem from "./Components/TabNavItem.jsx";
import Axios from 'axios';

    
export default function Main() {
    const [activeTab, setActiveTab] = useState("tab1");

    const location = useLocation();
    const data = location.state;

    let navigate = useNavigate();

    console.log(location, 'DATA MAIN LINE 16', data)

    const handleLogOut = async () => {
		Axios.get('/api/user/logout')
			.then((response) => {
				navigate('/');
			})
	};



   

    return (
        <div className='background'>
        <div id="main-container">
            <button onClick={handleLogOut}>LogOut</button>
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















