import {
    Actions,
    IdType,
    Item,
    ItemType,
    PointType,
    ShapeType,
    SlideState,
    SlideType,
    TextAreaType,
} from "../core/types/types";
import {getRandomId, setNewLayer} from "../core/functions/utility";
import {deepClone} from "../core/functions/deepClone";
import {ActionType} from "./store";

function setBackgroundColorReducer(slide: SlideType, backgroundColor: string): SlideType {
    const newSlide = deepClone(slide) as SlideType;
    return {
        ...newSlide,
        bgColor: backgroundColor
    }
}

function addFigureItemReducer(slide: SlideType, shape: ShapeType, color: string, coordinates: PointType): SlideType {
    const newSlide = deepClone(slide) as SlideType;
    const newItem: Item = {
        id: getRandomId(),
        coordinates: {
            x: coordinates.x,
            y: coordinates.y,
        },
        element: ItemType.Figure,
        space: {
            width: 0,
            height: 0,
        },
        layer: setNewLayer(),
    }
    switch (shape) {
        case ShapeType.Rectangle: {
            newItem.figure = {
                shape: ShapeType.Rectangle,
                fillColor: color,
                strokeColor: "black",
                strokeWidth: 1,
            }
            break;
        }
        case ShapeType.Triangle: {
            newItem.figure = {
                shape: ShapeType.Triangle,
                fillColor: color,
                strokeColor: "black",
                strokeWidth: 1,
            }
            break;
        }
        case ShapeType.Arc: {
            newItem.figure = {
                shape: ShapeType.Arc,
                fillColor: color,
                strokeColor: "black",
                strokeWidth: 1,
            }
            break;
        }
        case ShapeType.Star: {
            newItem.figure = {
                shape: ShapeType.Star,
                fillColor: color,
                strokeColor: "black",
                strokeWidth: 1,
            }
            break;
        }
    }
    newSlide.items.push(newItem);
    return newSlide;
}

function changeCurrentSlideStateReducer(slide: SlideType, newState: SlideState): SlideType {
    const newSlide = deepClone(slide) as SlideType;
    return {
        ...newSlide,
        currentState: newState,
    }
}

function changeCurrentFigureTypeReducer(slide: SlideType, newFigureType: ShapeType): SlideType {
    const newSlide = deepClone(slide) as SlideType;
    return {
        ...newSlide,
        currentFigureType: newFigureType,
    }
}

function selectItemReducer(slide: SlideType, itemId: IdType): SlideType {
    const newSlide = deepClone(slide) as SlideType;
    return {
        ...newSlide,
        selectedItemsIds: [itemId],
    }
}

function selectManyItemsReducer(slide: SlideType, itemId: IdType): SlideType {
    const newSlide = deepClone(slide) as SlideType;
    newSlide.selectedItemsIds.push(itemId);
    return newSlide
}

function deselectItemsReducer(slide: SlideType, itemId: IdType): SlideType {
    const newSlide = deepClone(slide) as SlideType;
    newSlide.selectedItemsIds = [];
    return newSlide
}

function addImageReducer(slide: SlideType, imageSrc: string, coordinates: PointType): SlideType {
    const newSlide = deepClone(slide) as SlideType;
    const newItem: Item = {
        id: getRandomId(),
        coordinates: {
            x: coordinates.x,
            y: coordinates.y,
        },
        element: ItemType.Image,
        space: {
            width: 500,
            height: 500,
        },
        layer: 1,
        image: {
            src: imageSrc,
        },
    }
    newSlide.items.push(newItem);
    return newSlide
}

function addTextReducer(slide: SlideType,
                        textParams: TextAreaType,
                        coordinates: PointType): SlideType {
    const newSlide = deepClone(slide) as SlideType;
    const newTextItem: Item = {
        id: getRandomId(),
        coordinates: {
            x: coordinates.x,
            y: coordinates.y,
        },
        element: ItemType.TextArea,
        textArea: {
            ...textParams
        },
        space: {
            width: 100,
            height: 100,
        },
        layer: 1
    }
    newSlide.items.push(newTextItem);
    return newSlide
}

