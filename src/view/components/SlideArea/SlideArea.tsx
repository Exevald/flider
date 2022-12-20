import styles from "./SlideArea.module.css"
import {connect, ConnectedProps} from "react-redux";
import {Editor} from "../../../core/types/types";
import {AppDispatcher} from "../../../model/store";

const canvasSettings = {
    width: 1280,
    height: 720,
}

function mapStateToProps(state: Editor) {
    return {}
}

function mapDispatchToProps(dispatcher: AppDispatcher) {
    return {}
}

const connector = connect(mapStateToProps, mapDispatchToProps)
type SlideProps = ConnectedProps<typeof connector>

const Slide = (props: SlideProps) => {
    return (
        <div className={styles.slide}>
            <canvas id={"canvas"} width={canvasSettings.width} height={canvasSettings.height}></canvas>
        </div>
    )
}


const SlideArea = () => {
    return (
        <div className={styles.slideArea}>
            <Slide></Slide>
        </div>
    )
}

export {SlideArea};