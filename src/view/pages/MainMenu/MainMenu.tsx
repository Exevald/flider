import styles from "./MainMenu.module.css"
import titleImage from "./Title.svg"
import logoImage from "./Logo.svg"
import {Button} from "../../components/Button/Button";

const MainMenu = () => {
    return (
        <div className={styles.menuContainer}>
            <div className={styles.titleWrapper}>
                <img src={titleImage} alt={"titleImage"}/>
            </div>
            <div className={styles.createPresentationButtonWrapper}>
                <Button viewStyle={"default"} onClick={() => {
                }} text={"Создать презентацию"}></Button>
            </div>
            <div className={styles.openPresentationButtonWrapper}>
                <Button viewStyle={"default"} onClick={() => {
                }} text={"Открыть презентацию"}></Button>
            </div>
            <div className={styles.logoImageWrapper}>
                <img src={logoImage} alt={"logoImage"}></img>
            </div>
        </div>
    )
}

export {MainMenu}