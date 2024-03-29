import styles from "./Slide.module.css"
import {connect, ConnectedProps} from "react-redux";
import {EditorType, IdType, Item, PointType, ShapeType, SlideState} from "../../../core/types/types";
import {AppDispatcher} from "../../../model/store";
import {
    addFigureItem,
    addImageItem,
    addTextItem,
    changeCurrentSlideState,
    deselectItems,
    moveItem,
    scaleItem,
    selectItem,
    selectManyItems
} from "../../../model/actionCreators";
import {getBase64FromPicture} from "../../../core/functions/utility";

interface SlideInitialProps {
    slideItems: Array<JSX.Element>;
    background: string;
}

function mapStateToProps(state: EditorType) {
    const currentSlideIndex: number = state.presentation.slides.findIndex(slide => slide.id === state.presentation.selectedSlidesIds[0]);
    return {
        currentSlideState: state.presentation.slides[currentSlideIndex].currentState,
        currentFigureType: state.presentation.slides[currentSlideIndex].currentFigureType,
        currentSlideId: state.presentation.slides[currentSlideIndex].id,
        currentColor: state.presentation.currentColor,
        currentFontSize: state.presentation.currentFontSize,
        modelSlideItems: state.presentation.slides[currentSlideIndex].items,
        selectedItemsIds: state.presentation.slides[currentSlideIndex].selectedItemsIds,
        currentFontFamily: state.presentation.currentFontFamily,
    }
}

function mapDispatchToProps(dispatcher: AppDispatcher) {
    return {
        addFigureItem: (shape: ShapeType, color: string, coordinates: PointType) => dispatcher(addFigureItem(shape, color, coordinates)),
        changeCurrentSlideState: (newSlideState: SlideState) => dispatcher(changeCurrentSlideState(newSlideState)),
        addImageItem: (imageSrc: string, coordinates: PointType) => dispatcher(addImageItem(imageSrc, coordinates)),
        addTextItem: (font: string, size: number, color: string, value: string, fatness: string,
                      isCursive: boolean, isUnderlined: boolean, coordinates: PointType) =>
            dispatcher(addTextItem(font, size, color, value, fatness, isCursive, isUnderlined, coordinates)),
        selectItem: (itemId: IdType) => dispatcher(selectItem(itemId)),
        selectManyItems: (itemId: IdType) => dispatcher(selectManyItems(itemId)),
        deselectItems: (itemId: IdType) => dispatcher(deselectItems(itemId)),
        moveItems: (shiftX: number, shiftY: number) => dispatcher(moveItem(shiftX, shiftY)),
        scaleItem: (shiftX: number, shiftY: number, newWidth: number, newHeight: number) => dispatcher(scaleItem(shiftX, shiftY, newWidth, newHeight)),
    }
}

enum CornerType {
    TopLeft = "TopLeft",
    TopRight = "TopRight",
    BottomLeft = "BottomLeft",
    BottomRight = "BottomRight",
    None = "None",
}

function getSelectionCorner(coordinates: PointType, item: Item): CornerType {
    let cornerSide = 20;
    if (coordinates.x >= item.coordinates.x - cornerSide / 2 && coordinates.x <= item.coordinates.x + cornerSide / 2
        && coordinates.y >= item.coordinates.y - cornerSide / 2 && coordinates.y <= item.coordinates.y + cornerSide / 2) {
        return CornerType.TopLeft
    } else if (coordinates.x >= item.coordinates.x + item.space.width - cornerSide / 2 && coordinates.x <= item.coordinates.x + item.space.width + cornerSide / 2
        && coordinates.y >= item.coordinates.y - cornerSide / 2 && coordinates.y <= item.coordinates.y + cornerSide / 2) {
        return CornerType.TopRight
    } else if (coordinates.x >= item.coordinates.x + item.space.width - cornerSide / 2 && coordinates.x <= item.coordinates.x + item.space.width + cornerSide / 2
        && coordinates.y >= item.coordinates.y + item.space.height - cornerSide / 2 && coordinates.y <= item.coordinates.y + item.space.height + cornerSide / 2) {
        return CornerType.BottomRight
    } else if (coordinates.x >= item.coordinates.x - cornerSide / 2 && coordinates.x <= item.coordinates.x + cornerSide / 2
        && coordinates.y >= item.coordinates.y + item.space.height - cornerSide / 2 && coordinates.y <= item.coordinates.y + item.space.height + cornerSide / 2) {
        return CornerType.BottomLeft
    } else {
        return CornerType.None
    }
}

