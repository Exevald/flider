import {Id} from "../types/types";

const COLOR_PICKER_COLORS = [
    "white", "whitesmoke", "gray", "darkgray", "black",
    "yellow", "orange", "darkorange", "red", "darkred"
];

// надо менять ещё и в css стиле
const DROPDOWN_ANIMATION_TIME = 220; //ms

const MAX_HISTORY_SIZE = 30;
const MAX_TITLE_SIZE = 12;

function getRandomId(): Id {
    let id: Id = '';
    let vocabulary = 'abdehkmnpswxzABDEFGHKMNPQRSTWXZ123456789';
    let idLength = 32;

    while (id.length < idLength) {
        id += vocabulary[Math.floor(Math.random() * vocabulary.length)];
    }
    return id;
}

function min(a: number, b: number): number {
    return a < b ? a : b;
}

function max(a: number, b: number): number {
    return a > b ? a : b;
}

export {MAX_HISTORY_SIZE, COLOR_PICKER_COLORS, MAX_TITLE_SIZE, DROPDOWN_ANIMATION_TIME};
export {getRandomId, min, max};