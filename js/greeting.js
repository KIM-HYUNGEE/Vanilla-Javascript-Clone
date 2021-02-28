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

function changeGreeting() {
    const date = new Date();
    const hour = date.getHours();
    if (hour >= 6 && hour < 12) {
        return "Good Morning";
    }
    else if (hour >= 12 && hour < 18) {
        return "Good Afternoon";
    }
    else if (hour >= 18 && hour < 24) {
        return "Good Evening";
    }
    else {
        return "Good Night";
    }
}

function paintGreeting(userName) {
    form.classList.remove(showingClass);
    greeting.classList.add(showingClass);
    const mention = changeGreeting();
    greeting.innerHTML = `${mention}, ${userName}`;
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