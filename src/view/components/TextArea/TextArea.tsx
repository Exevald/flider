import styles from "./TextArea.module.css"
import topPanelStyles from "../TopPanel/TopPanel.module.css"
import {connect} from "react-redux";
import {MAX_TITLE_SIZE} from "../../../core/functions/utility";

interface TextAreaProps {
    placeholder?: string;
    type: 'title' | 'ordinary';
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
    return (
        <input type="text"
               style={{width: 228}}
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
