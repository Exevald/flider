import styles from "./Button.module.css";

interface ButtonProps {
    viewStyle: 'default' | 'open' | 'save' | 'watch' | 'add',
    iconStyle: 'left' | 'right' | 'center' | 'none'
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
    switch (iconStyle) {
        case "none": {
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
        case "left": {
            return (
                <button
                    type="button"
                    className={`${styles.button} ${buttonStyle}`}
                    onClick={onClick}
                >
                    <div className={styles.icon_area_left}>
                        <img src={iconSrc} alt={"buttonIcon"}></img>
                    </div>
                    <div className={styles.text_default}>
                        {text}
                    </div>
                </button>
            )
        }
        case "right": {
            return (
                <button
                    type="button"
                    className={`${styles.button} ${buttonStyle}`}
                    onClick={onClick}
                >
                    <div className={styles.text_default}>
                        {text}
                    </div>
                    <div className={styles.icon_area_right}>
                        <img src={iconSrc} alt={"buttonIcon"}></img>
                    </div>
                </button>
            )
        }
        case "center":
            return (
                <button
                    type="button"
                    className={`${styles.button} ${buttonStyle}`}
                    onClick={onClick}
                >
                    <div className={styles.icon_area_center}>
                        <img src={iconSrc} alt={"buttonIcon"}></img>
                    </div>
                </button>
            )
    }
}

export {Button}