import {Presentation, Slide} from "../../model/Types";
import {DEFAULT_PRESENTATION_CONFIG, DEFAULT_SLIDE_CONFIG} from "./UtilityFunctions";

function createSlide(
    presentation: Presentation,
): Presentation {

    presentation.slides.push(DEFAULT_SLIDE_CONFIG);

    console.log("create slide");

    return {
        ...presentation
    }

}

export {createSlide};