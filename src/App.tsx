import React from 'react';
import './App.css';

import TopPanel from "./view/TopPanel/TopPanel";
import {Toolbar} from "./view/Toolbar/Toolbar";
import {Sidebar} from "./view/Sidebar/Sidebar";

function App() {
    return (
        <div className="App">
            <TopPanel></TopPanel>
            <Toolbar></Toolbar>
            <Sidebar></Sidebar>
        </div>
    );
}

export default App;
