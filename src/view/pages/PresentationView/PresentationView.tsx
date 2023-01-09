import styles from "./PresentationView.module.css"
import {Link} from "react-router-dom";
import {connect, ConnectedProps} from "react-redux";
import {EditorType} from "../../../core/types/types";
import {AppDispatcher} from "../../../model/store";
import {swipeSlideShowSlide, switchSlide} from "../../../model/actionCreators";
import {Button} from "../../components/Button/Button";
import {CANVAS_SETTINGS} from "../../../core/functions/utility";
import {useEffect} from "react";
import SlideItem from "../../components/SlideItem/SlideItem";
import Slide from "../../components/Slide/Slide";

function mapStateToProps(state: EditorType) {
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
        const body = document.querySelector('body');
        if (body !== null) {
            body.requestFullscreen().then();
            body.addEventListener('fullscreenchange', fullscreenHandler);
            body.addEventListener('keydown', keysHandler);
            body.addEventListener('click', clicksHandler);
            return () => {
                body.addEventListener('fullscreenchange', fullscreenHandler);
                body.removeEventListener('keydown', keysHandler);
                body.removeEventListener('click', clicksHandler);
            }
        }
    });
    const slidesIds = props.slides.map(slide => {
        return slide.id;
    });
    let slide =
        <div className={styles.svgArea}>
            <Slide slideItems=
                       {props.currentSlide.items.map((item) =>
                           <li key={item.id}
                               className={styles.slideElement}>
                               <SlideItem slideId={props.currentSlide.id} itemId={item.id} active={false}></SlideItem>
                           </li>
                       )}
                   background={props.currentSlide.bgColor}></Slide>
        </div>;
    function fullscreenHandler() {
        const linker = document.getElementById('goToEditButton');
        if (linker !== null && !document.fullscreenElement) {
            linker.click();
        }
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
    function clicksHandler() {
        if (props.slideShowCurrentSlideIndex < props.countOfSlides - 1) {
            props.swipeSlideShowSlide(props.slideShowCurrentSlideIndex, "right");
            props.switchSlide(slidesIds[props.slideShowCurrentSlideIndex + 1]);
        }
    }
    return (
        <div className={styles.blackout}>
            <div className={styles.svgArea}>
                {slide}
                <p className={styles.slideNumberText}>{props.slideShowCurrentSlideIndex + 1}</p>
                <Link to={"/presentation"}>
                    <Button viewStyle={"goToEditor"} id={"goToEditButton"} onClick={() => {
                    }} text={"Продолжить редактирование презентации"}/>
                </Link>
            </div>
        </div>
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(PresentationView)