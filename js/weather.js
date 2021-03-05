const API_KEY = "eae493b322010987356e7a0ab7ec9f9d";
const COORDS = "coords";
const weather = document.querySelector(".js-weather");

function getWeather(lat, lon) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`)
    .then(function(response){
        return response.json();
    })
    .then(function(json){
        console.log(json);
        const temperature = json.main.temp;
        const feels = json.main.feels_like;
        const place = json.name;
        weather.innerHTML = `${place}<br>현재 온도: ${temperature}<br>체감 온도: ${feels}`;
    });

}

function saveCoords(object) {
    localStorage.setItem(COORDS, JSON.stringify(object));
    // 37.824573140564134, 127.34745755477822
    //{"latitude":37.824573140564134,"longitude":127.34745755477822}
}

function geoSuccessHandler(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    const coordsObj = {
        latitude: latitude,
        longitude: longitude
    };
    saveCoords(coordsObj);
    getWeather(latitude, longitude);
}

function geoErrorHandler() {
    console.log("위치정보에 접근할 수 없습니다.");
}

function askForCoords() {
    navigator.geolocation.getCurrentPosition(geoSuccessHandler, geoErrorHandler);
}

function loadCoords() {
    const loadedCoords = localStorage.getItem(COORDS);
    if (loadedCoords === null) {
        askForCoords();
    } else {
        // call getWeather()
        console.log("위치정보에 접근했습니다");
        const parsedCoords = JSON.parse(loadedCoords);
        getWeather(parsedCoords.latitude, parsedCoords.longitude);
    }
}

function init() {
    loadCoords();
}

init();