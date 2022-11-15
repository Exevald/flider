import {Id, Presentation, Slide} from "../types/types";

const DEFAULT_SLIDE_CONFIG: Slide = {
    id: getRandomId(),
    items: [],
    bgColor: "white",
    selectedItemsIds: ["0"]
};

const DEFAULT_PRESENTATION_CONFIG: Presentation = {
    slides: [DEFAULT_SLIDE_CONFIG],
    title: 'Unnamed',
    selectedSlidesIds: [],
};

const MAX_HISTORY_SIZE = 30;

function getRandomId(): Id {
    let id: Id = '';
    let vocabulary = 'abdehkmnpswxzABDEFGHKMNPQRSTWXZ123456789';
    let idLength = 32;

    while (id.length < idLength) {
        id += vocabulary[Math.floor(Math.random() * vocabulary.length)];
    }
    return id;
}

export {DEFAULT_SLIDE_CONFIG, DEFAULT_PRESENTATION_CONFIG, MAX_HISTORY_SIZE};
export {getRandomId};