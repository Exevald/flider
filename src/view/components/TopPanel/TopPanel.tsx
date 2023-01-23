import logoArea from "./LogoArea.svg"
import styles from "./TopPanel.module.css"
import WatchIcon from "../Button/ButtonIcons/WatchIcon.svg"
import SaveIcon from "../Button/ButtonIcons/SaveDropDownIcon.svg"

import TextArea from "../TextArea/TextArea";
import {Button} from "../Button/Button";
import {showDropDownById} from "../DropDown/DropDown";
import DropDown from "../DropDown/DropDown";

import {EditorType} from "../../../core/types/types";
import {connect, ConnectedProps} from "react-redux";
import {AppDispatcher} from "../../../model/store";
import {setTitle} from "../../../model/actionCreators";
import {Link} from "react-router-dom";

import {useState} from "react";
import Popup from 'react-animated-popup'

const LogoArea = () => {
    return (
        <div>
            <Link to={"/"}>
                <img className={styles.logoArea}
                     src={logoArea}
                     alt={"Main Logo"}
                     loading={"lazy"}
                />
            </Link>
        </div>
    )
}

function mapStateToProps(state: EditorType) {
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
    const [visible, setVisible] = useState(false);

    return (
        <div className={styles.topPanel}>
            <LogoArea/>
            <div className={styles.renameContainer}>
                {
                    rename ?
                        <TextArea
                            placeholder={"Назавание презентации"}
                            type={'title'}
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
            <Button viewStyle={"rename"} onClick={() => setRename(!rename)} text={"Переименовать"} iconStyle={"none"}/>
            <Button viewStyle={"instruction"} onClick={() => setVisible(true)} text={"Инструкция"}
                    iconStyle={"none"}></Button>
            <Popup visible={visible} onClose={() => setVisible(false)} animationDuration={150}>
                <div className={styles.popup}>
                    <h1 className={styles.popupTitle}>Добро пожаловать во Flider!</h1>
                    <p className={styles.popupText}>Список горячих клавиш:</p>
                    <ol className={styles.popupList}>
                        <li>CTRL+C - Копировать</li>
                        <li>CTRL+V - Вставить</li>
                        <li>Delete - Удалить слайд</li>
                        <li>CTRL+Z - Undo</li>
                        <li>CTRL+Y - Redo</li>
                    </ol>
                    <p className={styles.popupEnd}>Приятного использования!</p>
                </div>
            </Popup>
            <div className={styles.dropDownArea}>
                <Button viewStyle={"save"} id={"SavePresentationButton"}
                        onClick={() => {
                            showDropDownById('SavePresentationButton', 'saveActionDropDown');
                        }}
                        text={"Сохранить"} iconStyle={"right"} iconSrc={SaveIcon}/>
                <DropDown id={'saveActionDropDown'} viewStyle={'saveAction'}/>
            </div>
            <Button viewStyle={"watch"} iconStyle={"left"} text={"Просмотр"} iconSrc={WatchIcon}
                    to={"/presentation/watch"}
                    onClick={() => {
                    }}
            />
        </div>
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(TopPanel)