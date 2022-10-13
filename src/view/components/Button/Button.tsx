import styles from "./Button.module.css";

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
            <div className={`${styles.text} ${styles.text_sign}`}>
                {text}
            </div>
        </button>
    )
}
export default Button