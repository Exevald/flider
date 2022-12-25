import {Editor, History, Presentation} from "../core/types/types";
import {ActionType, initialState} from "./store";
import {deepClone} from "../core/functions/deepClone";
import {MAX_HISTORY_SIZE} from "../core/functions/utility";
import {Actions} from "../core/types/types";

function addActionToHistoryReducer(editor: Editor): History {
    const newHistory = deepClone(editor.history) as History;
    const presentation = deepClone(editor.presentation) as Presentation;
    if (newHistory.undoStack.length === MAX_HISTORY_SIZE) {
        newHistory.undoStack.shift();
    }
    while (newHistory.redoStack.length !== 0) {
        newHistory.redoStack.pop();
    }
    newHistory.undoStack.push(presentation);
    return newHistory;
}

function createPresentationReducer(): Editor {
    return {
        ...(initialState)
    }
}

function swipeSlideShowSlideReducer(editor: Editor, slideIndex: number, direction: string): Editor {
    const newEditor = deepClone(editor) as Editor;
    let newSlideIndex = slideIndex;
    if (direction === "right") {
        newSlideIndex++;
        if (newSlideIndex > editor.presentation.slides.length - 1) {
            newSlideIndex = editor.presentation.slides.length - 1;
        }
    } else if (direction === "left") {
        console.log("left")
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

function changeSlideShowStatusReducer(editor: Editor): Editor {
    const newEditor = deepClone(editor) as Editor;
    return {
        ...newEditor,
        slideShowStatus: !editor.slideShowStatus
    }
}

function savePresentationReducer(editor: Editor): Editor {
    const newEditor = deepClone(editor) as Editor;
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

function openPresentationReducer(editor: Editor, newEditor: Editor): Editor {
    return (newEditor)
}

function undoReducer(editor: Editor): Editor {
    const newEditor = deepClone(editor) as Editor;
    if (newEditor.history.undoStack.length !== 0) {
        const newHistory = deepClone(newEditor.history) as History;
        const newPresentation: Presentation = newHistory.undoStack.pop()!;
        newHistory.redoStack.push(newEditor.presentation);
        return {
            ...newEditor,
            history: newHistory,
            presentation: newPresentation
        }
    }
    return (newEditor)
}

function redoReducer(editor: Editor): Editor {
    const newEditor = deepClone(editor) as Editor;
    if (newEditor.history.redoStack.length !== 0) {
        const newHistory = deepClone(newEditor.history) as History;
        const newPresentation: Presentation = newHistory.redoStack.pop()!;
        newHistory.undoStack.push(newEditor.presentation);
        return {
            ...newEditor,
            history: newHistory,
            presentation: newPresentation
        }
    }
    return newEditor
}

function editorReducer(state: Editor, action: ActionType): Editor {
    switch (action.type) {
        case Actions.CREATE_PRESENTATION:
            return createPresentationReducer();
        case Actions.SAVE_PRESENTATION:
            return savePresentationReducer(state);
        case Actions.OPEN_PRESENTATION:
            return action.newEditor !== undefined ? openPresentationReducer(state, action.newEditor) : deepClone(state) as Editor;
        case Actions.CHANGE_SLIDE_SHOW_STATUS:
            return changeSlideShowStatusReducer(state);
        case Actions.UNDO:
            return undoReducer(state);
        case Actions.REDO:
            return redoReducer(state);
        case Actions.SWIPE_SLIDE_SHOW_SLIDE:
            return action.slideShowCurrentSlide !== undefined && action.direction !== undefined ? swipeSlideShowSlideReducer(state, action.slideShowCurrentSlide, action.direction) : deepClone(state) as Editor;
        default:
            return deepClone(state) as Editor;
    }
}

export {editorReducer, addActionToHistoryReducer}