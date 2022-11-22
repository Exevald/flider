import {Editor} from "../core/types/types";

function createSlide() {
    return {
        type: 'CREATE_SLIDE'
    }
}

function switchSlide(slideId: string) {
    return {
        type: 'SWITCH_SLIDE',
        slideId,
    }
}

export {createSlide, switchSlide}