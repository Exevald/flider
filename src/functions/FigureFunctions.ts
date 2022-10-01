import {Presentation, Id, Point, Figure, ItemType, ShapeType, Item} from "../model/Types";

function addFigure
(
    presentation: Presentation,
    slideId: Id,
    type: string,
    coordinates: Point,
    width: number,
    height: number,
    fillColor: string = "000",
    strokeColor: string = "000"
): Presentation {

    const figure: Figure = {
        shape: ShapeType[type],
        fillColor: fillColor,
        strokeColor: strokeColor,
    }

    const item: Item = {
        id: 0,
        coordinates: {
            x: coordinates.x,
            y: coordinates.y,
        },
        element: ItemType.Figure,
        width: width,
        height: height,
    }

    return {
        ...presentation,
    }
}

function createRectangle
(
    presentation: Presentation,
    slideId: Id,
    type: string,
    coordinates: Point,
    width: number,
    height: number,
    fillColor: string = "000",
    strokeColor: string = "000"
) {
    return addFigure(presentation, slideId, "Square", coordinates, width, height, fillColor, strokeColor)
}

function createArc
(
    presentation: Presentation,
    slideId: Id,
    type: string,
    coordinates: Point,
    width: number,
    height: number,
    fillColor: string = "000",
    strokeColor: string = "000"
) {
    return addFigure(presentation, slideId, "Arc", coordinates, width, height, fillColor, strokeColor)
}

function createTriangle
(
    presentation: Presentation,
    slideId: Id,
    type: string,
    coordinates: Point,
    width: number,
    height: number,
    fillColor: string = "000",
    strokeColor: string = "000"
) {
    return addFigure(presentation, slideId, "Triangle", coordinates, width, height, fillColor, strokeColor)
}