import styles from "./PresentationView.module.css"
import React from "react";
import {Link} from "react-router-dom";
import {connect, ConnectedProps} from "react-redux";
import {Editor} from "../../../core/types/types";
import {AppDispatcher} from "../../../model/store";

function mapStateToProps(state: Editor) {
    return {
        slides: state.presentation.slides
    }
}

function mapDispatchToProps(dispatcher: AppDispatcher) {
    return {}
}

const connector = connect(mapStateToProps, mapDispatchToProps);
type PresentationViewProps = ConnectedProps<typeof connector>

const PresentationView = (props: PresentationViewProps) => {
    return (
        <div className={styles.blackout}>
            <Link to={"/presentation"}>
                <p>hi</p>
            </Link>
        </div>
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(PresentationView)