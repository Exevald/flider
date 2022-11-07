type Id = string;

type Point = {
    x: number,
    y: number,
}

type Area = {
    width: number,
    height: number,
}

type History = Array<Presentation>;

type Actions = {
    history: History,
}

type Presentation = {
    slides: Array<Slide>,
    title: string,
    selected: Array<Id>,
    actions: Actions,
}

type Slide = {
    id: Id,
    items: Array<Item>,
    bgColor: string,
}

type Item = {
    id: Id,
    coordinates: Point,
    element: ItemType,
    space: Area
}

enum ItemType {
    Figure,
    TextArea,
    Image,
}

enum ShapeType {
    Rectangle,
    Arc,
    Triangle,
}

type Figure = {
    shape: ShapeType,
    fillColor: string,
    strokeColor: string,
}

type TextArea = {
    fontFamily: string,
    fontSize: number,
    fontColor: string,
    value: string,
}

type Image = {
    src: string
}

export type {Image, TextArea, Figure, Item, Slide, Presentation, Actions, History, Area, Point, Id};
export {ShapeType, ItemType};