function fillTextReducer(slide: SlideType, newColor: string): SlideType {
    const newSlide = deepClone(slide) as SlideType;
    const selectedItemsId = newSlide.selectedItemsIds.concat();
    for (let i = 0; i < newSlide.items.length; i++) {
        const slideItem = newSlide.items[i];
        if (selectedItemsId.includes(newSlide.items[i].id) && (newSlide.items[i].element === ItemType.TextArea)) {
            if (slideItem.textArea) {
                const newSlideItem: Item = {
                    ...slideItem,
                    textArea: {
                        ...slideItem.textArea,
                        fontColor: newColor
                    }
                }
                newSlide.items.splice(i, 1, newSlideItem);
            }
        }
    }
    return newSlide
}

function changeTextValueReducer(slide: SlideType, newValue: string): SlideType {
    const newSlide = deepClone(slide) as SlideType;
    const selectedItemsId = newSlide.selectedItemsIds.concat();
    for (let i = 0; i < newSlide.items.length; i++) {
        const slideItem = newSlide.items[i];
        if (selectedItemsId.includes(newSlide.items[i].id) && (newSlide.items[i].element === ItemType.TextArea)) {
            if (slideItem.textArea) {
                const newSlideItem: Item = {
                    ...slideItem,
                    textArea: {
                        ...slideItem.textArea,
                        value: newValue,
                    }
                }
                newSlide.items.splice(i, 1, newSlideItem);
            }
        }
    }
    return newSlide
}

function changeTextSizeReducer(slide: SlideType, newSize: string): SlideType {
    const newSlide = deepClone(slide) as SlideType;
    const selectedItemsId = newSlide.selectedItemsIds.concat();
    for (let i = 0; i < newSlide.items.length; i++) {
        const slideItem = newSlide.items[i];
        if (selectedItemsId.includes(newSlide.items[i].id) && (newSlide.items[i].element === ItemType.TextArea)) {
            if (slideItem.textArea) {
                const newSlideItem: Item = {
                    ...slideItem,
                    textArea: {
                        ...slideItem.textArea,
                        fontSize: parseInt(newSize)
                    }
                }
                newSlide.items.splice(i, 1, newSlideItem);
            }
        }
    }
    return newSlide
}
function changeTextFontFamily(slide: SlideType, newFamily: string): SlideType {
    const newSlide = deepClone(slide) as SlideType;
    const selectedItemsId = newSlide.selectedItemsIds.concat();
    for (let i = 0; i < newSlide.items.length; i++) {
        const slideItem = newSlide.items[i];
        if (selectedItemsId.includes(newSlide.items[i].id) && (newSlide.items[i].element === ItemType.TextArea)) {
            if (slideItem.textArea) {
                const newSlideItem: Item = {
                    ...slideItem,
                    textArea: {
                        ...slideItem.textArea,
                        fontFamily: newFamily

                    }
                }
                newSlide.items.splice(i, 1, newSlideItem);
            }
        }
    }
    return newSlide
}
function changeTextFatnessReducer(slide: SlideType): SlideType {
    const newSlide = deepClone(slide) as SlideType;
    let newFatness = '';
    let isOnlySelected = true;
    const selectedItemsId = newSlide.selectedItemsIds.concat();
    if (selectedItemsId.length > 1) {
        isOnlySelected = false;
    }

    for (let i = 0; i < newSlide.items.length; i++) {
        const slideItem = newSlide.items[i];
        if (selectedItemsId.includes(newSlide.items[i].id) && (newSlide.items[i].element === ItemType.TextArea)) {
            if (slideItem.textArea) {
                if (isOnlySelected) {
                    slideItem.textArea.fatness === 'normal' ? newFatness = 'bold' : newFatness = 'normal';
                } else {
                    newFatness = 'bold'
                }
                const newSlideItem: Item = {
                    ...slideItem,
                    textArea: {
                        ...slideItem.textArea,
                        fatness: newFatness
                    }
                }
                newSlide.items.splice(i, 1, newSlideItem);
            }
        }
    }
    return newSlide
}
function changeTextCursiveReducer(slide: SlideType): SlideType {
    const newSlide = deepClone(slide) as SlideType;
    let newCursive = false;
    let isOnlySelected = true;
    const selectedItemsId = newSlide.selectedItemsIds.concat();
    if (selectedItemsId.length > 1) {
        isOnlySelected = false;
    }

    for (let i = 0; i < newSlide.items.length; i++) {
        const slideItem = newSlide.items[i];
        if (selectedItemsId.includes(newSlide.items[i].id) && (newSlide.items[i].element === ItemType.TextArea)) {
            if (slideItem.textArea) {
                if (isOnlySelected) {
                    !slideItem.textArea.isCursive ? newCursive = true : newCursive = false;
                } else {
                    newCursive = true
                }
                const newSlideItem: Item = {
                    ...slideItem,
                    textArea: {
                        ...slideItem.textArea,
                        isCursive: newCursive
                    }
                }
                newSlide.items.splice(i, 1, newSlideItem);
            }
        }
    }
    return newSlide
}
function changeTextUnderlineReducer(slide: SlideType): SlideType {
    const newSlide = deepClone(slide) as SlideType;
    let newUnderline = false;
    let isOnlySelected = true;
    const selectedItemsId = newSlide.selectedItemsIds.concat();
    if (selectedItemsId.length > 1) {
        isOnlySelected = false;
    }

    for (let i = 0; i < newSlide.items.length; i++) {
        const slideItem = newSlide.items[i];
        if (selectedItemsId.includes(newSlide.items[i].id) && (newSlide.items[i].element === ItemType.TextArea)) {
            if (slideItem.textArea) {
                if (isOnlySelected) {
                    !slideItem.textArea.isUnderlined ? newUnderline = true : newUnderline = false;
                } else {
                    newUnderline = true
                }
                const newSlideItem: Item = {
                    ...slideItem,
                    textArea: {
                        ...slideItem.textArea,
                        isUnderlined: newUnderline
                    }
                }
                newSlide.items.splice(i, 1, newSlideItem);
            }
        }
    }
    return newSlide
}

