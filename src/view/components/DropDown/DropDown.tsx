import styles from "./DropDown.module.css"

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