'use strict'

var gElCanvas;
var gCtx;
var gTextPosition = 'top'; // Tracks the active text position ('top' or 'bottom')
var gTopText = ''; // Stores the text for the top
var gBottomText = ''; // Stores the text for the bottom

function onInit() {
    gElCanvas = document.querySelector('canvas');
    gCtx = gElCanvas.getContext('2d');

    renderCanvas();
}

function onResize() {
    onResizeCanvasText();
}

function renderCanvas() {
    console.log('renderCanvas');
    const elContainer = document.querySelector('.canvas-container');

    // Set the container's max dimensions
    elContainer.style.width = '100%'; // Allow it to shrink if needed
    elContainer.style.height = '100%'; // Allow it to shrink if needed
    elContainer.style.overflow = 'hidden'; // Prevent overflow

    const canvasWidth = Math.min(400, elContainer.offsetWidth);
    const canvasHeight = Math.min(400, elContainer.offsetHeight);

    // Set the canvas element's width and height attributes
    gElCanvas.width = canvasWidth;
    gElCanvas.height = canvasHeight;

    gElCanvas.style.width = `${canvasWidth}px`;
    gElCanvas.style.height = `${canvasHeight}px`;

    // Fill the canvas with the background color
    gCtx.fillStyle = 'white';
    gCtx.fillRect(0, 0, gElCanvas.width, gElCanvas.height);
}

function loadImgtoCanvas(img) {
    const imgObj = new Image();
    imgObj.src = img;
    imgObj.onload = () => {
        console.log(`Image loaded: ${imgObj.naturalWidth}x${imgObj.naturalHeight}`);
        
        // Get the canvas container dimensions
        const elContainer = document.querySelector('.canvas-container');
        const containerWidth = elContainer.offsetWidth;
        const containerHeight = elContainer.offsetHeight;
        
        // Calculate the aspect ratio of the image
        const imgAspectRatio = imgObj.naturalWidth / imgObj.naturalHeight;
        
        // Calculate the new canvas dimensions while maintaining the aspect ratio
        let canvasWidth = Math.min(containerWidth, imgObj.naturalWidth); // Limit to image's natural width
        let canvasHeight = canvasWidth / imgAspectRatio;
        
        if (canvasHeight > containerHeight || canvasHeight > imgObj.naturalHeight) {
            canvasHeight = Math.min(containerHeight, imgObj.naturalHeight); // Limit to image's natural height
            canvasWidth = canvasHeight * imgAspectRatio;
        }
        
        // Set the canvas size
        gElCanvas.width = canvasWidth;
        gElCanvas.height = canvasHeight;

        // Set the canvas style for responsiveness
        gElCanvas.style.width = `${canvasWidth}px`;
        gElCanvas.style.height = `${canvasHeight}px`;

        // Clear the canvas and draw the image
        gCtx.clearRect(0, 0, gElCanvas.width, gElCanvas.height);
        gCtx.drawImage(imgObj, 0, 0, gElCanvas.width, gElCanvas.height);
    };
}

function onTextInput(event) {
    renderTextInput(event);
}

function onAddText() {
    addTextContainer();
}

function onSwitchText() {
    switchTextContainer();
}

function onDeleteAll() {
    gCtx.clearRect(0, 0, gElCanvas.width, gElCanvas.height);
    renderCanvas();
    deleteTextContainers();
}

function onDeleteLine() {
    deleteTextContainer();
}

function onChangeSize(ev) {
    const value = ev.target.value;
    changeFontSize(value);
}

function onChangeTextPos(pos) {
    changeTextAlignment(pos);
}

function onChangeFont(event){
    const value = event.target.value;

    changeFont(value);
}

function onBold() {
    toggleFontBold();
}

function onChangeColor(ev) {
    const value = ev.target.value;
    changeTextColor(value);
}