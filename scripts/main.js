// ULTIMATE WEATHER APP


//API Link
const API = "https://wttr.in/"

// form submit event listener
const locationForm = document.querySelector("#locationForm");
locationForm.addEventListener("submit", (e) => handleSubmit(e));

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

//history click event listener
history.addEventListener("click", (e) => handleHistoryClick(e))


const handleSubmit = (e) => {
    e.preventDefault();
    const { target } = e;

    const input = target.location.value.trim();
    if (!input) return;
    target.location.value = '';

    fetcher(input);
}

const handleHistoryClick = (e) => {
    e.preventDefault();
    const input  = e.target.textContent.split('-')[0].trim();
    console.log (input);
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
    const location = document.createElement("p");
    location.setAttribute("id", "locationP");
    location.setAttribute("class", "mainWeatherP");
    location.innerHTML = `<strong>${input}</strong>`;

    const area = document.createElement("p");
    area.setAttribute("id", "areaP");
    area.setAttribute("class", "mainWeatherP");
    area.innerHTML = `<strong>Area: </strong>${res.nearest_area[0].areaName[0].value}`;

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

    mainWeather.append(location, area, region, country, currently)
    
    //populate 3 day forecast
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
    document.getElementById('firstSearch').textContent = '';

    if (!(input in searches)) {
        searches = {[input]: feelsLike, ...searches}
        let newLi = document.createElement('li');
        newLi.setAttribute("class", "historyItems");
        newLi.textContent = `${input} - ${feelsLike}`
        history.append(newLi);
    } 
}

const handleError = (err) => {
    alert(err);
}