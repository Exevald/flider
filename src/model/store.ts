import {
    Actions,
    AreaType,
    EditorType,
    ItemType,
    PointType,
    ShapeType,
    SlideState,
    TextAreaType
} from "../core/types/types";
import {presentationReducer} from "./presentation";
import {addActionToHistoryReducer, editorReducer} from "./editor";
import {legacy_createStore as createStore} from 'redux'
import {copy, deleteItems, deleteSlides, openPresentation, paste, redo, undo} from "./actionCreators";
import {deepClone} from "../core/functions/deepClone";
import {slideReducer} from "./slide";

let initialState: EditorType = {
    presentation: {
        title: "Имя презентации",
        slides: [
            {
                id: "0",
                items: [],
                bgColor: "white",
                selectedItemsIds: ["0"],
                currentState: SlideState.SELECT_ITEM,
                currentFigureType: ShapeType.NoShape,
            },
        ],
        selectedSlidesIds: ["0"],
        currentColor: "black",
        currentFontSize: 14,
    },
    history: {
        undoStack: [],
        redoStack: []
    },
    buffers: {
        slideBuffer: [],
        itemBuffer: []
    },
    slideShowStatus: false,
    slideShowCurrentSlideIndex: 0,
    currentClientX: 0,
    currentClientY: 0,
}

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
    newTextValue?: string,
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

function mainReducer(state: EditorType = initialState, action: ActionType) {
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

const store = createStore(mainReducer, initialState)

export type AppDispatcher = typeof store.dispatch

export {store, addHotKeys, initialState, loadPresentation}
export type {ActionType}