import styles from "./TextArea.module.css"

interface TextAreaProps {
    placeholder?: string,
    value?: string,
}

const TextArea = ({
                      placeholder = "",
                      value
                  }: TextAreaProps) => {
    return (
        <input type="text"
               value={value}
               placeholder={placeholder}
               className={styles.input_default}
        >
        </input>
    )
}

const TopPanelTextArea = ({
                              placeholder = "",
                              value
                          }: TextAreaProps) => {
    return (
        <input type="text"
               value={value}
               placeholder={placeholder}
               className={styles.input_top_panel}
        >
        </input>
    )
}


export {TextArea, TopPanelTextArea}
