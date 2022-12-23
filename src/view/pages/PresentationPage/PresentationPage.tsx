import TopPanel from "../../components/TopPanel/TopPanel";
import Toolbar from "../../components/Toolbar/Toolbar";
import WorkSpace from "../../components/WorkSpace/WorkSpace";
import styles from "../../components/DropDown/DropDown.module.css";

const PresentationPage = () => {
    return (
        <div tabIndex={0} style={{outline: 0}}
            onKeyDown={(e) => {
                const saveAction = document.getElementById('saveActionDropDown');
                const colorPicker = document.getElementById('ColorPicker');
                const stocks = document.getElementById('Stocks');
                const imageSelector = document.getElementById('ImageSelector');

                if (saveAction !== null && colorPicker !== null && stocks !== null && imageSelector !== null) {

                    if (e.code === 'Escape') {
                        if (stocks.classList.contains(styles.dropDownShow)) {
                            stocks.classList.remove(styles.dropDownShow)
                        } else {
                            saveAction.classList.remove(styles.dropDownShow);
                            colorPicker.classList.remove(styles.dropDownShow);
                            imageSelector.classList.remove(styles.dropDownShow);
                        }
                    }

                }
            }
        }>
            <TopPanel/>
            <Toolbar/>
            <WorkSpace/>
        </div>
    )
}

export {PresentationPage}