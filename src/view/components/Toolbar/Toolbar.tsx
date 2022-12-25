import styles from "./Toolbar.module.css"
import iconsStyles from "./../Button/Button.module.css"

import {ButtonIcon} from "../Button/Button";
import {AppDispatcher} from "../../../model/store";
import {createSlide, undo, redo, setBackgroundColor} from "../../../model/actionCreators";
import {Editor, Item, ItemType} from "../../../core/types/types";
import {connect, ConnectedProps} from "react-redux";
import {showDropDownById} from "../DropDown/DropDown";
import DropDown from "../DropDown/DropDown";
import {useState} from "react";

function mapDispatchToProps(dispatcher: AppDispatcher) {
    return {
        createSlide: () => dispatcher(createSlide()),
        undo: () => dispatcher(undo()),
        redo: () => dispatcher(redo()),
        setBgColor: (color: string) => dispatcher(setBackgroundColor(color))
    }
}

function mapStateToProps(state: Editor) {
    const currentSlideIndex: number = state.presentation.slides.findIndex(slide => slide.id === state.presentation.selectedSlidesIds[0]);
    return {
        currentSlide: state.presentation.slides[currentSlideIndex],
        slides: state.presentation.slides,
        currentColor: state.presentation.currentColor,
    }
}

const connector = connect(mapStateToProps, mapDispatchToProps)
type ToolbarProps = ConnectedProps<typeof connector>

const Toolbar = (props: ToolbarProps) => {
    let textSelected = false;
    let figureSelected = false;
    const [drawBlock, setDrawBlock] = useState('absent');
    props.currentSlide.selectedItemsIds.forEach(id => {
            if (props.currentSlide.items.find(item => item.id === id)?.element === ItemType.Figure) {
                textSelected = false;
            } else if (props.currentSlide.items.find(item => item.id === id)?.element === ItemType.TextArea) {
                figureSelected = false;
            }
        }
    )
    const firstSelectedItem: Item | undefined = props.currentSlide.items.find(item => item.id === props.currentSlide.selectedItemsIds[0]);
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
                if (!textSelected && !figureSelected) {
                    props.setBgColor(props.currentColor)
                }
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