import styles from "./DropDown.module.css"
import {COLOR_PICKER_COLORS, DEFAULT_STOCKS, DROPDOWN_ANIMATION_TIME} from "../../../core/functions/utility";
import {AppDispatcher} from "../../../model/store";
import {
    changeCurrentColor,
    changeCurrentFigureType,
    changeCurrentSlideState,
    savePresentation
} from "../../../model/actionCreators";
import {connect, ConnectedProps} from "react-redux";
import React from "react";
import {Editor, ShapeType, SlideState} from "../../../core/types/types";

interface DropDownCustomProps {
    id: string;
    viewStyle: 'createSlide' | 'undo' | 'redo' | 'selectArea' | 'selectArrow' | 'textArea' | 'imageSelector'
        | 'line' | 'palette' | 'saveAction' | 'figureShapes';
}

function hideDropDownKeyboardPressed(e: React.KeyboardEvent<HTMLDivElement>) {
    const saveAction = document.getElementById('saveActionDropDown');
    const colorPicker = document.getElementById('ColorPicker');
    const stocks = document.getElementById('Stocks');
    const imageSelector = document.getElementById('ImageSelector');
    const shapes = document.getElementById('shapes');

    if (saveAction !== null && colorPicker !== null && stocks !== null && imageSelector !== null
        && shapes !== null) {

        if (e.code === 'Escape') {
            if (stocks.classList.contains(styles.dropDownShow)) {
                stocks.classList.remove(styles.dropDownShow)
            } else {
                shapes.classList.remove(styles.dropDownShow);
                saveAction.classList.remove(styles.dropDownShow);
                colorPicker.classList.remove(styles.dropDownShow);
                imageSelector.classList.remove(styles.dropDownShow);
            }
        }

    }
}

function removeOpenedDropDownById(id: string): void {
    const el = document.getElementById(id);
    if (el !== null) {
        el.classList.remove(styles.dropDownOpen);
        setTimeout(() => {
            el.classList.remove(styles.dropDownShow);
        }, DROPDOWN_ANIMATION_TIME);
    }
}

function handleClicks(e: MouseEvent) {
    // взял в проверку ещё и кнопки списков,
    // чтобы при обработке они не переключались два раза (закрылись и снова открылись)
    const path = e.composedPath();
    const saveAction = document.getElementById('saveActionDropDown');
    const saveButton = document.getElementById('SavePresentationButton');
    const colorPicker = document.getElementById('ColorPicker');
    const pickerButton = document.getElementById('PickerButton');
    const imageSelector = document.getElementById('ImageSelector');
    const selectorButton = document.getElementById('SelectorButton');
    const figure = document.getElementById('FigureButton');
    const shapes = document.getElementById('shapes');

    if (path !== null && saveAction !== null && colorPicker !== null && imageSelector !== null
        && saveButton !== null && selectorButton !== null && pickerButton !== null && figure !== null
        && shapes !== null) {

        if (saveAction.classList.contains(styles.dropDownShow) && !path.includes(saveAction)
            && !path.includes(saveButton)) {
            removeOpenedDropDownById('saveActionDropDown');
        }
        if (colorPicker.classList.contains(styles.dropDownShow) && !path.includes(colorPicker)
            && !path.includes(pickerButton)) {
            removeOpenedDropDownById('ColorPicker')
        }
        if (imageSelector.classList.contains(styles.dropDownShow) && !path.includes(imageSelector)
            && !path.includes(selectorButton)) {
            removeOpenedDropDownById('ImageSelector')
        }
        if (shapes.classList.contains(styles.dropDownShow) && !path.includes(shapes)
            && !path.includes(figure)) {
            removeOpenedDropDownById('shapes');
        }

    }

}

type DropDownActionType = 'saveJSON' | 'savePDF' | 'changeCurrentColor' | 'addFigure'

function mapStateToProps(state: Editor) {
    const currentSlideIndex: number = state.presentation.slides.findIndex(slide => slide.id === state.presentation.selectedSlidesIds[0]);
    return {
        currentSlide: state.presentation.slides[currentSlideIndex],
    }
}

function mapDispatchToProps(dispatcher: AppDispatcher) {
    return {
        action: (actionType: DropDownActionType, color?: string) => {
            switch (actionType) {
                case 'saveJSON': {
                    dispatcher(savePresentation());
                    break;
                }
                case "changeCurrentColor": {
                    if (color) {
                        dispatcher(changeCurrentColor(color))
                    }
                    break;
                }
                case "addFigure": {
                    break;
                }
            }
        },
        setCurrentSlideState: (newSlideState: SlideState) => dispatcher(changeCurrentSlideState(newSlideState)),
        changeCurrentFigureType: (newCurrentFigureType: ShapeType) => dispatcher(changeCurrentFigureType(newCurrentFigureType)),
    }
}

const connector = connect(mapStateToProps, mapDispatchToProps);
type DropDownInitialProps = ConnectedProps<typeof connector>

type DropDownMergedProps = DropDownInitialProps & DropDownCustomProps

