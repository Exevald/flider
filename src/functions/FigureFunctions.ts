import {Area, Figure, Id, Item, ItemType, Point, Presentation, ShapeType} from "../model/Types";

function addFigure
(
    presentation: Presentation,
    type: ShapeType,
    coordinates: Point,
    space: Area,
    fillColor: string = "000",
    strokeColor: string = "000"
): Presentation {

    const figure: Figure = {
        shape: type,
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
        space: {
            width: space.width,
            height: space.height,
        }
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
    space: Area,
    fillColor: string = "000",
    strokeColor: string = "000"
) {
    return addFigure(presentation, ShapeType.Rectangle, coordinates, space, fillColor, strokeColor)
}

function createArc
(
    presentation: Presentation,
    slideId: Id,
    type: string,
    coordinates: Point,
    space: Area,
    fillColor: string = "000",
    strokeColor: string = "000"
) {
    return addFigure(presentation, ShapeType.Arc, coordinates, space, fillColor, strokeColor)
}

function createTriangle
(
    presentation: Presentation,
    slideId: Id,
    type: string,
    coordinates: Point,
    space: Area,
    fillColor: string = "000",
    strokeColor: string = "000"
) {
    return addFigure(presentation, ShapeType.Triangle, coordinates, space, fillColor, strokeColor)
}