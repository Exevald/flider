import styles from "./DropDown.module.css"
import type * as CSS from 'csstype';

/*
*  Необходимо вынести стиль, чтобы реакт не изменил название стиля при компиляции,
*  чтобы не было коллизии стилей
* */

const SaveActionsDropDown = () => {
    return (
        <div id="dropDown" className={styles.dropDown}>
            <div className={styles.dropDownContent}>
                <a href={""}>Сохранить PDF</a>
                <div className={styles.separator}></div>
                <a href={""}>Сохранить JSON</a>
            </div>
        </div>
    )
}

export {SaveActionsDropDown}