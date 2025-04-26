'use sctrict'

let gPages = [
    { name: 'main', elClass: 'btn-logo' },
    { name: 'saved', elClass: 'btn-saved' },
    { name: 'gallery', elClass: 'btn-gallery' },
    { name: 'about', elClass: 'btn-about' },
]

function onInit() {
    console.log('Main controller initialized');
}

function onShowPage(className) {
    const elBtn = document.querySelector(`.${className}`);

    gPages.map(page => {
        const elPage = document.querySelector(`.${page.name}-container`);

        if (page.elClass === className) {
            elPage.classList.remove('hidden');
            elBtn.classList.add('active');
        } else {
            console.log(`Hiding ${page.name} page`);

            elPage.classList.add('hidden');
            const elBtn = document.querySelector(`.${page.elClass}`);
            elBtn.classList.remove('active');
        }
    });

    window.scrollTo(0, 0);
}