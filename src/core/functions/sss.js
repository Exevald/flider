var WINDOW = {
    x: 0,
    y: 0,
    width: 1320,
    height: 1080,
    bgColor: "white",
    down: false
}

var MENU = {
    x: WINDOW.width - 200,
    y: 100,
    width: 200,
    height: 450,
}

var canvas = document.getElementById("canvas")
var canvasContext = canvas.getContext("2d")
canvas.width = WINDOW.width
canvas.height = WINDOW.height

var FIGURE = []
var CurrFunc = "select"
var FIGURES = ["rect", "star"]
var corner = ""
var cornerRectSide = 50

var SELECTED = new Set()
var selectedAreaX, selectedAreaY, selectedAreaWidth, selectedAreaHeight = 0

function initEventsListeners() {
    window.addEventListener("mousemove", onMouseMove)
    window.addEventListener("mousedown", onMouseDown)
    window.addEventListener("mouseup", onMouseUp)
}

var mouseX = 0
var mouseY = 0

function max(a, b) {
    if (a > b) {return a} else return b
}

function min(a, b) {
    if (a < b) {return a} else return b
}

function ifSelected(i) {
    let x, y
    let bool = false
    for (x = min(FIGURE[i].x, FIGURE[i].x + FIGURE[i].width); x <= max(FIGURE[i].x, FIGURE[i].x + FIGURE[i].width); x++) {
        for (y = min(FIGURE[i].y, FIGURE[i].y + FIGURE[i].height); y <= max(FIGURE[i].y, FIGURE[i].y + FIGURE[i].height); y++) {
            if ((x >= min(selectX, mouseX) && x <= max(selectX, mouseX)) && (y >= min(selectY, mouseY) && y <= max(selectY, mouseY))) {
                bool = true
            } else bool = false
            if (bool) { break }
        }
        if (bool) { break }
    }
    return bool
} 

var startFigureX = []
var startFigureY = []
var startFigureWidth = []
var startFigureHeight = []
var startMouseX, startMouseY = 0 
var startSelectedAreaX, startSelectedAreaY, startSelectedAreaWidth, startSelectedAreaHeight = 0

function onMouseMove(event) {
    mouseX = event.clientX - 5
    mouseY = event.clientY - 5
    console.log(CurrFunc)
    console.log(SELECTED)
    if (WINDOW.down) {
        if (count > 0 && FIGURES.includes(CurrFunc)) {
            FIGURE[count].width = mouseX - FIGURE[count].x
            FIGURE[count].height = mouseY - FIGURE[count].y
        }
        if (count > 0 && mouseOnSelected() && CurrFunc == "none") {
            CurrFunc = "move"
            beginMoving = true
            startFigureX = []
            startFigureY = []
            startMouseX = startMouseY = 0  
            startSelectedAreaX = startSelectedAreaY = 0
        } 
        console.log(CurrFunc)
        if (CurrFunc == "select") {
            findSelectedArea()
        }
        if (CurrFunc == "scale") {
            scaleSelected()
        }
        if (CurrFunc == "move") {
            moveFigure()  
        } else beginMoving = false
    console.log(SELECTED)
    }
}

function onMouseDown() {
    if (!WINDOW.down) { 
        if (mouseX > MENU.x && mouseY > MENU.y && mouseY < MENU.y + MENU.height) {
            if (mouseY < MENU.y + 150) CurrFunc = "rect";
            else if (mouseY < MENU.y + 300) CurrFunc = "star"
        } else if (FIGURES.includes(CurrFunc)) {
            count++
            FIGURE[count] = {
                type: CurrFunc,
                selected: true,
                x: 0,
                y: 0,
                width: 0,
                height: 0,
                strokeWidth: 3,
                strokeColor: "black",
                fillColor: "cyan",
            }
            FIGURE[count].x = mouseX
            FIGURE[count].y = mouseY
        } else if (getSelectionCorner() != "-") {
            CurrFunc = "scale"
            corner = getSelectionCorner()
            startMouseX = mouseX
            startMouseY = mouseY  
            startSelectedAreaX = selectedAreaX 
            startSelectedAreaY = selectedAreaY
            startSelectedAreaWidth = selectedAreaWidth
            startSelectedAreaHeight = selectedAreaHeight
            for (i = 1; i <= count; i++) {
                startFigureX[i] = FIGURE[i].x
                startFigureY[i] = FIGURE[i].y
                startFigureWidth[i] = FIGURE[i].width
                startFigureHeight[i] = FIGURE[i].height
            }
        } else if (!mouseOnSelected()) {
            CurrFunc = "select"
            selectX = mouseX
            selectY = mouseY
            findSelectedArea()
        }
    }
    WINDOW.down = true
    console.log(mouseX, mouseY)
}

