import React from "react";
import { Routes, Route } from "react-router-dom";
import TestComponent from "../components/test.jsx";
import Main from "../pages/Main.jsx";
import Jokes from "../components/Jokes.jsx";
import LandingPage from "../pages/LandingPage.jsx";



export default function Router () {
    return (
        <Routes>
            <Route path="/test"  element={<TestComponent/>}/> 
            <Route path="/main"  element={<Main/>}/> 
            <Route path="/main"  element={<Jokes/>}/> 
            <Route path="/"  element={<LandingPage/>}/> 

        </Routes>
    ); 
}


