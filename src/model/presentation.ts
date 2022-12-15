import {Presentation, Slide} from "../core/types/types";
import {ActionType} from "./store";
import {deepClone} from "../core/functions/deepClone";
import {getRandomId} from "../core/functions/utility";

function changeTitleReducer(presentation: Presentation, title: string): Presentation {
    const newPresentation = deepClone(presentation) as Presentation;
    return {
        ...newPresentation,
        title: title,
    }
}

function createSlideReducer(presentation: Presentation): Presentation {
    const newPresentation = deepClone(presentation) as Presentation;
    const newSlides = deepClone(newPresentation.slides) as Array<Slide>;
    newSlides.push({
        id: getRandomId(),
        items: [],
        bgColor: "white",
        selectedItemsIds: []
    });
    return {
        ...newPresentation,
        slides: newSlides
    }
}

function deleteSlidesReducer(presentation: Presentation): Presentation {
    const newPresentation = deepClone(presentation) as Presentation;
    const newSlides = deepClone(newPresentation.slides) as Array<Slide>;
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

function selectSlideReducer(presentation: Presentation, slideId: string): Presentation {
    const newPresentation = deepClone(presentation) as Presentation;
    const newSelectedSlidesIds = presentation.selectedSlidesIds.concat(slideId);
    return {
        ...newPresentation,
        selectedSlidesIds: newSelectedSlidesIds
    }
}

function deselectReducer(presentation: Presentation, slideId: string) {
    const newPresentation = deepClone(presentation) as Presentation;
    const deselectItem = presentation.selectedSlidesIds.indexOf(slideId);
    const newSelectedSlidesIds = presentation.selectedSlidesIds.concat();
    newSelectedSlidesIds.splice(deselectItem, 1);
    return {
        ...newPresentation,
        selectedSlidesIds: newSelectedSlidesIds
    }
}

function selectManySlidesReducer(presentation: Presentation, slideId: string): Presentation {
    const newPresentation = deepClone(presentation) as Presentation;
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

function switchSlideReducer(presentation: Presentation, slideId: string): Presentation {
    const newPresentation = deepClone(presentation) as Presentation;
    const slideIndex = newPresentation.slides.findIndex(slide => slide.id === newPresentation.selectedSlidesIds[0])
    newPresentation.slides[slideIndex].selectedItemsIds = [];
    return {
        ...newPresentation,
        selectedSlidesIds: [slideId]
    }
}

function presentationReducer(state: Presentation, action: ActionType): Presentation {
    switch (action.type) {
        case 'CHANGE_TITLE':
            return action.title !== undefined ? changeTitleReducer(state, action.title) : deepClone(state) as Presentation
        case 'CREATE_SLIDE':
            return createSlideReducer(state);
        case 'DELETE_SLIDE':
            return deleteSlidesReducer(state);
        case 'SELECT_SLIDE':
            return action.slideId !== undefined ? selectSlideReducer(state, action.slideId) : deepClone(state) as Presentation;
        case 'DESELECT_SLIDE':
            return action.slideId !== undefined ? deselectReducer(state, action.slideId) : deepClone(state) as Presentation;
        case 'SELECT_MANY_SLIDES':
            return action.slideId !== undefined ? selectManySlidesReducer(state, action.slideId) : deepClone(state) as Presentation;
        case 'SWITCH_SLIDE':
            return action.slideId !== undefined ? switchSlideReducer(state, action.slideId) : deepClone(state) as Presentation;
        default:
            return deepClone(state) as Presentation
    }
}

export {presentationReducer}
