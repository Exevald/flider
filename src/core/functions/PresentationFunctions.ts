// Включает сейвы, просмотр презентации;
// действия со слайдами
import {History, Presentation} from "../../model/Types";

import {DEFAULT_PRESENTATION_CONFIG} from "./UtilityFunctions";

/**         очень важные константы          **/
const MAX_HISTORY_SIZE = 30;


function createPresentation(): Presentation {
    return DEFAULT_PRESENTATION_CONFIG;
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
    console.log("undo");
    return h[h.length - 2];
}
function redo(h: History): Presentation | undefined {
    console.log("redo");
    return h[-1];
}

export {createPresentation, watch, changeTitle, addStateToHistory, undo, redo}
