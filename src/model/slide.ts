import {Actions, IdType, Item, ItemType, PointType, ShapeType, SlideType, SlideState} from "../core/types/types";
import {getRandomId, min, max} from "../core/functions/utility";
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
            width: 100,
            height: 100,
        },
        layer: 1,
    }
    switch (shape) {
        case ShapeType.Rectangle: {
            newItem.figure = {
                shape: ShapeType.Rectangle,
                fillColor: color,
                strokeColor: "black",
                strokeWidth: 1
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
            width: 100,
            height: 100,
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
                        font: string = 'Inter',
                        size: number = 14,
                        color: string = 'black',
                        value: string = 'Example',
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
            fontFamily: font,
            fontSize: size,
            fontColor: color,
            value: value
        },
        space: {
            width: 100,
            height: 100,
        },
        layer: 1
    }
    newSlide.items.push(newTextItem);
    console.log(newTextItem);
    return newSlide
}

function moveItemReducer(slide: SlideType, newX: number, newY: number): SlideType {
    const newSlide = deepClone(slide) as SlideType;
    for (let i = 0; i < newSlide.items.length; i++) {
        const slideItem = newSlide.items[i];
        if (newSlide.selectedItemsIds.includes(slideItem.id)) {
            const newSlideItem: Item = {
                ...slideItem,
                coordinates: {
                    x: newX,
                    y: newY,
                }
            }
            newSlide.items.splice(i, 1, newSlideItem);
        }
    }
    return newSlide
}

function slideReducer(state: SlideType, action: ActionType): SlideType {
    console.log(state.currentState, action)
    console.log(action.addTextParams)
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
            return action.addTextParams !== undefined ?
                addTextReducer(state, action.addTextParams.fontFamily, action.addTextParams.fontSize,
                    action.addTextParams.fontColor, action.addTextParams.value, action.addTextParams.coordinates)
                : deepClone(state) as SlideType;
        case Actions.SELECT_ITEM:
            return action.itemId !== undefined ? selectItemReducer(state, action.itemId) : deepClone(state) as SlideType;
        case Actions.SELECT_MANY_ITEMS:
            return action.itemId !== undefined ? selectManyItemsReducer(state, action.itemId) : deepClone(state) as SlideType;
        case Actions.DESELECT_ITEMS:
            return action.itemId !== undefined ? deselectItemsReducer(state, action.itemId) : deepClone(state) as SlideType;
        case Actions.MOVE_ITEM:
            return action.moveItemCoordinates !== undefined ? moveItemReducer(state, action.moveItemCoordinates.newX, action.moveItemCoordinates.newY) : deepClone(state) as SlideType
        default:
            return deepClone(state) as SlideType;
    }
}

export {slideReducer}