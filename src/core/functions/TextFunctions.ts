import {Area, Item, ItemType, Point, Presentation, TextArea} from "../../model/Types";

function AddText(
    presentation: Presentation,
    coordinates: Point,
    space: Area,
    fontFamily: string = "Arial",
    fontSize: number = 14,
    fontColor: string = "black",
): Presentation {

    const text: TextArea = {
        fontFamily: fontFamily,
        fontSize: fontSize,
        fontColor: fontColor,
        value: "",
    }

    const item: Item = {
        id: "0",
        coordinates: {
            x: coordinates.x,
            y: coordinates.y
        },
        element: ItemType.TextArea,
        space: {
            width: space.width,
            height: space.height,
        }
    }

    return {
        ...presentation
    }
}