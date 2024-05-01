import React, { useEffect, useState } from "react";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import "../stylesheets/main.css";
import homeIcon from "../images/home.png";
import profileIcon from "../images/profileIcon.png";
import chatIcon from "../images/chatIcon.png";
import logout from "../images/logout1.png";
import Tabs from "./Tabs.jsx";
import TabNavItem from "./Components/TabNavItem.jsx";
import Axios from "axios";

export default function Main({ userData }) {
  const [file,setFile] = useState();
  const [caption, setCaption] = useState("");
  const submit = async event =>{
    event.preventDefault()

    const formData = new FormData();
    formData.append("image",file);
    formData.append("caption",caption)
    await Axios.post('/api/posts',formData,{headers:{"Content-Type":"multipart/form-data"}})
  }

  const fileSelected = e =>{
    const file = e.target.files[0]
    setFile(file);
  }
  const [activeTab, setActiveTab] = useState("tab1");
  // fetch('/api/user/verify').then(data=>data.text()).then(data=>{if(data==='false') location.assign('/')})
  const handleLogOut = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/user/logout", {
        method: "POST",
        credentials: "same-origin", // or include
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: userData.id }),
      });
      if (res.ok) {
        localStorage.clear();
        location.assign('/')
      }
    } catch (err) {
      console.error("Logout failed: ", err?.message);
    }
  };
  return (
    <div className="background">
      <div className="main-container">
        <div className="navigation">
          <a className="button" href="/" onClick={handleLogOut}>
            <img src={logout} style={{ width: "30px" }} />
            <div className="logout">LOGOUT</div>
          </a>
        </div>
        <Tabs userData={userData} activeTab={activeTab} />
        <ul className="nav">
          <TabNavItem
            title={homeIcon}
            id="tab1"
            activeTab={activeTab}
            setActiveTab={setActiveTab}
          />
          <TabNavItem
            title={chatIcon}
            id="tab2"
            activeTab={activeTab}
            setActiveTab={setActiveTab}
          />
          <TabNavItem
            title={profileIcon}
            id="tab3"
            activeTab={activeTab}
            setActiveTab={setActiveTab}
          />
        </ul>
      </div>
      <form onSubmit={submit}>
        <input onChange={fileSelected} type="file" accept="image/*"></input>
        <input value={caption} onChange={e=>setCaption(e.target.value)}type="text"></input>
        <button type='submit'>Submit</button>
      </form>
    </div>
  )
}
