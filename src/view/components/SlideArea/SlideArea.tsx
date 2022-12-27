import styles from "./SlideArea.module.css"
import {connect, ConnectedProps} from "react-redux";
import {Editor, ItemType, ShapeType, SlideState} from "../../../core/types/types";
import {AppDispatcher} from "../../../model/store";
import {
    changeCurrentFigureType,
    changeCurrentSlideState,
    setCurrentCursorPosition
} from "../../../model/actionCreators";
import {DrawSlideItem} from "../SlideItem/SlidesItem";

const canvasSettings = {
    width: 1280,
    height: 720,
}

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
    }
}

function mapDispatchToProps(dispatcher: AppDispatcher) {
    return {
        setCurrentCursorPosition: (clientX: number, clientY: number) => dispatcher(setCurrentCursorPosition(clientX, clientY)),
        setCurrentSlideState: (newSlideState: SlideState) => dispatcher(changeCurrentSlideState(newSlideState)),
        changeCurrentFigureType: (newCurrentFigureType: ShapeType) => dispatcher(changeCurrentFigureType(newCurrentFigureType)),
    }
}

const connector = connect(mapStateToProps, mapDispatchToProps)
type SlideAreaProps = ConnectedProps<typeof connector>

const SlideArea = (props: SlideAreaProps) => {
    return (
        <div className={styles.slideArea}>
            <div
                id={"slide"}
                className={styles.slide}
                style={{"background": props.bgColor}}
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
                                        console.log("rect");
                                        DrawSlideItem(ItemType.Figure, ShapeType.Rectangle, {
                                                x: clientX,
                                                y: clientY
                                            }, {width: 100, height: 100},
                                            props.currentColor);
                                        props.setCurrentSlideState(SlideState.SELECT_AREA);
                                        break;
                                    }
                                    case ShapeType.Triangle: {
                                        console.log("tria");
                                        DrawSlideItem(ItemType.Figure, ShapeType.Triangle, {
                                                x: clientX,
                                                y: clientY
                                            }, {width: 100, height: 100},
                                            props.currentColor);
                                        props.setCurrentSlideState(SlideState.SELECT_AREA);
                                        break;
                                    }
                                    case ShapeType.Arc: {
                                        console.log("arc");
                                        DrawSlideItem(ItemType.Figure, ShapeType.Arc, {
                                                x: clientX,
                                                y: clientY
                                            }, {width: 50, height: 50},
                                            props.currentColor);
                                        props.setCurrentSlideState(SlideState.SELECT_AREA);
                                        break;
                                    }
                                    case ShapeType.Star: {
                                        console.log("star");
                                        break;
                                    }
                                }
                                break;
                            }
                        }
                    }
                }
                }>
                <canvas id={"canvas"} width={canvasSettings.width} height={canvasSettings.height}></canvas>
            </div>
        </div>
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(SlideArea)