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
    const locationStrong = document.createElement('strong');
    location.setAttribute("id", "locationP");
    location.setAttribute("class", "mainWeatherP");
    locationStrong.textContent = input;
    location.append(locationStrong);

    const area = document.createElement("p");
    area.setAttribute("id", "areaP");
    area.setAttribute("class", "mainWeatherP");
    const areaName = res.nearest_area[0].areaName[0].value;
    area.innerHTML = areaName.toLowerCase().includes(input.toLowerCase()) ||
                    input.toLowerCase().includes(areaName.toLowerCase()) ? 
                    `<strong>Area: </strong>${areaName}` :
                    `<strong>Nearest Area: </strong>${areaName}`;
    
    const region = document.createElement("p");
    const regionStrong = document.createElement('strong');
    region.setAttribute("id", "regionP");
    region.setAttribute("class", "mainWeatherP");
    regionStrong.textContent = 'Region: ';
    region.append(regionStrong);
    region.append(`${res.nearest_area[0].region[0].value}`);

    const country = document.createElement("p");
    const countryStrong = document.createElement('strong');
    country.setAttribute("id", "countryP");
    country.setAttribute("class", "mainWeatherP");
    countryStrong.textContent = "Country: "
    country.append(countryStrong);
    country.append(`${res.nearest_area[0].country[0].value}`);
    

    const currently = document.createElement("p");
    const currentlyStrong = document.createElement('strong');
    currently.setAttribute("id", "currentlyP");
    currently.setAttribute("class", "mainWeatherP");
    currentlyStrong.textContent = 'Currently: '
    currently.append(currentlyStrong);
    currently.append(`Feels Like ${res.current_condition[0].FeelsLikeF}${String.fromCharCode(176)}F`);

    const sunshine = document.createElement("p");
    const sunshineStrong = document.createElement('strong');
    const sunChance = res.weather[0].hourly[0].chanceofsunshine;
    sunshine.setAttribute("id", "sunshineP");
    sunshine.setAttribute("class", "mainWeatherP");
    sunshineStrong.textContent = "Chance of Sunshine: "
    sunshine.append(sunshineStrong);
    sunshine.append(`${sunChance}%`);

    const rain = document.createElement("p");
    const rainStrong = document.createElement('strong');
    const rainChance = res.weather[0].hourly[0].chanceofrain;
    rain.setAttribute("id", "rainP");
    rain.setAttribute("class", "mainWeatherP");
    rainStrong.textContent = "Chance of Rain: ";
    rain.append(rainStrong)
    rain.append(`${rainChance}%`);

    const snow = document.createElement("p");
    const snowStrong = document.createElement('strong');
    const snowChance = res.weather[0].hourly[0].chanceofsnow;
    snow.setAttribute("id", "snowP");
    snow.setAttribute("class", "mainWeatherP");
    snowStrong.textContent = 'Chance of Snow: ';
    snow.append(snowStrong);
    snow.append(`${snowChance}%`);

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

    //first establish background and border for 3 day articles
    //so they're not visible until they need to be

    const forecastArticles = document.getElementsByClassName("three");
    console.log (forecastArticles);
    for (let article of forecastArticles) {
        article.style.border = "2px solid #407e7f";
        article.style.backgroundColor = "lightgray";
    }

    //today forecast
    const todayh3 = document.createElement('h3');
    const average1 = document.createElement("p");
    const average1Strong = document.createElement('strong');
    const max1 = document.createElement("p");
    const max1Strong = document.createElement('strong');
    const min1 = document.createElement("p");
    const min1Strong = document.createElement('strong');

    todayh3.textContent = "Today";
    todayh3.setAttribute("class", "threeDayHeaders");
    average1Strong.textContent = "Average Temperature: "
    average1.append(average1Strong);
    average1.append(`${res.weather[0].avgtempF}${String.fromCharCode(176)}F`);
    max1Strong.textContent = "Max Temperature: ";
    max1.append(max1Strong);
    max1.append(`${res.weather[0].maxtempF}${String.fromCharCode(176)}F`);
    min1Strong.textContent = "Min Temperature: ";
    min1.append(min1Strong);
    min1.append(`${res.weather[0].mintempF}${String.fromCharCode(176)}F`)
    
    today.append(todayh3, average1, max1, min1);

    //tomorrow forecast
    const tomorrowh3 = document.createElement('h3');
    const average2 = document.createElement("p");
    const average2Strong = document.createElement('strong');
    const max2 = document.createElement("p");
    const max2Strong = document.createElement('strong');
    const min2 = document.createElement("p");
    const min2Strong = document.createElement('strong');

    tomorrowh3.textContent = "Tomorrow";
    tomorrowh3.setAttribute("class", "threeDayHeaders");
    average2Strong.textContent = "Average Temperature: "
    average2.append(average2Strong);
    average2.append(`${res.weather[1].avgtempF}${String.fromCharCode(176)}F`);
    max2Strong.textContent = "Max Temperature: ";
    max2.append(max2Strong);
    max2.append(`${res.weather[1].maxtempF}${String.fromCharCode(176)}F`);
    min2Strong.textContent = "Min Temperature: ";
    min2.append(min2Strong);
    min2.append(`${res.weather[1].mintempF}${String.fromCharCode(176)}F`)
    
    tomorrow.append(tomorrowh3, average2, max2, min2);

    //day after tomorrow forecast

    const dayAfterh3 = document.createElement('h3');
    const average3 = document.createElement("p");
    const average3Strong = document.createElement('strong');
    const max3 = document.createElement("p");
    const max3Strong = document.createElement('strong');
    const min3 = document.createElement("p");
    const min3Strong = document.createElement('strong');

    dayAfterh3.textContent = "Day After Tomorrow";
    dayAfterh3.setAttribute("class", "threeDayHeaders");
    average3Strong.textContent = "Average Temperature: "
    average3.append(average3Strong);
    average3.append(`${res.weather[2].avgtempF}${String.fromCharCode(176)}F`);
    max3Strong.textContent = "Max Temperature: ";
    max3.append(max3Strong);
    max3.append(`${res.weather[2].maxtempF}${String.fromCharCode(176)}F`);
    min3Strong.textContent = "Min Temperature: ";
    min3.append(min3Strong);
    min3.append(`${res.weather[2].mintempF}${String.fromCharCode(176)}F`)
    
    dayAfter.append(dayAfterh3, average3, max3, min3);

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