import styles from "./SlideArea.module.css"
import {connect} from "react-redux";

interface SlideAreaProps {
    slideItems: Array<JSX.Element>;
    background: string;
}

const Slide = ({slideItems, background}: SlideAreaProps) => {
    return (
        <div className={styles.slide} style={{"background": background}}>
            <ul>{slideItems}</ul>
        </div>
    )
}

export default connect()(Slide)