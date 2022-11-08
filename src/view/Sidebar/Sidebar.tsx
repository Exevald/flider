import styles from "./Sidebar.module.css"
import {Slide} from "../../model/Types";

interface SlidePreviewProps {
    id?: number,
    preview?: string,
}

interface SidebarProps {
    slides?: Array<Slide>,
    countOfSlides: number,
}

const SlidePreview = ({
                          id,
                          preview
                      }: SlidePreviewProps) => {
    return (
        <div className={styles.sidebarRow}>
            <p className={styles.slideIndex}>{id}</p>
            <div className={styles.slidePreview}>{preview}</div>
        </div>
    )
}

const Sidebar = (props: SidebarProps) => {
    let slides = [];
    for (let i = 1; i <= props.countOfSlides; i++) {
        slides.push(<SlidePreview id={i}></SlidePreview>)
    }
    return (
        <div className={styles.sidebar}>
            {slides}
        </div>
    )
}

export {Sidebar}