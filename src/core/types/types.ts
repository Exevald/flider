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
    slideShowStatus: boolean,
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
    space: Area,
    figure?: Figure;
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

enum Actions {
    CREATE_PRESENTATION = "CREATE_PRESENTATION",
    SAVE_PRESENTATION = "SAVE_PRESENTATION",
    OPEN_PRESENTATION = "OPEN_PRESENTATION",
    CHANGE_SLIDE_SHOW_STATUS = "CHANGE_SLIDE_SHOW_SLIDE",
    UNDO = "UNDO",
    REDO = "REDO",
    CHANGE_TITLE = "CHANGE_TITLE",
    CREATE_SLIDE = "CREATE_SLIDE",
    DELETE_SLIDE = "DELETE_SLIDE",
    SELECT_SLIDE = "SELECT_SLIDE",
    DESELECT_SLIDE = "DESELECT_SLIDE",
    SELECT_MANY_SLIDES = "SELECT_MANY_SLIDES",
    SWITCH_SLIDE = "SWITCH_SLIDE",
}

export type {Image, TextArea, Figure, Item, Slide, Presentation, History, Area, Point, Id, Editor};
export {ShapeType, ItemType, Actions};