import {Slide} from "../../model/Types";

const DEFAULT_SLIDE_CONFIG: Slide = {
    id: "0",
    items: [],
    bgColor: "white",
}

const DEFAULT_PRESENTATION_CONFIG = {
    slides: [DEFAULT_SLIDE_CONFIG],
    title: 'Unnamed',
    selected: [],
    actions: {
        history: [],
    },
}

export {DEFAULT_SLIDE_CONFIG, DEFAULT_PRESENTATION_CONFIG}