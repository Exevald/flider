import {Editor} from "../core/types/types";
import {presentationReducer} from "./presentation";
import {addActionToHistoryReducer, editorReducer} from "./editor";
import {legacy_createStore as createStore} from 'redux'
import {deleteSlides, redo, undo} from "./actionCreators";
import {deepClone} from "../core/functions/deepClone";
import {openPresentation} from "./actionCreators";
import {Actions} from "../core/types/types";
import {slideReducer} from "./slide";

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
        selectedSlidesIds: ["0"],
        currentColor: "white",
    },
    history: {
        undoStack: [],
        redoStack: []
    },
    slideShowStatus: false,
    slideShowCurrentSlideIndex: 0,
}

type ActionType = {
    type: string,
    title?: string,
    slideId?: string,
    orderShift?: number,
    backgroundColor?: string,
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
    newEditor?: Editor,
    slideShowCurrentSlide?: number,
    direction?: string,
}

function loadPresentation() {
    const inputFile: HTMLInputElement = document.createElement('input')
    inputFile.type = 'file';
    inputFile.style.display = 'none';
    inputFile.accept = 'application/json';
    inputFile.onchange = () => {
        if (inputFile.files) {
            const fileEditor: File = inputFile.files[0];
            const reader: FileReader = new FileReader();
            reader.readAsText(fileEditor);
            reader.onload = () => {
                if (typeof reader.result === 'string') {
                    const newEditor: Editor = deepClone(JSON.parse(reader.result)) as Editor;
                    store.dispatch(openPresentation(newEditor));
                }
            };
        }
    }
    inputFile.click();
    inputFile.remove();
}

function addHotKeys() {
    window.addEventListener("keydown", (event) => {
        const undoHotKey: boolean = (event.ctrlKey) && (event.code === "KeyZ");
        const redoHotKey: boolean = (event.ctrlKey) && (event.code === "KeyY");
        const copyHotKey: boolean = (event.ctrlKey) && (event.code === "KeyC");
        const pasteHotKey: boolean = (event.ctrlKey) && (event.code === "KeyV");
        const deleteKey: boolean = (event.code === "Delete");

        if (undoHotKey) {
            store.dispatch(undo())
        }
        if (redoHotKey) {
            store.dispatch(redo())
        }
        if (deleteKey) {
            store.dispatch(deleteSlides())
        }
    })
}

function mainReducer(state: Editor = initialState, action: ActionType) {
    const savePresentation: boolean = action.type !== Actions.SAVE_PRESENTATION
    const actionUndo: boolean = action.type !== Actions.UNDO;
    const actionRedo: boolean = action.type !== Actions.REDO;
    const actionCreatePresentation: boolean = action.type !== Actions.CREATE_PRESENTATION
    const openPresentation: boolean = action.type !== Actions.OPEN_PRESENTATION
    const addActionInHistory: boolean = (actionUndo) && (actionRedo) && (actionCreatePresentation) && (savePresentation) && (openPresentation)
    const selectedSlideIndex: number = state.presentation.slides.findIndex(slide => slide.id === state.presentation.selectedSlidesIds[0])
    const newState: Editor = editorReducer(state, action);

    if (addActionInHistory) {
        newState.history = addActionToHistoryReducer(state);
    }
    newState.presentation.slides.splice(selectedSlideIndex, 1, slideReducer(newState.presentation.slides[selectedSlideIndex], action))
    newState.presentation = presentationReducer(newState.presentation, action);
    return newState
}

const store = createStore(mainReducer, initialState)

export type AppDispatcher = typeof store.dispatch

export {store, addHotKeys, initialState, loadPresentation}
export type {ActionType}