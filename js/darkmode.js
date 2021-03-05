const button = document.querySelector(".changeColor");

function changeColor() {
    if (button.value == "White") {
        button.value = "Black";
        document.querySelector(".js-clock").style.color = "black";
    }
}

function init() {
    button.addEventListener("click",changeColor);
}

init();