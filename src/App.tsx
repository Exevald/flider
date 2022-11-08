import React from 'react';
import './App.css';


import TopPanel from "./view/TopPanel/TopPanel";
import {Toolbar} from "./view/Toolbar/Toolbar";
import {WorkSpace} from "./view/WorkSpace/WorkSpace";
import {createPresentation} from "./core/functions/PresentationFunctions";

function App() {
    let pres = createPresentation()
    return (
        <div className="App">
            <TopPanel></TopPanel>
            <Toolbar pr={pres}></Toolbar>
            <WorkSpace></WorkSpace>
        </div>
    );
}

export default App;