function onMouseUp() {
    WINDOW.down = false
    if (!(mouseX > MENU.x && mouseY > MENU.y && mouseY < MENU.y + MENU.height)) {
        CurrFunc = "none"
    }  
}

function findSelectedArea() {
    selectedAreaX = canvas.width
    selectedAreaY = canvas.height
    selectedAreaWidth = selectedAreaHeight = 0
    let selectedAreaRX, selectedAreaRY
    selectedAreaRX = 0
    selectedAreaRY = 0
    for (i = 1; i <= count; i++){
        if (ifSelected(i)) {
            SELECTED.add(i)
            selectedAreaX = min(selectedAreaX, min(FIGURE[i].x, FIGURE[i].x + FIGURE[i].width))
            selectedAreaY = min(selectedAreaY, min(FIGURE[i].y, FIGURE[i].y + FIGURE[i].height)) 
            selectedAreaRX = max(selectedAreaRX, max(FIGURE[i].x, FIGURE[i].x + FIGURE[i].width))
            selectedAreaRY = max(selectedAreaRY, max(FIGURE[i].y, FIGURE[i].y + FIGURE[i].height))
        } else SELECTED.delete(i)
    }
    selectedAreaWidth = selectedAreaRX - selectedAreaX
    selectedAreaHeight = selectedAreaRY - selectedAreaY   
}

function getSelectionCorner() {
    let side = cornerRectSide / 2
    if (mouseX >= selectedAreaX - side && mouseX <= selectedAreaX + side 
        && mouseY >= selectedAreaY - side && mouseY <= selectedAreaY + side) {
        return "lu"                        
    } else 
    if (mouseX >= selectedAreaX + selectedAreaWidth - side && mouseX <= selectedAreaX + selectedAreaWidth + side 
        && mouseY >= selectedAreaY - side && mouseY <= selectedAreaY + side) {
           return "ru"                        
    } else
    if (mouseX >= selectedAreaX + selectedAreaWidth - side && mouseX <= selectedAreaX + selectedAreaWidth + side 
        && mouseY >= selectedAreaY + selectedAreaHeight - side && mouseY <= selectedAreaY + selectedAreaHeight + side) {
           return "rd"                        
    } else 
    if (mouseX >= selectedAreaX - side && mouseX <= selectedAreaX + side 
        && mouseY >= selectedAreaY + selectedAreaHeight - side && mouseY <= selectedAreaY + selectedAreaHeight + side) {
            return "ld"                        
    } else { return "-" }
}

