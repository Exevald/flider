import TopPanel from "../../components/TopPanel/TopPanel";
import Toolbar from "../../components/Toolbar/Toolbar";
import WorkSpace from "../../components/WorkSpace/WorkSpace";
import {hideDropDownKeyboardPressed, handleClicks} from "../../components/DropDown/DropDown";
import {useEffect} from "react";

const PresentationPage = () => {

    useEffect(() => {
        const doc = document.querySelector('body');
        if (doc !== null) {
            doc.addEventListener("click", handleClicks)
            return () => {
                doc.removeEventListener("click", handleClicks)
            }
        }
    });

    return (
        <div tabIndex={0} style={{outline: 0}}
             onKeyDown={hideDropDownKeyboardPressed}
        >
            <TopPanel/>
            <Toolbar/>
            <WorkSpace/>
        </div>
    )
}

export {PresentationPage}