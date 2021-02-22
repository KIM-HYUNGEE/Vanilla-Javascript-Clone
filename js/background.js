// body에 사진을 삽입할 것임
// 랜덤 난수를 생성해서 그 난수에 해당하는 번호의 사진을 랜덤 출력하게 할 것임

const body = document.querySelector("body");

const IMG_NUM = 5;

function paintImg(num) {
    const img = new Image;
    img.src = `images/pic${num + 1}.jpg`;
    img.classList.add("backgroundImg");
    body.prepend(img);
}

function genRandom() {
    const randomNum = Math.floor(Math.random() * 5);
    return randomNum;
}

function init() {
    const number = genRandom();
    paintImg(number);
}

init();