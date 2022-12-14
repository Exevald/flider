import styles from "./MainMenu.module.css"
import titleImage from "./Title.svg"
import logoImage from "./Logo.svg"
import {Button} from "../../components/Button/Button";
import {createPresentation} from "../../../model/actionCreators";
import {connect} from "react-redux";
import {Editor} from "../../../core/types/types";
import {AppDispatcher, loadPresentation} from "../../../model/store";
import {ConnectedProps} from "react-redux/es/exports";

function mapStateToProps(state: Editor) {
    return {
        presentation: state.presentation
    }
}

function mapDispatchToProps(dispatcher: AppDispatcher) {
    return {
        createPresentation: dispatcher(createPresentation()),
        openPresentation: () => loadPresentation(),
    }
}

const connector = connect(mapStateToProps, mapDispatchToProps)
type MainMenuProps = ConnectedProps<typeof connector>

const MainMenu = (props: MainMenuProps) => {
    return (
        <div className={styles.menuContainer}>
            <div className={styles.titleWrapper}>
                <img src={titleImage} alt={"titleImage"}/>
            </div>
            <div className={styles.createPresentationButtonWrapper}>
                <Button viewStyle={"default"} onClick={() => props.createPresentation} text={"Создать презентацию"} to={"/presentation"}></Button>
            </div>
            <div className={styles.openPresentationButtonWrapper}>
                <Button viewStyle={"default"} onClick={() => props.openPresentation()} text={"Открыть презентацию"} to={"/presentation"}></Button>
            </div>
            <div className={styles.logoImageWrapper}>
                <img src={logoImage} alt={"logoImage"}></img>
            </div>
        </div>
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(MainMenu)