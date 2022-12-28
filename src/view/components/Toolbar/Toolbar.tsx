import styles from "./Toolbar.module.css"
import iconsStyles from "./../Button/Button.module.css"

import {Button, ButtonIcon} from "../Button/Button";
import SaveIcon from "../Button/ButtonIcons/SaveDropDownIcon.svg";
import {AppDispatcher} from "../../../model/store";
import {createSlide, undo, redo, setBackgroundColor} from "../../../model/actionCreators";
import {Editor, Item, ItemType} from "../../../core/types/types";
import {connect, ConnectedProps} from "react-redux";
import {showDropDownById} from "../DropDown/DropDown";
import DropDown from "../DropDown/DropDown";

function mapDispatchToProps(dispatcher: AppDispatcher) {
    return {
        createSlide: () => dispatcher(createSlide()),
        undo: () => dispatcher(undo()),
        redo: () => dispatcher(redo()),
        setBgColor: (color: string) => dispatcher(setBackgroundColor(color))
    }
}

function mapStateToProps(state: Editor) {
    const currentSlideIndex: number = state.presentation.slides.findIndex(slide => slide.id === state.presentation.selectedSlidesIds[0]);
    return {
        currentSlide: state.presentation.slides[currentSlideIndex],
        slides: state.presentation.slides,
        currentColor: state.presentation.currentColor,
    }
}

const connector = connect(mapStateToProps, mapDispatchToProps)
type ToolbarProps = ConnectedProps<typeof connector>

//заглушка
interface fontSizeProps {
    size: number;
}

const FontSizeArea = ({size}: fontSizeProps) => {
    return (
        <div className={styles.fontSizeArea}>
            <div className={styles.sizeAdjuster} onClick={() => {
            }}>–
            </div>
            <div className={styles.vertSeparator}></div>
            <div className={styles.fontAdjuster}>{size}</div>
            <div className={styles.vertSeparator}></div>
            <div className={styles.sizeAdjuster} onClick={() => {
            }}>+
            </div>
        </div>
    )
}

const Toolbar = (props: ToolbarProps) => {
    let textSelected = false;
    let figureSelected = false;
    props.currentSlide.selectedItemsIds.forEach(id => {
            if (props.currentSlide.items.find(item => item.id === id)?.element === ItemType.Figure) {
                textSelected = false;
            } else if (props.currentSlide.items.find(item => item.id === id)?.element === ItemType.TextArea) {
                figureSelected = false;
            }
        }
    )
    return (
        <div className={styles.toolbar}>
            <ButtonIcon viewStyle={"createSlide"} onClick={() => props.createSlide()}></ButtonIcon>
            <ButtonIcon viewStyle={"undo"} onClick={() => props.undo()}></ButtonIcon>
            <ButtonIcon viewStyle={"redo"} onClick={() => props.redo()}></ButtonIcon>
            <ButtonIcon viewStyle={"selectArea"} onClick={() => {
            }}></ButtonIcon>
            <ButtonIcon viewStyle={"selectArrow"} onClick={() => {
            }}></ButtonIcon>
            <ButtonIcon viewStyle={"textArea"} onClick={() => {
            }}></ButtonIcon>
            <ButtonIcon viewStyle={"image"} onClick={() => {
                const iconImage = document.getElementsByClassName(iconsStyles.buttonImage)[0] as HTMLElement;
                if (iconImage !== null) {
                    showDropDownById(iconImage, 'ImageSelector')
                }
            }}></ButtonIcon>
            <DropDown id={'ImageSelector'} viewStyle={'imageSelector'}></DropDown>
            <ButtonIcon viewStyle={"figure"} onClick={() => {
                const figureIcon = document.getElementsByClassName(iconsStyles.buttonFigure)[0] as HTMLElement;
                if (figureIcon !== null) {
                    showDropDownById(figureIcon, 'shapes')
                }
            }}></ButtonIcon>
            <DropDown id={'shapes'} viewStyle={"figureShapes"}></DropDown>
            <ButtonIcon viewStyle={"palette"} onClick={() => {
                const palette = document.getElementsByClassName(iconsStyles.buttonPalette)[0] as HTMLElement;
                if (palette !== null) {
                    showDropDownById(palette, 'ColorPicker')
                }
            }}></ButtonIcon>
            <DropDown id={'ColorPicker'} viewStyle={'palette'}></DropDown>
            <ButtonIcon viewStyle={"filler"} onClick={() => {
                if (!textSelected && !figureSelected) {
                    props.setBgColor(props.currentColor)
                }
            }}></ButtonIcon>
            <ButtonIcon viewStyle={"stroke"} onClick={() => {
            }}></ButtonIcon>
            <ButtonIcon viewStyle={"cursive"} onClick={() => {
            }}></ButtonIcon>
            <ButtonIcon viewStyle={"underline"} onClick={() => {
            }}></ButtonIcon>
            <Button viewStyle={"fontArea"} iconStyle={"right"} iconSrc={SaveIcon}
                    text={"Inter"}
                    onClick={() => {
                    }}></Button>
            <FontSizeArea size={14}></FontSizeArea>
        </div>
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(Toolbar)