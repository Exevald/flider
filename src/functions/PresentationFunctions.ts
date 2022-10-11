// Включает сейвы, просмотр презентации;
// действия со слайдами
import {History, Presentation} from "../core/model/Types";
import * as fs from "fs";


/**         очень важные константы          **/
const MAX_HISTORY_SIZE = 30;


function changeTitle(Pr: Presentation, title: string): Presentation {
    Pr.title = title;
    return Pr
}

function saveAsJSON(Pr: Presentation): string {
    return JSON.stringify(Pr);
}

function saveAsPDF(Pr: Presentation) {
    // без понятия
}
/*          ошибка с полями
function open(dest: string): Presentation {
    // считал строку и сразу же распарсил в json
    let jsonConfig: JSON = JSON.parse(fs.readFileSync(dest, "utf8"));
    return jsonConfig;
}*/

function watch(Pr: Presentation) {
    // тут будет адская вёрстка
}

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


/*      отменяет и возвращает, провека типов будет на уровне выше    */
function undo(h: History): Presentation | undefined {
    return h[h.length - 2];
}
function redo(h: History): Presentation | undefined {
    return h[-1];
}
