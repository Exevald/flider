import styles from "./DropDown.module.css"
import {COLOR_PICKER_COLORS} from "../../../core/functions/utility";
import {AppDispatcher} from "../../../model/store";
import {savePresentation} from "../../../model/actionCreators";
import {connect, ConnectedProps} from "react-redux";

interface DropDownCustomProps {
    id: string,
    viewStyle: 'createSlide' | 'undo' | 'redo' | 'selectArea' | 'selectArrow' | 'textArea' | 'imageSelector'
        | 'figure' | 'line' | 'palette' | 'saveAction',
}

// долгий ящик
function minimizeDropDown() {
    const root = document.getElementById('root');
    const saveAction = document.getElementById('saveActionDropDown');
    const colorPicker = document.getElementById('ColorPicker');
    const stocks = document.getElementById('Stocks');

    if (root !== null && saveAction !== null && colorPicker !== null && stocks !== null) {
        root.addEventListener('keydown', (e) => {
            if (e.code === 'Escape') {
                saveAction.classList.remove(styles.dropDownShow);
                colorPicker.classList.remove(styles.dropDownShow);
                stocks.classList.remove(styles.dropDownShow);
            }
        })
    }
}

type DropDownActionType = 'saveJSON' | 'savePDF'

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

const connector = connect(null, mapDispatchToProps);
type DropDownInitialProps = ConnectedProps<typeof connector>

type DropDownMergedProps = DropDownInitialProps & DropDownCustomProps

function showDropDownById(parent: HTMLElement, id: string): void {
    const dropDown = document.getElementById(id);
    if (dropDown !== null) {
        dropDown.classList.toggle(styles.dropDownShow);

        let parentTop = parent.offsetTop;
        let parentLeft = parent.offsetLeft;

        if (parentTop !== null && parentLeft !== null) {
            id === 'saveActionDropDown' ? parentTop += 40 : parentTop += 32;
            dropDown.style.top = parentTop + 'px';
            dropDown.style.left = parentLeft + 'px';
        }
        if (id === 'ImageSelector') {
            const stocks = document.getElementById('Stocks');
            if (stocks !== null) {
                stocks.classList.remove(styles.dropDownShow)
            }
        }
    }
}

const DropDown = ({id, viewStyle, action}: DropDownMergedProps) => {
    if (viewStyle !== null) {
        switch (viewStyle) {
            case "imageSelector":
                return (
                    <div id={id} className={`${styles.dropDown} ${styles.imageSelector}`}>
                        <div className={styles.dropDownContent}>
                            <p className={styles.dropDownContent__header}>Выберите вариант:</p>
                            <div className={styles.separator}></div>
                            <p onClick={() => {
                                //showDropDownById('Stocks')
                            }}>Выбрать из популярных фотостоков</p>
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
                                <input style={{display: "none"}} type={"file"} id="uploadImage" name="uploadImage"/>
                                <label htmlFor={"uploadImage"}><p>Выбрать с компьютера</p></label>
                            </form>

                        </div>
                    </div>
                )
            case "palette":
                let colorsList = [];
                for (let i = 0; i < COLOR_PICKER_COLORS.length; i++) {
                    colorsList.push(
                        <button
                            className={`${styles.paletteColor}`}
                            style={{backgroundColor: COLOR_PICKER_COLORS[i]}}
                            onClick={() => {

                            }}>
                        </button>
                    )
                }
                return (
                    <div id={id} className={`${styles.dropDown} ${styles.palette}`}>
                        <div className={styles.dropDownContent}>
                            <p className={styles.dropDownContent__header} style={{fontWeight: "normal"}}>Основные
                                цвета</p>
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

export default connect(null, mapDispatchToProps)(DropDown)
export {showDropDownById, minimizeDropDown}