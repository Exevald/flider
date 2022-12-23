import styles from "./TextArea.module.css"
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
    debugger
    let textAreaStyle = styles.button_default;
    if (type === 'title') {
        value = value?.substring(0, MAX_TITLE_SIZE);
    }
    return (
        <input type="text"
               value={value}
               placeholder={placeholder}
               className={`${styles.inputDefault} ${textAreaStyle}`}
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