function scaleSelected() {
    if (corner == "lu") {
        selectedAreaX = startSelectedAreaX + mouseX - startMouseX
        selectedAreaY = startSelectedAreaY + mouseY - startMouseY
        selectedAreaWidth = startSelectedAreaWidth - (selectedAreaX - startSelectedAreaX)
        selectedAreaHeight = startSelectedAreaHeight - (selectedAreaY - startSelectedAreaY) 
    } else
    if (corner == "ru") {
        selectedAreaY = startSelectedAreaY + mouseY - startMouseY
        selectedAreaWidth = startSelectedAreaWidth + mouseX - startMouseX - (selectedAreaX - startSelectedAreaX)
        selectedAreaHeight = startSelectedAreaHeight - (selectedAreaY - startSelectedAreaY) 
    } else
    if (corner == "rd") {
        selectedAreaWidth = startSelectedAreaWidth + mouseX - startMouseX - (selectedAreaX - startSelectedAreaX)
        selectedAreaHeight = startSelectedAreaHeight + mouseY - startMouseY - (selectedAreaY - startSelectedAreaY) 
    } else
    if (corner == "ld") {
        selectedAreaX = startSelectedAreaX + mouseX - startMouseX
        selectedAreaWidth = startSelectedAreaWidth - (selectedAreaX - startSelectedAreaX)
        selectedAreaHeight = startSelectedAreaHeight + mouseY - startMouseY - (selectedAreaY - startSelectedAreaY) 
    }
    for (i = 1; i <= count; i++) {
        if( SELECTED.has(i)) {
            FIGURE[i].x = Math.round(selectedAreaX + ((startFigureX[i] - startSelectedAreaX) / startSelectedAreaWidth) * selectedAreaWidth)
            FIGURE[i].y = Math.round(selectedAreaY + ((startFigureY[i] - startSelectedAreaY) / startSelectedAreaHeight) * selectedAreaHeight) 
            FIGURE[i].width = Math.round((selectedAreaWidth / startSelectedAreaWidth) * startFigureWidth[i])
            FIGURE[i].height = Math.round((selectedAreaHeight / startSelectedAreaHeight) * startFigureHeight[i])  
        }    
    }
}



function drawMenu() {
    canvasContext.beginPath()
    canvasContext.rect(MENU.x, MENU.y, MENU.width, MENU.height)
    canvasContext.fillStyle = "white"
    canvasContext.fill()
    canvasContext.fillStyle = "black"
    canvasContext.rect(MENU.x + 10, MENU.y + 10, MENU.width - 20, 140)
    canvasContext.font = "bold 24px serif"
    canvasContext.fillText("star", MENU.x + 10, MENU.y + 220)
    canvasContext.lineWidth = 1
    canvasContext.stroke()
    canvasContext.closePath()
}

var count = 0


function mouseOnSelected() {
    let i
    let bol = false
    for (i = 0; i <= count; i++) {
        if (SELECTED.has(i)) { 
            // if (mouseX > min(FIGURE[i].x, FIGURE[i].x + FIGURE[i].width) && mouseX < max(FIGURE[i].x, FIGURE[i].x + FIGURE[i].width) 
            // &&  mouseY > min(FIGURE[i].y, FIGURE[i].y + FIGURE[i].height) && mouseY < max(FIGURE[i].y, FIGURE[i].y + FIGURE[i].height)) {
            console.log(selectedAreaX, selectedAreaY, selectedAreaWidth, selectedAreaHeight)
            if (mouseX > selectedAreaX && mouseX < selectedAreaX + selectedAreaWidth && mouseY > selectedAreaY && mouseY < selectedAreaY + selectedAreaHeight) {
                bol = true
                console.log(bol)
            }
        }
    }   
    console.log(bol)
    return bol
}

function moveFigure() {
    for (i = 0; i <= count; i++) {
        if (SELECTED.has(i)) {
            if (!beginMoving) {
                console.log(startFigureX.length)
                FIGURE[i].x = startFigureX[i] + (mouseX - startMouseX)
                FIGURE[i].y = startFigureY[i] + (mouseY - startMouseY)
                selectedAreaX = startSelectedAreaX + (mouseX - startMouseX)
                selectedAreaY = startSelectedAreaY + (mouseY - startMouseY)
            } else {
                startMouseX = mouseX
                startMouseY = mouseY
                startFigureX[i] = FIGURE[i].x
                startFigureY[i] = FIGURE[i].y
                startSelectedAreaX = selectedAreaX
                startSelectedAreaY = selectedAreaY 
                console.log(startMouseX, startMouseY, startFigureX[i], startFigureY[i])
            }
        } 
    }      
    beginMoving = false
}

let i = 0

function drawSelect() {
    canvasContext.beginPath()
    canvasContext.fillStyle = "rgba(100, 150, 185, 0.5)"
    canvasContext.rect(selectX, selectY, mouseX - selectX, mouseY - selectY)
    canvasContext.fill()
    canvasContext.closePath()
}

function drawSelectedArea() {
    canvasContext.beginPath()
    canvasContext.fillStyle = "black"
    canvasContext.rect(selectedAreaX, selectedAreaY, selectedAreaWidth, selectedAreaHeight)
    canvasContext.stroke()
    canvasContext.closePath()
}

