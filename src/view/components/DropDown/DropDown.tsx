import styles from "./DropDown.module.css"
import {
    COLOR_PICKER_COLORS,
    DEFAULT_FIGURES, DEFAULT_FIGURES_STYLES,
    DEFAULT_STOCKS,
    DROPDOWN_ANIMATION_TIME
} from "../../../core/functions/utility";
import {AppDispatcher} from "../../../model/store";
import {
    addFigureItem,
    changeCurrentColor,
    changeCurrentFigureType,
    changeCurrentSlideState,
    savePresentation
} from "../../../model/actionCreators";
import {connect, ConnectedProps} from "react-redux";
import React from "react";
import {EditorType, FigureType, ShapeType, SlideState} from "../../../core/types/types";

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
    // ???????? ?? ???????????????? ?????? ?? ???????????? ??????????????,
    // ?????????? ?????? ?????????????????? ?????? ???? ?????????????????????????? ?????? ???????? (?????????????????? ?? ?????????? ??????????????????)
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

function mapStateToProps(state: EditorType) {
    const currentSlideIndex: number = state.presentation.slides.findIndex(slide => slide.id === state.presentation.selectedSlidesIds[0]);
    return {
        currentSlide: state.presentation.slides[currentSlideIndex],
        currentColor: state.presentation.currentColor,
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
        changeCurrentSlideState: (newSlideState: SlideState) => dispatcher(changeCurrentSlideState(newSlideState)),
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
            // ???????? ????????????
            removeOpenedDropDownById(id);
        } else {
            // ???????? ????????????
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
        <a key={`stock-${stock.name.toString()}`} href={stock.url} target={"_blank"}
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

const DropDown = ({id, viewStyle, action, currentColor, changeCurrentSlideState, changeCurrentFigureType}: DropDownMergedProps) => {
    if (viewStyle !== null) {
        switch (viewStyle) {
            case "figureShapes":
                let figures = [];
                for (let i = 0; i < DEFAULT_FIGURES.length; i++) {
                    figures.push(
                        <div className={`${styles.shapes} ${DEFAULT_FIGURES_STYLES[i]}`}
                             onClick={() => {
                                 changeCurrentSlideState(SlideState.DRAW_FIGURE);
                                 changeCurrentFigureType(DEFAULT_FIGURES[i].modelId);
                                 // addFigureItem(ShapeType.Rectangle, currentColor);
                                 removeOpenedDropDownById('shapes');
                             }}
                        />
                    )
                }
                return (
                    <div id={id} className={`${styles.dropDown} ${styles.figures}`}>
                        <div className={styles.dropDownContent}>
                            <p className={styles.dropDownContent__header} style={{fontWeight: "normal"}}>
                                ???????????????? ????????????
                            </p>
                            <Separator/>
                            <div className={styles.shapesContent}>
                                {figures}
                            </div>
                        </div>
                    </div>
                )
            case "imageSelector":
                return (
                    <div id={id} className={`${styles.dropDown} ${styles.imageSelector}`}>
                        <div className={styles.dropDownContent}>
                            <p className={styles.dropDownContent__header}>???????????????? ??????????????:</p>
                            <Separator/>
                            <p onClick={() => {
                                showChildrenDropDownById('Stocks')
                            }}>?????????????? ???? ???????????????????? ????????????????????</p>
                            <Stocks/>
                            <Separator/>
                            <div className={styles.addImage} onClick={() => {
                                removeOpenedDropDownById('ImageSelector');
                                changeCurrentSlideState(SlideState.DRAW_IMAGE);
                            }}>
                                <p>?????????????? ?? ????????????????????</p>
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
                            <p className={styles.dropDownContent__header} style={{fontWeight: "normal"}}>????????????????
                                ??????????</p>
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
                            <p>?????????????????? PDF</p>
                            <Separator/>
                            <p onClick={() => action('saveJSON')}>?????????????????? JSON</p>
                        </div>
                    </div>
                )
        }
    }
    return (
        <p>?????????????? ???????????????? ????????????????????, ???????????????? ??????</p>
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(DropDown)
export {showDropDownById, handleClicks, hideDropDownKeyboardPressed}
