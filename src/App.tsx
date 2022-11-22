import React from 'react';
import './App.css';

import TopPanel from "./view/TopPanel/TopPanel";
import Toolbar from "./view/Toolbar/Toolbar";
import WorkSpace from "./view/WorkSpace/WorkSpace";
import {Editor} from "./core/types/types";
import {connect} from "react-redux";

function App() {
    return (
        <div className="App">
            <TopPanel/>
            <Toolbar/>
            <WorkSpace/>
        </div>
    );
}

function mapStateToProps(state: Editor) {
    return {
        statePreview: state.statePreview,
        slides: state.presentation.slides,
        slideId: state.presentation.selectedSlidesIds[0],
        currentSlideIds: state.presentation.selectedSlidesIds,
    }
}

export default connect(mapStateToProps)(App);
