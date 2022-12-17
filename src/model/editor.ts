import {Editor, History, Presentation} from "../core/types/types";
import {ActionType, initialState} from "./store";
import {deepClone} from "../core/functions/deepClone";
import {
    CHANGE_SLIDE_SHOW_STATUS,
    CREATE_PRESENTATION,
    OPEN_PRESENTATION, REDO,
    SAVE_PRESENTATION, UNDO,
    MAX_HISTORY_SIZE
} from "../core/functions/utility";

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
        case CREATE_PRESENTATION:
            return createPresentationReducer()
        case SAVE_PRESENTATION:
            return savePresentationReducer(state)
        case OPEN_PRESENTATION:
            return action.newEditor !== undefined ? openPresentationReducer(state, action.newEditor) : deepClone(state) as Editor
        case CHANGE_SLIDE_SHOW_STATUS:
            return changeSlideShowStatusReducer(state)
        case UNDO:
            return undoReducer(state)
        case REDO:
            return redoReducer(state)
        default:
            return deepClone(state) as Editor
    }
}

export {editorReducer, addActionToHistoryReducer}