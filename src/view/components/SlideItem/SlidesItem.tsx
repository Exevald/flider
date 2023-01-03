import {Item, ItemType} from "../../../core/types/types";
import {DrawFigure} from "./Figure/Figure";
import {CANVAS_SETTINGS, SIDEBAR_SETTINGS} from "../../../core/functions/utility";
import {DrawImage} from "./Image/Image";

const DrawSlideItems = (slideItems: Array<Item>, canvasId: string) => {
    const canvas = document.getElementById(canvasId) as HTMLCanvasElement;
    const canvasContext = canvas.getContext("2d") as CanvasRenderingContext2D;
    if (canvasId === "sidebarCanvas") {
        canvasContext.clearRect(0, 0, SIDEBAR_SETTINGS.width, SIDEBAR_SETTINGS.height);
    }
    else {
        canvasContext.clearRect(0, 0, CANVAS_SETTINGS.width, CANVAS_SETTINGS.height);
    }
    for (let i = 0; i < slideItems.length; i++) {
        let item = slideItems[i];
        // if (canvasId === "sidebarCanvas") {
        //     item.coordinates.x = item.coordinates.x * 0.14;
        //     item.coordinates.y = item.coordinates.y * 0.15;
        //     item.space.width = item.space.width * 0.14;
        //     item.space.height = item.space.height * 0.15;
        // }
        switch (item.element) {
            case ItemType.Figure: {
                if (item.figure) {
                    DrawFigure(canvasId, item.figure.shape, item.coordinates, item.space, item.figure.fillColor);
                }
                break;
            }
            case ItemType.Image: {
                if (item.image) {
                    DrawImage(canvasId, item.image.src, item.coordinates);
                }
                break;
            }
        }
    }
}

export {DrawSlideItems}