import {Point} from "../../../../core/types/types";

const DrawImage = (imageSrc: string, coordinates: Point) => {
    const canvas = document.getElementById("canvas") as HTMLCanvasElement;
    const canvasContext = canvas.getContext("2d") as CanvasRenderingContext2D;
    const newImage = new Image();
    newImage.width = 500;
    newImage.height = 500;
    newImage.src = imageSrc;
    newImage.onload = () => {
        canvasContext.drawImage(newImage, coordinates.x - newImage.width / 2, coordinates.y - newImage.height / 2, newImage.width, newImage.height)
    }
}

export {DrawImage}