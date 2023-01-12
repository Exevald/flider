type IdType = string;

type PointType = {
    x: number,
    y: number,
}

type AreaType = {
    width: number,
    height: number,
}

type HistoryType = {
    undoStack: Array<PresentationType>,
    redoStack: Array<PresentationType>,
}

type Buffers = {
    slideBuffer: Array<SlideType>;
    itemBuffer: Array<Item>
}

type EditorType = {
    presentation: PresentationType,
    history: HistoryType,
    slideShowStatus: boolean,
    slideShowCurrentSlideIndex: number,
    currentClientX: number,
    currentClientY: number,
    buffers: Buffers
}

type PresentationType = {
    slides: Array<SlideType>,
    title: string,
    selectedSlidesIds: Array<IdType>,
    currentColor: string,
    currentFontSize: number,
    currentFontFamily: string,
}

type SlideType = {
    id: IdType,
    items: Array<Item>,
    bgColor: string,
    selectedItemsIds: Array<IdType>,
    currentState: SlideState,
    currentFigureType: ShapeType,
}

type Item = {
    id: IdType,
    coordinates: PointType,
    element: ItemType,
    space: AreaType,
    figure?: FigureType,
    textArea?: TextAreaType,
    image?: ImageType,
    layer: number,
}

enum SlideItemSpaceType {
    Slide,
    SideBar,
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

type FigureType = {
    shape: ShapeType,
    fillColor: string,
    strokeColor: string,
    strokeWidth: number
}

type TextAreaType = {
    fontFamily: string,
    fontSize: number,
    fontColor: string,
    value: string,
}

type ImageType = {
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
    ADD_FIGURE_ITEM = "ADD_FIGURE_ITEM",
    CHANGE_CURRENT_SLIDE_STATE = "CHANGE_CURRENT_SLIDE_STATE",
    SET_CURRENT_CURSOR_POSITION = "SET_CURRENT_CURSOR_POSITION",
    CHANGE_CURRENT_FIGURE_TYPE = "CHANGE_CURRENT_FIGURE_TYPE",
    ADD_IMAGE = "ADD_IMAGE",
    DRAW_TEXT = "DRAW_TEXT",
    CHANGE_TEXT_VALUE = "CHANGE_TEXT_VALUE",
    CHANGE_TEXT_FONT = "CHANGE_TEXT_FONT",
    CHANGE_TEXT_COLOR = "CHANGE_TEXT_COLOR",
    CHANGE_TEXT_SIZE = "CHANGE_TEXT_SIZE",
    SELECT_ITEM = "SELECT_ITEM",
    SELECT_MANY_ITEMS = "SELECT_MANY_ITEMS",
    DESELECT_ITEMS = "DESELECT_ITEMS",
    MOVE_ITEM = "MOVE_ITEM",
    SCALE_ITEM = "SCALE_ITEM",
    FILL_FIGURE = "FILL_FIGURE",
    STROKE_FIGURE = "STROKE_FIGURE",
    DELETE_ITEM = "DELETE_ITEM",
    COPY = "COPY",
    PASTE = "PASTE",
    CHANGE_CURRENT_FONT_SIZE = "CHANGE_CURRENT_FONT_SIZE",
    CHANGE_CURRENT_FONT_FAMILY = "CHANGE_CURRENT_FONT_FAMILY",
}

enum SlideState {
    NO_ACTION = "NO_ACTION",
    SELECT_ITEM = "SELECT_ITEM",
    DRAW_FIGURE = "DRAW_FIGURE",
    DRAW_IMAGE = "DRAW_IMAGE",
    MOVE_ITEM = "MOVE_ITEM",
    DRAW_TEXT = "DRAW_TEXT",
    SCALE_ITEM = "SCALE_ITEM",
}

export type {ImageType, TextAreaType, FigureType, Item, SlideType, PresentationType, HistoryType, AreaType, PointType, IdType, EditorType};
export {ShapeType, ItemType, Actions, SlideState, SlideItemSpaceType};