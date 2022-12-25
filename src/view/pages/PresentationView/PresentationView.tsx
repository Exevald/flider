    import styles from "./PresentationView.module.css"
import React from "react";
import {Link} from "react-router-dom";


const PresentationView = () => {
    return (
        <div className={styles.blackout}>
            <Link to={"/presentation"}>
                <p>hi</p>
            </Link>
        </div>
    )
}

export {PresentationView}