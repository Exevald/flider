import { shapeType, itemType } from "Types";

let figure = {
    type: shapeType,
    fillColor: 'black',
    strokeColor: 'black',
};

let textArea = {
    fontFamily: null,
    fontSize: null,
    color: "black",
    value: null,
};

let image = {
    src: null,
}

let items = [{
    type: itemType,
    x: 0,
    y: 0,
    width: 100,
    height: 100,
    layer: 0,
}];

let slide = {
    items: [],
    bgColor: "white",
    selectedItems: []
}

let presentation = {}

let actions = {}

export {items, textArea, slide, presentation, actions, figure, image}