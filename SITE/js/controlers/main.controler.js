'use strict'

var gElCanvas
var gCtx
var gIsMouseDown = false
var gBrush = {
    color: 'black',
    size: 5,
    shape: 'square'
}

function onInit() {
    gElCanvas = document.querySelector('canvas')
    gCtx = gElCanvas.getContext('2d')

    onResize()
}

function onResize() {
    resizeCanvas()
}

function resizeCanvas() {
    const elContainer = document.querySelector('.canvas-container')
    // gElCanvas.width = elContainer.offsetWidth
    // gElCanvas.height = elContainer.offsetHeight

    // var height = elContainer.offsetHeight - 16
    // // set canvas size to match container size
    // gElCanvas.style.width = `${elContainer.offsetWidth}px`
    // gElCanvas.style.height = `${height}px`

    renderCanvas()
}

function renderCanvas() {
    console.log('renderCanvas')
    // set background color
    gCtx.fillStyle = 'white'
    gCtx.fillRect(0, 0, gElCanvas.width, gElCanvas.height) // Fill the canvas with the background color
}

function loadImgtoCanvas(img) {
    const imgObj = new Image();
    imgObj.src = img;
    imgObj.onload = () => {
        console.log(`Image loaded: ${imgObj.naturalWidth}x${imgObj.naturalHeight}`);

        // Clear the canvas before drawing the new image
        gCtx.clearRect(0, 0, gElCanvas.width, gElCanvas.height);
        // Set the canvas size to match the image size
        gElCanvas.width = imgObj.naturalWidth;
        gElCanvas.height = imgObj.naturalHeight;

        gElCanvas.style.width = `${imgObj.naturalWidth}px`;
        gElCanvas.style.height = `${imgObj.naturalHeight}px`;

        gCtx.drawImage(imgObj, 0, 0, gElCanvas.width, gElCanvas.height);
    };
}