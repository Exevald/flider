import {Presentation, Slide} from "../../model/Types";

/*          Константы           */
const DEFAULT_SLIDE_CONFIG: Slide = {
    id: "0",
    items: [],
    bgColor: "white",
}

function createSlide(
    presentation: Presentation,
): Presentation {

    const slide: Slide = {
        id: "0",
        items: [],
        bgColor: "white"
    }

    console.log("create slide");

    return {
        ...presentation
    }

}

export {DEFAULT_SLIDE_CONFIG}
export {createSlide};