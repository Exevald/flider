import styles from "./Button.module.css";

interface ButtonProps {
    viewStyle: 'default' | 'open' | 'save' | 'watch' | 'add' | 'undo' | 'redo' | 'selectArea' | 'selectArrow' | 'textArea' | 'image' | 'figure' | 'line' | 'palette' | 'createSlide',
    iconStyle?: 'left' | 'right' | 'center' | 'none'
    iconSrc?: string,
    text?: string,
    onClick: () => void,
}

const Button = ({
                    viewStyle,
                    iconStyle,
                    iconSrc,
                    text = '',
                    onClick
                }: ButtonProps) => {
    let buttonStyle = styles.buttonDefault;

    switch (viewStyle) {
        case "save": {
            buttonStyle = styles.buttonSave;
            break;
        }
        case "open": {
            buttonStyle = styles.buttonOpen;
            break;
        }
        case "watch": {
            buttonStyle = styles.buttonWatch;
            break;
        }
        case "add": {
            buttonStyle = styles.buttonAdd;
            break;
        }
    }
    return (
        <button
            type="button"
            className={`${styles.button} ${buttonStyle}`}
            onClick={onClick}
        >
            {iconStyle === "left" &&
                <div className={styles.iconAreaLeft}>
                    <img src={iconSrc} alt={"buttonIcon"}></img>
                </div>
            }
            <div className={styles.textDefault}>
                {text}
            </div>
            {iconStyle === "right" &&
                <div className={styles.iconAreaRight}>
                    <img src={iconSrc} alt={"buttonIcon"}></img>
                </div>
            }
        </button>
    )

}

const ButtonIcon = ({
                        viewStyle,
                        onClick,
                    }: ButtonProps) => {
    let buttonStyle;

    switch (viewStyle) {
        case "undo": {
            buttonStyle = styles.buttonUndo;
            break;
        }
        case "redo": {
            buttonStyle = styles.buttonRedo;
            break;
        }
        case "selectArea": {
            buttonStyle = styles.buttonSelectArea;
            break;
        }
        case "selectArrow": {
            buttonStyle = styles.buttonSelectArrow;
            break;
        }
        case "textArea": {
            buttonStyle = styles.buttonTextArea;
            break;
        }
        case "image": {
            buttonStyle = styles.buttonImage;
            break;
        }
        case "figure": {
            buttonStyle = styles.buttonFigure;
            break;
        }
        case "line": {
            buttonStyle = styles.buttonLine;
            break;
        }
        case "palette": {
            buttonStyle = styles.buttonPalette;
            break;
        }
        case "createSlide": {
            buttonStyle = styles.buttonCreateSlide;
            break;
        }

    }
    return (
        <button
            type="button"
            className={`${styles.iconButton} ${buttonStyle}`}
            onClick={onClick}
        >
        </button>
    )
}

export {Button, ButtonIcon}