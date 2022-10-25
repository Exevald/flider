import styles from "./SlideArea.module.css"


const Slide = () => {
    return(
        <div className={styles.slide}>

        </div>
    )
}


const SlideArea = () => {
    return(
        <div className={styles.slideArea}>
            <Slide></Slide>
        </div>
    )
}

export {SlideArea};