import React from 'react';
import './App.css';

function UtilityRow() {
    return(
        <div className="utilities-row">
            <a href="">File</a>
            <a href="">ToDo</a>
            <a href="">Insert</a>
            <a href="">Utilities</a>
        </div>
    )
}

function Header() {
    return (
        <div className="Header">
            <UtilityRow />
        </div>
    )
}


function App() {
    return (
        <div className="App">
            <h1>
                Flider
            </h1>
            <div>
                {Header()}
            </div>
        </div>
    );
}

export default App;
