import React from "react";
import { Routes, Route } from "react-router-dom";
import Main from "../pages/Main.jsx";
import LandingPage from "../pages/LandingPage.jsx";
import ChatContainer from "../components/chatComponents/ChatContainer.jsx";
import Chat from "../components/Chat.jsx";
import Axios from "axios";
import { useState, useEffect } from "react";
import { AuthContext } from "../context/AuthContext.jsx";

const Router = () => {
  const [userData, updUserData] = useState({});
  const { user } = React.useContext(AuthContext);
  const token = user.token;

  useEffect(() => {
    if (token) {
      Axios.get("/api/user/verify", { Authorization: `bearer${token}` }).then(
        (request) => {
          console.log("insede verify route", request.data);
          if (request.data != false) {
            Axios.post("/api/user/username", { id: request.data }).then(
              (requests) => {
                updUserData({ username: requests.data, id: request.data });
              }
            );
          }
        }
      );
    }
  }, []);
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      {userData && (
        <Route path="/main" element={<Main userData={userData} />} />
      )}
      {userData && (
        <Route path="/chat/*" element={<Chat userData={userData} />} />
      )}
    </Routes>
  );
};

export default Router;
