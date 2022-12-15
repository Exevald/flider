type Id = string;

type Point = {
    x: number,
    y: number,
}

type Area = {
    width: number,
    height: number,
}

type History = {
    undoStack: Array<Presentation>,
    redoStack: Array<Presentation>,
}

type Editor = {
    presentation: Presentation,
    history: History,
}

type Presentation = {
    slides: Array<Slide>,
    title: string,
    selectedSlidesIds: Array<Id>,
}

type Slide = {
    id: Id,
    items: Array<Item>,
    bgColor: string,
    selectedItemsIds: Array<Id>,
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

export type {Image, TextArea, Figure, Item, Slide, Presentation, History, Area, Point, Id, Editor};
export {ShapeType, ItemType};