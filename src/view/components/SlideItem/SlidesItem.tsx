import {Area, Figure, ShapeType} from "../../../core/types/types";
import {connect} from "react-redux";

interface FigureProps {
    figure: Figure,
    area: Area
}

const Rectangle = ({
                       figure,
                       area
                   }: FigureProps) => {
    const width: number = area.width !== 0 ? area.width - figure.strokeWidth : figure.strokeWidth;
    const height: number = area.height !== 0 ? area.height - figure.strokeWidth : figure.strokeWidth;
    return (
        <svg
            width={area.width + figure.strokeWidth}
            height={area.height + figure.strokeWidth}
        >
            <rect
                x={figure.strokeWidth / 2}
                y={figure.strokeWidth / 2}
                width={width}
                height={height}
                fill={figure.fillColor}
                stroke={figure.strokeColor}
                strokeWidth={figure.strokeWidth}
            >
            </rect>
        </svg>
    )
}

const Circle = ({
                    figure,
                    area
                }: FigureProps) => {
    const width: number = area.width !== 0 ? (area.width - figure.strokeWidth) / 2 : figure.strokeWidth;
    const height: number = area.height !== 0 ? (area.height - figure.strokeWidth) / 2 : figure.strokeWidth;
    return (
        <svg
            width={area.width + figure.strokeWidth}
            height={area.height + figure.strokeWidth}
        >
            <ellipse
                rx={width}
                ry={height}
                cx={area.width / 2}
                cy={area.height / 2}
                fill={figure.fillColor}
                stroke={figure.strokeColor}
                strokeWidth={figure.strokeWidth}
            >
            </ellipse>
        </svg>
    )
}

const Triangle = ({
                      figure,
                      area
                  }: FigureProps) => {
    const width: number = area.width + figure.strokeWidth;
    const height: number = area.height + figure.strokeWidth;
    const points: string = String(figure.strokeWidth) + ', ' + String(height - figure.strokeWidth * 2) + ' ' + String(width / 2) + ',' + String(figure.strokeWidth) + ' ' + String(width - figure.strokeWidth) + ',' + String(height - figure.strokeWidth * 2)
    return (
        <svg
            width={width}
            height={height}
        >
            <polygon
                points={points}
                fill={figure.fillColor}
                stroke={figure.strokeColor}
                strokeWidth={figure.strokeWidth}
            >
            </polygon>
        </svg>
    )
}

const Figure = ({
                    figure,
                    area
                }: FigureProps) => {
    switch (figure.shape) {
        case ShapeType.Rectangle:
            return (
                <Rectangle
                    figure={figure}
                    area={area}
                />
            )

        case ShapeType.Arc:
            return (
                <Circle
                    figure={figure}
                    area={area}
                />
            )

        case ShapeType.Triangle:
            return (
                <Triangle
                    figure={figure}
                    area={area}
                />
            )
        default:
            return (
                <div></div>
            )
    }
}