function drawRect(i) {
    canvasContext.beginPath()
    canvasContext.fillStyle = FIGURE[i].fillColor
    canvasContext.rect(FIGURE[i].x, FIGURE[i].y, FIGURE[i].width, FIGURE[i].height)
    canvasContext.fill()
    canvasContext.fillStyle = FIGURE[i].strokeColor
    canvasContext.lineWidth = 1
    canvasContext.stroke()
    canvasContext.closePath()
}

function drawStar(i) {
    starHeight = FIGURE[i].height * 0.905
    let startX = FIGURE[i].x
    let startY = FIGURE[i].y + 0.381 * starHeight
    canvasContext.beginPath()
    canvasContext.fillStyle = FIGURE[i].strokeColor
    canvasContext.moveTo(startX, startY)
    canvasContext.lineTo(FIGURE[i].width * 0.384 + startX, startY)
    canvasContext.lineTo(FIGURE[i].x + FIGURE[i].width / 2, FIGURE[i].y)
    canvasContext.lineTo(FIGURE[i].x + FIGURE[i].width * 0.616, startY)
    canvasContext.lineTo(FIGURE[i].x + FIGURE[i].width, startY)
    let currY = starHeight * 0.619
    let currX = FIGURE[i].width * 0.692
    canvasContext.lineTo(FIGURE[i].x + currX, FIGURE[i].y + currY)
    canvasContext.lineTo(FIGURE[i].x + FIGURE[i].width * 0.808, FIGURE[i].y + starHeight)
    canvasContext.lineTo(FIGURE[i].x + FIGURE[i].width/2, FIGURE[i].y + starHeight * 0.765)
    canvasContext.lineTo(FIGURE[i].x + FIGURE[i].width * 0.192, FIGURE[i].y + starHeight)
    canvasContext.lineTo(FIGURE[i].x + FIGURE[i].width - currX, FIGURE[i].y + currY)
    canvasContext.lineTo(startX, startY)
    canvasContext.lineTo(FIGURE[i].width * 0.384 + startX, startY)
    

    canvasContext.lineWidth = 1
    canvasContext.stroke()
    canvasContext.fillStyle = FIGURE[i].fillColor
    canvasContext.fill()
    canvasContext.closePath()
}

function drawScaleRect(x, y) {
    let side = cornerRectSide / 2
    canvasContext.beginPath()
    canvasContext.fillStyle = "white"
    canvasContext.rect(x - side, y - side, side * 2, side * 2)
    canvasContext.fill()
    canvasContext.fillStyle = "black"
    canvasContext.stroke()
    canvasContext.closePath()
}
function drawScaleCorners() {
    drawScaleRect(selectedAreaX, selectedAreaY)
    drawScaleRect(selectedAreaX + selectedAreaWidth, selectedAreaY)
    drawScaleRect(selectedAreaX, selectedAreaY + selectedAreaHeight)
    drawScaleRect(selectedAreaX + selectedAreaWidth, selectedAreaY + selectedAreaHeight)
}

function drawOutline(i) {
    canvasContext.beginPath()
    canvasContext.fillStyle = 'white'
    canvasContext.lineWidth = 6
    canvasContext.rect(FIGURE[i].x, FIGURE[i].y, FIGURE[i].width, FIGURE[i].height)
    canvasContext.stroke()
    canvasContext.closePath()
}

function drawFigure(i) {
    switch(FIGURE[i].type) {
        case "rect": drawRect(i); break
        case "star": drawStar(i); break     
    }
    if (SELECTED.size != 0) {   
        drawSelectedArea() 
        drawScaleCorners(i) 
    }
}

function drawFrame() {
    canvasContext.clearRect(0, 0, canvas.width, canvas.height)
    for (i = 1; i <= count; i++) {
        drawFigure(i)
    }
    if (CurrFunc == "select" && WINDOW.down) {
        drawSelect()
    }
    if (CurrFunc == "move") {
        drawSelectedArea()
    }
    drawMenu()
}

function doSmth() {
    drawFrame()
    requestAnimationFrame(doSmth)
}

initEventsListeners()
doSmth()