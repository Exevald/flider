import styles from "./DropDown.module.css"
import {
    COLOR_PICKER_COLORS,
    DEFAULT_FIGURES, DEFAULT_FIGURES_STYLES, DEFAULT_FONTS,
    DEFAULT_STOCKS,
    DROPDOWN_ANIMATION_TIME
} from "../../../core/functions/utility";
import {AppDispatcher} from "../../../model/store";
import {
    changeCurrentColor,
    changeCurrentFigureType, changeCurrentFontFamily,
    changeCurrentSlideState, changeTextFont,
    savePresentation
} from "../../../model/actionCreators";
import {connect, ConnectedProps} from "react-redux";
import React from "react";
import {EditorType, ItemType, ShapeType, SlideState} from "../../../core/types/types";

interface DropDownCustomProps {
    id: string;
    viewStyle: 'createSlide' | 'undo' | 'redo' | 'selectArea' | 'selectArrow' | 'textArea' | 'imageSelector'
        | 'line' | 'palette' | 'saveAction' | 'figureShapes' | 'fonts';
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
    const fonts = document.getElementById('fonts');
    const fontsButton = document.getElementById('fontsButton');

    if (path !== null && saveAction !== null && colorPicker !== null && imageSelector !== null
        && saveButton !== null && selectorButton !== null && pickerButton !== null && figure !== null
        && shapes !== null && fonts !== null && fontsButton !== null) {

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
        if (fonts.classList.contains(styles.dropDownShow) && !path.includes(fonts)
            && !path.includes(fontsButton)) {
            removeOpenedDropDownById('fonts');
        }

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

const DropDown = ({
                      id,
                      viewStyle,
                      action,
                      changeTextFont,
                      currentSlide,
                      changeCurrentSlideState,
                      changeCurrentFigureType,
                      changeCurrentFontFamily,
                  }: DropDownMergedProps) => {
    let textSelected = false;
    currentSlide.selectedItemsIds.forEach(id => {
            if (currentSlide.items.find(item => item.id === id)?.element === ItemType.TextArea) {
                textSelected = true;
            }
        }
    )
    if (viewStyle !== null) {
        switch (viewStyle) {
            case "fonts":
                let fonts = [];
                for (let i = 0; i < DEFAULT_FONTS.length; i++) {
                    fonts.push(<p
                        style={{fontFamily: DEFAULT_FONTS[i]}} onClick={() => {
                            changeCurrentFontFamily(DEFAULT_FONTS[i]);
                            removeOpenedDropDownById('fonts')
                    }}
                        onMouseEnter={() => {
                            if(textSelected) {
                                changeTextFont(DEFAULT_FONTS[i])
                            }
                        }}
                    >
                        {DEFAULT_FONTS[i]}
                    </p>);
                    fonts.push(<Separator/>)
                }
                fonts.pop()
                return (
                    <div id={id} className={styles.dropDown}>
                        <div className={`${styles.dropDownContent} ${styles.fonts}`}>
                            {fonts}
                        </div>
                    </div>
                )
            case "figureShapes":
                let figures = [];
                for (let i = 0; i < DEFAULT_FIGURES.length; i++) {
                    figures.push(
                        <div className={`${styles.shapes} ${DEFAULT_FIGURES_STYLES[i]}`}
                             onClick={() => {
                                 changeCurrentSlideState(SlideState.DRAW_FIGURE);
                                 changeCurrentFigureType(DEFAULT_FIGURES[i].modelId);
                                 removeOpenedDropDownById('shapes');
                             }}
                        />
                    )
                }
                return (
                    <div id={id} className={`${styles.dropDown} ${styles.figures}`}>
                        <div className={styles.dropDownContent}>
                            <p className={styles.dropDownContent__header} style={{fontWeight: "normal"}}>
                                Выберите фигуру
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
                            <p className={styles.dropDownContent__header}>Выберите вариант:</p>
                            <Separator/>
                            <p onClick={() => {
                                showChildrenDropDownById('Stocks')
                            }}>Выбрать из популярных фотостоков</p>
                            <Stocks/>
                            <Separator/>
                            <div className={styles.addImage} onClick={() => {
                                removeOpenedDropDownById('ImageSelector');
                                changeCurrentSlideState(SlideState.DRAW_IMAGE);
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

type DropDownActionType = 'saveJSON' | 'savePDF' | 'changeCurrentColor'

function mapStateToProps(state: EditorType) {
    const currentSlideIndex: number = state.presentation.slides.findIndex(slide => slide.id === state.presentation.selectedSlidesIds[0]);
    return {
        currentSlide: state.presentation.slides[currentSlideIndex],
        currentColor: state.presentation.currentColor,
        currentFontFamily: state.presentation.currentFontFamily
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
            }
        },
        changeCurrentSlideState: (newSlideState: SlideState) => dispatcher(changeCurrentSlideState(newSlideState)),
        changeCurrentFigureType: (newCurrentFigureType: ShapeType) => dispatcher(changeCurrentFigureType(newCurrentFigureType)),
        changeCurrentFontFamily: (newFontFamily: string) => dispatcher(changeCurrentFontFamily(newFontFamily)),
        changeTextFont: (newFont: string) => dispatcher(changeTextFont(newFont)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DropDown)
export {showDropDownById, handleClicks, hideDropDownKeyboardPressed}
