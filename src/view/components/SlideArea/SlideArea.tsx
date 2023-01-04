import styles from "./SlideArea.module.css"
import {connect} from "react-redux";

interface SlideAreaProps {
    slideItems: Array<JSX.Element>;
    background: string;
}

const SlideArea = ({slideItems, background}:SlideAreaProps) => {
    return (
        <div className={styles.slideArea}>
            <div className={styles.slide} style={{"background": background}}>
                <ul>{slideItems}</ul>
            </div>
        </div>
    )
}

export default connect()(SlideArea)