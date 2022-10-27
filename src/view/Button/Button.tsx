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
    let buttonStyle = styles.button_default;

    switch (viewStyle) {
        case "save": {
            buttonStyle = styles.button_save;
            break;
        }
        case "open": {
            buttonStyle = styles.button_open;
            break;
        }
        case "watch": {
            buttonStyle = styles.button_watch;
            break;
        }
        case "add": {
            buttonStyle = styles.button_add;
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
                <div className={styles.icon_area_left}>
                    <img src={iconSrc} alt={"buttonIcon"}></img>
                </div>
            }
            <div className={styles.text_default}>
                {text}
            </div>
            {iconStyle === "right" &&
                <div className={styles.icon_area_right}>
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
            buttonStyle = styles.button_undo;
            break;
        }
        case "redo": {
            buttonStyle = styles.button_redo;
            break;
        }
        case "selectArea": {
            buttonStyle = styles.button_select_area;
            break;
        }
        case "selectArrow": {
            buttonStyle = styles.button_select_arrow;
            break;
        }
        case "textArea": {
            buttonStyle = styles.button_text_area;
            break;
        }
        case "image": {
            buttonStyle = styles.button_image;
            break;
        }
        case "figure": {
            buttonStyle = styles.button_figure;
            break;
        }
        case "line": {
            buttonStyle = styles.button_line;
            break;
        }
        case "palette": {
            buttonStyle = styles.button_palette;
            break;
        }
        case "createSlide": {
            buttonStyle = styles.button_create_slide;
            break;
        }

    }
    return (
        <button
            type="button"
            className={`${styles.icon_button} ${buttonStyle}`}
            onClick={onClick}
        >
        </button>
    )
}

export {Button, ButtonIcon}