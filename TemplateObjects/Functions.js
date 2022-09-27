import {item, actions, slide, textArea, image, figure, presentation} from "Objects";

function changeTitle(presentationName) {
    presentation.name = presentationName;
}

function saveAsJSON(presentation) {
}

function saveAsPDF(presentation) {
}

function open(jsonFile) {
}

function watch(presentation) {
}

function changeCurrentSlide(newSlideId) {
}

function showHistory(history) {
}

function undo(history) {
}

function redo(history) {
}

function createSlide(slideId) {
}

function deleteSlide(slideId) {
}

function copySlide(slideId) {
}

function moveSlide(slideId) {
}

function changeBgColor(slideId) {
}

function addItem(itemType, x, y, angle, width, height, layer) {
    item.type = itemType;
    item.x = x;
    item.y = y;
    item.angle = angle;
    item.width = width;
    item.height = height;
    item.layer = layer;
}

function changeSelectedItem(itemId) {
}

function changeSize(itemId, width, height) {
    item.width = width;
    item.height = height;
}

function moveItem(itemId, x, y) {
    item.x = x;
    item.y = y;
}

function rotate(itemId, angle) {
    item.angle = angle;
}

function copyItem(itemId) {
}

function paste(itemId) {
}

function deleteItem(itemId) {
}

function flipHorizontal(itemId) {
}

function flipVertical(itemId) {
}

function upLayer() {
}

function downLayer() {
}

function changeFontColor(itemId, color) {
    textArea.fontColor = color
}

function changeFontFamily(itemId, fontFamily) {
    textArea.fontFamily = fontFamily;
}

function changeFontSize(itemId, fontSize) {
    textArea.fontSize = fontSize;
}

function saveImage(itemId, src) {
}

function fill(itemId, fillColor) {
}

function stroke(itemId, strokeColor) {
}

function changeFillColor(itemId, fillColor) {
    figure.fillColor = fillColor;
}

function changeStrokeColor(itemId, strokeColor) {
    figure.strokeColor = strokeColor;
}