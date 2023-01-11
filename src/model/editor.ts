import {EditorType, HistoryType, PresentationType} from "../core/types/types";
import {ActionType, initialState} from "./store";
import {deepClone} from "../core/functions/deepClone";
import {MAX_HISTORY_SIZE} from "../core/functions/utility";
import {Actions} from "../core/types/types";

function addActionToHistoryReducer(editor: EditorType): HistoryType {
    const newHistory = deepClone(editor.history) as HistoryType;
    const presentation = deepClone(editor.presentation) as PresentationType;
    if (newHistory.undoStack.length === MAX_HISTORY_SIZE) {
        newHistory.undoStack.shift();
    }
    while (newHistory.redoStack.length !== 0) {
        newHistory.redoStack.pop();
    }
    newHistory.undoStack.push(presentation);
    return newHistory;
}

function createPresentationReducer(): EditorType {
    return {
        ...(initialState)
    }
}

function swipeSlideShowSlideReducer(editor: EditorType, slideIndex: number, direction: string): EditorType {
    const newEditor = deepClone(editor) as EditorType;
    let newSlideIndex = slideIndex;
    if (direction === "right") {
        newSlideIndex++;
        if (newSlideIndex > editor.presentation.slides.length - 1) {
            newSlideIndex = editor.presentation.slides.length - 1;
        }
    } else if (direction === "left") {
        newSlideIndex--;
        if (newSlideIndex < 0) {
            newSlideIndex = 0;
        }
    }
    return {
        ...newEditor,
        slideShowCurrentSlideIndex: newSlideIndex,
    }
}

function changeSlideShowStatusReducer(editor: EditorType): EditorType {
    const newEditor = deepClone(editor) as EditorType;
    return {
        ...newEditor,
        slideShowStatus: !editor.slideShowStatus
    }
}

function savePresentationReducer(editor: EditorType): EditorType {
    const newEditor = deepClone(editor) as EditorType;
    const stringEditor = JSON.stringify(newEditor);
    const fileEditor = new Blob(
        [stringEditor], {
            type: 'application/json',
        }
    )
    const link = document.createElement('a')
    link.href = URL.createObjectURL(fileEditor)
    link.download = `${newEditor.presentation.title}.json`;
    link.style.display = 'none';
    link.click();
    link.remove();
    return newEditor
}

function openPresentationReducer(editor: EditorType, newEditor: EditorType): EditorType {
    return (newEditor)
}

function undoReducer(editor: EditorType): EditorType {
    const newEditor = deepClone(editor) as EditorType;
    if (newEditor.history.undoStack.length !== 0) {
        const newHistory = newEditor.history;
        const newPresentation: PresentationType = newHistory.undoStack.pop()!;
        newHistory.redoStack.push(newEditor.presentation);
        return {
            ...newEditor,
            history: newHistory,
            presentation: newPresentation
        }
    }
    return (newEditor)
}

function redoReducer(editor: EditorType): EditorType {
    const newEditor = deepClone(editor) as EditorType;
    if (newEditor.history.redoStack.length !== 0) {
        const newHistory = newEditor.history;
        const newPresentation: PresentationType = newHistory.redoStack.pop()!;
        newHistory.undoStack.push(newEditor.presentation);
        return {
            ...newEditor,
            history: newHistory,
            presentation: newPresentation
        }
    }
    return newEditor
}

function setCurrentMouseCoordinatesReducer(editor: EditorType, clientX: number, clientY: number) {
    const newEditor = deepClone(editor) as EditorType;
    return {
        ...newEditor,
        currentClientX: clientX,
        currentClientY: clientY,
    }
}

function editorReducer(state: EditorType, action: ActionType): EditorType {
    switch (action.type) {
        case Actions.CREATE_PRESENTATION:
            return createPresentationReducer();
        case Actions.SAVE_PRESENTATION:
            return savePresentationReducer(state);
        case Actions.OPEN_PRESENTATION:
            return action.newEditor !== undefined ? openPresentationReducer(state, action.newEditor) : deepClone(state) as EditorType;
        case Actions.CHANGE_SLIDE_SHOW_STATUS:
            return changeSlideShowStatusReducer(state);
        case Actions.UNDO:
            return undoReducer(state);
        case Actions.REDO:
            return redoReducer(state);
        case Actions.SET_CURRENT_CURSOR_POSITION:
            return action.clientX !== undefined && action.clientY !== undefined ? setCurrentMouseCoordinatesReducer(state, action.clientX, action.clientY) : deepClone(state) as EditorType;
        case Actions.SWIPE_SLIDE_SHOW_SLIDE:
            return action.slideShowCurrentSlide !== undefined && action.direction !== undefined ? swipeSlideShowSlideReducer(state, action.slideShowCurrentSlide, action.direction) : deepClone(state) as EditorType;
        default:
            return deepClone(state) as EditorType;
    }
}

export {editorReducer, addActionToHistoryReducer}