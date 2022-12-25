import {Editor} from "../core/types/types";
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

function openPresentation(newEditor: Editor) {
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
}