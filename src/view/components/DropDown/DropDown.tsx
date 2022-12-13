import styles from "./DropDown.module.css"
import {COLOR_PICKER_COLORS} from "../../../core/functions/utility";

interface DropDownProps {
    id: string,
    viewStyle: 'createSlide' | 'undo' | 'redo' | 'selectArea' | 'selectArrow' | 'textArea' | 'imageSelector'
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
            case "imageSelector":
                return(
                    <div id={id} className={`${styles.dropDown} ${styles.imageSelector}`}>
                        <div className={styles.dropDownContent}>
                            <p className={styles.dropDownContent__header}>Выберите вариант:</p>
                            <div className={styles.separator}></div>
                            <p onClick={() => {showDropDownById('Stocks')}}>Выбрать из популярных фотостоков</p>
                            <div id={"Stocks"} className={styles.dropDown} style={{position: "static"}}>
                                <div className={styles.dropDownContent} style={{border: "none"}}>
                                    <div className={styles.separator}></div>
                                    <ul className={styles.stocks}>
                                        <li><a href={"https://www.shutterstock.com"}>Shutterstock</a></li>
                                        <li><a href={"https://www.gettyimages.com"}>Getty Images</a></li>
                                        <li><a href={"https://stock.adobe.com/ru/"}>Adobe Stock</a></li>
                                        <li><a href={"https://www.dreamstime.com"}>Dreamstime</a></li>
                                        <li><a href={"https://ru.123rf.com"}>123RF</a></li>
                                        <li><a href={"https://photogenica.ru"}>Фотодженика</a></li>
                                    </ul>
                                </div>
                            </div>
                            <div className={styles.separator}></div>
                            <form method={"get"}>
                                <input style={{display: "none"}} type={"file"} id="uploadImage" name="uploadImage" />
                                <label htmlFor={"uploadImage"}><p>Выбрать с компьютера</p></label>
                            </form>

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