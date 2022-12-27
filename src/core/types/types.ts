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
    slideShowCurrentSlideIndex: number,
    currentClientX: number,
    currentClientY: number,
}

type Presentation = {
    slides: Array<Slide>,
    title: string,
    selectedSlidesIds: Array<Id>,
    currentColor: string,
}

type Slide = {
    id: Id,
    items: Array<Item>,
    bgColor: string,
    selectedItemsIds: Array<Id>,
    currentState: SlideState,
    currentFigureType: ShapeType,
}

type Item = {
    id: Id,
    coordinates: Point,
    element: ItemType,
    space: Area,
    figure?: Figure,
    textArea?: TextArea,
    image?: Image,
    layer: number,
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
    Star,
    NoShape
}

type Figure = {
    shape: ShapeType,
    fillColor: string,
    strokeColor: string,
    strokeWidth: number
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
    CHANGE_SELECTED_COLOR = "CHANGE_SELECTED_COLOR",
    CREATE_SLIDE = "CREATE_SLIDE",
    DELETE_SLIDE = "DELETE_SLIDE",
    SELECT_SLIDE = "SELECT_SLIDE",
    DESELECT_SLIDE = "DESELECT_SLIDE",
    SELECT_MANY_SLIDES = "SELECT_MANY_SLIDES",
    SWITCH_SLIDE = "SWITCH_SLIDE",
    SET_BACKGROUND_COLOR = "CHANGE_BACKGROUND_COLOR",
    SWIPE_SLIDE_SHOW_SLIDE = "SWIPE_SLIDE_SHOW_SLIDE",
    ADD_SLIDE_ITEM = "ADD_SLIDE_ITEM",
    CHANGE_CURRENT_SLIDE_STATE = "CHANGE_CURRENT_SLIDE_STATE",
    SET_CURRENT_CURSOR_POSITION = "SET_CURRENT_CURSOR_POSITION",
    CHANGE_CURRENT_FIGURE_TYPE = "CHANGE_CURRENT_FIGURE_TYPE",
}

enum SlideState {
    SELECT_AREA = "SELECT_AREA",
    DRAW_FIGURE = "DRAW_FIGURE",
    INIT_CURRENT_CURSOR_POSITION = "INIT_CURRENT_CURSOR_POSITION",
}

export type {Image, TextArea, Figure, Item, Slide, Presentation, History, Area, Point, Id, Editor};
export {ShapeType, ItemType, Actions, SlideState};