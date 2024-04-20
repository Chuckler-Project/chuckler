import React from "react";
import ReactDom from 'react-dom'
import '../stylesheets/matchMessage.css';

export default function MatchMessage({ matches, userId, jokeCreator, closeModal }) {
    if (matches) return null;

    return ReactDom.createPortal (
        <>
            <div className="match-msg-container">
                <button onClick={() => closeModal(false)}>X</button>
                <h1>It's a match!!</h1>
                <p>{userId} and {jokeCreator}</p>
            </div>
        </>,
        document.getElementById('portal')
    )
}