function initEventsListeners(): void {
    window.addEventListener("mousemove", onMouseMove);
}

function onMouseMove(event: MouseEvent) {
    let currX = event.clientX - offsetLeft;
    let currY = event.clientY - offsetTop;
    if (((currX < 0 || currX > slideArea.width) || (currY < 0 || currY > slideArea.height)) &&
        notDrawing()) {
        needToChange = true;
        ifPressed = false;
        beginMoving = false;
        mouseUp = true;
    }
}

function notDrawing(): boolean {
    return currState !== SlideState.DRAW_FIGURE && currState !== SlideState.DRAW_TEXT && currState !== SlideState.DRAW_IMAGE
}

initEventsListeners();

const connector = connect(mapStateToProps, mapDispatchToProps);
type SlideCustomProps = ConnectedProps<typeof connector>

type SlideMergedProps = SlideInitialProps & SlideCustomProps;

let ifPressed = false;
let beginMoving = false;
let needToChange = false;
let currState = SlideState.NO_ACTION;
let slideArea = {
    width: 1280,
    height: 720,

}
let startMouseX = 0;
let startMouseY = 0;
let startFigureX = 0;
let startFigureY = 0;
let startFigureWidth = 0;
let startFigureHeight = 0;
let currentCorner = CornerType.None;
let mouseUp = true;
let offsetTop: number;
let offsetLeft: number;

