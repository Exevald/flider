import {AreaType, EditorType, IdType, ShapeType, SlideState} from "../types/types";
import figureStyles from "./../../view/components/DropDown/DropDown.module.css"

let INITIAL_STATE: EditorType = {
    presentation: {
        title: "Имя презентации",
        slides: [
            {
                id: "0",
                items: [],
                bgColor: "white",
                selectedItemsIds: ["0"],
                currentState: SlideState.SELECT_ITEM,
                currentFigureType: ShapeType.NoShape,
            },
        ],
        selectedSlidesIds: ["0"],
        currentColor: "black",
        currentFontSize: 14,
        currentFontFamily: "Inter",
    },
    history: {
        undoStack: [],
        redoStack: []
    },
    buffers: {
        slideBuffer: [],
        itemBuffer: []
    },
    slideShowStatus: false,
    slideShowCurrentSlideIndex: 0,
    currentClientX: 0,
    currentClientY: 0,
}
const COLOR_PICKER_COLORS = [
    "white", "whitesmoke", "darkgray", "gray", "black",
    "yellow", "orange", "darkorange", "crimson", "red",
    "chartreuse", "Lime", "limegreen", "green", "darkgreen",
    "aquamarine", "cyan", "dodgerblue", "blue", "navy",
    "navajowhite", "burlywood", "goldenrod", "saddlebrown", "maroon",
    "plum", "violet", "magenta", "darkviolet", "purple"
];

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
        name: 'Arc',
        modelId: 1
    },
    {
        name: 'Triangle',
        modelId: 2
    },
    /*{
        name: 'Star',
        modelId: 3
    },*/
];
let DEFAULT_FIGURES_STYLES = [figureStyles.shapeRectangle, figureStyles.shapeArc, figureStyles.shapeTriangle,
    figureStyles.shapesStar];

const TEXTAREA_INITIAL_STATE = {
    fontFamily: 'Inter',
    fontSize: 14,
    fontColor: 'black',
    value: 'Введите что-нибудь',
    fatness: 'normal',
    isCursive: false,
    isUnderlined: false
}
const DEFAULT_FONTS = [
    'Anton',
    'Arial',
    'Inter',
    'Roboto',
    'Source Sans Pro',
    'Times New Roman',
]
const MAX_HISTORY_SIZE = 30;
const MAX_TITLE_SIZE = 12;

function getRandomId(): IdType {
    let id: IdType = '';
    const vocabulary = 'abdehkmnpswxzABDEFGHKMNPQRSTWXZ123456789';
    const idLength = 32;

    while (id.length < idLength) {
        id += vocabulary[Math.floor(Math.random() * vocabulary.length)];
    }
    return id;
}

let layer = 1;
function setNewLayer(): number {
    layer++
    return layer - 1
}

function min(a: number, b: number): number {
    return a < b ? a : b;
}

function max(a: number, b: number): number {
    return a > b ? a : b;
}

function getBase64FromPicture(src: string, size: AreaType): Promise<string> {
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
    INITIAL_STATE,
    MAX_HISTORY_SIZE,
    COLOR_PICKER_COLORS,
    MAX_TITLE_SIZE,
    DROPDOWN_ANIMATION_TIME,
    TEXTAREA_INITIAL_STATE,
    DEFAULT_FONTS,
    DEFAULT_STOCKS,
    DEFAULT_FIGURES,
    DEFAULT_FIGURES_STYLES
};
export {getRandomId, min, max, getBase64FromPicture, setNewLayer};