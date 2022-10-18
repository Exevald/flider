import styles from "./Toolbar.module.css"

import AddIcon from "../Button/ButtonIcons/AddIcon.svg"

import {Button, ButtonIcon} from "../Button/Button";

const Toolbar = () => {
    return (
        <div className={styles.toolbar}>
            <Button viewStyle={"add"} iconStyle={"center"} iconSrc={AddIcon} onClick={() => {}}></Button>
        </div>
    )
}

export {Toolbar}