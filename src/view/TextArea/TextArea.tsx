import styles from "./TextArea.module.css"

interface TextAreaProps {
    viewStyle: 'default' | 'presentationName'
    placeholder?: string,
    value?: string,
    onKeyUp?: (value: string) => void,
}

const TextArea = ({
                      viewStyle,
                      placeholder = "",
                      value,
                  }: TextAreaProps) => {
    let textAreaStyle = styles.button_default;
    switch (viewStyle) {
        case "presentationName": {
            textAreaStyle = styles.inputTopPanel;
            break
        }
    }
    return (
        <input type="text"
               value={value}
               placeholder={placeholder}
               className={`${styles.inputDefault} ${textAreaStyle}`}
        >
        </input>
    )
}


export {TextArea}
