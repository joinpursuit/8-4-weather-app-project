const getWeather = document.querySelector("header");
getWeather.addEventListener("submit", (event) => {
    event.preventDefault();
    const locationInput = event.target.location.value;
    const weatherResult = document.querySelector("main");
    const searchHistory = document.querySelector("aside ul");
    getCurruntWeather(locationInput, weatherResult, searchHistory);
    event.target.location.value = "";
});

function getCurruntWeather(locationInput, weatherResult, searchHistory) {
    fetch(`https://wttr.in/${locationInput}?format=j1`)
        .then((response) => response.json())
        .then((data) => {
            weatherResult.prepend(createWeather(data, locationInput), getThreeDayWeather(data));
            searchHistory.prepend(createSearchHistory(data, locationInput));
        })
        .catch((error) => {
            console.log(error);
        });
}

function createWeather(data, locationInput) {
    const sunChance = data.weather[0].hourly[0].chanceofsunshine;
    const rainChance = data.weather[0].hourly[0].chanceofrain;
    const snowChance = data.weather[0].hourly[0].chanceofsnow;

    const curentWeather = document.createElement('article');
    curentWeather.classList.add('three', 'shaded');
    curentWeather.setAttribute('id', locationInput);
    const img =
        document.createElement('img');

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
    const locationTitle = document.createElement('h2');
    locationTitle.setAttribute('id', locationInput);
    locationTitle.textContent = locationInput;
    const areaData = data.nearest_area[0].areaName[0].value;
    let areaLable = '';
    if (locationInput.toLowerCase() === areaData.toLowerCase()) {
        areaLable = `<strong>Area:</strong> ${areaData}`;
    } else {
        areaLable = `<strong>Nearest Area:</strong> ${areaData}`;
    }
    const area =
        document.createElement('p');
    area.innerHTML = `${areaLable}`;
    const region =
        document.createElement('p');
    region.innerHTML = `<strong>Region:</strong> ${data.nearest_area[0].region[0].value}`;
    const country =
        document.createElement('p');
    country.innerHTML = `<strong>Country:</strong> ${data.nearest_area[0].country[0].value}`;
    const currently =
        document.createElement('p');
    currently.innerHTML = `<strong>Currently:</strong> Feels Like ${data.current_condition[0].FeelsLikeF}&#8457`;
    const chanceOfSunshine =
        document.createElement('p');
    chanceOfSunshine.innerHTML = `<strong>Chance of Sunshine:</strong> ${sunChance}%`;
    const chanceOfRain =
        document.createElement('p');
    chanceOfRain.innerHTML = `<strong>Chance of Rain:</strong> ${rainChance}%`;
    const chanceOfSnow =
        document.createElement('p');
    chanceOfSnow.innerHTML = `<strong>Chance of Snow:</strong> ${snowChance}%`;

    curentWeather.prepend(img, locationTitle, area, region, country, currently, chanceOfSunshine, chanceOfRain, chanceOfSnow);
    const pass = document.querySelector('#main p');
    pass.remove();
    return curentWeather;
}

function createSearchHistory(data, locationInput) {
    const passp = document.querySelector('#history p');
    if (passp) {
        passp.remove();
    }

    const searchHistory =
        document.createElement('li');
    createA = document.createElement('a');
    createA.setAttribute('href', `#${locationInput}`);
    createA.textContent = locationInput;
    searchHistory.appendChild(createA);
    searchHistory.append(` - ${data.current_condition[0].FeelsLikeF}°F`);
    return searchHistory;
}

function getThreeDayWeather(data) {

    const threeDayReport = document.createElement('aside');
    threeDayReport.classList.add('threeDay');
    //Today
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

    //Tomorrow
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

    //Day After Tomorrow
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
const tempConverter = document.querySelector('.convert');
tempConverter.addEventListener("submit", (event) => {
    event.preventDefault();
    const tempToConvert = event.target.convert.value;
    const convertTemp = event.target.convert_temp.value;
    const result = document.querySelector('aside h4');
    result.textContent = temperatureConverter(tempToConvert, convertTemp);
});

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
