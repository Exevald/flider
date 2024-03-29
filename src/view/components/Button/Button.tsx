import styles from "./Button.module.css";
import {Link} from "react-router-dom";

interface ButtonProps {
    viewStyle: 'default' | 'open' | 'save' | 'watch' | 'add' | 'undo' | 'redo' | 'selectArea' | 'selectArrow'
        | 'textArea' | 'image' | 'figure' | 'line' | 'palette' | 'createSlide' | 'filler' | 'stroke' | 'bold'
        | 'cursive' | 'underline' | 'goToEditor' | 'fontArea' | 'rename' | 'instruction';
    iconStyle?: 'left' | 'right' | 'center' | 'none';
    iconSrc?: string;
    text?: string;
    onClick: () => void;
    to?: string;
    id?: string;
}

const linkStyle = {
    color: 'white',
}

const Button = ({
                    viewStyle,
                    iconStyle,
                    iconSrc,
                    text = '',
                    onClick,
                    to,
                    id
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
        case "goToEditor": {
            buttonStyle = styles.buttonGoToEditor;
            break;
        }
        case "fontArea": {
            buttonStyle = styles.fontArea;
            break;
        }
        case "rename": {
            buttonStyle = styles.buttonRename;
            break;
        }
        case "instruction":
            buttonStyle = styles.buttonInstruction;
            break;
    }
    if(to !== undefined) {
        return (
            <Link to={to} style={linkStyle}>
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
                    <div className={styles.text_default}>
                        {text}
                    </div>
                    {iconStyle === "right" &&
                        <div className={styles.iconAreaRight}>
                            <img src={iconSrc} alt={"buttonIcon"}></img>
                        </div>
                    }
                </button>
            </Link>
        )
    } else if (id !== undefined) {
        return (
            <button
                type="button"
                className={`${styles.button} ${buttonStyle}`}
                onClick={onClick}
                id = {id}
            >
                {iconStyle === "left" &&
                    <div className={styles.iconAreaLeft}>
                        <img src={iconSrc} alt={"buttonIcon"}></img>
                    </div>
                }
                <div className={styles.text_default}>
                    {text}
                </div>
                {iconStyle === "right" &&
                    <div className={styles.iconAreaRight}>
                        <img src={iconSrc} alt={"buttonIcon"}></img>
                    </div>
                }
            </button>
        )
    } else {
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
                <div className={styles.text_default}>
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

}

const ButtonIcon = ({
                        viewStyle,
                        onClick,
                        id
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
        case "filler": {
            buttonStyle = styles.buttonFill;
            break;
        }
        case "stroke": {
            buttonStyle = styles.buttonStroke;
            break;
        }
        case "bold": {
            buttonStyle  = styles.buttonBold;
            break;
        }
        case "cursive": {
            buttonStyle = styles.buttonCursive;
            break;
        }
        case "underline": {
            buttonStyle = styles.buttonUnderline;
            break;
        }
        case "fontArea": {
            buttonStyle = styles.fontArea;
            break;
        }
    }
    if (id !== undefined) {
        return (
            <button
                type="button"
                className={`${styles.iconButton} ${buttonStyle}`}
                onClick={onClick}
                id={id}
            >
            </button>
        )
    } else {
        return (
            <button
                type="button"
                className={`${styles.iconButton} ${buttonStyle}`}
                onClick={onClick}
            >
            </button>
        )
    }
}

export {Button, ButtonIcon}
