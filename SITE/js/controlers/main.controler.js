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
    renderEmojiImgs();
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
    deleteTextContainer(getSelect);
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

function onDownload() {
    // Create text on the canvas
    renderTextOnCanvas();
    deleteTextContainers();

    // Convert the canvas content to a data URL
    const dataURL = gElCanvas.toDataURL('image/png');

    // Create a temporary link element
    const link = document.createElement('a');
    link.href = dataURL;
    link.download = 'canvas-image.png'; // Set the default file name

    // Trigger the download
    link.click();
}

function renderTextOnCanvas() {
    const topTextContainer = document.querySelector('.top-text');
    const bottomTextContainer = document.querySelector('.bottom-text');


    // Helper function to map CSS text alignment to canvas text alignment
    function mapTextAlign(cssAlign) {
        if (cssAlign === 'left') return 'start';
        if (cssAlign === 'center') return 'center';
        if (cssAlign === 'right') return 'end';
        return 'center'; // Default to 'center'
    }

    // Helper function to wrap text
    function wrapText(ctx, text, x, y, maxWidth, lineHeight) {
        const words = text.split(' ');
        let line = '';

        for (let i = 0; i < words.length; i++) {
            const testLine = line + words[i] + ' ';
            const testWidth = ctx.measureText(testLine).width;

            if (testWidth > maxWidth && i > 0) {
                ctx.fillText(line, x, y);
                line = words[i] + ' ';
                y += lineHeight;
            } else {
                line = testLine;
            }
        }
        ctx.fillText(line, x, y); // Draw the last line
    }

    const fontSize = parseInt(window.getComputedStyle(topTextContainer).fontSize, 10);
    const fontFamily = window.getComputedStyle(topTextContainer).fontFamily;
    const fontWeight = window.getComputedStyle(topTextContainer).fontWeight; // Check if bold is applied
    const color = window.getComputedStyle(topTextContainer).color;
    const textAlign = mapTextAlign(window.getComputedStyle(topTextContainer).textAlign);

    gCtx.font = `${fontWeight} ${fontSize}px ${fontFamily}`; // Include font weight
    gCtx.fillStyle = color;
    gCtx.textAlign = textAlign;

    let x;
    if (textAlign === 'start') x = 0; // Align to the left edge
    else if (textAlign === 'center') x = gElCanvas.width / 2; // Center horizontally
    else if (textAlign === 'end') x = gElCanvas.width; // Align to the right edge

    if (topTextContainer && gTopText) {
        const maxWidth = gElCanvas.width * 0.8; // 80% of the canvas width
        const lineHeight = fontSize * 1.2; // Line height is 1.2 times the font size

        const y = 50; // Adjust Y position for top text
        wrapText(gCtx, gTopText, x, y, maxWidth, lineHeight);
    }

    // Render the bottom text
    if (bottomTextContainer && gBottomText) {
        const maxWidth = gElCanvas.width * 0.8; // 80% of the canvas width
        const lineHeight = fontSize * 1.2; // Line height is 1.2 times the font size

        const y = gElCanvas.height - 60; // Adjust Y position for bottom text
        wrapText(gCtx, gBottomText, x, y, maxWidth, lineHeight);
    }
}

function onSelectEmoji(emoji) {
    selectEmoji(emoji);
}

function onDown(ev) {
    const pos = getEventPosition(ev); // Get the position of the click
    const emojiSrc = getSelectedEmoji(); // Get the selected emoji's image source

    if (!emojiSrc) return; // Exit if no emoji is selected

    const img = new Image();
    img.src = emojiSrc;

    img.onload = () => {
        const size = 50; // Set the size of the emoji
        gCtx.drawImage(img, pos.x - size / 2, pos.y - size / 2, size, size); // Draw the emoji centered at the click position
    };
}

function getEventPosition(ev) {
    const rect = gElCanvas.getBoundingClientRect();
    const x = ev.clientX - rect.left;
    const y = ev.clientY - rect.top;
    return { x, y };
}