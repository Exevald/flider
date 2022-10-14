import logoArea from "./LogoArea.svg"
const PRESENTATION_NAME_MAX_LENGTH = 48;

const LogoArea = () => {
    return(
        <div>
            <img
                src={logoArea}
                alt={"Main Logo"}/>
        </div>
    )
}

const InputPresentationName = () => {
    return(
        <div>
            <p>
                <input name={"PrName"}
                      className={"inputPresentationName"}
                      maxLength={PRESENTATION_NAME_MAX_LENGTH}
                      placeholder={"Презентация без названия"}
                      accept={".json"}
                />
            </p>
        </div>
    )
}

const OpenBtn = () => {
    return(
        <div className={"openBtn"}>
            <p>Открыть</p>
        </div>
    )
}

const SaveBtn = () => {
    return(
        <div className={"saveBtn"}>
            <p>Сохранить</p>

        </div>
    )
}

const WatchBtn = () => {
    return(
        <div className={"watchBtn"}>
            <p>Смотреть</p>
        </div>
    )
}

const TopPanel = ({/* надо параметры */}) => {
    return (
        <div className={"top-panel"}>
            <LogoArea/>
            <InputPresentationName/>
            <OpenBtn/>
            <SaveBtn/>
            <WatchBtn/>
        </div>
    )
}
export default TopPanel