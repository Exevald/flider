import styles from "./Button.module.css";
import saveDropDownIcon from "./ButtonIcons/SaveDropDownIcon.svg"

interface ButtonProps {
    viewStyle: 'default' | '',
    text?: string,
    onClick: () => void,
}

const Button = ({
                    viewStyle,
                    text = '',
                    onClick
                }: ButtonProps) => {
    let buttonStyle = styles.button_default;
    return (
        <button
            type="button"
            className={`${styles.button} ${buttonStyle}`}
            onClick={onClick}
        >
            <div className={styles.text_default}>
                {text}
            </div>
        </button>
    )
}

const TopPanelOpenButton = ({
                    text = '',
                    onClick
                }: ButtonProps) => {
    return (
        <button
            type="button"
            className={styles.button_open_button}
            onClick={onClick}
        >
            <div className={styles.text_default}>
                {text}
            </div>
        </button>
    )
}

const TopPanelSaveButton = ({
                                text = '',
                                onClick
                            }: ButtonProps) => {
    return (
        <button
            type="button"
            className={styles.button_save_button}
            onClick={onClick}
        >
            <div className={styles.icon_text}>
                {text}
            </div>
            <div>
                <img src={saveDropDownIcon} alt={"saveDropDownIcon"}></img>
            </div>
        </button>
    )
}

export {Button, TopPanelOpenButton, TopPanelSaveButton}