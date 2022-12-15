import {Editor} from "../core/types/types";

function createPresentation() {
    return {
        type: 'CREATE_PRESENTATION'
    }
}

function savePresentation() {
    return {
        type: 'SAVE_PRESENTATION'
    }
}

function openPresentation(newEditor: Editor) {
    return {
        type: 'OPEN_PRESENTATION',
        newEditor
    }
}

function createSlide() {
    return {
        type: 'CREATE_SLIDE'
    }
}

function deleteSlides() {
    return {
        type: 'DELETE_SLIDE'
    }
}

function switchSlide(slideId: string) {
    return {
        type: 'SWITCH_SLIDE',
        slideId,
    }
}

function selectSlide(slideId: string) {
    return {
        type: 'SELECT_SLIDE',
        slideId,
    }
}

function deselectSlide(slideId: string) {
    return {
        type: 'DESELECT_SLIDE',
        slideId,
    }
}

function selectManySlides(slideId: string) {
    return {
        type: 'SELECT_MANY_SLIDES',
        slideId
    }
}

function undo() {
    return {
        type: 'UNDO'
    }
}

function redo() {
    return {
        type: 'REDO'
    }
}

function setTitle(title: string) {
    return {
        type: 'CHANGE_TITLE',
        title,
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
}