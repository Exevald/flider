import styles from "./Toolbar.module.css"
import iconsStyles from "./../Button/Button.module.css"

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
                const iconImage = document.getElementsByClassName(iconsStyles.buttonImage)[0] as HTMLElement;
                if (iconImage !== null) {
                    showDropDownById(iconImage, 'ImageSelector')
                }
            }}></ButtonIcon>
            <DropDown id={'ImageSelector'} viewStyle={'imageSelector'}></DropDown>
            <ButtonIcon viewStyle={"figure"} onClick={() => {
            }}></ButtonIcon>
            <ButtonIcon viewStyle={"line"} onClick={() => {
            }}></ButtonIcon>
            <ButtonIcon viewStyle={"palette"} onClick={() => {
                const palette = document.getElementsByClassName(iconsStyles.buttonPalette)[0] as HTMLElement;
                if (palette !== null) {
                    showDropDownById(palette, 'ColorPicker')
                }
            }}></ButtonIcon>
            <DropDown id={'ColorPicker'} viewStyle={'palette'}></DropDown>
            <ButtonIcon viewStyle={"filler"} onClick={() => {
            }}></ButtonIcon>
            <ButtonIcon viewStyle={"stroke"} onClick={() => {
            }}></ButtonIcon>
            <ButtonIcon viewStyle={"cursive"} onClick={() => {
            }}></ButtonIcon>
            <ButtonIcon viewStyle={"underline"} onClick={() => {
            }}></ButtonIcon>
        </div>
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(Toolbar)