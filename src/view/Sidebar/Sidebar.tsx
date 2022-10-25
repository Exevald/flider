import styles from "./Sidebar.module.css"

interface SlidePreview {
    id?: number,
    preview?: string,
}

const Sidebar = (slidePreview: SlidePreview) => {
    return (
        <div className={styles.sidebar}>
        </div>
    )
}

export {Sidebar}