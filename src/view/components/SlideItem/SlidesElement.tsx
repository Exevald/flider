import {useEffect, useRef, useState} from "react";
import Figure from "./Figure/Figure";
import {Area, Item, ItemType} from "../../../core/types/types";
import React from "react";

interface SlideItemProps {
    slideItem: Item | undefined;
    active: boolean;
    slideRef: React.RefObject<HTMLElement | null>;
}

const SlideItem = ({
                       slideItem,
                       active,
                       slideRef
                   }: SlideItemProps) => {
    const slideElementRef = useRef<HTMLElement>(null);

    type CornersType = {
        topLeft: React.RefObject<HTMLDivElement>,
        topRight: React.RefObject<HTMLDivElement>,
        bottomLeft: React.RefObject<HTMLDivElement>,
        bottomRight: React.RefObject<HTMLDivElement>
    }
    const topLeftRef = useRef<HTMLDivElement>(null);
    const topRightRef = useRef<HTMLDivElement>(null);
    const bottomLeftRef = useRef<HTMLDivElement>(null);
    const bottomRightRef = useRef<HTMLDivElement>(null);

    const corners: CornersType = {
        topLeft: topLeftRef,
        topRight: topRightRef,
        bottomLeft: bottomLeftRef,
        bottomRight: bottomRightRef
    }
    const [elementWidth, setElementWidth] = useState(slideItem?.space.width);
    const [elementHeight, setElementHeight] = useState(slideItem?.space.height);
    useEffect(() => {
        setElementWidth(slideItem?.space.width);
        setElementHeight(slideItem?.space.height);
    }, [slideItem?.space.width, slideItem?.space.height]);
    useEffect(() => {
        setElementWidth(Number(slideElementRef.current?.style.width.substring(0, slideElementRef.current?.style.width.length - 2)));
        setElementHeight(Number(slideElementRef.current?.style.height.substring(0, slideElementRef.current?.style.height.length - 2)))
    }, [Number(slideElementRef.current?.style.width.substring(0, slideElementRef.current?.style.width.length - 2))]);

    if (slideItem === undefined) {
        return (<div/>)
    }
    switch (slideItem.element) {
        case ItemType.TextArea:
            break;
        case ItemType.Image:
            break;
        case ItemType.Figure:
            if (slideItem.element) {
                return (
                    <div
                        // @ts-ignore
                        ref={slideElementRef}
                        id={slideItem.id}
                        style={{
                            "top": slideItem.coordinates.y,
                            "left": slideItem.coordinates.x,
                            "width": slideItem.space.width,
                            "height": slideItem.space.height,
                        }}
                    >
                        <Figure
                            // @ts-ignore
                            figure={slideItem.figure}
                            figureArea={{
                                width: slideItem.space.width,
                                height: slideItem.space.height
                            }}
                        />
                    </div>
                )
            } else {
                return null
            }
    }
}