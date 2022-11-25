import logoArea from "./LogoArea.svg"
import styles from "./TopPanel.module.css"
import WatchIcon from "../Button/ButtonIcons/WatchIcon.svg"
import SaveIcon from "../Button/ButtonIcons/SaveDropDownIcon.svg"

import {TextArea} from "../TextArea/TextArea";
import {Button} from "../Button/Button";
import {SaveActionsDropDown} from "../DropDown/DropDown";

import {Editor} from "../../core/types/types";
import {connect, ConnectedProps} from "react-redux";
import {AppDispatcher} from "../../model/store";
import {setTitle} from "../../model/actionCreators";


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

function mapDispatchToProps(dispatcher: AppDispatcher) {
    return {
        changeTitle: (title: string) => dispatcher(setTitle(title))
    }
}

function showDropDown() {
    const dropDown = document.getElementById('dropDown');
    if (dropDown !== null) {
        if (dropDown.style.display === 'block')
            dropDown.style.display = 'none';
        else dropDown.style.display = 'block';
    }
}

const connector = connect(mapStateToProps, mapDispatchToProps)
type TopPanelProps = ConnectedProps<typeof connector>

const TopPanel = (props: TopPanelProps) => {
    return (
        <div className={styles.topPanel}>
            <LogoArea/>
            <TextArea
                viewStyle={"presentationName"}
                placeholder={props.title}
            />
            <Button viewStyle={"open"} onClick={() => {
            }} text={"Открыть"} iconStyle={"none"}/>
            <div className={styles.dropDownArea}>
                <Button viewStyle={"save"} onClick={
                    () => {showDropDown()}
                } text={"Сохранить"} iconStyle={"right"} iconSrc={SaveIcon}/>
                <SaveActionsDropDown></SaveActionsDropDown>
            </div>
            <Button viewStyle={"watch"} iconStyle={"left"} text={"Просмотр"} iconSrc={WatchIcon} onClick={() => {
            }}/>
        </div>
    )
}
export default connect(mapStateToProps, mapDispatchToProps)(TopPanel)