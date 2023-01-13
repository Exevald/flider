import {EditorType, IdType, ItemType, SlideState} from "../../../core/types/types";
import React, {useEffect, useRef, useState} from "react";
import styles from "./SlideItem.module.css"
import Figure from "./Figure/Figure";
import {connect, ConnectedProps} from "react-redux";
import {AppDispatcher} from "../../../model/store";
import {changeCurrentSlideState, changeTextFontFamily, changeTextValue, selectItem} from "../../../model/actionCreators";
import {TEXTAREA_INITIAL_STATE} from "../../../core/functions/utility";

function mapStateToProps(state: EditorType, customProps: { slideId: string, itemId: string, active: boolean }) {
    const currentSlideIndex: number = state.presentation.slides.findIndex(slide => slide.id === customProps.slideId);
    return {
        slideItem: state.presentation.slides[currentSlideIndex].items.find(item => item.id === customProps.itemId),
        active: customProps.active,
        selectedItemsIds: state.presentation.slides[currentSlideIndex].selectedItemsIds,
        currentFontSize: state.presentation.currentFontSize,
        currentFontFamily: state.presentation.currentFontFamily
    }
}

function mapDispatchToProps(dispatcher: AppDispatcher) {
    return {
        selectItem: (itemId: IdType) => dispatcher(selectItem(itemId)),
        changeTextValue: (value: string) => dispatcher(changeTextValue(value)),
        changeFontFamily: (family: string) => dispatcher(changeTextFontFamily(family))
    }
}

const connector = connect(mapStateToProps, mapDispatchToProps);
type SlideItemProps = ConnectedProps<typeof connector>;

const SlideItem = ({slideItem, currentFontSize, changeTextValue, active, selectedItemsIds}: SlideItemProps) => {
    const slideItemRef = useRef<HTMLDivElement>(null);
    const isSelected = selectedItemsIds.find(id => slideItem?.id === id);
    if (isSelected) {
        active = true;
    }

    const topLeftRef = useRef<HTMLDivElement>(null);
    const topRightRef = useRef<HTMLDivElement>(null);
    const bottomLeftRef = useRef<HTMLDivElement>(null);
    const bottomRightRef = useRef<HTMLDivElement>(null);

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
            let decoration = '';
            slideItem.textArea?.isUnderlined ? decoration = 'underline' : decoration = 'none';
            let fontStyle = '';
            slideItem.textArea?.isCursive ? fontStyle = 'italic' : fontStyle = 'normal';
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
                        slideItem.textArea &&
                        <textarea placeholder={TEXTAREA_INITIAL_STATE.value}
                                  className={styles.textArea}
                                  style={{
                                      fontFamily: slideItem.textArea.fontFamily,
                                      fontSize: slideItem.textArea.fontSize,
                                      color: slideItem.textArea.fontColor,
                                      fontWeight: slideItem.textArea.fatness,
                                      textDecoration: decoration,
                                      fontStyle: fontStyle
                                  }}
                                  onChange={(e) => {
                                      changeTextValue(e.currentTarget.value);
                                      changeCurrentSlideState(SlideState.SELECT_ITEM)
                                  }}
                                  autoCorrect={'on'}
                                  value={slideItem.textArea.value}
                        />
                    }
                </div>
            );
        case ItemType.Image:
            if (slideItem.image) {
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
                        <img
                            className={styles.image_element}
                            alt={"image"}
                            src={slideItem.image.src}
                            style={{
                                'width': slideItem.space.width * scaleXCoefficient,
                                'height': slideItem.space.height * scaleYCoefficient,
                            }}
                        >
                        </img>
                    </div>
                )
            } else {
                return null
            }
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