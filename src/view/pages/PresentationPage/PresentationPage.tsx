import TopPanel from "../../components/TopPanel/TopPanel";
import Toolbar from "../../components/Toolbar/Toolbar";
import WorkSpace from "../../components/WorkSpace/WorkSpace";
import {hideDropDownKeyboardPressed, handleClicks} from "../../components/DropDown/DropDown";

const PresentationPage = () => {
    return (
        <div tabIndex={0} style={{outline: 0}}
             onKeyDown={hideDropDownKeyboardPressed}
            onClick={() => {

                const doc = document.querySelector('html')
                if (doc !== null) {
                    doc.addEventListener('click', handleClicks)



                    doc.removeEventListener('click', handleClicks)
                }

            }}
        >
            <TopPanel/>
            <Toolbar/>
            <WorkSpace/>
        </div>
    )
}

export {PresentationPage}