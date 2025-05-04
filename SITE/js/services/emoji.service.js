'use strict';

var gEmoji = null; // Global variable to store the selected emoji
var gEmojiList = [
    { id: '01', src: '01-emoji.png' },
    { id: '02', src: '02-emoji.png' },
    { id: '03', src: '03-emoji.png' },
    { id: '04', src: '04-emoji.png' },
    { id: '05', src: '05-emoji.png' }
];

function selectEmoji(emojiId) {
    const elSelectedEmoji = document.querySelector(`.btn-emoji[data-id="${emojiId}"]`);

    // If the emoji is already selected, deselect it
    if (gEmoji === emojiId) {
        gEmoji = null;
        elSelectedEmoji.classList.remove('highlighted'); // Remove highlight
        console.log('Emoji deselected:', emojiId);
    } else {
        // Deselect any previously selected emoji
        const elPreviouslySelected = document.querySelector('.btn-emoji.highlighted');
        if (elPreviouslySelected) {
            elPreviouslySelected.classList.remove('highlighted');
        }

        // Select the new emoji
        gEmoji = emojiId;
        elSelectedEmoji.classList.add('highlighted'); // Add highlight
        console.log('Emoji selected:', emojiId);
    }
}

function renderEmojiImgs() {
    const elEmojiContainer = document.querySelector('.emoji-container');
    elEmojiContainer.innerHTML = gEmojiList.map(emoji => `
        <button class="btn-emoji" data-id="${emoji.id}" onclick="onSelectEmoji('${emoji.id}')">
            <img src="img/${emoji.src}" alt="Emoji ${emoji.id}" class="emoji-img">
        </button>
    `).join('');
}

function getSelectedEmoji() {
    const selectedEmoji = gEmojiList.find(emoji => emoji.id === gEmoji);
    return selectedEmoji ? `img/${selectedEmoji.src}` : null; // Return the src or null if not found
}