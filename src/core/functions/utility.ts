import {Area, Id} from "../types/types";

const COLOR_PICKER_COLORS = [
    "white", "whitesmoke", "gray", "darkgray", "black",
    "yellow", "orange", "darkorange", "red", "darkred"
];

// надо менять ещё и в css стиле
const DROPDOWN_ANIMATION_TIME = 220; //ms

const MAX_HISTORY_SIZE = 30;
const MAX_TITLE_SIZE = 12;

const CANVAS_SETTINGS = {
    width: 1280,
    height: 720,
}

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

function getBase64FromPicture(src: string, size: Area): Promise<string> {
    return new Promise((resolve) => {
        const img: HTMLImageElement = new Image(size.width, size.height);
        img.src = src;
        img.crossOrigin = 'use-credentials';
        img.onload = () => {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            canvas.width = img.naturalWidth;
            canvas.height = img.naturalHeight;
            if (ctx)
                ctx.drawImage(img, 0, 0);
            const uri = canvas.toDataURL('image/png', 1.0);
            resolve(uri);
        };
    });
}

export {MAX_HISTORY_SIZE, COLOR_PICKER_COLORS, MAX_TITLE_SIZE, DROPDOWN_ANIMATION_TIME, CANVAS_SETTINGS};
export {getRandomId, min, max, getBase64FromPicture};