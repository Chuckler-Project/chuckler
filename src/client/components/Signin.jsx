import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import Axios from "axios";
import "../stylesheets/signup.css";
import userIcon from "../images/user.png";
import passwordIcon from "../images/password.png";
import logo from "../images/logo.png";
import { AuthContext } from "../context/AuthContext.jsx";

const Signin = ({ setIndex, closeModal }) => {
  const navigate = useNavigate();
  const [email,setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [currUser, setCurrUser] = useState({
    id: "",
    username: "",
  });
  const { user, setUser } = React.useContext(AuthContext); 
  const token = user.token;


  useEffect(() => {
    // console.log('user state', currUser);
    if (currUser.username != "") navigate("/main", { state: currUser });
  }, [currUser]);

  const signinAction = async () => {
    if (email.trim() === "" || password.trim() === "")
      alert("Please complete every field");

    try {
      const response = await Axios.post("api/user/login", {
        email,
        password,
      });
      console.log("response data: ", response.data);
      if (response.data === "incorrect password or username") {
        alert("Incorrect username or password");
        return;
      }
      location.assign("/main");
      setCurrUser({
        id: response.data.id,
        username: response.data.username,
      });// TODO: refactor to remove redundant user state
      setUser({
        id: response.data.id,
        username: response.data.username,
        token: response.data.token,
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="modalBackground">
      <div id="login-container" className="login-container">
        <div className="closeModal">
          <img
            src={logo}
            alt="chuckler"
            className="logo"
            style={{ width: "150px" }}
          />
          <button
            className="closeModal-btn"
            onClick={() => {
              setIndex(null);
              closeModal(false);
            }} 
          >
            {" "}
            X{" "}
          </button>
        </div>
        <div className="logo-title">
          <div className="title">Welcome Back</div>
        </div>

        <div className="inputs">
          <div className="input">
            <img src={userIcon} alt="" style={{ width: "30px" }} />
            <input
              type="text"
              placeholder="email"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
          </div>
          <div className="input">
            <img src={userIcon} alt="" style={{ width: "30px" }} />
            <input
              type="text"
              placeholder="username"
              onChange={(e) => {
                setUsername(e.target.value);
              }}
            />
          </div>
          <div className="input">
            <img
              src={passwordIcon}
              alt="password-icon"
              style={{ width: "30px" }}
            />
            <input
              type="password"
              placeholder="Password"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </div>
        </div>
        <div className="signup-btn">
          <button
            onClick={() => {
              signinAction();
            }}
          >
            Sign in
          </button>
        </div>
      </div>
    </div>
  );
};

export default Signin;
