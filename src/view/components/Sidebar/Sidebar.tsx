import styles from "./Sidebar.module.css"
import {EditorType, SlideType} from "../../../core/types/types";
import {AppDispatcher} from "../../../model/store";
import {connect, ConnectedProps} from "react-redux";
import {deselectSlide, selectManySlides, selectSlide, switchSlide} from "../../../model/actionCreators";
import Slide, {SidebarSlide} from "../Slide/Slide";
import SlideItem from "../SlideItem/SlideItem";

interface SlidePreviewProps {
    slides: Array<SlideType>
    slideIndex: number;
    preview?: string;
    isSelected?: boolean;
    switchSlide: () => void;
    selectOneSlide: () => void;
    deselectSlide: () => void;
    selectManySlides: () => void;
    bgColor: string;
    slideId: string,
}


function mapDispatchToProps(dispatcher: AppDispatcher) {
    return {
        switchSlide: (slideId: string) => dispatcher(switchSlide(slideId)),
        selectOneSlide: (slideId: string) => dispatcher(selectSlide(slideId)),
        selectManySlides: (slideId: string) => dispatcher(selectManySlides(slideId)),
        deselectSlide: (slideId: string) => dispatcher(deselectSlide(slideId)),
    }
}

function mapStateToProps(state: EditorType) {
    const currentSlideIndex: number = state.presentation.slides.findIndex(slide => slide.id === state.presentation.selectedSlidesIds[0]);
    return {
        slides: state.presentation.slides,
        countOfSlides: state.presentation.slides.length,
        selectedSlideIds: state.presentation.selectedSlidesIds,
    }
}

const connector = connect(mapStateToProps, mapDispatchToProps)
type SidebarProps = ConnectedProps<typeof connector>

const SlidePreview = (props: SlidePreviewProps) => {
    let borderStyle = ''
    if (props.isSelected) {
        borderStyle = styles.slidePreviewSelected;
    }
    const slideId = props.slideIndex + 1;
    return (
        <div className={styles.sidebarRow} onClick={(event) => {
            if (event.ctrlKey) {
                if (!props.isSelected) {
                    props.selectOneSlide()
                } else {
                    props.deselectSlide()
                }
            } else if (event.shiftKey) {
                props.selectManySlides()
            } else {
                props.switchSlide()
            }
        }}>
            <p className={styles.slideIndex}>{slideId}</p>
            <div className={`${styles.slidePreview} ${borderStyle}`} style={{background: props.bgColor}}>
                <SidebarSlide slideItems=
                                  {props.slides[props.slideIndex].items.map((item) =>
                                      <li key={item.id}
                                          className={styles.slideElement}>
                                          <SlideItem slideId={props.slideId} itemId={item.id}
                                                     active={false}></SlideItem>
                                      </li>
                                  )}
                              background={props.bgColor}
                />
            </div>
        </div>
    )
}

const Sidebar = (props: SidebarProps) => {
    let slides = [];
    for (let i = 0; i < props.slides?.length; i++) {
        let slide = props.slides[i];
        const isSelected = props.selectedSlideIds.includes(slide.id);
        slides.push(
            <SlidePreview
                slides={props.slides}
                slideIndex={i}
                isSelected={isSelected}
                switchSlide={() => props.switchSlide(slide.id)}
                selectOneSlide={() => props.selectOneSlide(slide.id)}
                selectManySlides={() => props.selectManySlides(slide.id)}
                deselectSlide={() => props.deselectSlide(slide.id)}
                bgColor={slide.bgColor}
                slideId={props.slides[i].id}
            />
        )
    }
    return (
        <div className={styles.sidebar}>
            {slides}
        </div>
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar)