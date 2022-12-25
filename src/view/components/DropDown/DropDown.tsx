import styles from "./DropDown.module.css"
import buttonStyles from "../Button/Button.module.css"
import {COLOR_PICKER_COLORS} from "../../../core/functions/utility";
import {AppDispatcher} from "../../../model/store";
import {changeCurrentColor, savePresentation} from "../../../model/actionCreators";
import {connect, ConnectedProps} from "react-redux";
import React from "react";

interface DropDownCustomProps {
    id: string;
    viewStyle: 'createSlide' | 'undo' | 'redo' | 'selectArea' | 'selectArrow' | 'textArea' | 'imageSelector'
        | 'figure' | 'line' | 'palette' | 'saveAction';
}


function hideDropDownKeyboardPressed(e: React.KeyboardEvent<HTMLDivElement>) {
    const saveAction = document.getElementById('saveActionDropDown');
    const colorPicker = document.getElementById('ColorPicker');
    const stocks = document.getElementById('Stocks');
    const imageSelector = document.getElementById('ImageSelector');

    if (saveAction !== null && colorPicker !== null && stocks !== null && imageSelector !== null) {

        if (e.code === 'Escape') {
            if (stocks.classList.contains(styles.dropDownShow)) {
                stocks.classList.remove(styles.dropDownShow)
            } else {
                saveAction.classList.remove(styles.dropDownShow);
                colorPicker.classList.remove(styles.dropDownShow);
                imageSelector.classList.remove(styles.dropDownShow);
            }
        }

    }
}


function handleClicks(e: MouseEvent) {
    // взял в проверку ещё и кнопки списков,
    // чтобы при обработке они не переключались два раза (закрылись и снова открылись)
    const path = e.composedPath();
    const saveAction = document.getElementById('saveActionDropDown');
    const saveButton = document.getElementsByClassName(buttonStyles.buttonSave)[0];
    const colorPicker = document.getElementById('ColorPicker');
    const pickerButton = document.getElementsByClassName(buttonStyles.buttonPalette)[0];
    const imageSelector = document.getElementById('ImageSelector');
    const selectorButton = document.getElementsByClassName(buttonStyles.buttonImage)[0];

    if (path !== null && saveAction !== null && colorPicker !== null && imageSelector !== null
        && saveButton !== null && selectorButton !== null && pickerButton !== null) {

        if (saveAction.classList.contains(styles.dropDownShow) && !path.includes(saveAction)
            && !path.includes(saveButton)) {
            saveAction.classList.remove(styles.dropDownShow)
        }
        if (colorPicker.classList.contains(styles.dropDownShow) && !path.includes(colorPicker)
            && !path.includes(pickerButton)) {
            colorPicker.classList.remove(styles.dropDownShow)
        }
        if (imageSelector.classList.contains(styles.dropDownShow) && !path.includes(imageSelector)
            && !path.includes(selectorButton)) {
            imageSelector.classList.remove(styles.dropDownShow)
        }

    }

}


type DropDownActionType = 'saveJSON' | 'savePDF' | 'changeCurrentColor'

function mapDispatchToProps(dispatcher: AppDispatcher) {
    return {
        action: (actionType: DropDownActionType, color?: string) => {
            switch (actionType) {
                case 'saveJSON': {
                    dispatcher(savePresentation());
                    break;
                }
                case "changeCurrentColor": {
                    if (color !== undefined) {
                        dispatcher(changeCurrentColor(color))
                    }
                }
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

function showChildrenDropDownById(id: string): void {
    let childDropDown = document.getElementById(id);
    if (childDropDown !== null) {
        childDropDown.classList.toggle(styles.dropDownShow);
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
                                showChildrenDropDownById('Stocks')
                            }}>Выбрать из популярных фотостоков</p>
                            <div id={"Stocks"} className={styles.dropDown} style={{position: "static"}}>
                                <div className={styles.dropDownContent} style={{border: "none"}}>
                                    <div className={styles.separator}></div>
                                    <ul className={styles.stocks}>
                                        <a href={"https://www.shutterstock.com"} target={"_blank"}>
                                            <li>
                                                Shutterstock
                                            </li>
                                        </a>
                                        <a href={"https://www.gettyimages.com"} target={"_blank"}>
                                            <li>
                                                Getty Images
                                            </li>
                                        </a>
                                        <a href={"https://stock.adobe.com/ru/"} target={"_blank"}>
                                            <li>
                                                Adobe Stock
                                            </li>
                                        </a>
                                        <a href={"https://www.dreamstime.com"} target={"_blank"}>
                                            <li>
                                                Dreamstime
                                            </li>
                                        </a>
                                        <a href={"https://ru.123rf.com"} target={"_blank"}>
                                            <li>
                                                123RF
                                            </li>
                                        </a>
                                        <a href={"https://photogenica.ru"} target={"_blank"}>
                                            <li>
                                                Фотодженика
                                            </li>
                                        </a>
                                    </ul>
                                </div>
                            </div>
                            <div className={styles.separator}></div>
                            <form method={"get"} style={{padding: '5px 0 5px 0'}}>
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
                        <button className={styles.paletteColor}
                                style={{backgroundColor: COLOR_PICKER_COLORS[i]}}
                                onClick={() => action('changeCurrentColor', COLOR_PICKER_COLORS[i])}
                        />
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
export {showDropDownById, handleClicks, hideDropDownKeyboardPressed}