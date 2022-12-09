import styles from "./Toolbar.module.css"

import {ButtonIcon} from "../Button/Button";
import {AppDispatcher} from "../../../model/store";
import {createSlide, undo, redo} from "../../../model/actionCreators";
import {Editor} from "../../../core/types/types";
import {connect, ConnectedProps} from "react-redux";


function mapDispatchToProps(dispatcher: AppDispatcher) {
    return {
        createSlide: () => dispatcher(createSlide()),
        undo: () => dispatcher(undo()),
        redo: () => dispatcher(redo()),
    }
}

function mapStateToProps(state: Editor) {
    return {
        slides: state.presentation.slides,
    }
}

const connector = connect(mapStateToProps, mapDispatchToProps)
type ToolbarProps = ConnectedProps<typeof connector>

const Toolbar = (props: ToolbarProps) => {
    return (
        <div className={styles.toolbar}>
            <ButtonIcon viewStyle={"createSlide"} onClick={() => props.createSlide()}></ButtonIcon>
            <ButtonIcon viewStyle={"undo"} onClick={() => props.undo()}></ButtonIcon>
            <ButtonIcon viewStyle={"redo"} onClick={() => props.redo()}></ButtonIcon>
            <ButtonIcon viewStyle={"selectArea"} onClick={() => {
            }}></ButtonIcon>
            <ButtonIcon viewStyle={"selectArrow"} onClick={() => {
            }}></ButtonIcon>
            <ButtonIcon viewStyle={"textArea"} onClick={() => {
            }}></ButtonIcon>
            <ButtonIcon viewStyle={"image"} onClick={() => {
            }}></ButtonIcon>
            <ButtonIcon viewStyle={"figure"} onClick={() => {
            }}></ButtonIcon>
            <ButtonIcon viewStyle={"line"} onClick={() => {
            }}></ButtonIcon>
            <ButtonIcon viewStyle={"palette"} onClick={() => {
            }}></ButtonIcon>
        </div>
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(Toolbar)