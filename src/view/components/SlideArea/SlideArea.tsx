import styles from "./SlideArea.module.css"
import {connect, ConnectedProps} from "react-redux";
import {Editor} from "../../../core/types/types";
import {AppDispatcher} from "../../../model/store";

function mapStateToProps(state: Editor) {
    const currentSlideIndex: number = state.presentation.slides.findIndex(slide => slide.id === state.presentation.selectedSlidesIds[0]);
    return {
        bgColor: state.presentation.slides[currentSlideIndex].bgColor
    }
}

function mapDispatchToProps(dispatcher: AppDispatcher) {
    return {}
}

const connector = connect(mapStateToProps, mapDispatchToProps)
type SlideAreaProps = ConnectedProps<typeof connector>


const SlideArea = (props: SlideAreaProps) => {
    return (
        <div className={styles.slideArea}>
            <div className={styles.slide} style={{"background": props.bgColor}}>
            </div>
        </div>
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(SlideArea)