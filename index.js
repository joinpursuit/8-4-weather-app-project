const API_URL = "https://wttr.in/";
const wttrJSON = "?format=j1";
const currentWeather = document.getElementById("currentWeather");
const prevSearches = document.getElementById("prevSearches");
const hideMe = document.getElementById("noSearches");
const prevSearchList = document.getElementById("searchList");
const threeDayForcast = document.getElementById("threeDayForcast");

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


    let weatherImage = (sun, snow, rain) => {
        let sunIcon = "./assets/icons8-summer.gif";
        let snowIcon = "./assets/icons8-light-snow.gif";
        let rainIcon = "./assets/icons8-torrential-rain.gif";
        let alt = "";

        if (sun > 50) {
            alt = "sun";
            return [sunIcon, alt];
        } else if (snow > 50) {
            alt = "snow";
            return [snowIcon, alt];
        } else if (rain > 50) {
            alt = "rain";
            return [rainIcon, alt];
        } else {
            alt = "nothing";
            return ["./assets/icons8-night.gif", ]
        }
    };

    //For the love of God, remember to change this. Though it's a good
    //visual reference for actually constructing your appends
    currentWeather.innerHTML = `
        <img src="${weatherImage(praiseTheSun, snowChance, rainChance)[0]}" alt="${weatherImage(praiseTheSun, snowChance, rainChance)[1]}">
        <h2 id="locationRaw">${location}</h2>
        <p><label>Nearest Area:</label>&nbsp${nearestArea}</p>
        <p><label>Region:</label>&nbsp${region}</p>
        <p><label>Country:</label>&nbsp${country}</p>
        <p><label>Currently:</label>&nbspFeels like&nbsp${currentTemp}º</p>
        <p><label>Chance of Sunshine:</label>&nbsp${praiseTheSun}% </p>
        <p><label>Chance of Rain:</label>&nbsp${rainChance}%</p>
        <p><label>Chance of Snow:</label>&nbsp${snowChance}%</p>
    `;

    prevSearchPopulation(currentTemp, nearestArea, location);
    threeDayPopulation(weather);
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

    if (!searchLocation) {
        searchLocation = nearestArea;
    }

    //console.log(searchLocation);
    prevSearchItem.textContent = `${searchLocation} - ${currentTemp}ºF`;
    prevSearchList.append(prevSearchItem);
    prevSearches.append(prevSearchList);
    prevSearchList.removeAttribute("hidden"); //Display the ul
    hideMe.remove(); //Remove that default text
});

const threeDayPopulation = (weather) => {
    console.log("fart", weather);
    
    let bomb = document.querySelectorAll("aside article p");
    for (let p of bomb){
        p.remove();
    }

    let day1 = document.getElementById("day1");
    let day2 = document.getElementById("day2");
    let day3 = document.getElementById("day3");

    let todayAvg = weather.weather[0].avgtempF;
    let todayMax = weather.weather[0].maxtempF;
    let todayMin = weather.weather[0].mintempF;

    let tomorAvg = weather.weather[1].avgtempF;
    let tomorMax = weather.weather[1].maxtempF;
    let tomorMin = weather.weather[1].mintempF;

    let dayAfterAvg = weather.weather[2].avgtempF;
    let dayAfterMax = weather.weather[2].maxtempF;
    let dayAfterMin = weather.weather[2].mintempF;

    let todayAvgElement = document.createElement("p");
    todayAvgElement.textContent = `Average Temperature : ${todayAvg}`;
    let todayMaxElement = document.createElement("p");
    todayMaxElement.textContent = `Maximum Temperature : ${todayMax}`;
    let todayMinElement = document.createElement("p");
    todayMinElement.textContent = `Minimum Temperature : ${todayMin}`;

    day1.append(todayAvgElement);
    day1.append(todayMaxElement);
    day1.append(todayMinElement);

    let tomorAvgElement = document.createElement("p");
    tomorAvgElement.textContent = `Average Temperature : ${tomorAvg}`;
    let tomorMaxElement = document.createElement("p");
    tomorMaxElement.textContent = `Maximum Temperature : ${tomorMax}`;
    let tomorMinElement = document.createElement("p");
    tomorMinElement.textContent = `Minimum Temperature : ${tomorMin}`;

    let dayAfterAvgElement = document.createElement("p");
    dayAfterAvgElement.textcontent = `Average Temperature : ${dayAfterAvg}`;
    let dayAfterMaxElement = document.createElement("p");
    dayAfterMaxElement.textcontent = `Maximum Temperature : ${dayAfterMax}`;
    let dayAfterMinElement = document.createElement("p");
    dayAfterMinElement.textcontent = `Minimum Temperature : ${dayAfterMin}`;
};