function showDropDownById(parentId: string, id: string): void {
    const parent = document.getElementById(parentId);
    const dropDown = document.getElementById(id);
    if (parent !== null && dropDown !== null) {
        if (dropDown.classList.contains(styles.dropDownShow)) {
            // если открыт
            removeOpenedDropDownById(id);
        } else {
            // если закрыт
            dropDown.classList.add(styles.dropDownShow);
            setTimeout(() => {
                dropDown.classList.toggle(styles.dropDownOpen);
            }, 1);
        }

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
                stocks.classList.remove(styles.dropDownShow);
                stocks.classList.remove(styles.dropDownOpen);
            }
        }
    }
}

function showChildrenDropDownById(id: string): void {
    let childDropDown = document.getElementById(id);
    if (childDropDown !== null) {
        childDropDown.classList.toggle(styles.dropDownShow);
        childDropDown.classList.toggle(styles.dropDownOpen);
    }
}

const Separator = () => {
    return (
        <div className={styles.separator}></div>
    )
}
const Stocks = () => {
    let stocks = DEFAULT_STOCKS.map((stock) =>
        <a key={stock.name.toString()} href={stock.url} target={"_blank"}
           rel={"noreferrer"}>
            <li>{stock.name}</li>
        </a>
    );
    return (
        <div id={"Stocks"} className={styles.dropDown} style={{position: "static"}}>
            <div className={styles.dropDownContent} style={{border: "none"}}>
                <Separator/>
                <ul className={styles.stocks}>
                    {stocks}
                </ul>
            </div>
        </div>
    )
}

const DropDown = ({id, viewStyle, action, setCurrentSlideState, changeCurrentFigureType}: DropDownMergedProps) => {
    if (viewStyle !== null) {
        switch (viewStyle) {
            case "figureShapes":
                return (
                    <div id={id} className={`${styles.dropDown} ${styles.figures}`}>
                        <div className={styles.dropDownContent}>
                            <p className={styles.dropDownContent__header} style={{fontWeight: "normal"}}>
                                Выберите фигуру
                            </p>
                            <Separator/>
                            <div className={styles.shapesContent}>
                                <div
                                    className={`${styles.shapes} ${styles.shapeRectangle}`}
                                    onClick={() => {
                                        setCurrentSlideState(SlideState.DRAW_FIGURE);
                                        changeCurrentFigureType(ShapeType.Rectangle);
                                        removeOpenedDropDownById('shapes');
                                    }}/>
                                <div
                                    className={`${styles.shapes} ${styles.shapeArc}`}
                                    onClick={() => {
                                        setCurrentSlideState(SlideState.DRAW_FIGURE);
                                        changeCurrentFigureType(ShapeType.Arc);
                                        removeOpenedDropDownById('shapes');
                                    }}/>
                                <div
                                    className={`${styles.shapes} ${styles.shapeTriangle}`}
                                    onClick={() => {
                                        setCurrentSlideState(SlideState.DRAW_FIGURE);
                                        changeCurrentFigureType(ShapeType.Triangle);
                                        removeOpenedDropDownById('shapes');
                                    }}
                                />
                                <div
                                    className={`${styles.shapes} ${styles.shapesStar}`}
                                    onClick={() => {
                                        setCurrentSlideState(SlideState.DRAW_FIGURE);
                                        changeCurrentFigureType(ShapeType.Star);
                                        removeOpenedDropDownById('shapes');
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                )
            case "imageSelector":
                return (
                    <div id={id} className={`${styles.dropDown} ${styles.imageSelector}`}>
                        <div className={styles.dropDownContent}>
                            <p className={styles.dropDownContent__header}>Выберите вариант:</p>
                            <Separator/>
                            <p onClick={() => {
                                showChildrenDropDownById('Stocks')
                            }}>Выбрать из популярных фотостоков</p>
                            <Stocks/>
                            <Separator/>
                            <div className={styles.addImage} onClick={() => {
                                setCurrentSlideState(SlideState.DRAW_IMAGE);
                                removeOpenedDropDownById('ImageSelector');
                            }}>
                                <p>Выбрать с компьютера</p>
                            </div>
                        </div>
                    </div>
                )
            case "palette":
                let colorsList = COLOR_PICKER_COLORS.map((color) =>
                    <button className={styles.paletteColor}
                            style={{backgroundColor: color}}
                            onClick={() => {
                                action('changeCurrentColor', color);
                                removeOpenedDropDownById(id)
                            }}
                    />
                );
                return (
                    <div id={id} className={`${styles.dropDown} ${styles.palette}`}>
                        <div className={styles.dropDownContent}>
                            <p className={styles.dropDownContent__header} style={{fontWeight: "normal"}}>Основные
                                цвета</p>
                            <Separator/>
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
                            <p>Сохранить PDF</p>
                            <Separator/>
                            <p onClick={() => action('saveJSON')}>Сохранить JSON</p>
                        </div>
                    </div>
                )
        }
    }
    return (
        <p>Введено название рендеринга, которого нет</p>
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(DropDown)
export {showDropDownById, handleClicks, hideDropDownKeyboardPressed}
