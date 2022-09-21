import {figure, image, textArea} from "Objects";

const shapeType = new Map([
    ['Rectangle', 1],
    ['Arc', 2],
    ['Triangle', 3],
    ['Line', 4],
    ['Star', 5],
]);

const itemType = new Map([
    [figure, 1],
    [image, 2],
    [textArea, 3],
]);

export { shapeType, itemType }
