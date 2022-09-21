import {shapeType, itemType} from "Types";

let figure = {
    type: shapeType,
    fillColor: 'black',
    strokeColor: 'black',
};

let textArea = {
    fontFamily: null,
    fontSize: null,
    fontColor: "black",
    value: null,
};

let image = {
    src: null,
};

let item = [{
    type: itemType,
    x: 0,
    y: 0,
    angle: 0,
    width: 100,
    height: 100,
    layer: 0,
}];

let slide = [{
    items: [],
    bgColor: "white",
    selectedItems: []
}];

let actions = {
    history: null,
};

let presentation = {
    name: 'Новая презентация',
    slides: [],
    actions,
    currentSlide: [],
};

export {item, textArea, slide, presentation, actions, figure, image}