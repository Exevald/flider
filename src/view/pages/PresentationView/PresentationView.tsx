import styles from "./PresentationView.module.css"
import {Link} from "react-router-dom";
import {connect, ConnectedProps} from "react-redux";
import {Editor} from "../../../core/types/types";
import {AppDispatcher} from "../../../model/store";
import {swipeSlideShowSlide} from "../../../model/actionCreators";

function mapStateToProps(state: Editor) {
    const currentSlideIndex: number = state.presentation.slides.findIndex(slide => slide.id === state.presentation.selectedSlidesIds[0]);
    return {
        slides: state.presentation.slides,
        countOfSlides: state.presentation.slides.length,
        currentSlide: state.presentation.slides[currentSlideIndex],
        slideShowCurrentSlideIndex: currentSlideIndex,
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
    return (
        <div className={styles.blackout}>
            <Link to={"/presentation"}>
                <p>Вернуться к изменению</p>
            </Link>
            <p style={{color: "white"}}>{}</p>
            <div className={styles.canvasArea}>

            </div>
        </div>
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(PresentationView)