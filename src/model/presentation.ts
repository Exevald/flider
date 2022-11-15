import {Presentation, Slide} from "../core/types/types";
import {ActionType} from "./store";
import {deepClone} from "../core/functions/deepClone";
import {DEFAULT_SLIDE_CONFIG} from "../core/functions/utility";

function changeTitleReducer(presentation: Presentation, title: string): Presentation {
    const newPresentation = deepClone(presentation) as Presentation;
    return {
        ...newPresentation,
        title: title,
    }
}

function createSlideReducer(presentation: Presentation): Presentation {
    const newPresentation = deepClone(presentation) as Presentation;
    const newSlides = deepClone(presentation) as Array<Slide>
    newSlides.push(DEFAULT_SLIDE_CONFIG)
    return {
        ...newPresentation,
        slides: newSlides,
    }
}

function presentationReducer(state: Presentation, action: ActionType): Presentation {
    switch (action.type) {
        case 'CHANGE_TITLE':
            return action.newTitle !== undefined ? changeTitleReducer(state, action.newTitle) : deepClone(state) as Presentation
        case 'CREATE_SLIDE':
            return createSlideReducer(state)
        default:
            return deepClone(state) as Presentation
    }
}

export {presentationReducer}
