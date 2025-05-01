'use strict'

var gTextPosition = 'top'; // Tracks the active text position ('top' or 'bottom')
var gTopText = ''; // Stores the text for the top
var gBottomText = ''; // Stores the text for the bottom
var gFontSize = 16; // Default font size
var gAlignment = 'center'; // Default text alignment

function onResizeCanvasText() {
    const canvasRect = gElCanvas.getBoundingClientRect();

    // Update the top text container's position
    const topTextContainer = document.querySelector('.top-text');
    if (topTextContainer) {
        topTextContainer.style.top = `${canvasRect.top + 30}px`; // Adjust top position
        topTextContainer.style.left = `${canvasRect.left + canvasRect.width / 2}px`; // Center horizontally
    }

    // Update the bottom text container's position
    const bottomTextContainer = document.querySelector('.bottom-text');
    if (bottomTextContainer) {
        bottomTextContainer.style.top = `${canvasRect.bottom - 65}px`; // Adjust bottom position
        bottomTextContainer.style.left = `${canvasRect.left + canvasRect.width / 2}px`; // Center horizontally
    }

    changeTextAlignment(gAlignment); // Reapply the current alignment
}

function createTextContainers() {
    const elContainer = document.querySelector('.canvas-container');

    // Get the canvas's position and dimensions
    const canvasRect = gElCanvas.getBoundingClientRect();

    // Create the top text container
    const topTextContainer = document.createElement('div');
    topTextContainer.classList.add('text-container', 'top-text', 'active');
    topTextContainer.style.position = 'absolute';
    topTextContainer.style.top = `${canvasRect.top + 30}px`; // 16px padding from the top of the canvas
    topTextContainer.style.left = `${canvasRect.left + canvasRect.width / 2}px`; // Center horizontally
    topTextContainer.style.transform = 'translateX(-50%)';
    topTextContainer.style.padding = '5px 10px';
    topTextContainer.style.border = '2px solid blue';
    topTextContainer.style.borderRadius = '10px';
    topTextContainer.style.backgroundColor = 'rgba(255, 255, 255, 0.8)';
    topTextContainer.style.display = 'none'; // Initially hidden
    elContainer.appendChild(topTextContainer);

    // Create the bottom text container
    const bottomTextContainer = document.createElement('div');
    bottomTextContainer.classList.add('text-container', 'bottom-text');
    bottomTextContainer.style.position = 'absolute';
    bottomTextContainer.style.top = `${canvasRect.bottom - 75}px`; // 20px padding from the bottom of the canvas
    bottomTextContainer.style.left = `${canvasRect.left + canvasRect.width / 2}px`; // Center horizontally
    bottomTextContainer.style.transform = 'translateX(-50%)';
    bottomTextContainer.style.padding = '5px 10px';
    bottomTextContainer.style.border = '2px solid black';
    bottomTextContainer.style.borderRadius = '10px';
    bottomTextContainer.style.backgroundColor = 'rgba(255, 255, 255, 0.8)';
    bottomTextContainer.style.display = 'none'; // Initially hidden
    elContainer.appendChild(bottomTextContainer);
}

function renderTextInput(event) {
    createTextContainers(); // Create text containers for top and bottom

    const text = event.target.value;

    // Update the active text container's content
    const activeTextContainer = document.querySelector('.text-container.active');
    if (activeTextContainer) {
        const wrappedText = wrapText(text, gElCanvas.width * 0.7); // Wrap text at 70% of canvas width
        activeTextContainer.innerHTML = wrappedText; // Use innerHTML to preserve line breaks
        activeTextContainer.style.fontSize = `${gFontSize}px`; // Apply the current font size
        activeTextContainer.style.display = text ? 'block' : 'none'; // Show or hide based on text
    }

    // Update the corresponding text variable
    if (gTextPosition === 'top') {
        gTopText = text;
    } else if (gTextPosition === 'bottom') {
        gBottomText = text;
    }
}

function wrapText(text, maxWidth) {
    const words = text.split(' ');
    let line = '';
    let wrappedText = '';

    const tempCanvas = document.createElement('canvas'); // Temporary canvas for text measurement
    const tempCtx = tempCanvas.getContext('2d');
    tempCtx.font = `${gFontSize}px Arial`; // Use the current font size

    for (let i = 0; i < words.length; i++) {
        const testLine = line + words[i] + ' ';
        const testWidth = tempCtx.measureText(testLine).width;

        if (testWidth > maxWidth && i > 0) {
            wrappedText += line + '<br>'; // Add the current line and start a new one
            line = words[i] + ' ';
        } else {
            line = testLine;
        }
    }

    wrappedText += line; // Add the last line
    return wrappedText;
}

function addTextContainer() {
    gTextPosition = 'bottom'; // Switch to adding text to the bottom
    const textInput = document.querySelector('.text-input');
    textInput.value = gBottomText; // Update the input field with the bottom text
    switchActiveTextContainer();
}

function switchTextContainer() {
    const textInput = document.querySelector('.text-input');

    // Toggle the active text position
    if (gTextPosition === 'top') {
        gTextPosition = 'bottom';
        textInput.value = gBottomText; // Update the input field with the bottom text
    } else {
        gTextPosition = 'top';
        textInput.value = gTopText; // Update the input field with the top text
    }

    switchActiveTextContainer();
}

