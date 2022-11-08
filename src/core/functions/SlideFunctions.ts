import {Presentation, Slide} from "../../model/Types";

function createSlide(
    presentation: Presentation,
): Presentation {

    const slide: Slide = {
        id: "0",
        items: [],
        bgColor: "white"
    }

    return {
        ...presentation
    }

}

export {createSlide};