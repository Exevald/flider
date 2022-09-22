export type Id = number

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
    x: number,
    y: number,
    bgColor: string,
}

export type Item = {
    id: Id,
    x: number,
    y: number,
    element: ItemType,
    width: number,
    height: number,
}

export type ItemType = {
    type: string,
    figure?: Figure,
    text?: TextArea,
    image?: Image
}

export type Figure = {
    type: string,
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
