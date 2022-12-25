import Sidebar from "../Sidebar/Sidebar";
import SlideArea from "../SlideArea/SlideArea";
import styles from "./WorkSpace.module.css";
import {Editor} from "../../../core/types/types";
import {connect, ConnectedProps} from "react-redux";

function mapStateToProps(state: Editor) {
    return {
        slides: state.presentation.slides,
        slidesCount: state.presentation.slides.length,
        currentSlideIds: state.presentation.selectedSlidesIds
    }
}

const connector = connect(mapStateToProps);
type WorkSpaceProps = ConnectedProps<typeof connector>

const WorkSpace = (props: WorkSpaceProps) => {
    return (
        <div className={styles.workspace}>
            <Sidebar></Sidebar>
            <SlideArea></SlideArea>
        </div>
    )
}

export default connect(mapStateToProps)(WorkSpace)