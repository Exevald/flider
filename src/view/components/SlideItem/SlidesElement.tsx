import Figure from "./Figure/Figure";
import {Area, Item, ItemType} from "../../../core/types/types";
import React from "react";

interface SlideItemProps {
    slideItem: Item | undefined;
    active: boolean;
    slideRef: React.RefObject<HTMLElement | null>;
}
