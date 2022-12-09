import styles from "./DropDown.module.css"
import {COLOR_PICKER_COLORS} from "../../../core/functions/utility";

interface DropDownProps {
    id: string,
    viewStyle: 'createSlide' | 'undo' | 'redo' | 'selectArea' | 'selectArrow' | 'textArea' | 'imageSelector'
        | 'figure' | 'line' | 'palette' | 'saveAction' | 'stocks',
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
            case "stocks":
                return (
                    <div id={id} className={styles.dropDown} style={{position: "static"}}>
                        <div className={styles.dropDownContent} style={{border: "none"}}>
                            <div className={styles.separator}></div>
                            <ul className={styles.stocks}>
                                <li>Shutterstock</li>
                                <li>Getty Images</li>
                                <li>Adobe Stock</li>
                                <li>Dreamstime</li>
                                <li>Depositphotos</li>
                                <li>123RF</li>
                                <li>Фотодженика</li>
                            </ul>
                        </div>
                    </div>
                )
            case "imageSelector":
                return(
                    <div id={id} className={`${styles.dropDown} ${styles.imageSelector}`}>
                        <div className={styles.dropDownContent}>
                            <p>Выберите вариант:</p>
                            <div className={styles.separator}></div>
                            <a onClick={() => {showDropDownById('Stocks')}}>Выбрать из популярных фотостоков</a>
                            <DropDown id={'Stocks'} viewStyle={"stocks"}></DropDown>
                            <div className={styles.separator}></div>
                            <a href={""}>Загрузить с компьютера</a>
                        </div>
                    </div>
                )
            case "palette":
                let colorsList = [];
                for (let i = 0; i < COLOR_PICKER_COLORS.length; i++) {
                    colorsList.push(
                        <button className={styles.paletteColor} style={{backgroundColor: COLOR_PICKER_COLORS[i]}}
                                onClick={() => {
                        }}></button>
                    )
                }
                return (
                    <div id={id} className={`${styles.dropDown} ${styles.palette}`}>
                        <div className={styles.dropDownContent}>
                            <p>Основные цвета</p>
                            <div className={styles.separator}></div>
                            <div className={styles.paletteContent}>
                                {colorsList}
                            </div>
                        </div>
                    </div>
                )
            case "saveAction":
                return (
                    <div id={id} className={`${styles.dropDown} ${styles.saveAction}`}>
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