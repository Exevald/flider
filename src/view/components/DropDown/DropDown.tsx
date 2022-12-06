import styles from "./DropDown.module.css"

interface DropDownProps {
    id: string,
    viewStyle: 'createSlide' | 'undo' | 'redo' | 'selectArea' | 'selectArrow' | 'textArea' | 'image'
        | 'figure' | 'line' | 'palette' | 'saveAction',
}


function showDropDownById(id: string): void {
    const dropDown = document.getElementById(id);
    if (dropDown !== null) {
        dropDown.classList.toggle(styles.dropDownShow)
    }
}

const DropDown = ({id, viewStyle}: DropDownProps) => {
    let dropDownStyle = 'createSlide';
    if (viewStyle !==  null) {
        dropDownStyle = viewStyle
    }
    return (
        <div id={id} className={styles.dropDown + " " + styles.saveAction}>
            <div className={styles.dropDownContent}>
                <a href={""}>Сохранить PDF</a>
                <div className={styles.separator}></div>
                <a href={""}>Сохранить JSON</a>
            </div>
        </div>
    )
}

export {DropDown, showDropDownById}