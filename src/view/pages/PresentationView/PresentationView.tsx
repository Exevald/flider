import styles from "./PresentationView.module.css"
import {Link} from "react-router-dom";
import {connect, ConnectedProps} from "react-redux";
import {Editor} from "../../../core/types/types";
import {AppDispatcher} from "../../../model/store";
import {selectManySlides, swipeSlideShowSlide} from "../../../model/actionCreators";
import {Button} from "../../components/Button/Button";
import {CANVAS_SETTINGS} from "../../../core/functions/utility";
import {DrawItems} from "../../components/SlideItem/SlidesItem";
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
    useEffect(() => DrawItems(props.slideItems))
    let slides = [];
    for (let i = 0; i < props.slides.length; i++) {
        let slide = props.slides[i];
        slides.push(
            <div className={styles.canvas} style={{"backgroundColor": slide.bgColor}}>
                <canvas id={"canvas"} width={CANVAS_SETTINGS.width} height={CANVAS_SETTINGS.height}></canvas>
            </div>
        )
    }
    return (
        <div className={styles.blackout}>
            <div className={styles.canvasArea}>
                {slides[props.slideShowCurrentSlideIndex]}
                <p className={styles.slideNumberText}>{props.slideShowCurrentSlideIndex + 1}</p>
                <div className={styles.arrows}>

                    {
                        props.slideShowCurrentSlideIndex === 0 ?
                            // если первый
                            <div id={'ArrowLeft'}
                                className={`${styles.arrow} ${styles.arrowLeftDisabled}`}>
                            </div>
                            :
                            <div id={'ArrowLeft'}
                                className={`${styles.arrow} ${styles.arrowLeft}`}
                                onClick={() => {
                                    props.swipeSlideShowSlide(props.slideShowCurrentSlideIndex, "left")
                                }}>
                            </div>
                    }
                    {
                        props.slideShowCurrentSlideIndex === props.countOfSlides - 1 ?
                            // если последний
                            <div id={'ArrowRight'}
                                className={`${styles.arrow} ${styles.arrowRightDisabled}`}>
                            </div>
                            :
                            <div id={'ArrowRight'}
                                className={`${styles.arrow} ${styles.arrowRight}`}
                                onClick={() => {
                                    props.swipeSlideShowSlide(props.slideShowCurrentSlideIndex, "right")
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