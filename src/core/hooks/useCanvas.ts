import {useState, useEffect, useRef} from "react";
import {Area, Point, ShapeType} from "../types/types";

const canvas = document.getElementById("canvas") as HTMLCanvasElement;
const canvasContext = canvas.getContext("2d");

