'use sctrict'

let gPages = [
    { name: 'main', elClass: 'btn-main' },
    { name: 'saved', elClass: 'btn-saved' },
    { name: 'gallery', elClass: 'btn-gallery' },
    { name: 'about', elClass: 'btn-about' },
]

function onShowPage(className) {
    const elBtn = document.querySelector(`.${className}`);

    // Check if the button already has the 'active' class
    if (elBtn.classList.contains('active')) {
        console.log(`${className} button is already active`);
        return; // Exit the function
    }

    gPages.map(page => {
        const elPage = document.querySelector(`.${page.name}-container`);

        if (page.elClass === className) {
            elPage.classList.remove('hidden');
            elBtn.classList.add('active');

            if (page.name === 'gallery') {
                renderGallery();
            }
        } else {
            console.log(`Hiding ${page.name} page`);

            elPage.classList.add('hidden');
            const elBtn = document.querySelector(`.${page.elClass}`);
            elBtn.classList.remove('active');

            if (page.name === 'gallery') {
                renderGallery(true);
            }
        }
    });

    window.scrollTo(0, 0);
}

function loadPage(pageName, lastPageName) {
    const elLastPage = document.querySelector(`.${lastPageName}-container`);
    const elLastBtn = document.querySelector(`.btn-${lastPageName}`);
    const elPage = document.querySelector(`.${pageName}-container`);
    const elBtn = document.querySelector(`.btn-${pageName}`);

    console.log(`Loading ${pageName} page`);
    console.log(`Hiding ${lastPageName} page`);

    elLastBtn.classList.remove('active');
    elLastPage.classList.add('hidden');
    elBtn.classList.add('active');
    elPage.classList.remove('hidden');

    if (lastPageName === 'gallery') {
        renderGallery(true);
    }

    window.scrollTo(0, 0);
}