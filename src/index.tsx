import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import {store} from "./model/store";
import {Provider} from "react-redux";
import {addHotKeys} from "./model/store";
import {BrowserRouter, Route, Routes} from "react-router-dom";

import {PresentationPage} from "./view/pages/PresentationPage/PresentationPage";
import MainMenu from "./view/pages/MainMenu/MainMenu";
import PresentationView from "./view/pages/PresentationView/PresentationView";

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);

addHotKeys();

root.render(
    <React.StrictMode>
        <Provider store={store}>
            <BrowserRouter>
                <Routes>
                    <Route path={"/"} element={<MainMenu/>}></Route>
                    <Route path={"/presentation"} element={<PresentationPage/>}></Route>
                    <Route path={"/presentation/watch"} element={<PresentationView/>}></Route>
                </Routes>
            </BrowserRouter>
        </Provider>
    </React.StrictMode>
);
