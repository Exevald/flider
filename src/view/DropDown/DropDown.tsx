import styles from "./DropDown.module.css"

const SaveActionsDropDown = () => {
    return (
        <div className={styles.dropDown}>
            <div className={styles.dropDownContent}>
                <a>Сохранить PDF</a>
                <a>Сохранить JSON</a>
            </div>
        </div>
    )
}

export {SaveActionsDropDown}