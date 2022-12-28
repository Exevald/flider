import {Area, Editor, Figure, Item, ItemType, Point, ShapeType} from "../../../core/types/types";
import {DrawFigure} from "./Figure/Figure";
import React from "react";
import {connect, ConnectedProps} from "react-redux";

const canvasSettings = {
    width: 1280,
    height: 720,
}

const DrawItems = (slideItems: Array<Item>) => {
    const canvas = document.getElementById("canvas") as HTMLCanvasElement;
    const canvasContext = canvas.getContext("2d") as CanvasRenderingContext2D;
    canvasContext.clearRect(0,0, canvasSettings.width, canvasSettings.height);
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
        }
    }
}

export {DrawItems}