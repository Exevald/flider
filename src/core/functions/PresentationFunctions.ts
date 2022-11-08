// Включает сейвы, просмотр презентации;
// действия со слайдами
import {History, Presentation, Slide} from "../../model/Types";
import {DEFAULT_SLIDE_CONFIG} from "./SlideFunctions";


/**         очень важные константы          **/
const MAX_HISTORY_SIZE = 30;

const DEFAULT_PRESENTATION_CONFIG = {
    slides: [DEFAULT_SLIDE_CONFIG],
    title: 'Unnamed',
    selected: [],
    actions: {
        history: [],
    },
}


function changeTitle(Pr: Presentation, title: string): Presentation {
    Pr.title = title;
    return Pr
}

    /**         СОХРАНЕНИЯ        **/
function saveAsJSON(Pr: Presentation): string {
    return JSON.stringify(Pr);
}

function saveAsPDF(Pr: Presentation) {
    // без понятия
}

/*          ошибка с полями
export function open(dest: string): Presentation {
    // считал строку и сразу же распарсил в json
    let jsonConfig: JSON = JSON.parse(fs.readFileSync(dest, "utf8"));
    return jsonConfig;
}*/

function watch(Pr: Presentation) {
    // тут будет адская вёрстка
}



    /**         ДЕЙСТВИЯ С ИСТОРИЕЙ         **/
function addStateToHistory(h:History, pr: Presentation): History {
    // добавляет состояние презентации и контролит количество, чтобы не подпалить оперативу
    if(h.length > MAX_HISTORY_SIZE) {
        // убирает элемент из начала и закинывает в конец
        h.shift(); h.push(pr);
        return h;
    } else {
        h.push(pr);
        return h;
    }
}
/*      отменяет и возвращает, провека типов будет на уровне выше
*       ещё надо переставлять собитыя истории при добавлении события в центр */
function undo(h: History): Presentation | undefined {
    return h[h.length - 2];
}
function redo(h: History): Presentation | undefined {
    return h[-1];
}

export {DEFAULT_PRESENTATION_CONFIG}
export {addStateToHistory, undo, redo}
