import {Area, Id} from "../types/types";
import styles from "../../view/components/DropDown/DropDown.module.css";
import figureStyles from "./../../view/components/DropDown/DropDown.module.css"

const COLOR_PICKER_COLORS = [
    "white", "whitesmoke", "darkgray", "gray", "black",
    "yellow", "orange", "darkorange", "crimson", "red",
    "chartreuse", "Lime", "limegreen", "green", "darkgreen",
    "aquamarine", "cyan", "dodgerblue", "blue", "navy",
    "navajowhite", "burlywood", "goldenrod", "saddlebrown", "maroon",
    "plum", "violet", "magenta", "darkviolet", "purple"
];

// надо менять ещё и в css стиле
const DROPDOWN_ANIMATION_TIME = 220; //ms

const DEFAULT_STOCKS = [
    {
        name: 'Shutterstock',
        url: 'https://www.shutterstock.com'
    },
    {
        name: 'Getty Images',
        url: 'https://www.gettyimages.com'
    },
    {
        name: 'Adobe Stock',
        url: 'https://stock.adobe.com/ru/'
    },
    {
        name: 'Dreamstime',
        url: 'https://www.dreamstime.com'
    },
    {
        name: '123RF',
        url: 'https://ru.123rf.com'
    },
    {
        name: 'Фотодженика',
        url: 'https://photogenica.ru'
    }
];

// для новых фигур надо изменять модель и стили включительно!
const DEFAULT_FIGURES = [
    {
        name: 'Rectangle',
        modelId: 0
    },
    {
        name: 'Triangle',
        modelId: 1
    },
    {
        name: 'Arc',
        modelId: 2
    },
    {
        name: 'Star',
        modelId: 3
    },
];
let DEFAULT_FIGURES_STYLES = [figureStyles.shapeRectangle, figureStyles.shapeArc, figureStyles.shapeTriangle,
    figureStyles.shapesStar];

const MAX_HISTORY_SIZE = 30;
const MAX_TITLE_SIZE = 12;

const CANVAS_SETTINGS = {
    width: 1280,
    height: 720,
}

const SIDEBAR_SETTINGS = {
    width: 180,
    height: 111,
}

function getRandomId(): Id {
    let id: Id = '';
    const vocabulary = 'abdehkmnpswxzABDEFGHKMNPQRSTWXZ123456789';
    const idLength = 32;

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

export {
    MAX_HISTORY_SIZE,
    COLOR_PICKER_COLORS,
    MAX_TITLE_SIZE,
    DROPDOWN_ANIMATION_TIME,
    CANVAS_SETTINGS,
    DEFAULT_STOCKS,
    DEFAULT_FIGURES, DEFAULT_FIGURES_STYLES,
    SIDEBAR_SETTINGS
};
export {getRandomId, min, max, getBase64FromPicture};