import {EditorType, HistoryType, Item, PresentationType, SlideType} from "../core/types/types";
import {ActionType, initialState} from "./store";
import {deepClone} from "../core/functions/deepClone";
import {getRandomId, MAX_HISTORY_SIZE} from "../core/functions/utility";
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
    return newEditor
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

function setCurrentMouseCoordinatesReducer(editor: EditorType, clientX: number, clientY: number): EditorType {
    const newEditor = deepClone(editor) as EditorType;
    return {
        ...newEditor,
        currentClientX: clientX,
        currentClientY: clientY,
    }
}

function copyReducer(editor: EditorType): EditorType {
    const newEditor = deepClone(editor) as EditorType;
    newEditor.buffers.slideBuffer = [];
    newEditor.buffers.itemBuffer = [];
    const slideIndex = newEditor.presentation.slides.findIndex(slide => slide.id === newEditor.presentation.selectedSlidesIds[0])
    if (newEditor.presentation.slides[slideIndex].selectedItemsIds.length > 0) {
        newEditor.presentation.slides[slideIndex].items.forEach(item => {
            if (newEditor.presentation.slides[slideIndex].selectedItemsIds.includes(item.id)) {
                const newElement = deepClone(item) as Item;
                newEditor.buffers.itemBuffer.push(newElement)
            }
        })
    } else {
        newEditor.presentation.slides.forEach(slide => {
            if (newEditor.presentation.selectedSlidesIds.includes(slide.id)) {
                const newSlide = deepClone(slide) as SlideType;
                newEditor.buffers.slideBuffer.push(newSlide)
            }
        })
    }
    return newEditor
}

function pasteReducer(editor: EditorType): EditorType {
    const newEditor = deepClone(editor) as EditorType;
    if (newEditor.buffers.itemBuffer.length > 0) {
        const slideIndex = newEditor.presentation.slides.findIndex(slide => slide.id === newEditor.presentation.selectedSlidesIds[0])
        newEditor.buffers.itemBuffer.forEach(item => {
            const newElement = deepClone(item) as Item;
            newElement.id = getRandomId()
            newElement.coordinates = {
                x: newElement.coordinates.x + 20,
                y: newElement.coordinates.y + 20,
            }
            newEditor.presentation.slides[slideIndex].items.push(newElement);
            item.coordinates = {
                x: item.coordinates.x + 10,
                y: item.coordinates.y + 10
            }
        })
    } else {
        newEditor.buffers.slideBuffer.forEach(slide => {
            const newSlide = deepClone(slide) as SlideType;
            newSlide.id = getRandomId();
            newSlide.items.forEach(item => item.id = getRandomId())
            newEditor.presentation.slides.push(newSlide)
        })
    }
    return newEditor
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
        case Actions.COPY:
            return copyReducer(state);
        case Actions.PASTE:
            return pasteReducer(state);
        case Actions.SET_CURRENT_CURSOR_POSITION:
            return action.clientX !== undefined && action.clientY !== undefined ? setCurrentMouseCoordinatesReducer(state, action.clientX, action.clientY) : deepClone(state) as EditorType;
        case Actions.SWIPE_SLIDE_SHOW_SLIDE:
            return action.slideShowCurrentSlide !== undefined && action.direction !== undefined ? swipeSlideShowSlideReducer(state, action.slideShowCurrentSlide, action.direction) : deepClone(state) as EditorType;
        default:
            return deepClone(state) as EditorType;
    }
}

export {editorReducer, addActionToHistoryReducer}