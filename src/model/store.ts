import {Editor} from "../core/types/types";
import {presentationReducer} from "./presentation";
import {editorReducer, addActionToHistoryReducer} from "./editor";
import { legacy_createStore as createStore} from 'redux'

let initialState: Editor = {
    presentation: {
        title: "",
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

function mainReducer(state: Editor = initialState, action: ActionType) {
    const indexCurrentSlide: number = state.presentation.slides.findIndex(slide => slide.id === state.presentation.selectedSlidesIds[0]);
    const newState: Editor = editorReducer(state, action);
    newState.presentation = presentationReducer(newState.presentation, action);
    return newState
}

let store = createStore(mainReducer, initialState)

export type AppDispatch = typeof store.dispatch

export {initialState, store}
export type {ActionType}