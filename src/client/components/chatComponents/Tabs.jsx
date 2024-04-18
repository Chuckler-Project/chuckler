
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Tab from "./Tab.jsx";
import Chat from "./Chat.jsx";
import Axios from 'axios';
// import "./App.css";

const Tabs = ({ tabs }) => {
	const [activeTab, setActiveTab] = useState(1);
	const [openChat, setOpenChat] = useState(false);

	let navigate = useNavigate();

	const handleTabClick = async (index, label) => {
		setActiveTab(index + 1);
		if (label === 'Log Out') handleLogOut();
	};

	const handleLogOut = async () => {
		Axios.get('/api/user/logout')
			.then((response) => {
				navigate('/');
			})
	};


	useEffect(() => {
		if(activeTab === 2) {
			setOpenChat(true)
		} else if (activeTab === 3) {
			setOpenChat(false)
		}
	})


	console.log('openChat', openChat, activeTab)


	return (
		<div className="tabs-container">
			<div className="tabs">
				{tabs.map((tab, index) => (
					<Tab
						key={index}
						label={tab.label}
						onClick={() =>
							handleTabClick(index, tab.label)
						}
						isActive={index === activeTab}
					/>
				))}
			</div>
			<div className="tab-content">
				Tab {activeTab} is Active
			</div>
			{openChat && <Chat />}

		</div>
	);
};

export default Tabs;
