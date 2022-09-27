import {shapeType, itemType} from "Types";

let Point = {
    x: 0,
    y: 0,
}

let Area = {
    width: 100,
    height: 100
}

let figure = {
    type: shapeType,
    fillColor: 'black',
    strokeColor: 'black',
};

let textArea = {
    fontFamily: "Arial",
    fontSize: 16,
    fontColor: "black",
    value: "",
};

let image = {
    src: null,
};

let item = {
    type: itemType,
    x: Point.x,
    y: Point.y,
    angle: 0,
    width: Area.width,
    height: Area.height,
    layer: 0,
};

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