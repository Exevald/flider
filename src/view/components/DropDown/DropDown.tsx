import styles from "./DropDown.module.css"
import {Editor} from "../../../core/types/types";
import {AppDispatcher} from "../../../model/store";
import {savePresentation} from "../../../model/actionCreators";
import {connect} from "react-redux";
import {ConnectedProps} from "react-redux/es/exports";

interface DropDownCustomProps {
    id: string,
    viewStyle: 'createSlide' | 'undo' | 'redo' | 'selectArea' | 'selectArrow' | 'textArea' | 'image'
        | 'figure' | 'line' | 'palette' | 'saveAction',
}

function showDropDownById(id: string): void {
    const dropDown = document.getElementById(id);
    if (dropDown !== null) {
        dropDown.classList.toggle(styles.dropDownShow)
    }
}

function mapStateToProps(state: Editor) {
    return {
    }
}

function mapDispatchToProps(dispatcher: AppDispatcher) {
    return {
        savePresentation: dispatcher(savePresentation())
    }
}

const connector = connect(mapStateToProps, mapDispatchToProps)
type DropDownInitialProps = ConnectedProps<typeof connector>

const DropDown = ({id, viewStyle}: DropDownCustomProps, props: DropDownInitialProps) => {
    let dropDownStyle = 'createSlide';
    if (viewStyle !==  null) {
        dropDownStyle = viewStyle
    }
    return (
        <div id={id} className={`${styles.dropDown} ${dropDownStyle} ${styles.saveAction}`}>
            <div className={styles.dropDownContent}>
                <a>Сохранить PDF</a>
                <div className={styles.separator}></div>
                <a onClick={() => `props.savePresentation`}>Сохранить JSON</a>
            </div>
        </div>
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(DropDown)
export {showDropDownById}