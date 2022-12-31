import styles from "./SlideArea.module.css"
import {connect, ConnectedProps} from "react-redux";
import {Editor, Point, ShapeType, SlideState} from "../../../core/types/types";
import {AppDispatcher} from "../../../model/store";
import {
    addFigureItem, addImageItem,
    changeCurrentFigureType,
    changeCurrentSlideState,
    setCurrentCursorPosition
} from "../../../model/actionCreators";
import {DrawItems} from "../SlideItem/SlidesItem";
import {CANVAS_SETTINGS, getBase64FromPicture} from "../../../core/functions/utility";
import {useEffect} from "react";

function mapStateToProps(state: Editor) {
    const currentSlideIndex: number = state.presentation.slides.findIndex(slide => slide.id === state.presentation.selectedSlidesIds[0]);
    const selectedItemId = state.presentation.slides[currentSlideIndex].selectedItemsIds[0]
    const currentSelectedItemIndex: number = state.presentation.slides[currentSlideIndex].items.findIndex(item => item.id === selectedItemId);
    return {
        bgColor: state.presentation.slides[currentSlideIndex].bgColor,
        slideItems: state.presentation.slides[currentSlideIndex].items,
        currentItem: state.presentation.slides[currentSlideIndex].items[currentSelectedItemIndex],
        currentSlideState: state.presentation.slides[currentSlideIndex].currentState,
        currentFigureType: state.presentation.slides[currentSlideIndex].currentFigureType,
        currentColor: state.presentation.currentColor,
        currentSlide: state.presentation.slides[currentSlideIndex],
    }
}

function mapDispatchToProps(dispatcher: AppDispatcher) {
    return {
        setCurrentCursorPosition: (clientX: number, clientY: number) => dispatcher(setCurrentCursorPosition(clientX, clientY)),
        setCurrentSlideState: (newSlideState: SlideState) => dispatcher(changeCurrentSlideState(newSlideState)),
        changeCurrentFigureType: (newCurrentFigureType: ShapeType) => dispatcher(changeCurrentFigureType(newCurrentFigureType)),
        addFigureItem: (shape: ShapeType, coordinates: Point, color: string) => dispatcher(addFigureItem(shape, coordinates, color)),
        addImageItem: (imageSrc: string, coordinates: Point) => dispatcher(addImageItem(imageSrc, coordinates)),
    }
}

const connector = connect(mapStateToProps, mapDispatchToProps)
type SlideAreaProps = ConnectedProps<typeof connector>

const SlideArea = (props: SlideAreaProps) => {
    useEffect(() => {
        const doc = document.querySelector('body');
        if (doc !== null) {
            DrawItems(props.slideItems);
        }
    })
    return (
        <div className={styles.slideArea}>
            <div
                id={"slide"}
                className={styles.slide}
                style={{"background": props.bgColor}}
                onLoad={() => DrawItems(props.slideItems)}
                onClick={(event) => {
                    const slide = document.getElementById("slide");
                    if (slide) {
                        switch (props.currentSlideState) {
                            case SlideState.SELECT_AREA: {
                                console.log("select");
                                break;
                            }
                            case SlideState.DRAW_FIGURE: {
                                const clientX = event.clientX - slide.offsetLeft;
                                const clientY = event.clientY - slide.offsetTop;
                                props.setCurrentCursorPosition(clientX, clientY);
                                switch (props.currentFigureType) {
                                    case ShapeType.Rectangle: {
                                        props.addFigureItem(ShapeType.Rectangle, {
                                            x: clientX,
                                            y: clientY
                                        }, props.currentColor);
                                        props.setCurrentSlideState(SlideState.SELECT_AREA);
                                        break;
                                    }
                                    case ShapeType.Triangle: {
                                        props.addFigureItem(ShapeType.Triangle, {
                                            x: clientX,
                                            y: clientY
                                        }, props.currentColor);
                                        props.setCurrentSlideState(SlideState.SELECT_AREA);
                                        break;
                                    }
                                    case ShapeType.Arc: {
                                        props.addFigureItem(ShapeType.Arc, {
                                            x: clientX,
                                            y: clientY
                                        }, props.currentColor);
                                        props.setCurrentSlideState(SlideState.SELECT_AREA);
                                        break;
                                    }
                                    case ShapeType.Star: {
                                        props.addFigureItem(ShapeType.Star, {
                                            x: clientX,
                                            y: clientY
                                        }, props.currentColor);
                                        props.setCurrentSlideState(SlideState.SELECT_AREA);
                                        break;
                                    }
                                }
                                break;
                            }
                            case SlideState.DRAW_IMAGE: {
                                const clientX = event.clientX - slide.offsetLeft;
                                const clientY = event.clientY - slide.offsetTop;
                                const inputFile = document.createElement('input');
                                inputFile.type = 'file';
                                inputFile.style.display = 'none';
                                inputFile.accept = 'image/*';
                                inputFile.onchange = () => {
                                    if (inputFile.files) {
                                        const urlImage = URL.createObjectURL(inputFile.files[0])
                                        getBase64FromPicture(urlImage, {width: 400, height: 400}).then((newUrl) => {
                                            props.addImageItem(newUrl, {x: clientX, y: clientY})
                                        })
                                    }
                                }
                                inputFile.click();
                                inputFile.remove();
                                props.setCurrentSlideState(SlideState.SELECT_AREA);
                                break;
                            }
                        }
                    }
                }
                }>
                <canvas id={"canvas"} width={CANVAS_SETTINGS.width} height={CANVAS_SETTINGS.height}></canvas>
            </div>
        </div>
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(SlideArea)