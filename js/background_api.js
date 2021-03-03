const UNSPLASH_API_KEY = "cD9Hl1zVQ3FdRlgsB2kQQi33AdTeTvt8DXcW1Tx_67Q";
const UNSPLASH_URL = `https://api.unsplash.com/photos/random/?client_id=${UNSPLASH_API_KEY}&query=landscape&orientation=landscape`;

const body = document.querySelector("body");
const locationContainer = document.querySelector(".js-location");

function loadBackground() {
    const savedImage = localStorage.getItem("background");
    if (savedImage === null) {
        getBackground();
    }
    else {
        const parsedImage = JSON.parse(savedImage);
        locationContainer.innerHTML = parsedImage.name;
        const img = new Image();
        img.src = parsedImage.url;
        img.classList.add("backgroundImg");
        body.prepend(img);
    }
}

function saveBackground(url, name) {
    const savedImage = localStorage.getItem("background");
    if (savedImage != null) {
        localStorage.removeItem("background");
    }
    const imageObj = {
        url: url,
        name: name
    };
    localStorage.setItem("background", JSON.stringify(imageObj));
    loadBackground();
}

function getBackground() {
    fetch(UNSPLASH_URL)
        .then(response => response.json())
        .then(json => {
            const image = json;
            if (image.urls && image.urls.full && image.location) {
                const imageURL = image.urls.full;
                const location = image.location;
                const name = location.name;
                saveBackground(imageURL, name);
            }
            else {
                getBackground();
            }
        });
}

function init() {
    const savedImage = localStorage.getItem("background");
    if (savedImage != null) {
        localStorage.removeItem("background");
    }
    loadBackground();
}

init();