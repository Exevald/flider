import {Point, ShapeType} from "../../../../core/types/types";
import {Area} from "../../../../core/types/types";

const DrawRectangle = (canvasId: string, coordinates: Point, figureArea: Area, color: string) => {
    if (canvasId !== null) {
        const canvas = document.getElementById(canvasId) as HTMLCanvasElement;
        const canvasContext = canvas.getContext("2d") as CanvasRenderingContext2D;
        canvasContext.fillStyle = color;
        canvasContext.fillRect(coordinates.x, coordinates.y, figureArea.width, figureArea.height);
    }
}

const DrawArc = (canvasId: string, coordinates: Point, figureArea: Area, color: string) => {
    if (canvasId !== null) {
        console.log(canvasId)
        const canvas = document.getElementById(canvasId) as HTMLCanvasElement;
        const canvasContext = canvas.getContext("2d") as CanvasRenderingContext2D;
        canvasContext.fillStyle = color;
        canvasContext.arc(coordinates.x, coordinates.y, figureArea.width, 0, Math.PI * 2);
        canvasContext.fill();
    }
}

const DrawTriangle = (canvasId: string, coordinates: Point, figureArea: Area, color: string) => {
    if (canvasId !== null) {
        const canvas = document.getElementById(canvasId) as HTMLCanvasElement;
        const canvasContext = canvas.getContext("2d") as CanvasRenderingContext2D;
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

const DrawStar = (canvasId: string, coordinates: Point, figureArea: Area, color: string) => {
    if (canvasId !== null) {
        const canvas = document.getElementById(canvasId) as HTMLCanvasElement;
        const canvasContext = canvas.getContext("2d") as CanvasRenderingContext2D;
        canvasContext.fillStyle = color;
        const starHeight = figureArea.height * 0.905;
        const startX = coordinates.x;
        const startY = coordinates.y + 0.381 * starHeight;
        canvasContext.beginPath();
        canvasContext.moveTo(startX, startY);
        canvasContext.lineTo(figureArea.width * 0.384 + startX, startY);
        canvasContext.lineTo(coordinates.x + figureArea.width / 2, coordinates.y);
        canvasContext.lineTo(coordinates.x + figureArea.width * 0.616, startY);
        canvasContext.lineTo(coordinates.x + figureArea.width, startY);
        const currY = starHeight * 0.619;
        const currX = figureArea.width * 0.692;
        canvasContext.lineTo(coordinates.x + currX, coordinates.y + currY);
        canvasContext.lineTo(coordinates.x + figureArea.width * 0.808, coordinates.y + starHeight);
        canvasContext.lineTo(coordinates.x + figureArea.width / 2, coordinates.y + starHeight * 0.765);
        canvasContext.lineTo(coordinates.x + figureArea.width * 0.192, coordinates.y + starHeight);
        canvasContext.lineTo(coordinates.x + figureArea.width - currX, coordinates.y + currY);
        canvasContext.lineTo(startX, startY);
        canvasContext.lineTo(figureArea.width * 0.384 + startX, startY);
        canvasContext.closePath();
        canvasContext.fill();
    }
}

const DrawFigure = (canvasId: string, shape: ShapeType, coordinates: Point, figureArea: Area, color: string) => {
    switch (shape) {
        case ShapeType.Rectangle:
            return DrawRectangle(canvasId, coordinates, figureArea, color);
        case ShapeType.Arc:
            return DrawArc(canvasId, coordinates, figureArea, color);
        case ShapeType.Triangle:
            return DrawTriangle(canvasId, coordinates, figureArea, color);
        case ShapeType.Star:
            return DrawStar(canvasId, coordinates, figureArea, color)
    }
}

export {DrawFigure}