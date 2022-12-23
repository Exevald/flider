import {Figure, ShapeType} from "../../../../core/types/types";
import {Area} from "../../../../core/types/types";
import {connect} from "react-redux";

interface FigureProps {
    figure: Figure;
    figureArea: Area;
}

const Rectangle = ({figure, figureArea}: FigureProps) => {
    const width: number = figureArea.width;
    const height: number = figureArea.height;
    return (
        <svg
            width={figureArea.width}
            height={figureArea.height}
        >
            <rect
                x={figureArea.width / 2}
                y={figureArea.height / 2}
                width={width}
                height={height}
                fill={figure.fillColor}
                stroke={figure.strokeColor}
            >
            </rect>
        </svg>
    )
}

const Figure = ({figure, figureArea}: FigureProps) => {
    switch (figure.shape) {
        case ShapeType.Rectangle:
            return (
                <Rectangle figure={figure} figureArea={figureArea}/>
            )
        case ShapeType.Arc:
            return (
                <div></div>
            )
        case ShapeType.Triangle:
            return (
                <div></div>
            )
    }
}

export default connect()(Figure)