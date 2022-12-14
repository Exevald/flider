import styles from "./DropDown.module.css"
import {COLOR_PICKER_COLORS} from "../../../core/functions/utility";
import {Editor} from "../../../core/types/types";
import {AppDispatcher} from "../../../model/store";
import {savePresentation} from "../../../model/actionCreators";
import {connect, ConnectedProps} from "react-redux";

interface DropDownCustomProps {
    id: string,
    viewStyle: 'createSlide' | 'undo' | 'redo' | 'selectArea' | 'selectArrow' | 'textArea' | 'imageSelector'
        | 'figure' | 'line' | 'palette' | 'saveAction' | 'stocks',
}

type DropDownActionType = 'saveJSON' | 'savePDF'

function mapStateToProps(state: Editor) {
    return {}
}

function mapDispatchToProps(dispatcher: AppDispatcher) {
    return {
        action: (actionType: DropDownActionType) => {
            switch (actionType) {
                case 'saveJSON':
                    dispatcher(savePresentation())
            }
        }
    }
}

const connector = connect(mapStateToProps, mapDispatchToProps);
type DropDownInitialProps = ConnectedProps<typeof connector>

type DropDownMergedProps = DropDownInitialProps & DropDownCustomProps

function showDropDownById(id: string): void {
    const dropDown = document.getElementById(id);
    if (dropDown !== null) {
        dropDown.classList.toggle(styles.dropDownShow)
    }
}

const DropDown = ({id, viewStyle, action}: DropDownMergedProps) => {
    if (viewStyle !== null) {
        switch (viewStyle) {
            case "stocks":
                return (
                    <div id={id} className={styles.dropDown} style={{position: "static"}}>
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
                )
            case "imageSelector":
                return (
                    <div id={id} className={`${styles.dropDown} ${styles.imageSelector}`}>
                        <div className={styles.dropDownContent}>
                            <p>Выберите вариант:</p>
                            <div className={styles.separator}></div>
                            <a onClick={() => {
                                showDropDownById('Stocks')
                            }}>Выбрать из популярных фотостоков</a>
                            {/*<DropDown id={'Stocks'} viewStyle={"stocks"}></DropDown>*/}
                            <div className={styles.separator}></div>
                            <input type={"file"}/>
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
                            <a onClick={() => action('saveJSON')}>Сохранить JSON</a>
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

export {showDropDownById}
export default connect(mapStateToProps, mapDispatchToProps)(DropDown)