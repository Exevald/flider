import {Editor, Figure, Point, ShapeType} from "../../../../core/types/types";
import {Area} from "../../../../core/types/types";
import {connect, ConnectedProps} from "react-redux";

interface FigureProps {
    figure: Figure;
    figureArea: Area;
    coordinates: Point,
}

const DrawRectangle = (shape: ShapeType, coordinates: Point, figureArea: Area, color: string) => {
    const canvas = document.getElementById("canvas") as HTMLCanvasElement;
    const canvasContext = canvas.getContext("2d");
    if (canvasContext) {
        canvasContext.fillStyle = color;
        canvasContext.fillRect(coordinates.x, coordinates.y, figureArea.width, figureArea.height);
    }
}

const DrawArc = (shape: ShapeType, coordinates: Point, figureArea: Area, color: string) => {
    const canvas = document.getElementById("canvas") as HTMLCanvasElement;
    const canvasContext = canvas.getContext("2d");
    if (canvasContext) {
        canvasContext.fillStyle = color;
        canvasContext.arc(coordinates.x, coordinates.y, figureArea.width, 0, Math.PI * 2);
        canvasContext.fill();
    }
}

const DrawTriangle = (shape: ShapeType, coordinates: Point, figureArea: Area, color: string) => {
    const canvas = document.getElementById("canvas") as HTMLCanvasElement;
    const canvasContext = canvas.getContext("2d");
    if (canvasContext) {
        canvasContext.fillStyle = color;
        canvasContext.beginPath();
        canvasContext.moveTo(coordinates.x, coordinates.y + figureArea.height);
        canvasContext.lineTo(coordinates.x + figureArea.width / 2, coordinates.y);
        canvasContext.lineTo(coordinates.x + figureArea.width, coordinates.y + figureArea.height);
        canvasContext.lineTo(coordinates.x, coordinates.y + figureArea.height);
        canvasContext.closePath();
        canvasContext.fill();
    }
}

const DrawFigure = (shape: ShapeType, coordinates: Point, figureArea: Area, color: string) => {
    switch (shape) {
        case ShapeType.Rectangle:
            return DrawRectangle(shape, coordinates, figureArea, color);
        case ShapeType.Arc:
            return DrawArc(shape, coordinates, figureArea, color);
        case ShapeType.Triangle:
            return DrawTriangle(shape, coordinates, figureArea, color);
    }
}

export {DrawFigure}