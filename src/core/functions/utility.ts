import {Id, Presentation, Slide} from "../types/types";

const CREATE_PRESENTATION = 'CREATE_PRESENTATION';
const SAVE_PRESENTATION = 'SAVE_PRESENTATION';
const OPEN_PRESENTATION = 'OPEN_PRESENTATION';
const CHANGE_SLIDE_SHOW_STATUS = 'CHANGE_SLIDE_SHOW_SLIDE';
const UNDO = 'UNDO';
const REDO = 'REDO';
const CHANGE_TITLE = 'CHANGE_TITLE';
const CREATE_SLIDE = 'CREATE_SLIDE';
const DELETE_SLIDE = 'DELETE_SLIDE';
const SELECT_SLIDE = 'SELECT_SLIDE';
const DESELECT_SLIDE = 'DESELECT_SLIDE';
const SELECT_MANY_SLIDES = 'SELECT_MANY_SLIDES';
const SWITCH_SLIDE = 'SWITCH_SLIDE';

const COLOR_PICKER_COLORS = [
    "white", "whitesmoke", "gray", "darkgray", "black",
    "yellow", "orange", "darkorange", "red", "darkred"
];

const MAX_HISTORY_SIZE = 100;

function getRandomId(): Id {
    let id: Id = '';
    let vocabulary = 'abdehkmnpswxzABDEFGHKMNPQRSTWXZ123456789';
    let idLength = 32;

    while (id.length < idLength) {
        id += vocabulary[Math.floor(Math.random() * vocabulary.length)];
    }
    return id;
}

export {MAX_HISTORY_SIZE, COLOR_PICKER_COLORS};
export {getRandomId};
export {CREATE_PRESENTATION, OPEN_PRESENTATION, SAVE_PRESENTATION, CHANGE_SLIDE_SHOW_STATUS, UNDO, REDO}
export {CHANGE_TITLE, CREATE_SLIDE, DELETE_SLIDE, SELECT_SLIDE, DESELECT_SLIDE, SELECT_MANY_SLIDES, SWITCH_SLIDE}