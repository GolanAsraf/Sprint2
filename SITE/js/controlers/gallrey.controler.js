'use strict'

let gImgs = [
    { id: 1, url: 'img/1.jpg', keywords: ['trump'] },
    { id: 2, url: 'img/2.jpg', keywords: ['cute', 'dog'] },
    { id: 3, url: 'img/3.jpg', keywords: ['cute', 'dog'] },
    { id: 4, url: 'img/4.jpg', keywords: ['cute', 'cat'] },
    { id: 5, url: 'img/5.jpg', keywords: ['funny', 'baby'] },
    { id: 6, url: 'img/6.jpg', keywords: ['funny'] },
    { id: 7, url: 'img/7.jpg', keywords: ['funny', 'baby'] },
    { id: 8, url: 'img/8.jpg', keywords: ['funny'] },
    { id: 9, url: 'img/9.jpg', keywords: ['funny', 'gridy'] },
    { id: 10, url: 'img/10.jpg', keywords: ['obama'] },
    { id: 11, url: 'img/11.jpg', keywords: ['kissing'] },
    { id: 12, url: 'img/12.jpg', keywords: ['funny'] },
    { id: 13, url: 'img/13.jpg', keywords: ['cheers'] },
    { id: 14, url: 'img/14.jpg', keywords: ['cool'] },
    { id: 15, url: 'img/15.jpg', keywords: ['funny', 'zero'] },
    { id: 16, url: 'img/16.jpg', keywords: ['funny'] },
    { id: 17, url: 'img/17.jpg', keywords: ['putin'] },
    { id: 18, url: 'img/18.jpg', keywords: ['funny', 'toys'] }
]

function renderGallery(deRender = false) {
    const elGallery = document.querySelector('.gallery-container');
    const strHTMLs = gImgs.map(img => {
        return `<img class="gallery-img" src="${img.url}" alt="${img.keywords.join(', ')}" onclick="onImgClick(${img.id})">`
    }).join('');

    elGallery.innerHTML = deRender ? '' : strHTMLs;
}

function onImgClick(imgId) {
    console.log(`Image with ID ${imgId} clicked`);
    loadPage('main', 'gallery');
    loadImgtoCanvas(gImgs[imgId - 1].url);
}