function moveItemReducer(slide: SlideType, shiftX: number, shiftY: number): SlideType {
    const newSlide = deepClone(slide) as SlideType;
    for (let i = 0; i < newSlide.items.length; i++) {
        const slideItem = newSlide.items[i];
        if (newSlide.selectedItemsIds.includes(slideItem.id)) {
            const newSlideItem: Item = {
                ...slideItem,
                coordinates: {
                    x: shiftX,
                    y: shiftY,
                }
            }
            newSlide.items.splice(i, 1, newSlideItem);
        }
    }
    return newSlide
}

function scaleItemReducer(slide: SlideType, shiftX: number, shiftY: number, newWidth: number, newHeight: number): SlideType {
    const newSlide = deepClone(slide) as SlideType;
    for (let i = 0; i < newSlide.items.length; i++) {
        const slideItem = newSlide.items[i];
        if (newSlide.selectedItemsIds.includes(slideItem.id)) {
            const newSlideItem: Item = {
                ...slideItem,
                coordinates: {
                    x: shiftX,
                    y: shiftY,
                },
                space: {
                    width: newWidth,
                    height: newHeight,
                }
            }
            newSlide.items.splice(i, 1, newSlideItem);
        }
    }
    return newSlide
}

function fillFigureReducer(slide: SlideType, newColor: string): SlideType {
    const newSlide = deepClone(slide) as SlideType;
    const selectedItemsId = newSlide.selectedItemsIds.concat();
    for (let i = 0; i < newSlide.items.length; i++) {
        const slideItem = newSlide.items[i];
        if (selectedItemsId.includes(newSlide.items[i].id) && (newSlide.items[i].element === ItemType.Figure) && (newSlide.items[i].figure !== undefined)) {
            if (slideItem.figure) {
                const newSlideItem: Item = {
                    ...slideItem,
                    figure: {
                        shape: slideItem.figure.shape,
                        fillColor: newColor,
                        strokeColor: slideItem.figure.strokeColor,
                        strokeWidth: slideItem.figure.strokeWidth,
                    }
                }
                newSlide.items.splice(i, 1, newSlideItem);
            }
        }
    }
    return newSlide
}

function deleteItemsReducer(slide: SlideType): SlideType {
    const newSlide = deepClone(slide) as SlideType;
    const selectedItemsId = newSlide.selectedItemsIds.concat();
    for (let i = 0; i < selectedItemsId.length; i++) {
        const deletedItemIndex = newSlide.items.findIndex(item => item.id === selectedItemsId[i]);
        newSlide.items.splice(deletedItemIndex, 1);
    }
    return {
        ...newSlide,
        selectedItemsIds: [],
    }
}

function strokeFigureReducer(slide: SlideType, newColor: string): SlideType {
    const newSlide = deepClone(slide) as SlideType;
    const selectedItemsId = newSlide.selectedItemsIds.concat();
    for (let i = 0; i < newSlide.items.length; i++) {
        const slideItem = newSlide.items[i];
        if (selectedItemsId.includes(newSlide.items[i].id) && (newSlide.items[i].element === ItemType.Figure) && (newSlide.items[i].figure !== undefined)) {
            if (slideItem.figure) {
                const newSlideItem: Item = {
                    ...slideItem,
                    figure: {
                        shape: slideItem.figure.shape,
                        fillColor: slideItem.figure.fillColor,
                        strokeColor: newColor,
                        strokeWidth: slideItem.figure.strokeWidth,
                    }
                }
                newSlide.items.splice(i, 1, newSlideItem);
            }
        }
    }
    return newSlide
}

