import {Editor, History, Presentation} from "../core/types/types";
import {ActionType, initialState} from "./store";
import {deepClone} from "../core/functions/deepClone";

function addActionToHistoryReducer(editor: Editor): History {
    const newHistory = deepClone(editor.history) as History;
    const presentation = deepClone(editor.presentation) as Presentation;
    if (newHistory.undoStack.length === 100) {
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
        case 'CREATE_PRESENTATION':
            return createPresentationReducer()
        // case 'SAVE_PRESENTATION':
        //     return savePresentationReducer(state)
        case 'UNDO':
            return undoReducer(state)
        case 'REDO':
            return redoReducer(state)
        default:
            return deepClone(state) as Editor
    }
}

export {editorReducer, addActionToHistoryReducer}