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

    renderCanvas()
}

function renderCanvas() {
    console.log('renderCanvas');
    const elContainer = document.querySelector('.canvas-container');

    // Set the container's max dimensions
    elContainer.style.maxWidth = '400px';
    elContainer.style.maxHeight = '400px';
    elContainer.style.width = '100%'; // Allow it to shrink if needed
    elContainer.style.height = '100%'; // Allow it to shrink if needed
    elContainer.style.overflow = 'hidden'; // Prevent overflow

    // Set the canvas dimensions with a maximum of 400px
    const canvasWidth = Math.min(400, elContainer.offsetWidth);
    const canvasHeight = Math.min(400, elContainer.offsetHeight);

    // Set the canvas element's width and height attributes
    gElCanvas.width = canvasWidth;
    gElCanvas.height = canvasHeight;

    // Set the canvas CSS styles for max dimensions
    gElCanvas.style.maxWidth = '400px';
    gElCanvas.style.maxHeight = '400px';
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