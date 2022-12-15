import styles from "./TextArea.module.css"
import {connect} from "react-redux";

interface TextAreaProps {
    placeholder?: string,
    value?: string,
    onKeyUp: (value: string) => void,
}

const TextArea = ({
                      placeholder = "",
                      value,
                      onKeyUp,
                  }: TextAreaProps) => {
    let textAreaStyle = styles.button_default;
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
