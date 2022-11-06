// Включает сейвы, просмотр презентации;
// действия со слайдами
import {History, Presentation, Slide} from "../../model/Types";


/**         очень важные константы          **/
export const MAX_HISTORY_SIZE = 30;
export const DEFAULT_SLIDE_CONFIG: Slide = {
    id: "0",
    items: [],
    bgColor: "white",
}


export function createPresentation(): Presentation {
    let pr: Presentation;
    pr = DEFAULT_SLIDE_CONFIG;
    return pr;
}


export function changeTitle(Pr: Presentation, title: string): Presentation {
    Pr.title = title;
    return Pr
}


    /**         СОХРАНЕНИЯ        **/
export function saveAsJSON(Pr: Presentation): string {
    return JSON.stringify(Pr);
}

export function saveAsPDF(Pr: Presentation) {
    // без понятия
}

/*          ошибка с полями
export function open(dest: string): Presentation {
    // считал строку и сразу же распарсил в json
    let jsonConfig: JSON = JSON.parse(fs.readFileSync(dest, "utf8"));
    return jsonConfig;
}*/

export function watch(Pr: Presentation) {
    // тут будет адская вёрстка
}

    /**         ДЕЙСТВИЯ СО СЛАЙДАМИ         **/
export function createSlide(pr: Presentation): Presentation {
    pr.slides.push(DEFAULT_SLIDE_CONFIG);
    return pr;
}


    /**         ДЕЙСТВИЯ С ИСТОРИЕЙ         **/
export function addStateToHistory(h:History, pr: Presentation): History {
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
export function undo(h: History): Presentation | undefined {
    return h[h.length - 2];
}
export function redo(h: History): Presentation | undefined {
    return h[-1];
}
