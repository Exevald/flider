import {Area, Figure, Item, ItemType, Point, ShapeType} from "../../../core/types/types";
import {DrawFigure} from "./Figure/Figure";
import React from "react";

interface SlideItemProps {
    slideItem: Item | undefined;
    active: boolean;
    slideRef: React.RefObject<HTMLElement | null>;
}

const DrawSlideItem = (figureColor: string, itemType: ItemType, shape: ShapeType, area: Area, coordinates: Point) => {
    const canvas = document.getElementById("canvas") as HTMLCanvasElement;
    const canvasContext = canvas.getContext("2d");
    switch (itemType) {
        case ItemType.Figure: {
            DrawFigure(shape, area, coordinates)
            break;
        }
    }
}

export {DrawSlideItem}