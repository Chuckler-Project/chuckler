import React, { useState, useEffect } from "react";
import ReactDom from 'react-dom'
import '../stylesheets/matchMessage.css';

export default function MatchMessage({ hasNewMatches, setHasNewMatches, newMessages }) {

    console.log("in MatchMessages, new match ? ===> ", hasNewMatches)


    // if (!hasNewMatches && !newMessages) return null;
    if (!hasNewMatches) return null;


    return (
        <>
            <div className="match-msg-container">
            <div className="bubble"></div>
            </div>
        </>
    )
}