function slideReducer(state: SlideType, action: ActionType): SlideType {
    switch (action.type) {
        case Actions.CHANGE_CURRENT_SLIDE_STATE:
            return action.newSlideState !== undefined ? changeCurrentSlideStateReducer(state, action.newSlideState) : deepClone(state) as SlideType;
        case Actions.CHANGE_CURRENT_FIGURE_TYPE:
            return action.newCurrentFigureType !== undefined ? changeCurrentFigureTypeReducer(state, action.newCurrentFigureType) : deepClone(state) as SlideType;
        case Actions.SET_BACKGROUND_COLOR:
            return action.backgroundColor !== undefined ? setBackgroundColorReducer(state, action.backgroundColor) : deepClone(state) as SlideType;
        case Actions.ADD_FIGURE_ITEM:
            return action.addFigureParams !== undefined ? addFigureItemReducer(state, action.addFigureParams.shape, action.addFigureParams.color, action.addFigureParams.coordinates) : deepClone(state) as SlideType;
        case Actions.ADD_IMAGE:
            return action.addImageParams !== undefined ? addImageReducer(state, action.addImageParams.imageSrc, action.addImageParams.coordinates) : deepClone(state) as SlideType;
        case Actions.DRAW_TEXT:
            return (action.addTextParams && action.clientX && action.clientY) ?
                addTextReducer(state, action.addTextParams,
                    {x: action.clientX, y: action.clientY})
                : deepClone(state) as SlideType;
        case Actions.CHANGE_TEXT_COLOR:
            return action.newColor ?
                fillTextReducer(state, action.newColor) : deepClone(state) as SlideType;
        case Actions.CHANGE_TEXT_SIZE:
            return action.newFontSize ?
                changeTextSizeReducer(state, action.newFontSize) : deepClone(state) as SlideType;
        case Actions.CHANGE_TEXT_VALUE:
            return action.newTextValue ?
                changeTextValueReducer(state, action.newTextValue) : deepClone(state) as SlideType;
        case Actions.CHANGE_TEXT_FONT:
            return action.newFontFamily ?
                changeTextFontFamily(state, action.newFontFamily) : deepClone(state) as SlideType;
        case Actions.CHANGE_TEXT_FATNESS:
            return changeTextFatnessReducer(state);
        case Actions.TOGGLE_TEXT_CURSIVE:
            return changeTextCursiveReducer(state);
        case Actions.TOGGLE_TEXT_UNDERLINE:
            return changeTextUnderlineReducer(state);
        case Actions.SELECT_ITEM:
            return action.itemId !== undefined ? selectItemReducer(state, action.itemId) : deepClone(state) as SlideType;
        case Actions.SELECT_MANY_ITEMS:
            return action.itemId !== undefined ? selectManyItemsReducer(state, action.itemId) : deepClone(state) as SlideType;
        case Actions.DESELECT_ITEMS:
            return action.itemId !== undefined ? deselectItemsReducer(state, action.itemId) : deepClone(state) as SlideType;
        case Actions.MOVE_ITEM:
            return action.moveItemCoordinates !== undefined ? moveItemReducer(state, action.moveItemCoordinates.shiftX, action.moveItemCoordinates.shiftY) : deepClone(state) as SlideType;
        case Actions.SCALE_ITEM:
            return action.scaleItemParams !== undefined ? scaleItemReducer(state, action.scaleItemParams.shiftX, action.scaleItemParams.shiftY, action.scaleItemParams.newWidth, action.scaleItemParams.newHeight) : deepClone(state) as SlideType;
        case Actions.FILL_FIGURE:
            return action.newColor !== undefined ? fillFigureReducer(state, action.newColor) : deepClone(state) as SlideType;
        case Actions.STROKE_FIGURE:
            return action.newColor !== undefined ? strokeFigureReducer(state, action.newColor) : deepClone(state) as SlideType;
        case Actions.DELETE_ITEM:
            return deleteItemsReducer(state);
        default:
            return deepClone(state) as SlideType;
    }
}

export {slideReducer}