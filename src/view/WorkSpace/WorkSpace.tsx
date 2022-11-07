import {Sidebar} from "../Sidebar/Sidebar";
import {SlideArea} from "../SlideArea/SlideArea";
import styles from "./WorkSpace.module.css";

const WorkSpace = () => {
    return (
        <div className={styles.workspace}>
            <Sidebar countOfSlides={12}></Sidebar>
            <SlideArea></SlideArea>
        </div>
    )
}

export {WorkSpace};