import {EditorType, IdType, Item, ItemType, PointType, ShapeType, SlideItemSpaceType} from "../../../core/types/types";
import React, {useEffect, useRef, useState} from "react";
import styles from "./SlideItem.module.css"
import Figure from "./Figure/Figure";
import {connect, ConnectedProps} from "react-redux";
import {AppDispatcher} from "../../../model/store";
import {changeCurrentFontSize, changeTextItem, selectItem} from "../../../model/actionCreators";
import TextArea from "../TextArea/TextArea";

function mapStateToProps(state: EditorType, customProps: { slideId: string, itemId: string, active: boolean }) {
    const currentSlideIndex: number = state.presentation.slides.findIndex(slide => slide.id === customProps.slideId);
    return {
        slideItem: state.presentation.slides[currentSlideIndex].items.find(item => item.id === customProps.itemId),
        active: customProps.active,
        selectedItemsIds: state.presentation.slides[currentSlideIndex].selectedItemsIds,
        currentFontSize: state.presentation.currentFontSize,
    }
}

function mapDispatchToProps(dispatcher: AppDispatcher) {
    return {
        selectItem: (itemId: IdType) => dispatcher(selectItem(itemId)),
        changeTextItem: (font: string, size: number, color: string, value: string, coordinates: PointType) =>
            dispatcher(changeTextItem(font, size, color, value, coordinates)),
        changeFontSize: (size: string) => dispatcher(changeCurrentFontSize(size))
    }
}

const connector = connect(mapStateToProps, mapDispatchToProps);
type SlideItemProps = ConnectedProps<typeof connector>;

const SlideItem = ({slideItem, changeTextItem, changeFontSize, currentFontSize, active, selectedItemsIds}: SlideItemProps) => {
    const slideItemRef = useRef<HTMLDivElement>(null);
    const isSelected = selectedItemsIds.find(id => slideItem?.id === id);
    if (isSelected) {
        active = true;
    }
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

    const [itemWidth, setItemWidth] = useState(slideItem?.space.width);
    const [itemHeight, setItemHeight] = useState(slideItem?.space.height);
    useEffect(() => {
        setItemWidth(slideItem?.space.width)
        setItemHeight(slideItem?.space.height)
    }, [slideItem?.space.width, slideItem?.space.height])
    useEffect(() => {
        setItemWidth(Number(slideItemRef.current?.style.width.substring(0, slideItemRef.current?.style.width.length - 2)));
        setItemHeight(Number(slideItemRef.current?.style.height.substring(0, slideItemRef.current?.style.height.length - 2)))
    }, [Number(slideItemRef.current?.style.width.substring(0, slideItemRef.current?.style.width.length - 2))
    ])

    if (slideItem === undefined) {
        return (<></>)
    }
    switch (slideItem.element) {
        case ItemType.TextArea:
            return (
                <div
                    ref={slideItemRef}
                    id={slideItem.id}
                    className={`${active ? styles.element_active : styles.element}`}
                    style={{
                        top: slideItem.coordinates.y,
                        left: slideItem.coordinates.x,
                    }}
                >
                    {
                        active &&
                        <div className={styles.points_container}>
                            <div className={`${styles.point} ${styles.point_top_left}`} ref={topLeftRef}
                                 id='top-left'></div>
                            <div className={`${styles.point} ${styles.point_top_right}`} ref={topRightRef}
                                 id='top-right'></div>
                            <div className={`${styles.point} ${styles.point_bottom_left}`} ref={bottomLeftRef}
                                 id='bottom-left'></div>
                            <div className={`${styles.point} ${styles.point_bottom_right}`} ref={bottomRightRef}
                                 id='bottom-right'></div>
                        </div>
                    }
                    {
                        (slideItem.textArea) &&
                        <textarea placeholder={slideItem.textArea.value}
                                  className={styles.textArea}
                                  style={{
                                      fontFamily: slideItem.textArea.fontFamily,
                                      fontSize: slideItem.textArea.fontSize,
                                      color: slideItem.textArea.fontColor,
                                  }}
                                  onKeyUp={(value) => {
                                      if (slideItem.textArea !== undefined) {
                                          changeTextItem(
                                              slideItem.textArea.fontFamily,
                                              slideItem.textArea.fontSize,
                                              slideItem.textArea.fontColor,
                                              slideItem.textArea.value,
                                              slideItem.coordinates
                                          )
                                      }
                                      active = false
                                  }}
                                  autoCorrect={'on'}
                        />
                    }
                </div>
            );
        case ItemType.Image:
            return null;
        case ItemType.Figure: {
            if (slideItem.figure) {
                let scaleXCoefficient = 1;
                let scaleYCoefficient = 1;
                let slideMarginLeft = 0;
                let slideMarginTop = 0;
                return (
                    <div
                        ref={slideItemRef}
                        id={slideItem.id}
                        className={`${active ? styles.element_active : styles.element}`}
                        style={{
                            'top': slideItem.coordinates.y * scaleYCoefficient + slideMarginTop,
                            'left': slideItem.coordinates.x * scaleXCoefficient + slideMarginLeft,
                            'width': slideItem.space.width * scaleXCoefficient,
                            'height': slideItem.space.height * scaleYCoefficient,
                            'strokeWidth': slideItem.figure?.strokeWidth * scaleXCoefficient,
                        }}
                    >
                        {
                            active &&
                            <div className={styles.points_container}>
                                <div className={`${styles.point} ${styles.point_top_left}`} ref={topLeftRef}
                                     id='top-left'></div>
                                <div className={`${styles.point} ${styles.point_top_right}`} ref={topRightRef}
                                     id='top-right'></div>
                                <div className={`${styles.point} ${styles.point_bottom_left}`} ref={bottomLeftRef}
                                     id='bottom-left'></div>
                                <div className={`${styles.point} ${styles.point_bottom_right}`} ref={bottomRightRef}
                                     id='bottom-right'></div>
                            </div>
                        }
                        <Figure
                            figure={slideItem.figure}
                            size={{
                                width: itemWidth ? itemWidth : slideItem.space.width,
                                height: itemHeight ? itemHeight : slideItem.space.height
                            }}
                        />
                    </div>
                )
            } else {
                return null
            }
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SlideItem)