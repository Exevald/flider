import styles from "./Toolbar.module.css"

import {ButtonIcon} from "../Button/Button";
import {createSlide} from "../../core/functions/SlideFunctions";
import {Presentation} from "../../model/Types";

const Toolbar = () => {
    let pr: Presentation = {
        slides: [],
        title: '',
        selected: [],
        actions: {
            history: [],
        },
    };
    return (
        <div className={styles.toolbar}>
            <ButtonIcon viewStyle={"createSlide"} onClick={() => createSlide(pr)}></ButtonIcon>
            <ButtonIcon viewStyle={"undo"} onClick={() => {}}></ButtonIcon>
            <ButtonIcon viewStyle={"redo"} onClick={() => {}}></ButtonIcon>
            <ButtonIcon viewStyle={"selectArea"} onClick={() => {}}></ButtonIcon>
            <ButtonIcon viewStyle={"selectArrow"} onClick={() => {}}></ButtonIcon>
            <ButtonIcon viewStyle={"textArea"} onClick={() => {}}></ButtonIcon>
            <ButtonIcon viewStyle={"image"} onClick={() => {}}></ButtonIcon>
            <ButtonIcon viewStyle={"figure"} onClick={() => {}}></ButtonIcon>
            <ButtonIcon viewStyle={"line"} onClick={() => {}}></ButtonIcon>
            <ButtonIcon viewStyle={"palette"} onClick={() => {}}></ButtonIcon>
        </div>
    )
}

export {Toolbar}