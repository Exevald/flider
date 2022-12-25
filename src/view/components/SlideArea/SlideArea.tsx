import styles from "./SlideArea.module.css"
import {connect, ConnectedProps} from "react-redux";
import {Editor} from "../../../core/types/types";
import {useEffect, useRef} from "react";

const canvasSettings = {
    width: 1280,
    height: 720,
}

function mapStateToProps(state: Editor) {
    const currentSlideIndex: number = state.presentation.slides.findIndex(slide => slide.id === state.presentation.selectedSlidesIds[0]);
    return {
        bgColor: state.presentation.slides[currentSlideIndex].bgColor
    }
}

const connector = connect(mapStateToProps, null)
type SlideAreaProps = ConnectedProps<typeof connector>


const SlideArea = (props: SlideAreaProps) => {
    return (
        <div className={styles.slideArea}>
            <div className={styles.slide} style={{"background": props.bgColor}}>
                <canvas id={"canvas"} width={canvasSettings.width} height={canvasSettings.height}></canvas>
            </div>
        </div>
    )
}

export default connect(mapStateToProps, null)(SlideArea)