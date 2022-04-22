//Main Weather Add Event Listener
const getWeather = document.querySelector("header");
getWeather.addEventListener("submit", (event) => {
    event.preventDefault();
    const locationInput = event.target.location.value;
    const weatherResult = document.querySelector("main");
    const searchHistory = document.querySelector("aside ul");
    const weatherResultP = document.querySelector('article');
    const threeDayWeather = document.querySelector('main aside');
    const params = [locationInput, weatherResult, searchHistory,weatherResultP,threeDayWeather];
    getCurruntWeather(...params);
    event.target.location.value = "";
});


// Fecth Data from Api
function getCurruntWeather(locationInput, weatherResult, searchHistory,weatherResultP,threeDayWeather) {
    fetch(`https://wttr.in/${locationInput}?format=j1`)
        .then((response) => response.json())
        .then((data) => {
            weatherResult.replaceChild(createWeather(data, locationInput), weatherResultP);
            weatherResult.replaceChild(getThreeDayWeather(data),threeDayWeather);
            searchHistory.prepend(createSearchHistory(data, locationInput));
        })
        .catch((error) => {
            console.log(error);
        });
}


// Main Weather
function createWeather(data, locationInput) {
    
    const sunChance = data.weather[0].hourly[0].chanceofsunshine;
    const rainChance = data.weather[0].hourly[0].chanceofrain;
    const snowChance = data.weather[0].hourly[0].chanceofsnow;
    
    const curentWeather = document.createElement('article');
    curentWeather.classList.add('three', 'shaded');
    curentWeather.setAttribute('id', locationInput);
    
    const img = getIconImage(data);

    const locationTitle = document.createElement('h2');
    locationTitle.setAttribute('id', locationInput);
    locationTitle.textContent = locationInput;

    const areaLable = getAreaType(data,locationInput);
    const area = document.createElement('p');
    area.innerHTML = `${areaLable}`;
    
    const region = document.createElement('p');
    region.innerHTML = `<strong>Region:</strong> ${data.nearest_area[0].region[0].value}`;
    
    const country = document.createElement('p');
    country.innerHTML = `<strong>Country:</strong> ${data.nearest_area[0].country[0].value}`;
    
    const currently = document.createElement('p');
    currently.innerHTML = `<strong>Currently:</strong> Feels Like ${data.current_condition[0].FeelsLikeF}&#8457`;
    
    const chanceOfSunshine = document.createElement('p');
    chanceOfSunshine.innerHTML = `<strong>Chance of Sunshine:</strong> ${sunChance}%`;
    
    const chanceOfRain = document.createElement('p');
    chanceOfRain.innerHTML = `<strong>Chance of Rain:</strong> ${rainChance}%`;
    
    const chanceOfSnow = document.createElement('p');
    chanceOfSnow.innerHTML = `<strong>Chance of Snow:</strong> ${snowChance}%`;

    curentWeather.prepend(img, locationTitle, area, region, country, currently, chanceOfSunshine, chanceOfRain, chanceOfSnow);
    
    return curentWeather;
}

//Get Weather Icon Image
function getIconImage(data){
    const sunChance = data.weather[0].hourly[0].chanceofsunshine;
    const rainChance = data.weather[0].hourly[0].chanceofrain;
    const snowChance = data.weather[0].hourly[0].chanceofsnow;

    const img = document.createElement('img');

    if (sunChance > 50) {
        img.setAttribute("src", "./assets/icons8-summer.gif");
        img.setAttribute("alt", "sun");
    }
    if (rainChance > 50) {
        img.setAttribute("src", "./assets/icons8-torrential-rain.gif");
        img.setAttribute("alt", "rain");
    }
    if (snowChance > 50) {
        img.setAttribute("src", "./assets/icons8-light-snow.gif");
        img.setAttribute("alt", "snow");
    }
    return img;
}


//Returned Area Type Function
function getAreaType(data,locationInput){
    let areaLable;
    const areaData = data.nearest_area[0].areaName[0].value;
    if (locationInput.toLowerCase() === areaData.toLowerCase()) {
        areaLable = `<strong>Area:</strong> ${areaData}`;
    } else {
        areaLable = `<strong>Nearest Area:</strong> ${areaData}`;
    }
    return areaLable;
}


