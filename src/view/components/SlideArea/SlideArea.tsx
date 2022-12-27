import styles from "./SlideArea.module.css"
import {connect, ConnectedProps} from "react-redux";
import {Editor, Item} from "../../../core/types/types";

const canvasSettings = {
    width: 1280,
    height: 720,
    down: false,
}

function initEventsListeners() {
    window.addEventListener("mousemove", () => {});
    window.addEventListener("mousedown", () => {});
    window.addEventListener("mouseup", () => {});
    window.addEventListener("keydown", () => console.log("down"));
}

function mapStateToProps(state: Editor) {
    const currentSlideIndex: number = state.presentation.slides.findIndex(slide => slide.id === state.presentation.selectedSlidesIds[0]);
    return {
        bgColor: state.presentation.slides[currentSlideIndex].bgColor,
        slideItems: state.presentation.slides[currentSlideIndex].items,
    }
}

const connector = connect(mapStateToProps, null)
type SlideAreaProps = ConnectedProps<typeof connector>


const SlideArea = (props: SlideAreaProps) => {
    let slideItems = props.slideItems;
    return (
        <div className={styles.slideArea}>
            <div className={styles.slide} style={{"background": props.bgColor}}>
                <canvas id={"canvas"} width={canvasSettings.width} height={canvasSettings.height}></canvas>
            </div>
        </div>
    )
}

initEventsListeners();

export default connect(mapStateToProps, null)(SlideArea)