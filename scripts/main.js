// ULTIMATE WEATHER APP


//API Link
const API = "https://wttr.in/"

// event listeners
const locationForm = document.querySelector("#locationForm");
locationForm.addEventListener("submit", (e) => handleSubmit(e));

const temperatureForm = document.getElementById("tempForm");
temperatureForm.addEventListener("submit", (e) => convertTemp(e));

//global variables for key html elements
const mainWeather = document.getElementById('mainWeather');
const previousSearches = document.getElementById('previousSearches');
const threeDay = document.getElementById('threeDay');
const today = document.getElementById('today');
const tomorrow = document.getElementById('tomorrow');
const dayAfter = document.getElementById('dayAfter');
const history = document.getElementById('searchHistory');

//stores previous searches
let searches = {};

const handleSubmit = (e) => {
    e.preventDefault();
    const { target } = e;

    const input = target.location.value.trim();
    if (!input) return;
    target.location.value = '';

    fetcher(input);
}

const fetcher = (input) => {
    fetch(`${API}${input.split(' ').join('+')}?format=j1`)
        .then(res => res.json())
        .then(res => populate(res, input))
        .catch(err => handleError(err))
}


const populate = (res, input) => {
    
    //clears out current information (if any)
    mainWeather.textContent = '';
    today.textContent = '';
    tomorrow.textContent = '';
    dayAfter.textContent = '';

    //save search and add new search to sidebar
    searchHistory(input, `${res.current_condition[0].FeelsLikeF}${String.fromCharCode(176)}F`)

    //populate main area
    const location = document.createElement("h2");
    location.setAttribute("id", "locationP");
    location.setAttribute("class", "mainWeatherP");
    location.innerHTML = `<strong>${input}</strong>`;

    const area = document.createElement("p");
    area.setAttribute("id", "areaP");
    area.setAttribute("class", "mainWeatherP");
    const areaName = res.nearest_area[0].areaName[0].value;
    area.innerHTML = areaName.toLowerCase().includes(input.toLowerCase()) ||
                    input.toLowerCase().includes(areaName.toLowerCase()) ? 
                    `<strong>Area: </strong>${areaName}` :
                    `<strong>Nearest Area: </strong>${areaName}`;
    
    const region = document.createElement("p");
    region.setAttribute("id", "regionP");
    region.setAttribute("class", "mainWeatherP");
    region.innerHTML = `<strong>Region: </strong>${res.nearest_area[0].region[0].value}`;

    const country = document.createElement("p");
    country.setAttribute("id", "countryP");
    country.setAttribute("class", "mainWeatherP");
    country.innerHTML = `<strong>Country: </strong>${res.nearest_area[0].country[0].value}`;

    const currently = document.createElement("p");
    currently.setAttribute("id", "currentlyP");
    currently.setAttribute("class", "mainWeatherP");
    currently.innerHTML = `<strong>Currently: </strong>Feels Like ${res.current_condition[0].FeelsLikeF}${String.fromCharCode(176)}F`;

    const sunshine = document.createElement("p");
    const sunChance = res.weather[0].hourly[0].chanceofsunshine;
    sunshine.setAttribute("id", "sunshineP");
    sunshine.setAttribute("class", "mainWeatherP");
    sunshine.innerHTML = `<strong>Chance of Sunshine: </strong>${sunChance}%`;

    const rain = document.createElement("p");
    const rainChance = res.weather[0].hourly[0].chanceofrain;
    rain.setAttribute("id", "rainP");
    rain.setAttribute("class", "mainWeatherP");
    rain.innerHTML = `<strong>Chance of Rain: </strong>${rainChance}%`;

    const snow = document.createElement("p");
    const snowChance = res.weather[0].hourly[0].chanceofsnow;
    snow.setAttribute("id", "snowP");
    snow.setAttribute("class", "mainWeatherP");
    snow.innerHTML = `<strong>Chance of Snow: </strong>${snowChance}%`;

    const icon =  document.createElement("img");
    const iconDiv = document.createElement("div");
    if (snowChance > 50) {
        icon.setAttribute("src", "./assets/icons8-light-snow.gif");
        icon.setAttribute("alt", "snow");
    } else if (rainChance > 50) {
        icon.setAttribute("src", "./assets/icons8-torrential-rain.gif");
        icon.setAttribute("alt", "rain");
    } else if (sunChance > 50) {
        icon.setAttribute("src", "./assets/icons8-summer.gif");
        icon.setAttribute("alt", "sun");
    } else {
        icon.setAttribute("src", "./assets/icons8-night.gif");
        icon.setAttribute("alt", "clouds");
    }
    icon.setAttribute("id", "icon");

    mainWeather.append(icon, location, area, region, country, currently, sunshine, rain, snow)
    
    //populate 3 day forecast

    //first establish background and border 3 day articles
    //so they're not visible until they need to be

    const forecastArticles = document.getElementsByClassName("three");
    console.log (forecastArticles);
    for (let article of forecastArticles) {
        article.style.border = "2px solid #407e7f";
        article.style.backgroundColor = "lightgray";
    }


    const average1 = document.createElement("p");
    const max1 = document.createElement("p");
    const min1 = document.createElement("p");

    average1.innerHTML = `<strong>Average Temperature:</strong>${res.weather[0].avgtempF}${String.fromCharCode(176)}F`;
    max1.innerHTML = `<strong>Max Temperature:</strong>${res.weather[0].maxtempF}${String.fromCharCode(176)}F`;
    min1.innerHTML = `<strong>Min Temperature:</strong>${res.weather[0].mintempF}${String.fromCharCode(176)}F`;
    
    today.innerHTML = `<h3 class="threeDayHeaders">Today</h3>`;
    today.append(average1, max1, min1);

    const average2 = document.createElement("p");
    const max2 = document.createElement("p");
    const min2 = document.createElement("p");

    average2.innerHTML = `<strong>Average Temperature:</strong>${res.weather[1].avgtempF}${String.fromCharCode(176)}F`;
    max2.innerHTML = `<strong>Max Temperature:</strong>${res.weather[1].maxtempF}${String.fromCharCode(176)}F`;
    min2.innerHTML = `<strong>Min Temperature:</strong>${res.weather[1].mintempF}${String.fromCharCode(176)}F`;

    tomorrow.innerHTML = `<h3 class="threeDayHeaders">Tomorrow</h3>`;
    tomorrow.append(average2, max2, min2);

    const average3 = document.createElement("p");
    const max3 = document.createElement("p");
    const min3 = document.createElement("p");

    average3.innerHTML = `<strong>Average Temperature:</strong>${res.weather[2].avgtempF}${String.fromCharCode(176)}F`;
    max3.innerHTML = `<strong>Max Temperature:</strong>${res.weather[2].maxtempF}${String.fromCharCode(176)}F`;
    min3.innerHTML = `<strong>Min Temperature:</strong>${res.weather[2].mintempF}${String.fromCharCode(176)}F`;

    dayAfter.innerHTML = `<h3 class="threeDayHeaders">Day After Tomorrow</h3>`;
    dayAfter.append(average3, max3, min3);
}

const searchHistory = (input, feelsLike) => {
    if (document.getElementById('firstSearch')) {
        document.getElementById('firstSearch').remove();
    }

    if (!(input.toLowerCase() in searches)) {
        searches = {[input.toLowerCase()]: feelsLike, ...searches}
        let newLi = document.createElement('li');
        let newAnchor = document.createElement('a');
        newAnchor.textContent = `${input} - ${feelsLike}`
        newAnchor.setAttribute("href", `javascript:fetcher('${input}');`);
        newLi.append(newAnchor);
        history.append(newLi);
    } 
}

const convertTemp = (e) => {
    e.preventDefault();
    const tempToConvert = e.target.temp.value;
    if (!tempToConvert) return;
    const resultBox = document.getElementById("tempResult")
    if (e.target[1].checked) {
        resultBox.textContent = ((tempToConvert - 32) * (5 / 9)).toFixed(2);
    } else {
        resultBox.textContent = (tempToConvert * (9 / 5) + 32).toFixed(2);
    }

}

const handleError = (err) => {
    alert(err);
}