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

function addImageReducer(slide: SlideType, imageSrc: string, coordinates: PointType): SlideType {
    console.log("imageReducer")
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

function slideReducer(state: SlideType, action: ActionType): SlideType {
    switch (action.type) {
        case Actions.CHANGE_CURRENT_SLIDE_STATE:
            return action.newSlideState !== undefined ? changeCurrentSlideStateReducer(state, action.newSlideState) : deepClone(state) as SlideType;
        case Actions.CHANGE_CURRENT_FIGURE_TYPE:
            return action.newCurrentFigureType !== undefined ? changeCurrentFigureTypeReducer(state, action.newCurrentFigureType) : deepClone(state) as SlideType;
        case Actions.SET_BACKGROUND_COLOR:
            return action.backgroundColor !== undefined ? setBackgroundColorReducer(state, action.backgroundColor) : deepClone(state) as SlideType;
        case Actions.ADD_FIGURE_ITEM:
            return action.addFigureParams !== undefined ? addFigureItemReducer(state, action.addFigureParams.shape, action.addFigureParams.color,  action.addFigureParams.coordinates) : deepClone(state) as SlideType;
        case Actions.ADD_IMAGE:
            return action.addImageParams !== undefined ? addImageReducer(state, action.addImageParams.imageSrc, action.addImageParams.coordinates) : deepClone(state) as SlideType;
        default:
            return deepClone(state) as SlideType;
    }
}

export {slideReducer}