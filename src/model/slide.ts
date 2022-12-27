import {Actions, Item, ItemType, ShapeType, Slide, SlideState} from "../core/types/types";
import {getRandomId} from "../core/functions/utility";
import {deepClone} from "../core/functions/deepClone";
import {ActionType} from "./store";

function setBackgroundColorReducer(slide: Slide, backgroundColor: string): Slide {
    const newSlide = deepClone(slide) as Slide;
    return {
        ...newSlide,
        bgColor: backgroundColor
    }
}

function addSlideItemReducer(slide: Slide, item: ItemType, textValue?: string): Slide {
    const newSlide = deepClone(slide) as Slide;
    const newItem: Item = {
        id: getRandomId(),
        coordinates: {
            x: 500,
            y: 400,
        },
        element: ItemType.Figure,
        space: {
            width: 100,
            height: 100,
        },
        layer: 1,
    }
    switch (item) {
        case ItemType.Figure: {
            if (ShapeType.Rectangle) {
                newItem.figure = {
                    shape: ShapeType.Rectangle,
                    fillColor: "white",
                    strokeColor: "black",
                    strokeWidth: 1
                }
            }
            if (ShapeType.Triangle) {
                newItem.figure = {
                    shape: ShapeType.Triangle,
                    fillColor: "white",
                    strokeColor: "black",
                    strokeWidth: 1,
                }
            }
            if (ShapeType.Arc) {
                newItem.figure = {
                    shape: ShapeType.Arc,
                    fillColor: "white",
                    strokeColor: "black",
                    strokeWidth: 1,
                }
            }
            break;
        }
        case ItemType.TextArea: {
            newItem.element = ItemType.Image;
            newItem.textArea = {
                fontFamily: "Inter",
                fontColor: "black",
                fontSize: 16,
                value: textValue ? textValue : "Введите ваш текст",
            }
            break;
        }
    }
    newSlide.items.push(newItem);
    return newSlide;
}

function changeCurrentSlideStateReducer(slide: Slide, newState: SlideState): Slide {
    const newSlide = deepClone(slide) as Slide;
    return {
        ...newSlide,
        currentState: newState,
    }
}

function changeCurrentFigureTypeReducer(slide: Slide, newFigureType: ShapeType): Slide {
    const newSlide = deepClone(slide) as Slide;
    return {
        ...newSlide,
        currentFigureType: newFigureType,
    }
}

function changeFillColorReducer(slide: Slide, newColor: string): Slide {
    const newSlide = deepClone(slide) as Slide;
    const selectedElementsId: Array<string> = newSlide.selectedItemsIds.concat();
    for (let i = 0; i < newSlide.items.length; i++) {
        if (selectedElementsId.includes(newSlide.items[i].id) && (newSlide.items[i].element === ItemType.Figure) && (newSlide.items[i].figure !== undefined)) {
            const newElement: Item = {
                ...newSlide.items[i],
                figure: {
                    shape: newSlide.items[i].figure!.shape,
                    strokeColor: newSlide.items[i].figure!.strokeColor,
                    strokeWidth: newSlide.items[i].figure!.strokeWidth,
                    fillColor: newColor
                }
            }
            newSlide.items.splice(i, 1, newElement);
        }
    }
    return newSlide;
}

function slideReducer(state: Slide, action: ActionType): Slide {
    switch (action.type) {
        case Actions.CHANGE_CURRENT_SLIDE_STATE:
            return action.newSlideState !== undefined ? changeCurrentSlideStateReducer(state, action.newSlideState) : deepClone(state) as Slide;
        case Actions.CHANGE_CURRENT_FIGURE_TYPE:
            return action.newCurrentFigureType !== undefined ? changeCurrentFigureTypeReducer(state, action.newCurrentFigureType) : deepClone(state) as Slide;
        case Actions.SET_BACKGROUND_COLOR:
            return action.backgroundColor !== undefined ? setBackgroundColorReducer(state, action.backgroundColor) : deepClone(state) as Slide;
        case Actions.ADD_SLIDE_ITEM:
            return action.addItemParams !== undefined ? addSlideItemReducer(state, action.addItemParams.element, action.addItemParams.textValue) : deepClone(state)  as Slide;
        default:
            return deepClone(state) as Slide;
    }
}

export {slideReducer}