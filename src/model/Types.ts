export type Id = string;

export type Point = {
    x: number,
    y: number,
}

export type Area = {
    width: number,
    height: number,
}

export type History = Array<Presentation>;

export type Actions = {
    history: History,
}

export type Presentation = {
    slides: Array<Slide>,
    title: string,
    selected: Array<Id>,
    actions: Actions,
}

export type Slide = {
    id: Id,
    items: Array<Item>,
    bgColor: string,
}

export type Item = {
    id: Id,
    coordinates: Point,
    element: ItemType,
    space: Area
}

export enum ItemType {
    Figure,
    TextArea,
    Image,
}

export enum ShapeType {
    Rectangle,
    Arc,
    Triangle,
}

export type Figure = {
    shape: ShapeType,
    fillColor: string,
    strokeColor: string,
}

export type TextArea = {
    fontFamily: string,
    fontSize: number,
    fontColor: string,
    value: string,
}

export type Image = {
    src: string
}