//Search History Function
function createSearchHistory(data, locationInput) {
    const historyP = document.querySelector('#history p');
    if (historyP) {
        historyP.remove();
    }

    const searchHistory =
        document.createElement('li');
    searchAnchor = document.createElement('a');
    searchAnchor.setAttribute('href', `#${locationInput}`);
    searchAnchor.textContent = locationInput;
    searchHistory.appendChild(searchAnchor);
    searchHistory.append(` - ${data.current_condition[0].FeelsLikeF}°F`);
    return searchHistory;
}

//Three Day Weather
function getThreeDayWeather(data) {

    const threeDayReport = document.createElement('aside');
    threeDayReport.classList.add('threeDay');
    
    
    //Today's Forcast
    const today = document.createElement('article');
    today.classList.add('three', 'shaded');
    
    const todayTitle = document.createElement('h2');
    todayTitle.innerHTML = "Today";
    
    const todayAverage = document.createElement('p');
    todayAverage.innerHTML = `<strong>Average Temperature:</strong> ${data.weather[0].avgtempF}&#8457`;
    
    const todayMaxTemp = document.createElement('p');
    todayMaxTemp.innerHTML = `<strong>Max Temperature:</strong> ${data.weather[0].maxtempF}&#8457`;
    
    const todayMinTemp = document.createElement('p');
    todayMinTemp.innerHTML = `<strong>Min Temperature:</strong> ${data.weather[0].mintempF}&#8457`;
    
    today.append(todayTitle, todayAverage, todayMaxTemp, todayMinTemp);

    
    //Tomorrow's Forcast 
    const tomorrow = document.createElement('article');
    tomorrow.classList.add('three', 'shaded');
    
    const tomorrowTitle = document.createElement('h2');
    tomorrowTitle.textContent = "Tomorrow";
    
    const tomorrowAverage = document.createElement('p');
    tomorrowAverage.innerHTML = `<strong>Average Temperature:</strong> ${data.weather[1].avgtempF}&#8457`;
    
    const tomorrowMaxTemp = document.createElement('p');
    tomorrowMaxTemp.innerHTML = `<strong>Max Temperature:</strong> ${data.weather[1].maxtempF}&#8457`;
    
    const tomorrowMinTemp = document.createElement('p');
    tomorrowMinTemp.innerHTML = `<strong>Min Temperature:</strong> ${data.weather[1].mintempF}&#8457`;
    
    tomorrow.append(tomorrowTitle, tomorrowAverage, tomorrowMaxTemp, tomorrowMinTemp);


    //Day After Tomorrow's Forcast
    const dayAfterTomorrow = document.createElement('article');
    dayAfterTomorrow.classList.add('three', 'shaded');
    
    const dayAfterTomorrowTitle = document.createElement('h2');
    dayAfterTomorrowTitle.textContent = "Day After Tomorrow";
    
    const dayAfterTomorrowAverage = document.createElement('p');
    dayAfterTomorrowAverage.innerHTML = `<strong>Average Temperature:</strong> ${data.weather[2].avgtempF}&#8457`;
    
    const dayAfterTomorrowMaxTemp = document.createElement('p');
    dayAfterTomorrowMaxTemp.innerHTML = `<strong>Max Temperature:</strong> ${data.weather[2].maxtempF}&#8457`;
    
    const dayAfterTomorrowMinTemp = document.createElement('p');
    dayAfterTomorrowMinTemp.innerHTML = `<strong>Min Temperature:</strong> ${data.weather[2].mintempF}&#8457`;
    
    dayAfterTomorrow.append(dayAfterTomorrowTitle, dayAfterTomorrowAverage, dayAfterTomorrowMaxTemp, dayAfterTomorrowMinTemp);

    threeDayReport.append(today, tomorrow, dayAfterTomorrow);
    return threeDayReport;
}


//Temperature Converter Add Event Listener
const tempConverter = document.querySelector('.convert');
tempConverter.addEventListener("submit", (event) => {
    event.preventDefault();
    const tempToConvert = event.target.convert.value;
    const convertTemp = event.target.convert_temp.value;
    const result = document.querySelector('aside h4');
    result.textContent = temperatureConverter(tempToConvert, convertTemp);
});

//Temperature Converter Function
function temperatureConverter(tempToConvert, convertTemp) {
    let result;
    if (convertTemp === 'c') {
        result = (tempToConvert - 32) * 0.5556;
        result = (result % 1 !== 0) ? result.toFixed(2) + '°C' : result + '°C';
    }
    if (convertTemp === 'f') {
        result = (tempToConvert * 1.8) + 32;
        result = (result % 1 !== 0) ? result.toFixed(2) + '°F' : result + '°F';
    }
    return result;
}