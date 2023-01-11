import styles from "./TextArea.module.css"
import topPanelStyles from "../TopPanel/TopPanel.module.css"
import itemStyles from "../SlideItem/SlideItem.module.css"
import {connect} from "react-redux";
import {MAX_TITLE_SIZE} from "../../../core/functions/utility";
import {CSSProperties} from "react";

interface TextAreaProps {
    placeholder?: string;
    type: 'title' | 'ordinary' | 'slideItem';
    value?: string;
    style?: CSSProperties,
    onKeyUp: (value: string) => void;
}

const TextArea = ({
                      placeholder = "",
                      value,
                      style,
                      onKeyUp,
                      type
                  }: TextAreaProps) => {
    let textAreaStyle: string;
    type === 'title' ? textAreaStyle = topPanelStyles.name : textAreaStyle = `${styles.button_default} ${styles.inputDefault}`;
    if (type === 'slideItem') {
        textAreaStyle = itemStyles.textArea
    }
    return (
        <input type="text"
               value={value}
               style={style}
               placeholder={placeholder}
               className={textAreaStyle}
               onKeyUp={(event) => {
                   if (event.key === "Enter") {
                       onKeyUp(event.currentTarget.value)
                   }
               }}
        />
    )
}


export default connect()(TextArea)