function switchActiveTextContainer() {
    const topTextContainer = document.querySelector('.top-text');
    const bottomTextContainer = document.querySelector('.bottom-text');

    // Toggle the active class and styles
    if (gTextPosition === 'top') {
        topTextContainer.classList.add('active');
        topTextContainer.style.borderColor = 'blue';
        bottomTextContainer.classList.remove('active');
        bottomTextContainer.style.borderColor = 'black';
    } else {
        bottomTextContainer.classList.add('active');
        bottomTextContainer.style.borderColor = 'blue';
        topTextContainer.classList.remove('active');
        topTextContainer.style.borderColor = 'black';
    }
}

function deleteTextContainers() {
    // Select both text containers
    const topTextContainer = document.querySelector('.top-text');
    const bottomTextContainer = document.querySelector('.bottom-text');

    // Remove the top text container if it exists
    if (topTextContainer) {
        topTextContainer.remove();
    }

    // Remove the bottom text container if it exists
    if (bottomTextContainer) {
        bottomTextContainer.remove();
    }

    // Clear the text variables
    gTopText = '';
    gBottomText = '';

    // Clear the input field
    const textInput = document.querySelector('.text-input');
    if (textInput) {
        textInput.value = '';
    }
}

function deleteTextContainer() {
    const topTextContainer = document.querySelector('.top-text');
    const bottomTextContainer = document.querySelector('.bottom-text');

    if (gTextPosition === 'top' && topTextContainer) {
        topTextContainer.innerHTML = ''; // Clear the text content
        gTopText = ''; // Clear the global variable for top text
    } else if (gTextPosition === 'bottom' && bottomTextContainer) {
        bottomTextContainer.innerHTML = ''; // Clear the text content
        gBottomText = ''; // Clear the global variable for bottom text
    }

    // Clear the input field
    const textInput = document.querySelector('.text-input');
    if (textInput) {
        textInput.value = ''; // Clear the input field
    }
}

function changeFontSize(size) {
    console.log(`Changing font size to ${size}px`);

    gFontSize = size; // Update the global font size variable

    // Update the font size of the text containers
    const topTextContainer = document.querySelector('.top-text');
    const bottomTextContainer = document.querySelector('.bottom-text');

    if (topTextContainer) {
        topTextContainer.style.fontSize = `${gFontSize}px`;
        const wrappedText = wrapText(gTopText, gElCanvas.width * 0.7); // Re-wrap text
        topTextContainer.innerHTML = wrappedText;
    }
    if (bottomTextContainer) {
        bottomTextContainer.style.fontSize = `${gFontSize}px`;
        const wrappedText = wrapText(gBottomText, gElCanvas.width * 0.7); // Re-wrap text
        bottomTextContainer.innerHTML = wrappedText;
    }
}

function changeTextAlignment(alignment) {
    const canvasRect = gElCanvas.getBoundingClientRect(); // Get the canvas dimensions and position

    const topTextContainer = document.querySelector('.top-text');
    const bottomTextContainer = document.querySelector('.bottom-text');

    gAlignment = alignment; // Update the global alignment variable

    applyAlignment(topTextContainer, alignment, canvasRect);
    applyAlignment(bottomTextContainer, alignment, canvasRect);
}

function applyAlignment(textContainer, alignment, canvasRect) {
    if (alignment === 'start') {
        textContainer.style.textAlign = 'left';
        textContainer.style.left = `${canvasRect.left + 1}px`; // Align to the left edge of the canvas
        textContainer.style.transform = 'translateX(0)'; // No horizontal offset
    } else if (alignment === 'center') {
        textContainer.style.textAlign = 'center';
        textContainer.style.left = `${canvasRect.left + canvasRect.width / 2}px`; // Center horizontally
        textContainer.style.transform = 'translateX(-50%)'; // Center alignment
    } else if (alignment === 'end') {
        textContainer.style.textAlign = 'right';
        textContainer.style.left = `${canvasRect.left + canvasRect.width - 1}px`; // Align to the right edge of the canvas
        textContainer.style.transform = 'translateX(-100%)'; // Align to the right
    }
}

function changeFont(value) {
    const topTextContainer = document.querySelector('.top-text');
    const bottomTextContainer = document.querySelector('.bottom-text');

    if (topTextContainer) {
        topTextContainer.style.fontFamily = value;
        const wrappedText = wrapText(gTopText, gElCanvas.width * 0.7); // Re-wrap text
        topTextContainer.innerHTML = wrappedText; // Update the text live
    }
    if (bottomTextContainer) {
        bottomTextContainer.style.fontFamily = value;
        const wrappedText = wrapText(gBottomText, gElCanvas.width * 0.7); // Re-wrap text
        bottomTextContainer.innerHTML = wrappedText; // Update the text live
    }
}

function toggleFontBold() {
    const topTextContainer = document.querySelector('.top-text');
    const bottomTextContainer = document.querySelector('.bottom-text');

    if (topTextContainer) {
        topTextContainer.style.fontWeight = topTextContainer.style.fontWeight === 'bold' ? 'normal' : 'bold';
    }
    if (bottomTextContainer) {
        bottomTextContainer.style.fontWeight = bottomTextContainer.style.fontWeight === 'bold' ? 'normal' : 'bold';
    }
}

function changeTextColor(color) {
    const topTextContainer = document.querySelector('.top-text');
    const bottomTextContainer = document.querySelector('.bottom-text');

    if (topTextContainer) {
        topTextContainer.style.color = color;
    }
    if (bottomTextContainer) {
        bottomTextContainer.style.color = color;
    }
}