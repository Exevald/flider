import styles from "./Toolbar.module.css"

import AddIcon from "../Button/ButtonIcons/AddIcon.svg"

import {Button, ButtonIcon} from "../Button/Button";

const Toolbar = () => {
    return (
        <div className={styles.toolbar}>
            <Button viewStyle={"add"} iconStyle={"center"} iconSrc={AddIcon} onClick={() => {}}></Button>
            <ButtonIcon viewStyle={"undo"} iconStyle={"center"} onClick={() => {}}></ButtonIcon>
            <ButtonIcon viewStyle={"redo"} iconStyle={"center"} onClick={() => {}}></ButtonIcon>
            <ButtonIcon viewStyle={"selectArea"} iconStyle={"center"} onClick={() => {}}></ButtonIcon>
            <ButtonIcon viewStyle={"selectArrow"} iconStyle={"center"} onClick={() => {}}></ButtonIcon>
            <ButtonIcon viewStyle={"textArea"} iconStyle={"center"} onClick={() => {}}></ButtonIcon>
            <ButtonIcon viewStyle={"image"} iconStyle={"center"} onClick={() => {}}></ButtonIcon>
            <ButtonIcon viewStyle={"figure"} iconStyle={"center"} onClick={() => {}}></ButtonIcon>
            <ButtonIcon viewStyle={"line"} iconStyle={"center"} onClick={() => {}}></ButtonIcon>
        </div>
    )
}

export {Toolbar}