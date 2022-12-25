import {Slide, Item, Actions} from "../core/types/types";
import {getRandomId} from "../core/functions/utility";
import {deepClone} from "../core/functions/deepClone";
import {ActionType} from "./store";

function setBackgroundColorReducer(slide: Slide, backgroundColor: string): Slide {
    const newSlide = deepClone(slide) as Slide;
    return {
        ...newSlide,
        bgColor: backgroundColor
    }
}

function slideReducer(state: Slide, action: ActionType): Slide {
    switch (action.type) {
        case Actions.SET_BACKGROUND_COLOR:
            return action.backgroundColor !== undefined ? setBackgroundColorReducer(state, action.backgroundColor) : deepClone(state) as Slide;
        default:
            return deepClone(state) as Slide;
    }
}

export {slideReducer}