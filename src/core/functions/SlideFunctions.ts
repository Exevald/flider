import {Presentation, Slide} from "../../model/Types";
import {DEFAULT_SLIDE_CONFIG} from "./UtilityFunctions";

function createSlide(
    presentation: Presentation,
): Presentation {

    const slide: Slide = DEFAULT_SLIDE_CONFIG;

    console.log("create slide");

    return {
        ...presentation
    }

}

export {createSlide};