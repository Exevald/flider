import styles from "./PresentationView.module.css"
import {Link} from "react-router-dom";
import {connect, ConnectedProps} from "react-redux";
import {Editor} from "../../../core/types/types";
import {AppDispatcher} from "../../../model/store";
import {swipeSlideShowSlide, switchSlide} from "../../../model/actionCreators";
import {Button} from "../../components/Button/Button";
import {CANVAS_SETTINGS} from "../../../core/functions/utility";
import {DrawSlideItems} from "../../components/SlideItem/SlidesItem";
import {useEffect} from "react";

function mapStateToProps(state: Editor) {
    const currentSlideIndex: number = state.presentation.slides.findIndex(slide => slide.id === state.presentation.selectedSlidesIds[0]);
    return {
        slides: state.presentation.slides,
        countOfSlides: state.presentation.slides.length,
        currentSlide: state.presentation.slides[currentSlideIndex],
        slideShowCurrentSlideIndex: state.slideShowCurrentSlideIndex,
        slideShowStatus: state.slideShowStatus,
        slideItems: state.presentation.slides[currentSlideIndex].items,
        currentSlideId: state.presentation.slides[currentSlideIndex].id,
        currentSlideIndex,
    }
}

function mapDispatchToProps(dispatcher: AppDispatcher) {
    return {
        swipeSlideShowSlide: (slideIndex: number, direction: string) => dispatcher(swipeSlideShowSlide(slideIndex, direction)),
        switchSlide: (slideId: string) => dispatcher(switchSlide(slideId)),
    }
}

const connector = connect(mapStateToProps, mapDispatchToProps);
type PresentationViewProps = ConnectedProps<typeof connector>

const PresentationView = (props: PresentationViewProps) => {
    useEffect(() => {
        DrawSlideItems(props.slideItems, "canvas");
        const body = document.querySelector('body');
        if (body !== null) {
            body.addEventListener("keydown", keysHandler);
            return () => body.removeEventListener("keydown", keysHandler);
        }
    });
    const slidesIds = props.slides.map(slide => {
        return slide.id;
    });
    let slides = [];
    for (let i = 0; i < props.slides.length; i++) {
        let slide = props.slides[i];
        slides.push(
            <div className={styles.canvas} style={{"backgroundColor": slide.bgColor}}>
                <canvas id={"canvas"} width={CANVAS_SETTINGS.width} height={CANVAS_SETTINGS.height}></canvas>
            </div>
        )
    }
    function keysHandler(e: KeyboardEvent) {
        if (e.code === 'ArrowLeft' && (props.slideShowCurrentSlideIndex > 0)) {
            props.swipeSlideShowSlide(props.slideShowCurrentSlideIndex, "left");
            props.switchSlide(slidesIds[props.slideShowCurrentSlideIndex - 1]);
        }
        if (e.code === 'ArrowRight' && (props.slideShowCurrentSlideIndex < props.countOfSlides - 1)) {
            props.swipeSlideShowSlide(props.slideShowCurrentSlideIndex, "right");
            props.switchSlide(slidesIds[props.slideShowCurrentSlideIndex + 1]);
        }
    }
    return (
        <div className={styles.blackout}>
            <div className={styles.canvasArea}>
                {slides[props.currentSlideIndex]}
                <p className={styles.slideNumberText}>{props.slideShowCurrentSlideIndex + 1}</p>
                <div className={styles.arrows}>
                    {
                        props.slideShowCurrentSlideIndex === 0 ?
                            <div className={`${styles.arrow} ${styles.arrowLeftDisabled}`}></div>
                            :
                            <div className={`${styles.arrow} ${styles.arrowLeft}`}
                                 onClick={() => {
                                     props.swipeSlideShowSlide(props.slideShowCurrentSlideIndex, "left");
                                     props.switchSlide(slidesIds[props.slideShowCurrentSlideIndex - 1]);
                                 }}>
                            </div>
                    }
                    {
                        props.slideShowCurrentSlideIndex === props.countOfSlides - 1 ?
                            <div className={`${styles.arrow} ${styles.arrowRightDisabled}`}></div>
                            :
                            <div className={`${styles.arrow} ${styles.arrowRight}`}
                                 onClick={() => {
                                     props.swipeSlideShowSlide(props.slideShowCurrentSlideIndex, "right");
                                     props.switchSlide(slidesIds[props.slideShowCurrentSlideIndex + 1]);
                                 }}>
                            </div>
                    }
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