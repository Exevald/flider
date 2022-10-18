import logoArea from "./LogoArea.svg"
import styles from "./TopPanel.module.css"

import {TextArea, TopPanelTextArea} from "../TextArea/TextArea";
import {Button, TopPanelOpenButton, TopPanelSaveButton} from "../Button/Button";

const LogoArea = () => {
    return (
        <div>
            <img className={styles.logoArea}
                 src={logoArea}
                 alt={"Main Logo"}
            />
        </div>
    )
}

const TopPanel = ({}) => {
    return (
        <div className={styles.topPanel}>
            <LogoArea/>
            <TopPanelTextArea placeholder={"Имя презентации"}></TopPanelTextArea>
            <TopPanelOpenButton viewStyle={"default"} onClick={() => {}} text={"Открыть"}></TopPanelOpenButton>
            <TopPanelSaveButton viewStyle={"default"} onClick={() => {}} text={"Сохранить"}></TopPanelSaveButton>
        </div>
    )
}
export default TopPanel