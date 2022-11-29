import styles from "./Sidebar.module.css"
import {Editor} from "../../core/types/types";
import {AppDispatcher} from "../../model/store";
import {connect, ConnectedProps} from "react-redux";

import {selectManySlides, selectSlide, switchSlide} from "../../model/actionCreators";

interface SlidePreviewProps {
    id: string,
    preview?: string,
    isSelected?: boolean,
    switchSlide: () => void,
    selectOneSlide: () => void,
    selectManySlides: () => void,
}


function mapDispatchToProps(dispatcher: AppDispatcher) {
    return {
        switchSlide: (slideId: string) => dispatcher(switchSlide(slideId)),
        selectOneSlide: (slideId: string) => dispatcher(selectSlide(slideId)),
        selectManySlides: (slideId: string) => dispatcher(selectManySlides(slideId)),
    }
}

function mapStateToProps(state: Editor) {
    return {
        slides: state.presentation.slides,
        countOfSlides: state.presentation.slides.length,
        selectedSlideIds: state.presentation.selectedSlidesIds
    }
}

const connector = connect(mapStateToProps, mapDispatchToProps)
type SidebarProps = ConnectedProps<typeof connector>

const SlidePreview = (props: SlidePreviewProps) => {
    let borderStyle = ''
    if (props.isSelected) {
        borderStyle = styles.slidePreviewSelected;

    }
    const slideId = parseInt(props.id) + 1;
    return (
        <div className={styles.sidebarRow} onClick={(event) => {
            if (event.ctrlKey) {
                props.selectOneSlide()
            } else if (event.shiftKey) {
                props.selectManySlides()
            } else {
                props.switchSlide()
            }
        }}>
            <p className={styles.slideIndex}>{slideId}</p>
            <div className={`${styles.slidePreview} ${borderStyle}`}>{props.preview}</div>
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
                id={String(i)}
                isSelected={isSelected}
                switchSlide={() => props.switchSlide(slide.id)}
                selectOneSlide={() => props.selectOneSlide(slide.id)}
                selectManySlides={() => props.selectManySlides(slide.id)}
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