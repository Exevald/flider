// Включает сейвы, просмотр презентации;
// действия со слайдами

import {Presentation, Slide } from "../model/Types";
import * as fs from "fs";


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

function open(dest: string): Presentation {
    // считал строку и сразу же распарсил в json
    let jsonConfig: JSON = JSON.parse(fs.readFileSync(dest, "utf8"));
    let Pr: Presentation = jsonConfig;
    return Pr;
}

function watch(Pr: Presentation) {
    // тут будет адская вёрстка
}