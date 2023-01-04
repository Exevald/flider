import Sidebar from "../Sidebar/Sidebar";
import Slide from "../Slide/Slide";
import styles from "./WorkSpace.module.css";
import {EditorType} from "../../../core/types/types";
import {connect, ConnectedProps} from "react-redux";
import SlideItem from "../SlideItem/SlideItem";

function mapStateToProps(state: EditorType) {
    const currentSlideIndex: number = state.presentation.slides.findIndex(slide => slide.id === state.presentation.selectedSlidesIds[0]);
    return {
        slides: state.presentation.slides,
        slidesCount: state.presentation.slides.length,
        currentSlideIds: state.presentation.selectedSlidesIds,
        currentSlide: state.presentation.slides[currentSlideIndex],
        currentSlideBgColor: state.presentation.slides[currentSlideIndex].bgColor,
    }
}

const connector = connect(mapStateToProps);
type WorkSpaceProps = ConnectedProps<typeof connector>

const WorkSpace = (props: WorkSpaceProps) => {
    return (
        <div className={styles.workspace}>
            <Sidebar></Sidebar>
            <div className={styles.slideArea}>
                <Slide
                    slideItems=
                        {props.currentSlide.items.map((item) =>
                            <li key={item.id}
                                className={styles.slideElement}>
                                <SlideItem slideId={props.currentSlide.id} itemId={item.id} active={false}></SlideItem>
                            </li>
                        )}
                    background={props.currentSlideBgColor}></Slide>
            </div>
        </div>
    )
}

export default connect(mapStateToProps)(WorkSpace)