const Slide = ({
                   slideItems,
                   background,
                   addFigureItem,
                   addTextItem,
                   currentSlideState,
                   currentFigureType,
                   currentSlideId,
                   currentColor,
                   currentFontSize,
                   changeCurrentSlideState,
                   modelSlideItems,
                   selectedItemsIds,
                   selectItem,
                   selectManyItems,
                   deselectItems,
                   moveItems,
                   scaleItem,
                   addImageItem,
                   currentFontFamily
               }: SlideMergedProps) => {
    return (
        <div className={styles.slide}
             style={{"background": background}}
             id={currentSlideId}
             onMouseMove={(event) => {
                 currState = currentSlideState;
                 if (!notDrawing()) {
                     for (let i = 0; i < modelSlideItems.length; i++) {
                         let slideItem = modelSlideItems[i];
                         let isSelected = selectedItemsIds.find(itemId => itemId === slideItem.id);
                         if (isSelected) {
                             deselectItems(slideItem.id)
                         }
                     }
                 }
                 if (needToChange && notDrawing() && currentSlideState !== SlideState.SCALE_ITEM) {
                     changeCurrentSlideState(SlideState.SELECT_ITEM);
                     needToChange = false;
                 }
                 if (!mouseUp) {
                     if (!beginMoving && currentSlideState !== SlideState.SCALE_ITEM) {
                         const slide = document.getElementById(currentSlideId) as HTMLElement;
                         startMouseX = event.clientX - slide.offsetLeft;
                         startMouseY = event.clientY - slide.offsetTop;
                         for (let i = 0; i < modelSlideItems.length; i++) {
                             let slideItem = modelSlideItems[i];
                             let isSelected = selectedItemsIds.find(itemId => itemId === slideItem.id);
                             if (isSelected) {
                                 startFigureX = slideItem.coordinates.x;
                                 startFigureY = slideItem.coordinates.y;
                             }
                         }
                     } else {
                         const slide = document.getElementById(currentSlideId) as HTMLElement;
                         let slideClientX = event.clientX - slide.offsetLeft;
                         let slideClientY = event.clientY - slide.offsetTop;
                         let shiftX = slideClientX - startMouseX;
                         let shiftY = slideClientY - startMouseY;
                         moveItems(startFigureX + shiftX, startFigureY + shiftY);
                     }
                     if (ifPressed) {
                         beginMoving = true;
                     }
                     switch (currentSlideState) {
                         case SlideState.SCALE_ITEM: {
                             const slide = document.getElementById(currentSlideId) as HTMLElement;
                             if (currentCorner === CornerType.None) {
                                 let maxLayer = -1;
                                 let newFigure = modelSlideItems[0];
                                 for (let i = 0; i < modelSlideItems.length; i++) {
                                     let slideItem = modelSlideItems[i];
                                     deselectItems(slideItem.id);
                                     if (slideItem.layer > maxLayer) {
                                         newFigure = slideItem
                                     }
                                 }
                                 selectItem(newFigure.id);
                                 currentCorner = CornerType.BottomRight;
                                 startMouseX = event.clientX - slide.offsetLeft;
                                 startMouseY = event.clientY - slide.offsetTop;
                                 startFigureX = newFigure.coordinates.x;
                                 startFigureY = newFigure.coordinates.y;
                                 startFigureWidth = newFigure.space.width;
                                 startFigureHeight = newFigure.space.height;
                                 break;
                             }
                             for (let i = 0; i < modelSlideItems.length; i++) {
                                 let slideItem = modelSlideItems[i];
                                 const slideClientX = event.clientX - slide.offsetLeft;
                                 const slideClientY = event.clientY - slide.offsetTop;
                                 let isSelected = selectedItemsIds.find(itemId => itemId === slideItem.id);
                                 if (isSelected) {
                                     switch (currentCorner) {
                                         case CornerType.TopLeft: {
                                             let shiftX = slideClientX - startMouseX;
                                             let shiftY = slideClientY - startMouseY;
                                             scaleItem(startFigureX + shiftX, startFigureY + shiftY, startFigureWidth - shiftX, startFigureHeight - shiftY);
                                             break;
                                         }
                                         case CornerType.TopRight: {
                                             let shiftX = slideClientX - startMouseX;
                                             let shiftY = slideClientY - startMouseY;
                                             scaleItem(startFigureX, startFigureY + shiftY, startFigureWidth + shiftX, startFigureHeight - shiftY);
                                             break;
                                         }
                                         case CornerType.BottomLeft: {
                                             let shiftX = slideClientX - startMouseX;
                                             let shiftY = slideClientY - startMouseY;
                                             scaleItem(startFigureX + shiftX, startFigureY, startFigureWidth - shiftX, startFigureHeight + shiftY);
                                             break;
                                         }
                                         case CornerType.BottomRight: {
                                             let shiftX = slideClientX - startMouseX;
                                             let shiftY = slideClientY - startMouseY;
                                             scaleItem(startFigureX, startFigureY, startFigureWidth + shiftX, startFigureHeight + shiftY);
                                             break;
                                         }
                                     }
                                 }
                             }
                             break;
                         }
                     }
                 }
             }
             }
             onMouseDown={(event) => {
                 mouseUp = false;
                 const slide = document.getElementById(currentSlideId) as HTMLElement;
                 const slideClientX = event.clientX - slide.offsetLeft;
                 const slideClientY = event.clientY - slide.offsetTop;
                 offsetTop = slide.offsetTop;
                 offsetLeft = slide.offsetLeft;
                 if (currentSlideState !== SlideState.SCALE_ITEM) {
                     for (let i = 0; i < modelSlideItems.length; i++) {
                         let slideItem = modelSlideItems[i];
                         let isSelected = selectedItemsIds.find(itemId => itemId === slideItem.id);
                         if (isSelected) {
                             if (getSelectionCorner({
                                 x: slideClientX,
                                 y: slideClientY
                             }, slideItem) !== CornerType.None) {
                                 startMouseX = event.clientX - slide.offsetLeft;
                                 startMouseY = event.clientY - slide.offsetTop;
                                 startFigureX = slideItem.coordinates.x;
                                 startFigureY = slideItem.coordinates.y;
                                 startFigureWidth = slideItem.space.width;
                                 startFigureHeight = slideItem.space.height;
                                 currentCorner = getSelectionCorner({x: slideClientX, y: slideClientY}, slideItem);
                                 changeCurrentSlideState(SlideState.SCALE_ITEM);
                             }
                         }
                     }
                 }
                 switch (currentSlideState) {
                     case SlideState.DRAW_IMAGE: {
                         const inputFile = document.createElement('input');
                         inputFile.type = 'file';
                         inputFile.style.display = 'none';
                         inputFile.accept = 'image/*';
                         inputFile.onchange = () => {
                             if (inputFile.files) {
                                 const urlImage = URL.createObjectURL(inputFile.files[0])
                                 getBase64FromPicture(urlImage, {width: 500, height: 500}).then((imageSrc) => {
                                     addImageItem(imageSrc, {x: slideClientX, y: slideClientY})
                                 })
                             }
                         }
                         inputFile.click();
                         inputFile.remove();
                         changeCurrentSlideState(SlideState.SELECT_ITEM);
                         break;
                     }
                     case SlideState.DRAW_TEXT: {
                         addTextItem(
                             currentFontFamily,
                             currentFontSize,
                             currentColor,
                             'Введите что-нибудь',
                             'normal',
                             false,
                             false,
                             {x: slideClientX, y: slideClientY});
                         changeCurrentSlideState(SlideState.SELECT_ITEM);
                         break
                     }
                     case SlideState.SELECT_ITEM: {
                         const slide = document.getElementById(currentSlideId) as HTMLElement;
                         const slideClientX = event.clientX - slide.offsetLeft;
                         const slideClientY = event.clientY - slide.offsetTop;
                         for (let i = 0; i < modelSlideItems.length; i++) {
                             let slideItem = modelSlideItems[i];
                             let isSelected = selectedItemsIds.find(itemId => itemId === slideItem.id);
                             let checkHorizontalClick = slideItem.coordinates.x <= slideClientX &&
                                 slideClientX <= slideItem.coordinates.x + slideItem.space.width;
                             let checkVerticalClick = slideItem.coordinates.y <= slideClientY &&
                                 slideClientY <= slideItem.coordinates.y + slideItem.space.height;
                             if (checkHorizontalClick && checkVerticalClick) {
                                 ifPressed = true;
                                 if (!isSelected) {
                                     if (event.ctrlKey) {
                                         selectManyItems(slideItem.id);
                                     } else {
                                         selectItem(slideItem.id);
                                     }
                                 }
                             } else if (isSelected && !event.ctrlKey) {
                                 deselectItems(slideItem.id);
                             }
                         }
                         break;
                     }
                     case SlideState.DRAW_FIGURE: {
                         switch (currentFigureType) {
                             case ShapeType.Rectangle: {
                                 addFigureItem(ShapeType.Rectangle, currentColor, {
                                     x: slideClientX,
                                     y: slideClientY
                                 });
                                 changeCurrentSlideState(SlideState.SCALE_ITEM);
                                 break;
                             }
                             case ShapeType.Triangle: {
                                 addFigureItem(ShapeType.Triangle, currentColor, {
                                     x: slideClientX,
                                     y: slideClientY
                                 });
                                 changeCurrentSlideState(SlideState.SCALE_ITEM);
                                 break;
                             }
                             case ShapeType.Arc: {
                                 addFigureItem(ShapeType.Arc, currentColor, {
                                     x: slideClientX,
                                     y: slideClientY
                                 });
                                 changeCurrentSlideState(SlideState.SCALE_ITEM);
                                 break;
                             }
                         }
                         currentCorner = CornerType.None;
                         break;
                     }
                 }
             }}
             onKeyDown={(event) => {
                 let CurrKey = event.key;
                 switch (CurrKey) {
                     case "PageUp": {
                         break;
                     }
                 }
             }}
             onMouseUp={() => {
                 if (currentSlideState !== SlideState.DRAW_FIGURE) {
                     changeCurrentSlideState(SlideState.SELECT_ITEM);
                 }
                 ifPressed = false;
                 beginMoving = false;
                 mouseUp = true;
             }}
        >
            <div>{slideItems}</div>
        </div>
    )
}

const SidebarSlide = (props: SlideInitialProps) => {
    return (
        <div style={{transform: "scale(0.14)", marginLeft: -137}}>{props.slideItems}</div>
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(Slide)
export {SidebarSlide}