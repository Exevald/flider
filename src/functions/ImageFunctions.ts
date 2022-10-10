import {Area, Image, Item, ItemType, Point, Presentation} from "../core/model/Types";

function AddImage(
    presentation: Presentation,
    coordinates: Point,
    space: Area,
    src: string,
): Presentation {

    const image: Image = {
        src: src
    }

    const item: Item = {
        id: 0,
        coordinates: {
            x: coordinates.x,
            y: coordinates.y
        },
        element: ItemType.Image,
        space: {
            width: space.width,
            height: space.height,
        }
    }

    return {
        ...presentation
    }
}