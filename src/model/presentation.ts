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
            newSlides.splice(newSlides.findIndex(slide => slide.id === idToDelete), 1)
        }
    })
    return {
        ...newPresentation
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
        case 'SET_TITLE':
            return action.newTitle !== undefined ? changeTitleReducer(state, action.newTitle) : deepClone(state) as Presentation;
        case 'CREATE_SLIDE':
            return createSlideReducer(state);
        case 'SWITCH_SLIDE':
            return action.slideId !== undefined ? switchSlideReducer(state, action.slideId) : deepClone(state) as Presentation;
        default:
            return deepClone(state) as Presentation
    }
}

export {presentationReducer}
