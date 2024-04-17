
import React, { useEffect, useState } from "react";
import Tab from "./Tab.jsx";
import Chat from "./Chat.jsx";
// import "./App.css";

const Tabs = ({ tabs }) => {
	const [activeTab, setActiveTab] = useState(1);
	const [openChat, setOpenChat] = useState(false);

	const handleTabClick = async (index) => {
		setActiveTab(index + 1);
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
							handleTabClick(index)
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
