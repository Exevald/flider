import styles from "./PresentationView.module.css"
import {Link} from "react-router-dom";
import {connect, ConnectedProps} from "react-redux";
import {Editor} from "../../../core/types/types";
import {AppDispatcher} from "../../../model/store";
import {swipeSlideShowSlide} from "../../../model/actionCreators";
import {Button} from "../../components/Button/Button";
import {useState} from "react";

function mapStateToProps(state: Editor) {
    const currentSlideIndex: number = state.presentation.slides.findIndex(slide => slide.id === state.presentation.selectedSlidesIds[0]);
    return {
        slides: state.presentation.slides,
        countOfSlides: state.presentation.slides.length,
        currentSlide: state.presentation.slides[currentSlideIndex],
        slideShowCurrentSlideIndex: state.slideShowCurrentSlideIndex,
        slideShowStatus: state.slideShowStatus,
    }
}

function mapDispatchToProps(dispatcher: AppDispatcher) {
    return {
        swipeSlideShowSlide: (slideIndex: number, direction: string) => dispatcher(swipeSlideShowSlide(slideIndex, direction)),
    }
}

const connector = connect(mapStateToProps, mapDispatchToProps);
type PresentationViewProps = ConnectedProps<typeof connector>

const PresentationView = (props: PresentationViewProps) => {
    let slides = [];
    for (let i = 0; i < props.slides.length; i++) {
        let slide = props.slides[i];
        slides.push(
            <div className={styles.canvas} style={{"backgroundColor": slide.bgColor}}>
            </div>
        )
    }
    return (
        <div className={styles.blackout}>
            <div className={styles.canvasArea}>
                {slides[props.slideShowCurrentSlideIndex]}
                <p className={styles.slideNumberText}>{props.slideShowCurrentSlideIndex + 1}</p>
                <div className={styles.arrows}>
                    <div
                        className={`${styles.arrow} ${styles.arrowLeft}`}
                        onClick={() => {
                            props.swipeSlideShowSlide(props.slideShowCurrentSlideIndex, "left")
                        }}>
                    </div>
                    <div
                        className={`${styles.arrow} ${styles.arrowRight}`}
                        onClick={() => {
                            props.swipeSlideShowSlide(props.slideShowCurrentSlideIndex, "right")
                        }}>
                    </div>
                </div>
                <Link to={"/presentation"}>
                    <Button viewStyle={"goToEditor"} onClick={() => {
                    }} text={"Продолжить редактирование презентации"}/>
                </Link>
            </div>
        </div>
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(PresentationView)