import styles from "./Sidebar.module.css"

interface SlidePreviewProps {
    id?: number,
    preview?: string,
}

interface SidebarProps {
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