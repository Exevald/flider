import styles from "./PresentationView.module.css"
import React from "react";
import {Link} from "react-router-dom";
import {connect, ConnectedProps} from "react-redux";
import {Editor} from "../../../core/types/types";
import {AppDispatcher} from "../../../model/store";

function mapStateToProps(state: Editor) {
    const currentSlideIndex: number = state.presentation.slides.findIndex(slide => slide.id === state.presentation.selectedSlidesIds[0]);
    return {
        slides: state.presentation.slides,
        countOfSlides: state.presentation.slides.length,
        currentSlide: state.presentation.slides[currentSlideIndex],
    }
}

function mapDispatchToProps(dispatcher: AppDispatcher) {
    return {}
}

const connector = connect(mapStateToProps, mapDispatchToProps);
type PresentationViewProps = ConnectedProps<typeof connector>

function handleKeyPressed (e: React.KeyboardEvent<HTMLDivElement>): number {
    if (e.code === 'ArrowRight') {
        return 1;
    }
    if (e.code === 'ArrowLeft') {
        return -1;
    }
    return 0
}

const PresentationView = (props: PresentationViewProps) => {
    let currentSlide = 0;
    return (
        <div className={styles.blackout}
             onKeyDown={handleKeyPressed}>
            <Link to={"/presentation"}>
                <p>Вернуться к изменению</p>
            </Link>
            <p style={{color: "white"}}>{currentSlide}</p>
            <div className={styles.canvasArea}>

            </div>
        </div>
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(PresentationView)