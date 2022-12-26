import {Figure, Point, ShapeType} from "../../../../core/types/types";
import {Area} from "../../../../core/types/types";
interface FigureProps {
    figure: Figure;
    figureArea: Area;
    coordinates: Point,
}

const DrawRectangle = (shape: ShapeType, figureArea: Area, coordinates: Point) => {
    const canvas = document.getElementById("canvas") as HTMLCanvasElement;
    const canvasContext = canvas.getContext("2d");
    if (canvasContext) {
        canvasContext.fillStyle = "red";
        canvasContext.fillRect(coordinates.x, coordinates.y, figureArea.width, figureArea.height);
    }
}

const DrawArc = (shape: ShapeType, figureArea: Area, coordinates: Point) => {
    const canvas = document.getElementById("canvas") as HTMLCanvasElement;
    const canvasContext = canvas.getContext("2d");
    if (canvasContext) {
        canvasContext.fillStyle = "red";
        canvasContext.arc(coordinates.x, coordinates.y, figureArea.width, 0, Math.PI * 2);
        canvasContext.fill();
    }
}

const DrawFigure = (shape: ShapeType, figureArea: Area, coordinates: Point) => {
    switch (shape) {
        case ShapeType.Rectangle:
            return DrawRectangle(shape, figureArea, coordinates);
        case ShapeType.Arc:
            return DrawArc(shape, figureArea, coordinates);
    }
}

export {DrawFigure}