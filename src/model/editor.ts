import {Editor, History, Presentation, Slide, Item} from "../core/types/types";
import {ActionType} from "./store";
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
        case 'UNDO':
            return undoReducer(state)
        case 'REDO':
            return redoReducer(state)
        default:
            return deepClone(state) as Editor
    }
}

export {editorReducer, addActionToHistoryReducer}