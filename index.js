const API_URL = "https://wttr.in/";
const wttrJSON = "?format=j1";
const currentWeather = document.getElementById("currentWeather");

const searchForm = document.getElementById("form");
searchForm.addEventListener("submit", (e) => {
    e.preventDefault();
    apiCall(searchForm.location.value);
    searchForm.location.value = "";
});

const apiCall = ((location) => {
    let search = API_URL + location + wttrJSON;
    let results;
    fetch(search)
        .then((weather) => weather.json())
        .then((weather) => {
            pagePopulation(weather, location);
        })
        .catch((error) => console.log("ERROR HERE: ", error));
});

const pagePopulation = ((weather, location) => {
    console.log(weather);
    let nearestArea = weather.nearest_area[0].areaName[0].value;
    let region = weather.nearest_area[0].region[0].value;
    let country = weather.nearest_area[0].country[0].value;
    let currentTemp = weather.current_condition[0].FeelsLikeF;
    let rainChance = weather.weather[0].hourly[0].chanceofrain;
    let snowChance = weather.weather[0].hourly[0].chanceofsnow;

    currentWeather.innerHTML = `
        <h2>${location}</h2>
        <p><label>Nearest Area</label> ${nearestArea}</p>
        <p><label>Region</label> ${region}</p>
        <p><label>Country :</label> ${country}</p>
        <p><label>Currently : </label>Feels like ${currentTemp}</p>
        <p><label>Chance of Sunshine :</label> </p>
        <p><label>Chance of Rain :</label> ${rainChance}</p>
        <p><label>Chance of Snow :</label> ${snowChance}</p>
    `;
});