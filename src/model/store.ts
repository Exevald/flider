import {Editor} from "../core/types/types";
import {presentationReducer} from "./presentation";
import {editorReducer, addActionToHistoryReducer} from "./editor";
import {legacy_createStore as createStore} from 'redux'
import {redo, undo} from "./actionCreators";

let initialState: Editor = {
    presentation: {
        title: "Имя презентации",
        slides: [
            {
                id: "0",
                items: [],
                bgColor: "white",
                selectedItemsIds: ["0"],
            },
        ],
        selectedSlidesIds: ["0"]
    },
    history: {
        undoStack: [],
        redoStack: []
    },
    statePreview: false
}

type ActionType = {
    type: string,
    newTitle?: string,
    slideId?: string,
    orderShift?: number,
    background?: string,
    element?: string,
    elementId?: string,
    addObjectArgs?: {
        element: string,
        textValue?: string
    }
    changeAngleArgs?: {
        angleShift: number
    },
    changePositionCoordinates?: {
        xShift: number,
        yShift: number
    },
    ChangeSizeArgs?: {
        newWidth: number,
        newHeight: number,
        xShift: number,
        yShift: number
    },
    ChangeTextArgs?: {
        font?: string
        textColor?: string,
        textValue?: string,
        fontSize?: number,
        fontWeight?: number,
        align?: "left" | "center" | "right"
    },
    urlImage?: string,
    newWidth?: number,
    newColor?: string,
    newEditor?: Editor
}

function addHotKeys() {
    window.addEventListener("keydown", (event) => {
        const undoHotKey = (event.ctrlKey) && (event.code === "KeyZ")
        const redoHotKey = (event.ctrlKey) && (event.code === "KeyY")
        const copyHotKey = (event.ctrlKey) && (event.code === "KeyC")
        const pasteHotKey = (event.ctrlKey) && (event.code === "KeyV")
        if (undoHotKey) {
            store.dispatch(undo())
        }
        if (redoHotKey) {
            store.dispatch(redo())
        }
    })
}

function mainReducer(state: Editor = initialState, action: ActionType) {
    const actionUndo = action.type !== 'UNDO';
    const actionRedo = action.type !== 'REDO';
    const addActionInHistory: boolean = (actionUndo) && (actionRedo)
    const newState: Editor = editorReducer(state, action);
    if (addActionInHistory) {
        newState.history = addActionToHistoryReducer(state)
    }
    newState.presentation = presentationReducer(newState.presentation, action);
    return newState
}

const store = createStore(mainReducer, initialState)

export type AppDispatcher = typeof store.dispatch

export {store, addHotKeys}
export type {ActionType}