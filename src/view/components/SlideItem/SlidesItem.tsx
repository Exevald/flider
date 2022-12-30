import {Item, ItemType} from "../../../core/types/types";
import {DrawFigure} from "./Figure/Figure";
import {CANVAS_SETTINGS} from "../../../core/functions/utility";
import {DrawImage} from "./Image/Image";

const DrawItems = (slideItems: Array<Item>) => {
    const canvas = document.getElementById("canvas") as HTMLCanvasElement;
    const canvasContext = canvas.getContext("2d") as CanvasRenderingContext2D;
    canvasContext.clearRect(0,0, CANVAS_SETTINGS.width, CANVAS_SETTINGS.height);
    console.log(slideItems)
    for (let i = 0; i < slideItems.length; i++)
    {
        let item = slideItems[i];
        switch (item.element) {
            case ItemType.Figure: {
                if (item.figure) {
                    DrawFigure(item.figure.shape, item.coordinates, item.space, item.figure.fillColor);
                }
                break;
            }
            case ItemType.Image: {
                if (item.image) {
                    DrawImage(item.image.src, item.coordinates);
                }
                break;
            }
        }
    }
}

export {DrawItems}