let Items = {
    ItemType: ItemType,
    X: 0,
    Y: 0,
    Width: 100,
    Height: 100,
    Layer: 0,
};  

let Figure = {
    ShapeType: shapes,
    FillColor: 'black',
    StrokeColor: 'black',
};

let TextArea = {
    fontFamily: null,
    fontSize: null,
    Color: "black",
    Value: null,
};

const ItemType = new Map([
    ['Figure', true],
    ['Img', false],
    ['TextArea', false]
]); 
    

const shapes = ['Rectangle', 'Arc', 'Triangle', 'Line', 'Star']

let slide = {

}

let presentation = {

}

let actions = {

}