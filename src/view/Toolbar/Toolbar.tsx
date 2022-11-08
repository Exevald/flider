import styles from "./Toolbar.module.css"

import {ButtonIcon} from "../Button/Button";
import {createSlide} from "../../core/functions/SlideFunctions";
import {Presentation} from "../../model/Types";
import {redo, undo} from "../../core/functions/PresentationFunctions";

interface ToolbarProps {
    pr: Presentation;
}

const Toolbar = (props: ToolbarProps) => {
    return (
        <div className={styles.toolbar}>
            <ButtonIcon viewStyle={"createSlide"} onClick={() => {props.pr = createSlide(props.pr)}}></ButtonIcon>
            <ButtonIcon viewStyle={"undo"} onClick={() => {undo(props.pr.actions.history)}}></ButtonIcon>
            <ButtonIcon viewStyle={"redo"} onClick={() => {redo(props.pr.actions.history)}}></ButtonIcon>
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