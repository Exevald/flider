import logoArea from "./LogoArea.svg"
import styles from "./TopPanel.module.css"
import WatchIcon from "../Button/ButtonIcons/WatchIcon.svg"
import SaveIcon from "../Button/ButtonIcons/SaveDropDownIcon.svg"

import {TextArea} from "../TextArea/TextArea";
import {Button} from "../Button/Button";

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
            <TextArea viewStyle={"presentationName"} placeholder={"Имя презентации"}></TextArea>
            <Button viewStyle={"open"} onClick={() => {}} text={"Открыть"} iconStyle={"none"}></Button>
            <Button viewStyle={"save"} onClick={() => {}} text={"Сохранить"} iconStyle={"right"} iconSrc={SaveIcon}></Button>
            <Button viewStyle={"watch"} iconStyle={"left"} text={"Просмотр"} iconSrc={WatchIcon} onClick={() => {}}></Button>
        </div>
    )
}
export default TopPanel