import styles from "./Toolbar.module.css"

import {Button, ButtonIcon} from "../Button/Button";
import SaveIcon from "../Button/ButtonIcons/SaveDropDownIcon.svg";
import {AppDispatcher} from "../../../model/store";
import {
    createSlide,
    undo,
    redo,
    setBackgroundColor,
    changeCurrentSlideState,
    fillFigure, strokeFigure, changeCurrentFontSize, changeTextColor
} from "../../../model/actionCreators";
import {EditorType, ItemType, SlideState} from "../../../core/types/types";
import {connect, ConnectedProps} from "react-redux";
import {showDropDownById} from "../DropDown/DropDown";
import DropDown from "../DropDown/DropDown";
import {text} from "stream/consumers";

const connector = connect(mapStateToProps, mapDispatchToProps);
type ToolbarProps = ConnectedProps<typeof connector>

enum Statuses {
    default,
    noItems,
    TextArea,
    Figure,
    Image
}

interface StatusProps {
    status: Statuses;
}

const Toolbar = (props: ToolbarProps, {status = 0}: StatusProps) => {
    let textSelected = false;
    let figureSelected = false;
    props.currentSlide.selectedItemsIds.forEach(id => {
            if (props.currentSlide.items.find(item => item.id === id)?.element === ItemType.Figure) {
                figureSelected = true;
            } else if (props.currentSlide.items.find(item => item.id === id)?.element === ItemType.TextArea) {
                textSelected = true;
            }
        }
    )
    return (
        <div className={styles.toolbar}>
            <ButtonIcon viewStyle={"createSlide"}
                        onClick={() => props.createSlide()}
            />
            <ButtonIcon viewStyle={"undo"} onClick={() => props.undo()}/>
            <ButtonIcon viewStyle={"redo"} onClick={() => props.redo()}/>
            {
                (status === 1 || status === 4 || status === 0) && <>
                    <ButtonIcon viewStyle={"textArea"} onClick={() => {
                        props.changeCurrentSlideState(SlideState.DRAW_TEXT);
                    }}/>
                    <ButtonIcon viewStyle={"image"} id={'SelectorButton'}
                                onClick={() => {
                                    showDropDownById('SelectorButton', 'ImageSelector')
                                }
                                }/>
                </>
            }
            <DropDown id={'ImageSelector'} viewStyle={'imageSelector'}></DropDown>
            {
                (status !== 2 && status !== 4) &&
                <ButtonIcon viewStyle={"figure"} id={'FigureButton'}
                            onClick={() => {
                                showDropDownById('FigureButton', 'shapes')
                            }
                            }/>
            }
            <DropDown id={'shapes'} viewStyle={"figureShapes"}/>
            <ButtonIcon viewStyle={"palette"} id={'PickerButton'}
                        onClick={() => {
                            showDropDownById('PickerButton', 'ColorPicker')
                        }}
            />
            <DropDown id={'ColorPicker'} viewStyle={'palette'}/>
            {
                status !== 4 &&
                <ButtonIcon viewStyle={"filler"} onClick={() => {
                    if (!textSelected && !figureSelected) {
                        props.setBgColor(props.currentColor)
                    } else if(figureSelected) {
                        props.fillFigure(props.currentColor);
                    } else if (textSelected) {
                        props.fillText(props.currentColor)
                    }
                }}/>
            }
            {
                status !== 1 &&
                <ButtonIcon viewStyle={"stroke"} onClick={() => props.strokeFigure(props.currentColor)}/>
            }
            {
                (status === 0 || status === 2) && <>
                    <ButtonIcon viewStyle={"bold"} onClick={() => {
                    }}/>
                    <ButtonIcon viewStyle={"cursive"} onClick={() => {
                    }}/>
                    <ButtonIcon viewStyle={"underline"} onClick={() => {
                    }}/>
                    <Button viewStyle={"fontArea"}
                            iconStyle={"right"}
                            iconSrc={SaveIcon}
                            text={"Inter"}
                            onClick={() => {
                            }}
                    />
                </>
            }
            {
                status !== 1 &&
                <div className={styles.fontSizeArea}>
                    <div className={styles.sizeAdjuster} onClick={() => props.changeCurrentFontSize("minus")}>–
                    </div>
                    <div className={styles.vertSeparator}></div>
                    <div className={styles.fontAdjuster}>{props.currentFontSize}</div>
                    <div className={styles.vertSeparator}></div>
                    <div className={styles.sizeAdjuster} onClick={() => props.changeCurrentFontSize("plus")}>+
                    </div>
                </div>
            }
        </div>
    )
}

function mapStateToProps(state: EditorType) {
    const currentSlideIndex: number = state.presentation.slides.findIndex(slide => slide.id === state.presentation.selectedSlidesIds[0]);
    return {
        currentSlide: state.presentation.slides[currentSlideIndex],
        slides: state.presentation.slides,
        currentColor: state.presentation.currentColor,
        currentFontSize: state.presentation.currentFontSize,
    }
}

function mapDispatchToProps(dispatcher: AppDispatcher) {
    return {
        createSlide: () => dispatcher(createSlide()),
        undo: () => dispatcher(undo()),
        redo: () => dispatcher(redo()),
        setBgColor: (color: string) => dispatcher(setBackgroundColor(color)),
        changeCurrentSlideState: (newSlideState: SlideState) => dispatcher(changeCurrentSlideState(newSlideState)),
        fillFigure: (newColor: string) => dispatcher(fillFigure(newColor)),
        fillText: (newColor: string) => dispatcher(changeTextColor(newColor)),
        strokeFigure: (newColor: string) => dispatcher(strokeFigure(newColor)),
        changeCurrentFontSize: (newFontState: string) => dispatcher(changeCurrentFontSize(newFontState)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Toolbar)