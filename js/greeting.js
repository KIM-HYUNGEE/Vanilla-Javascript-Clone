const form = document.querySelector(".js-form");
const input = form.querySelector("input");
const greeting = document.querySelector(".js-greeting");

const userInfo = "currentUser";
const showingClass = "showing";

function submitHandler(e) {
    e.preventDefault();
    const currentValue = input.value;
    paintGreeting(currentValue);
    localStorage.setItem(userInfo, currentValue);
}

function askForName() {
    form.classList.add(showingClass);
    form.addEventListener("submit", submitHandler);
}

function paintGreeting(userName) {
    form.classList.remove(showingClass);
    greeting.classList.add(showingClass);
    greeting.innerHTML = `Welcome, ${userName}!!`
}

function loadName() {
    const currentUser = localStorage.getItem(userInfo);
    if (currentUser === null) {
        // localStorage is empty
        askForName();
    } else {
        // localStorage is not empty
        paintGreeting(currentUser);
    }
}

function init() {
    loadName();
}

init();