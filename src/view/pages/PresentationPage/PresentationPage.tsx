import TopPanel from "../../components/TopPanel/TopPanel";
import Toolbar from "../../components/Toolbar/Toolbar";
import {hideDropDownKeyboardPressed, handleClicks} from "../../components/DropDown/DropDown";
import {useEffect} from "react";
import styles from "./PresentationPage.module.css"
import Sidebar from "../../components/Sidebar/Sidebar";
import Slide from "../../components/Slide/Slide";
import SlideItem from "../../components/SlideItem/SlideItem";
import {EditorType} from "../../../core/types/types";
import {connect, ConnectedProps} from "react-redux";

function mapStateToProps(state: EditorType) {
    const currentSlideIndex: number = state.presentation.slides.findIndex(slide => slide.id === state.presentation.selectedSlidesIds[0]);
    return {
        slides: state.presentation.slides,
        slidesCount: state.presentation.slides.length,
        currentSlideIds: state.presentation.selectedSlidesIds,
        currentSlide: state.presentation.slides[currentSlideIndex],
        currentSlideBgColor: state.presentation.slides[currentSlideIndex].bgColor,
    }
}

const connector = connect(mapStateToProps, null);
type PresentationPageProps = ConnectedProps<typeof connector>

const PresentationPage = (props: PresentationPageProps) => {

    useEffect(() => {
        const doc = document.querySelector('body');
        if (doc !== null) {
            doc.addEventListener("click", handleClicks)
            return () => {
                doc.removeEventListener("click", handleClicks)
            }
        }
    });

    return (
        <div tabIndex={0} style={{outline: 0}}
             onKeyDown={hideDropDownKeyboardPressed}
        >
            <TopPanel/>
            <Toolbar/>
            <div className={styles.workspace}>
                <Sidebar></Sidebar>
                <div className={styles.slideArea}>
                    <Slide
                        slideItems=
                            {props.currentSlide.items.map((item) =>
                                <SlideItem slideId={props.currentSlide.id} itemId={item.id} active={false}></SlideItem>
                            )}
                        background={props.currentSlideBgColor}></Slide>
                </div>
            </div>
        </div>
    )
}

export default connect(mapStateToProps, null)(PresentationPage)