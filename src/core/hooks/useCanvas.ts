import {useState, useEffect, useRef} from "react";
import {Area, Point, ShapeType} from "../types/types";

const canvas = document.getElementById("canvas") as HTMLCanvasElement;
const canvasContext = canvas.getContext("2d") as CanvasRenderingContext2D;

interface FigureInterface {
    shape: ShapeType,
    coordinates: Point,
    size: Area,
    fillColor: string,
    strokeColor: string,
}

function drawFigure(figure: FigureInterface) {
    switch (figure.shape) {
        case ShapeType.Rectangle: {
            canvasContext.fillStyle = figure.fillColor;
            canvasContext.fillRect(figure.coordinates.x, figure.coordinates.y, figure.size.width, figure.size.height);
            break;
        }
        case ShapeType.Arc: {
            break;
        }
        case ShapeType.Triangle: {
            break;
        }
    }
}

export {drawFigure}