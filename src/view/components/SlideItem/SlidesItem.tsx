import {Area, Figure, Item, ItemType, Point, ShapeType} from "../../../core/types/types";
import {DrawFigure} from "./Figure/Figure";
import React from "react";

interface SlideItemProps {
    slideItem: Item | undefined;
    active: boolean;
    slideRef: React.RefObject<HTMLElement | null>;
}

const DrawSlideItem = (itemType: ItemType, shape: ShapeType, coordinates: Point, area: Area, color: string) => {
    const canvas = document.getElementById("canvas") as HTMLCanvasElement;
    const canvasContext = canvas.getContext("2d");
    switch (itemType) {
        case ItemType.Figure: {
            DrawFigure(shape, coordinates, area, color)
            break;
        }
    }
}

export {DrawSlideItem}