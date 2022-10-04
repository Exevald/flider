// Включает сейвы, просмотр презентации;
// действия со слайдами

import {Presentation, Slide } from "../model/Types";
import * as fs from 'fs';

function saveAsJSON(Pr: Presentation): string {
    return JSON.stringify(Pr)
}

function saveAsPDF(Pr: Presentation) {
    // без понятия
}

function open(dest: string) {
    
}
