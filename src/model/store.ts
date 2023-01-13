import {
    Actions,
    EditorType,
    PointType,
    ShapeType,
    SlideState
} from "../core/types/types";
import {presentationReducer} from "./presentation";
import {addActionToHistoryReducer, editorReducer} from "./editor";
import {legacy_createStore as createStore} from 'redux'
import {copy, deleteItems, deleteSlides, openPresentation, paste, redo, undo} from "./actionCreators";
import {deepClone} from "../core/functions/deepClone";
import {slideReducer} from "./slide";
import {INITIAL_STATE} from "../core/functions/utility";


type ActionType = {
    type: string,
    title?: string,
    slideId?: string,
    orderShift?: number,
    backgroundColor?: string,
    element?: string,
    itemId?: string,
    addFigureParams?: {
        shape: ShapeType,
        color: string,
        coordinates: PointType,
    }
    addImageParams?: {
        imageSrc: string,
        coordinates: PointType,
    }
    addTextParams?: {
        fontFamily: string,
        fontSize: number,
        fontColor: string,
        value: string,
        coordinates: PointType,
    }
    moveItemCoordinates?: {
        shiftX: number,
        shiftY: number
    },
    scaleItemParams?: {
        shiftX: number,
        shiftY: number,
        newWidth: number,
        newHeight: number,
    },
    ChangeTextParams?: {
        font?: string
        textColor?: string,
        textValue?: string,
        fontSize?: number,
        fontWeight?: number,
    },
    urlSrc?: string,
    newWidth?: number,
    newColor?: string,
    newEditor?: EditorType,
    slideShowCurrentSlide?: number,
    direction?: string,
    clientX?: number,
    clientY?: number,
    newSlideState?: SlideState,
    newCurrentFigureType?: ShapeType,
    newFontState?: string,
    newFontSize?: string,
    newTextValue?: string,
    newFontFamily?: string,
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
                    const newEditor: EditorType = deepClone(JSON.parse(reader.result)) as EditorType;
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
        const deleteSlideHotKey: boolean = (event.code === "Delete");
        const deleteItemHotKey: boolean = (event.ctrlKey) && (event.code === "Delete");
        if (undoHotKey) {
            store.dispatch(undo())
        }
        if (redoHotKey) {
            store.dispatch(redo())
        }
        if (deleteSlideHotKey) {
            store.dispatch(deleteSlides())
        }
        if (deleteItemHotKey) {
            store.dispatch(deleteItems())
        }
        if (copyHotKey) {
            store.dispatch(copy())
        }
        if (pasteHotKey) {
            store.dispatch(paste())
        }
    })
}

function mainReducer(state: EditorType = INITIAL_STATE, action: ActionType) {
    const savePresentation: boolean = action.type !== Actions.SAVE_PRESENTATION
    const actionUndo: boolean = action.type !== Actions.UNDO;
    const actionRedo: boolean = action.type !== Actions.REDO;
    const actionCreatePresentation: boolean = action.type !== Actions.CREATE_PRESENTATION
    const openPresentation: boolean = action.type !== Actions.OPEN_PRESENTATION
    const addActionInHistory: boolean = (actionUndo) && (actionRedo) && (actionCreatePresentation) && (savePresentation) && (openPresentation)
    const selectedSlideIndex: number = state.presentation.slides.findIndex(slide => slide.id === state.presentation.selectedSlidesIds[0])
    const newState: EditorType = editorReducer(state, action);

    if (addActionInHistory) {
        newState.history = addActionToHistoryReducer(state);
    }
    newState.presentation.slides.splice(selectedSlideIndex, 1, slideReducer(newState.presentation.slides[selectedSlideIndex], action))
    newState.presentation = presentationReducer(newState.presentation, action);
    return newState
}

const store = createStore(mainReducer, INITIAL_STATE)

export type AppDispatcher = typeof store.dispatch

export {store, addHotKeys, loadPresentation}
export type {ActionType}