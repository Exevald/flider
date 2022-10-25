import React from 'react';
import './App.css';

import TopPanel from "./view/TopPanel/TopPanel";
import {Toolbar} from "./view/Toolbar/Toolbar";
import {WorkSpace} from "./view/WorkSpace/WorkSpace";

function App() {
    return (
        <div className="App">
            <TopPanel></TopPanel>
            <Toolbar></Toolbar>
            <WorkSpace></WorkSpace>
        </div>
    );
}

export default App;
