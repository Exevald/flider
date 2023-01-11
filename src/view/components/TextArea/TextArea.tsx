import styles from "./TextArea.module.css"
import topPanelStyles from "../TopPanel/TopPanel.module.css"
import itemStyles from "../SlideItem/SlideItem.module.css"
import {connect} from "react-redux";
import {MAX_TITLE_SIZE} from "../../../core/functions/utility";

interface TextAreaProps {
    placeholder?: string;
    type: 'title' | 'ordinary' | 'slideItem';
    value?: string;
    onKeyUp: (value: string) => void;
}

const TextArea = ({
                      placeholder = "",
                      value,
                      onKeyUp,
                      type
                  }: TextAreaProps) => {
    let textAreaStyle: string;
    type === 'title' ? textAreaStyle = topPanelStyles.name : textAreaStyle = `${styles.button_default} ${styles.inputDefault}`;
    if (type === 'slideItem') {
        textAreaStyle = `${itemStyles.element} ${itemStyles.textArea}`
    }
    return (
        <input type="text"
               value={value}
               placeholder={placeholder}
               className={textAreaStyle}
               onKeyUp={(event) => {
                   if (event.key === "Enter") {
                       onKeyUp(event.currentTarget.value)
                   }
               }}
        >
        </input>
    )
}


export default connect()(TextArea)
