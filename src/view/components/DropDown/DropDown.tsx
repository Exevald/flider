import styles from "./DropDown.module.css"
import {connect} from "react-redux";
import {ConnectedProps} from "react-redux/es/exports";
import {Editor} from "../../../core/types/types";
import {AppDispatcher} from "../../../model/store";
import {savePresentation} from "../../../model/actionCreators";

interface DropDownCustomProps {
    id: string,
    viewStyle: 'createSlide' | 'undo' | 'redo' | 'selectArea' | 'selectArrow' | 'textArea' | 'image'
        | 'figure' | 'line' | 'palette' | 'saveAction',
}

function mapStateToProps(state: Editor) {
    return {}
}

function mapDispatchToProps(dispatcher: AppDispatcher) {
    return {
        savePresentation: dispatcher(savePresentation())
    }
}

const connector = connect(mapStateToProps, mapDispatchToProps)
type DropDownInitialProps = ConnectedProps<typeof connector>

function showDropDownById(id: string): void {
    const dropDown = document.getElementById(id);
    if (dropDown !== null) {
        dropDown.classList.toggle(styles.dropDownShow)
    }
}

const DropDown = ({id, viewStyle}: DropDownCustomProps, props: DropDownInitialProps) => {
    const colors = ["white", "whitesmoke", "gray", "darkgray", "black", "yellow", "orange", "darkorange", "red", "darkred"];
    let colorsList = [];
    for (let i = 0; i < colors.length; i++) {
        colorsList.push(
            <button className={styles.paletteColor} style={{backgroundColor: colors[i]}} onClick={() => {
            }}></button>
        )
    }
    if (viewStyle !== null) {
        switch (viewStyle) {
            case "palette":
                return (
                    <div id={id} className={styles.dropDown + " " + styles.palette}>
                        <div className={styles.dropDownContent}>
                            <p>Основные цвета</p>
                            <div className={styles.separator}></div>
                            <div className={styles.paletteContent}>
                                {colorsList}
                            </div>
                        </div>
                    </div>
                )
            case "saveAction":
                return (
                    <div id={id} className={styles.dropDown + " " + styles.saveAction}>
                        <div className={styles.dropDownContent}>
                            <a>Сохранить PDF</a>
                            <div className={styles.separator}></div>
                            <a onClick={() => props.savePresentation}>Сохранить JSON</a>
                        </div>
                    </div>
                )
        }
    }
    return (
        <div id={id} className={styles.dropDown}>
            <p>Введено название рендеринга, которого нет</p>
        </div>
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(DropDown)
export {showDropDownById}