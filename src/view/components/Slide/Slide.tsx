import styles from "./Slide.module.css"
import {connect, ConnectedProps} from "react-redux";
import {EditorType, PointType, ShapeType, SlideState} from "../../../core/types/types";
import {AppDispatcher} from "../../../model/store";
import {
    addFigureItem,
    addImageItem,
    changeCurrentSlideState,
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
    }
}

function mapDispatchToProps(dispatcher: AppDispatcher) {
    return {
        addFigureItem: (shape: ShapeType, color: string, coordinates: PointType) => dispatcher(addFigureItem(shape, color, coordinates)),
        changeCurrentSlideState: (newSlideState: SlideState) => dispatcher(changeCurrentSlideState(newSlideState)),
        addImageItem: (imageSrc: string, coordinates: PointType) => dispatcher(addImageItem(imageSrc, coordinates)),
    }
}

const connector = connect(mapStateToProps, mapDispatchToProps);
type SlideCustomProps = ConnectedProps<typeof connector>

type SlideMergedProps = SlideInitialProps & SlideCustomProps;

const Slide = ({
                   slideItems,
                   background,
                   addFigureItem,
                   currentSlideState,
                   currentFigureType,
                   currentSlideId,
                   currentColor,
                   changeCurrentSlideState,
               }: SlideMergedProps) => {
    return (
        <div className={styles.slide}
             style={{"background": background}}
             id={currentSlideId}
             onClick={(event) => {
                 const slide = document.getElementById(currentSlideId) as HTMLElement;
                 const slideClientX = event.clientX - slide.offsetLeft;
                 const slideClientY = event.clientY - slide.offsetTop;
                 switch (currentSlideState) {
                     case SlideState.DRAW_FIGURE: {
                         switch (currentFigureType) {
                             case ShapeType.Rectangle: {
                                 addFigureItem(ShapeType.Rectangle, currentColor, {
                                     x: slideClientX,
                                     y: slideClientY
                                 });
                                 changeCurrentSlideState(SlideState.SELECT_AREA);
                                 break;
                             }
                             case ShapeType.Triangle: {
                                 addFigureItem(ShapeType.Triangle, currentColor, {
                                     x: slideClientX,
                                     y: slideClientY
                                 });
                                 changeCurrentSlideState(SlideState.SELECT_AREA);
                                 break;
                             }
                             case ShapeType.Arc: {
                                 addFigureItem(ShapeType.Arc, currentColor, {
                                     x: slideClientX,
                                     y: slideClientY
                                 });
                                 changeCurrentSlideState(SlideState.SELECT_AREA);
                                 break;
                             }
                         }
                         break;
                     }
                     case SlideState.DRAW_IMAGE: {
                         const inputFile = document.createElement('input');
                         inputFile.type = 'file';
                         inputFile.style.display = 'none';
                         inputFile.accept = 'image/*';
                         inputFile.onchange = () => {
                             if (inputFile.files) {
                                 const urlImage = URL.createObjectURL(inputFile.files[0])
                                 getBase64FromPicture(urlImage, {width: 500, height: 500}).then((newImageSrc) => {
                                     addImageItem(newImageSrc, {x: slideClientX, y: slideClientY})
                                 })
                             }
                         }
                         inputFile.click();
                         inputFile.remove();
                         changeCurrentSlideState(SlideState.SELECT_AREA);
                         break;
                     }
                     case SlideState.SELECT_AREA: {
                         break;
                     }
                 }
             }
             }>
            <ul>{slideItems}</ul>
        </div>
    )
}

const SidebarSlide = (props: SlideInitialProps) => {
    return (
        <div>
            <ul>{props.slideItems}</ul>
        </div>
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(Slide)
export {SidebarSlide}