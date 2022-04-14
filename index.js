const API_URL = "https://wttr.in/";
const wttrJSON = "?format=j1";
const currentWeather = document.getElementById("currentWeather");
const prevSearches = document.getElementById("prevSearches");
const hideMe = document.getElementById("noSearches");
const prevSearchList = document.getElementById("searchList");

const searchForm = document.getElementById("form");
searchForm.addEventListener("submit", (e) => {
    e.preventDefault();
    apiCall(searchForm.location.value);
});

const apiCall = ((location) => {
    let search = API_URL + location + wttrJSON;
    fetch(search)
        .then((weather) => weather.json())
        .then((weather) => {
            pagePopulation(weather, location);
        })
        .catch((error) => console.log("ERROR HERE: ", error));
});

const pagePopulation = ((weather, location) => {
    console.log(weather); //For taking a look at the object
    //I really dislike having a block of lets - it looks ugly
    let nearestArea = weather.nearest_area[0].areaName[0].value;
    let region = weather.nearest_area[0].region[0].value;
    let country = weather.nearest_area[0].country[0].value;
    let currentTemp = weather.current_condition[0].FeelsLikeF;
    let rainChance = weather.weather[0].hourly[0].chanceofrain;
    let snowChance = weather.weather[0].hourly[0].chanceofsnow;
    let praiseTheSun = weather.weather[0].hourly[0].chanceofsunshine;

    let weatherImage = (praiseTheSun, snowChance, rainChance) => {
        let sunIcon = "./assets/icons8-summer.gif";
        let snowIcon = "./assets/icons8-light-snow.gif";
        let rainIcon = "./assets/icons8-torrential-rain.gif";
        let alt = "";

        if (praiseTheSun > 50) {
            alt = "sun";
            return [sunIcon, alt];
        } else if (snowChance > 50) {
            alt = "snow";
            return [snowIcon, alt];
        } else if (rainChance > 50) {
            alt = "rain";
            return [rainIcon, alt];
        } else {

        }
    };

    //For the love of God, remember to change this. Though it's a good
    //visual reference for actually constructing your appends
    currentWeather.innerHTML = `
        <img src="${weatherImage(praiseTheSun, snowChance, rainChance)[0]}" alt="${weatherImage(praiseTheSun, snowChance, rainChance)[1]}">
        <h2>${location}</h2>
        <p><label>Nearest Area:</label> ${nearestArea}</p>
        <p><label>Region:</label> ${region}</p>
        <p><label>Country:</label> ${country}</p>
        <p><label>Currently: </label>Feels like ${currentTemp}º</p>
        <p><label>Chance of Sunshine:</label> ${praiseTheSun}% </p>
        <p><label>Chance of Rain:</label> ${rainChance}%</p>
        <p><label>Chance of Snow:</label> ${snowChance}%</p>
    `;

    prevSearchPopulation(currentTemp, nearestArea, location);
    searchForm.location.value = "";
});

const prevSearchPopulation = ((currentTemp, nearestArea, location) => {
    //Prev search population
    /* Todo:
        Make prev. searches a clickable link
        Display temperature to the right of prev. search
    */
    let prevSearchItem = document.createElement("li");
    prevSearchItem.setAttribute("id", "lineItem");
    let searchLocation = location;
    if (searchLocation === "") {
        searchLocation = nearestArea;
    }
    //console.log(searchLocation);
    prevSearchItem.textContent = `${searchLocation} - ${currentTemp}ºF`;
    prevSearchList.append(prevSearchItem);
    prevSearches.append(prevSearchList);
    prevSearchList.removeAttribute("hidden"); //Display the ul
    hideMe.remove(); //Remove that default text
});