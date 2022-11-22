import logoArea from "./LogoArea.svg"
import styles from "./TopPanel.module.css"
import WatchIcon from "../Button/ButtonIcons/WatchIcon.svg"
import SaveIcon from "../Button/ButtonIcons/SaveDropDownIcon.svg"

import {TextArea} from "../TextArea/TextArea";
import {Button} from "../Button/Button";
import {Editor} from "../../core/types/types";
import {connect, ConnectedProps} from "react-redux";

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

function mapStateToProps(state: Editor) {
    return {
        title: state.presentation.title
    }
}

const connector = connect(mapStateToProps)
type TopPanelProps = ConnectedProps<typeof connector>

const TopPanel = (props: TopPanelProps) => {
    return (
        <div className={styles.topPanel}>
            <LogoArea/>
            <TextArea viewStyle={"presentationName"} placeholder={props.title}></TextArea>
            <Button viewStyle={"open"} onClick={() => {
            }} text={"Открыть"} iconStyle={"none"}></Button>
            <Button viewStyle={"save"} onClick={() => {
            }} text={"Сохранить"} iconStyle={"right"} iconSrc={SaveIcon}></Button>
            <Button viewStyle={"watch"} iconStyle={"left"} text={"Просмотр"} iconSrc={WatchIcon} onClick={() => {
            }}></Button>
        </div>
    )
}
export default connect(mapStateToProps)(TopPanel)