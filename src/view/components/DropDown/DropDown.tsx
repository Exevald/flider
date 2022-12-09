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
    if (viewStyle !==  null) {
        switch (viewStyle) {
            case "palette":
                return (
                    <div id={id} className={styles.dropDown + " " + styles.palette}>
                        <div className={styles.dropDownContent}>
                            <p>Основные цвета</p>
                            <div className={styles.separator}></div>
                            <div className={styles.paletteContent}>
                                <button className={styles.paletteColor} style={{backgroundColor: "white"}}
                                        onClick={() => {}}></button>
                                <button className={styles.paletteColor} style={{backgroundColor: "whitesmoke"}}
                                        onClick={() => {}}></button>
                                <button className={styles.paletteColor} style={{backgroundColor: "gray"}}
                                        onClick={() => {}}></button>
                                <button className={styles.paletteColor} style={{backgroundColor: "darkgray"}}
                                        onClick={() => {}}></button>
                                <button className={styles.paletteColor} style={{backgroundColor: "black"}}
                                        onClick={() => {}}></button>
                                <button className={styles.paletteColor} style={{backgroundColor: "yellow"}}
                                        onClick={() => {}}></button>
                                <button className={styles.paletteColor} style={{backgroundColor: "orange"}}
                                        onClick={() => {}}></button>
                                <button className={styles.paletteColor} style={{backgroundColor: "darkorange"}}
                                        onClick={() => {}}></button>
                                <button className={styles.paletteColor} style={{backgroundColor: "red"}}
                                        onClick={() => {}}></button>
                                <button className={styles.paletteColor} style={{backgroundColor: "darkred"}}
                                        onClick={() => {}}></button>
                            </div>
                        </div>
                    </div>
                )
            case "saveAction":
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
    }
    return (
        <div id={id} className={styles.dropDown}>
            <p>Введено название рендеринга, которого нет</p>
        </div>
    )
}

export {DropDown, showDropDownById}