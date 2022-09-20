let Items = {
    ItemType: null,
    X: 0,
    Y: 0,
    Width: 100,
    Height: 100,
    Layer: 0,
};  

let TextArea = {
    fontFamily: null,
    fontSize: null,
    Color: "black",
    Value: null,
}

const ItemType = new Map([
    ['Figure', true],
    ['Img', false],
    ['TextArea', false]
]);
