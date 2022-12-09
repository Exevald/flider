import styles from "./Toolbar.module.css"

import {ButtonIcon} from "../Button/Button";
import {AppDispatcher} from "../../../model/store";
import {createSlide, undo, redo} from "../../../model/actionCreators";
import {Editor} from "../../../core/types/types";
import {connect, ConnectedProps} from "react-redux";
import {showDropDownById} from "../DropDown/DropDown";
import DropDown from "../DropDown/DropDown";


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
            <ButtonIcon viewStyle={"createSlide"} onClick={() => props.createSlide()}/>
            <ButtonIcon viewStyle={"undo"} onClick={() => props.undo()}/>
            <ButtonIcon viewStyle={"redo"} onClick={() => props.redo()}/>
            <ButtonIcon viewStyle={"selectArea"} onClick={() => {}}/>
            <ButtonIcon viewStyle={"selectArrow"} onClick={() => {}}/>
            <ButtonIcon viewStyle={"textArea"} onClick={() => {}}/>
            <ButtonIcon viewStyle={"image"} onClick={() => {}}/>
            <ButtonIcon viewStyle={"figure"} onClick={() => {}}/>
            <ButtonIcon viewStyle={"line"} onClick={() => {}}/>
            <ButtonIcon viewStyle={"palette"} onClick={() => {showDropDownById('ColorPicker')}}/>
            <DropDown id={'ColorPicker'} viewStyle={'palette'}/>
        </div>
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(Toolbar)