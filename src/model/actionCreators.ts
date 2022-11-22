import {Editor} from "../core/types/types";

function createSlide() {
    return {
        type: 'CREATE_SLIDE'
    }
}

function switchSlide(slideId: string) {
    return {
        type: 'SWITCH_SLIDE',
        slideId,
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
        type: 'SET_TITLE',
        title
    }
}

export {createSlide, switchSlide, undo, redo, setTitle}