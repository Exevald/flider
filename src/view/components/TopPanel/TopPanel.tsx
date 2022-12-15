import logoArea from "./LogoArea.svg"
import styles from "./TopPanel.module.css"
import WatchIcon from "../Button/ButtonIcons/WatchIcon.svg"
import SaveIcon from "../Button/ButtonIcons/SaveDropDownIcon.svg"

import TextArea from "../TextArea/TextArea";
import {Button} from "../Button/Button";
import {showDropDownById} from "../DropDown/DropDown";
import DropDown from "../DropDown/DropDown";

import {Editor} from "../../../core/types/types";
import {connect, ConnectedProps} from "react-redux";
import {AppDispatcher} from "../../../model/store";
import {setTitle} from "../../../model/actionCreators";
import {Link} from "react-router-dom";

import {useState} from "react";

const LogoArea = () => {
    return (
        <div>
            <Link to={"/"}>
                <img className={styles.logoArea}
                     src={logoArea}
                     alt={"Main Logo"}
                />
            </Link>
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
        changeTitle: (newTitle: string) => dispatcher(setTitle(newTitle)),
    }
}


const connector = connect(mapStateToProps, mapDispatchToProps)
type TopPanelProps = ConnectedProps<typeof connector>

const TopPanel = (props: TopPanelProps) => {
    const [rename, setRename] = useState(false);

    return (
        <div className={styles.topPanel}>
            <LogoArea/>
            <div className={styles.renameContainer}>
                {
                    rename ?
                        <TextArea
                            placeholder={"Название презентации"}
                            onKeyUp={(value: string) => {
                                if (value !== '') {
                                    props.changeTitle(value)
                                }
                                setRename(false)
                            }}
                        />
                        : <p className={styles.name}>{props.title}</p>
                }
            </div>
            <Button viewStyle={"open"} onClick={() => setRename(!rename)} text={"Переименовать"} iconStyle={"none"}/>
            <div className={styles.dropDownArea}>
                <Button viewStyle={"save"} onClick={
                    () => {
                        showDropDownById('saveActionDropDown')
                    }
                } text={"Сохранить"} iconStyle={"right"} iconSrc={SaveIcon}/>
                <DropDown id={'saveActionDropDown'} viewStyle={'saveAction'}></DropDown>
            </div>
            <Button viewStyle={"watch"} iconStyle={"left"} text={"Просмотр"} iconSrc={WatchIcon} onClick={() => {
            }}/>
        </div>
    )
}
export default connect(mapStateToProps, mapDispatchToProps)(TopPanel)