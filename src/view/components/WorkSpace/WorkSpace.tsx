import Sidebar from "../Sidebar/Sidebar";
import SlideArea from "../SlideArea/SlideArea";
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
    }
}

const connector = connect(mapStateToProps);
type WorkSpaceProps = ConnectedProps<typeof connector>

const WorkSpace = (props: WorkSpaceProps) => {
    return (
        <div className={styles.workspace}>
            <Sidebar></Sidebar>
            <SlideArea
                slideItems=
                    {props.currentSlide.items.map((item) =>
                        <li key={item.id}>
                            <SlideItem slideId={props.currentSlide.id} itemId={item.id} active={true}></SlideItem>
                        </li>
                    )}
                background={"white"}></SlideArea>
        </div>
    )
}

export default connect(mapStateToProps)(WorkSpace)