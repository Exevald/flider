const itemType = new Map([
    ['Figure', 1],
    ['Img', 2],
    ['TextArea', 3],
]);


const shapeType = new Map([
    ['Rectangle', 1],
    ['Arc', 2],
    ['Triangle', 3],
    ['Line', 4],
    ['Star', 5],
]);

let items = {
    ItemType: null,
    X: 0,
    Y: 0,
    Width: 100,
    Height: 100,
    Layer: 0,
};

let textArea = {
    fontFamily: null,
    fontSize: null,
    Color: "black",
    Value: null,
}

let slide = {}

let presentation = {}

let actions = {}

export {itemType, shapeType, items, textArea, slide, presentation, actions}