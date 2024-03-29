import {EditorType, IdType, PointType, ShapeType, SlideState} from "../core/types/types";
import {Actions} from "../core/types/types";

function createPresentation() {
    return {
        type: Actions.CREATE_PRESENTATION
    }
}

function savePresentation() {
    return {
        type: Actions.SAVE_PRESENTATION
    }
}

function openPresentation(newEditor: EditorType) {
    return {
        type: Actions.OPEN_PRESENTATION,
        newEditor
    }
}

function changeSlideShowStatus() {
    return {
        type: Actions.CHANGE_SLIDE_SHOW_STATUS
    }
}

function createSlide() {
    return {
        type: Actions.CREATE_SLIDE
    }
}

function deleteSlides() {
    return {
        type: Actions.DELETE_SLIDE
    }
}

function switchSlide(slideId: string) {
    return {
        type: Actions.SWITCH_SLIDE,
        slideId,
    }
}

function selectSlide(slideId: string) {
    return {
        type: Actions.SELECT_SLIDE,
        slideId,
    }
}

function deselectSlide(slideId: string) {
    return {
        type: Actions.DESELECT_SLIDE,
        slideId,
    }
}

function selectManySlides(slideId: string) {
    return {
        type: Actions.SELECT_MANY_SLIDES,
        slideId
    }
}

function undo() {
    return {
        type: Actions.UNDO,
    }
}

function redo() {
    return {
        type: Actions.REDO,
    }
}

function setTitle(title: string) {
    return {
        type: Actions.CHANGE_TITLE,
        title,
    }
}

function setBackgroundColor(backgroundColor: string) {
    return {
        type: Actions.SET_BACKGROUND_COLOR,
        backgroundColor,
    }
}

function changeCurrentColor(color: string) {
    return {
        type: Actions.CHANGE_SELECTED_COLOR,
        newColor: color
    }
}

function swipeSlideShowSlide(slideIndex: number, direction: string) {
    return {
        type: Actions.SWIPE_SLIDE_SHOW_SLIDE,
        slideShowCurrentSlide: slideIndex,
        direction: direction,
    }
}

function setCurrentCursorPosition(clientX: number, clientY: number) {
    return {
        type: Actions.SET_CURRENT_CURSOR_POSITION,
        clientX: clientX,
        clientY: clientY,
    }
}

function addFigureItem(shape: ShapeType, color: string, coordinates: PointType) {
    return {
        type: Actions.ADD_FIGURE_ITEM,
        addFigureParams: {
            shape,
            color,
            coordinates,
        }
    }
}

function addImageItem(imageSrc: string, coordinates: PointType) {
    return {
        type: Actions.ADD_IMAGE,
        addImageParams: {
            imageSrc,
            coordinates,
        }
    }
}

function addTextItem(fontFamily: string, fontSize: number,
                     fontColor: string,
                     value: string,
                     fatness: string,
                     isCursive: boolean,
                     isUnderlined: boolean,
                     coordinates: PointType) {
    return {
        type: Actions.DRAW_TEXT,
        clientX: coordinates.x,
        clientY: coordinates.y,
        addTextParams: {
            fontFamily,
            fontSize,
            fontColor,
            value,
            fatness,
            isCursive,
            isUnderlined,
            coordinates,
        }
    }
}
function changeTextFont(newFontFamily: string) {
    return {
        type: Actions.CHANGE_TEXT_FONT,
        newFontFamily: newFontFamily
    }
}
function changeTextColor(newColor: string) {
    return {
        type: Actions.CHANGE_TEXT_COLOR,
        newColor: newColor
    }
}
function changeTextSize(newSize: string) {
    return {
        type: Actions.CHANGE_TEXT_SIZE,
        newFontSize: newSize
    }
}
function changeTextValue(newValue: string) {
    return {
        type: Actions.CHANGE_TEXT_VALUE,
        newTextValue: newValue
    }
}
function changeTextFontFamily(fontFamily: string) {
    return {
        type: Actions.CHANGE_TEXT_FONT,
        newFontFamily: fontFamily,
    }
}

function changeTextFatness() {
    return {
        type: Actions.CHANGE_TEXT_FATNESS
    }
}
function toggleTextCursive() {
    return {
        type: Actions.TOGGLE_TEXT_CURSIVE
    }
}
function toggleTextUnderline() {
    return {
        type: Actions.TOGGLE_TEXT_UNDERLINE
    }
}

function changeCurrentSlideState(newSlideState: SlideState) {
    return {
        type: Actions.CHANGE_CURRENT_SLIDE_STATE,
        newSlideState: newSlideState,
    }
}

function changeCurrentFigureType(newCurrentFigureType: ShapeType) {
    return {
        type: Actions.CHANGE_CURRENT_FIGURE_TYPE,
        newCurrentFigureType: newCurrentFigureType,
    }
}

function selectItem(itemId: IdType) {
    return {
        type: Actions.SELECT_ITEM,
        itemId: itemId,
    }
}

function selectManyItems(itemId: IdType) {
    return {
        type: Actions.SELECT_MANY_ITEMS,
        itemId: itemId,
    }
}

function deselectItems(itemId: IdType) {
    return {
        type: Actions.DESELECT_ITEMS,
        itemId: itemId,
    }
}

function moveItem(shiftX: number, shiftY: number) {
    return {
        type: Actions.MOVE_ITEM,
        moveItemCoordinates: {
            shiftX: shiftX,
            shiftY: shiftY,
        }
    }
}

function scaleItem(shiftX: number, shiftY: number, newWidth: number, newHeight: number) {
    return {
        type: Actions.SCALE_ITEM,
        scaleItemParams: {
            shiftX: shiftX,
            shiftY: shiftY,
            newWidth: newWidth,
            newHeight: newHeight,
        }
    }
}

function fillFigure(newColor: string) {
    return {
        type: Actions.FILL_FIGURE,
        newColor: newColor,
    }
}

function strokeFigure(newColor: string) {
    return {
        type: Actions.STROKE_FIGURE,
        newColor: newColor,
    }
}

function deleteItems() {
    return {
        type: Actions.DELETE_ITEM,
    }
}

function copy() {
    return {
        type: Actions.COPY,
    }
}

function paste() {
    return {
        type: Actions.PASTE,
    }
}

function changeCurrentFontSize(newFontState: string) {
    return {
        type: Actions.CHANGE_CURRENT_FONT_SIZE,
        newFontState: newFontState,
    }
}

function changeCurrentFontFamily(newFontFamily: string) {
    return {
        type: Actions.CHANGE_CURRENT_FONT_FAMILY,
        newFontFamily: newFontFamily,
    }
}

export {
    createSlide,
    switchSlide,
    undo,
    redo,
    setTitle,
    deleteSlides,
    selectSlide,
    selectManySlides,
    deselectSlide,
    createPresentation,
    savePresentation,
    openPresentation,
    changeCurrentColor,
    changeSlideShowStatus,
    setBackgroundColor,
    swipeSlideShowSlide,
    addFigureItem,
    setCurrentCursorPosition,
    changeCurrentSlideState,
    changeCurrentFigureType,
    addImageItem,
    addTextItem,
    changeTextFont,
    changeTextSize,
    changeTextColor,
    changeTextValue,
    changeTextFontFamily,
    selectItem,
    selectManyItems,
    deselectItems,
    moveItem,
    scaleItem,
    fillFigure,
    strokeFigure,
    deleteItems,
    copy,
    paste,
    changeCurrentFontSize,
    changeCurrentFontFamily,
    changeTextFatness,
    toggleTextCursive,
    toggleTextUnderline
}