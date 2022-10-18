import styles from "./TextArea.module.css"

interface TextAreaProps {
    viewStyle: 'default' | 'presentationName'
    placeholder?: string,
    value?: string,
}

const TextArea = ({
                      viewStyle,
                      placeholder = "",
                      value
                  }: TextAreaProps) => {
    let textAreaStyle = styles.button_default;
    switch (viewStyle) {
        case "presentationName": {textAreaStyle = styles.input_top_panel; break}
    }
    return (
        <input type="text"
               value={value}
               placeholder={placeholder}
               className={`${styles.input_default} ${textAreaStyle}`}
        >
        </input>
    )
}


export {TextArea}
