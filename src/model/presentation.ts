import {Actions, PresentationType, ShapeType, SlideType, SlideState} from "../core/types/types";
import {ActionType} from "./store";
import {deepClone} from "../core/functions/deepClone";
import {getRandomId} from "../core/functions/utility";

function changeTitleReducer(presentation: PresentationType, title: string): PresentationType {
    const newPresentation = deepClone(presentation) as PresentationType;
    return {
        ...newPresentation,
        title: title,
    }
}

function createSlideReducer(presentation: PresentationType): PresentationType {
    const newPresentation = deepClone(presentation) as PresentationType;
    const newSlides = deepClone(newPresentation.slides) as Array<SlideType>;
    newSlides.push({
        id: getRandomId(),
        items: [],
        bgColor: "white",
        selectedItemsIds: [],
        currentState: SlideState.SELECT_ITEM,
        currentFigureType: ShapeType.Rectangle,
    });
    return {
        ...newPresentation,
        slides: newSlides
    }
}

function deleteSlidesReducer(presentation: PresentationType): PresentationType {
    const newPresentation = deepClone(presentation) as PresentationType;
    const newSlides = deepClone(newPresentation.slides) as Array<SlideType>;
    newPresentation.selectedSlidesIds.forEach(idToDelete => {
        if (newSlides.length >= 2) {
            const slidesToDelete = newSlides.findIndex(slide => slide.id === idToDelete);
            newSlides.splice(slidesToDelete, 1)
        }
    })
    return {
        ...newPresentation,
        slides: newSlides,
        selectedSlidesIds: [newSlides[0].id],
    }
}

function selectSlideReducer(presentation: PresentationType, slideId: string): PresentationType {
    const newPresentation = deepClone(presentation) as PresentationType;
    const newSelectedSlidesIds = presentation.selectedSlidesIds.concat(slideId);
    return {
        ...newPresentation,
        selectedSlidesIds: newSelectedSlidesIds
    }
}

function deselectReducer(presentation: PresentationType, slideId: string) {
    const newPresentation = deepClone(presentation) as PresentationType;
    const deselectItem = presentation.selectedSlidesIds.indexOf(slideId);
    const newSelectedSlidesIds = presentation.selectedSlidesIds.concat();
    newSelectedSlidesIds.splice(deselectItem, 1);
    return {
        ...newPresentation,
        selectedSlidesIds: newSelectedSlidesIds
    }
}

function selectManySlidesReducer(presentation: PresentationType, slideId: string): PresentationType {
    const newPresentation = deepClone(presentation) as PresentationType;
    const newSelectedSlidesIds = presentation.selectedSlidesIds.concat();
    let firstIndex = newPresentation.slides.findIndex(slide => slide.id === newSelectedSlidesIds[newSelectedSlidesIds.length - 1])
    let indexSelected = newPresentation.slides.findIndex(slide => slide.id === slideId)
    if (indexSelected < firstIndex) {
        [firstIndex, indexSelected] = [indexSelected - 1, firstIndex - 1];
    }
    for (let i = firstIndex + 1; i <= indexSelected; i++) {
        newSelectedSlidesIds.push(newPresentation.slides[i].id)
    }
    return {
        ...newPresentation,
        selectedSlidesIds: newSelectedSlidesIds
    }
}

function switchSlideReducer(presentation: PresentationType, slideId: string): PresentationType {
    const newPresentation = deepClone(presentation) as PresentationType;
    const slideIndex = newPresentation.slides.findIndex(slide => slide.id === newPresentation.selectedSlidesIds[0])
    newPresentation.slides[slideIndex].selectedItemsIds = [];
    return {
        ...newPresentation,
        selectedSlidesIds: [slideId]
    }
}

function changeSelectedColorReducer(presentation: PresentationType, newColor: string): PresentationType {
    const newPresentation = deepClone(presentation) as PresentationType;
    return {
        ...newPresentation,
        currentColor: newColor,
    }
}

function presentationReducer(state: PresentationType, action: ActionType): PresentationType {
    switch (action.type) {
        case Actions.CHANGE_TITLE:
            return action.title !== undefined ? changeTitleReducer(state, action.title) : deepClone(state) as PresentationType;
        case Actions.CREATE_SLIDE:
            return createSlideReducer(state);
        case Actions.CHANGE_SELECTED_COLOR:
            return action.newColor ? changeSelectedColorReducer(state, action.newColor) : deepClone(state) as PresentationType;
        case Actions.DELETE_SLIDE:
            return deleteSlidesReducer(state);
        case Actions.SELECT_SLIDE:
            return action.slideId !== undefined ? selectSlideReducer(state, action.slideId) : deepClone(state) as PresentationType;
        case Actions.DESELECT_SLIDE:
            return action.slideId !== undefined ? deselectReducer(state, action.slideId) : deepClone(state) as PresentationType;
        case Actions.SELECT_MANY_SLIDES:
            return action.slideId !== undefined ? selectManySlidesReducer(state, action.slideId) : deepClone(state) as PresentationType;
        case Actions.SWITCH_SLIDE:
            return action.slideId !== undefined ? switchSlideReducer(state, action.slideId) : deepClone(state) as PresentationType;
        default:
            return deepClone(state) as PresentationType
    }
}

export {presentationReducer}
