export type Id = number

export type Point = {
    x: number,
    y: number,
}

export type Area = {
    width: number,
    height: number,
}

export type History = {
    history: Array<Presentation>,
}

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
    selected: Array<Id>,
    coordinate: Point,
    bgColor: string,
}

export type Item = {
    type: ItemType,
    id: Id,
    x: number,
    y: number,
    element: ItemType,
    area: Area,
}

export enum ItemType {
    Figure,
    TextArea,
    Image,
}

enum Shape {
    Rectangle,
    Arc,
    Triangle,
    Line,
    Star,
}

export type Figure = {
    type: ItemType.Figure,
    shape: number,
    fillColor: string,
    strokeColor: string,
}

export type TextArea = {
    type: ItemType.TextArea
    fontFamily: string,
    fontSize: number,
    fontColor: string,
    value: string,
}

export type Image = {
    type: ItemType.Image,
    src: string
}
