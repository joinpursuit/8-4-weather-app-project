const BASE_URL = "https://wttr.in";

let locationSearch;
const locationInfo = document.getElementById("locationInfo");
const searchForm = document.querySelector("form");
searchForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const input = document.querySelector("#location");
  locationSearch = input.value
  if (!locationSearch) {
    alert("Location cannot be empty");
  } else {
    getWeatherSearch(locationSearch);
  }
  input.value = "";
});

function getWeatherSearch(locationSearch, prevSearch) {
  fetch(`${BASE_URL}/${locationSearch}?format=j1`)
    .then((response) => response.json())
    .then((json) => weatherData(json, prevSearch))
    .catch((error) => console.log("Error: ", error));
}

const weatherToday = document.getElementById("weatherToday");
const weatherTomorrow = document.getElementById("weatherTomorrow");
const weatherDayAfter = document.getElementById("weatherDayAfter");
function weatherData(json, prevSearch) {
  let avgTempKey = "avgtempF";
  let maxTempKey = "maxtempF";
  let minTempKey = "mintempF";
  let feelsLikeF = json.current_condition[0].FeelsLikeF;
  let feelsLikeC = json.current_condition[0].FeelsLikeC;
  let area = json.nearest_area[0].areaName[0].value;
  let region = json.nearest_area[0].region[0].value;
  let country = json.nearest_area[0].country[0].value;

  let today = {
    avgTemp: json.weather[0][avgTempKey],
    maxTemp: json.weather[0][maxTempKey],
    minTemp: json.weather[0][minTempKey],
  };
  let tomorrow = {
    avgTemp: json.weather[1][avgTempKey],
    maxTemp: json.weather[1][maxTempKey],
    minTemp: json.weather[1][minTempKey],
  };
  let dayAfter = {
    avgTemp: json.weather[2][avgTempKey],
    maxTemp: json.weather[2][maxTempKey],
    minTemp: json.weather[2][minTempKey],
  };
  let chanceOfRain = json.weather[0].hourly[0].chanceofrain;
  let chanceOfSnow = json.weather[0].hourly[0].chanceofsnow;
  let chanceOfSunshine = json.weather[0].hourly[0].chanceofsunshine;

  updateHTML({
    feelsLikeF,
    feelsLikeC,
    area,
    region,
    country,
    today,
    tomorrow,
    dayAfter,
    chanceOfRain,
    chanceOfSnow,
    chanceOfSunshine,
    prevSearch,
  });
}

function updateHTML({
  feelsLikeF,
  feelsLikeC,
  area,
  region,
  country,
  today,
  tomorrow,
  dayAfter,
  chanceOfRain,
  chanceOfSnow,
  chanceOfSunshine,
  prevSearch,
}) {

 const displayPlaceHolder = document.getElementsByClassName("display-placeholder")[0];
  displayPlaceHolder.style.display = "none";
  locationInfo.style.display = "block";
  let notEqual = area.toLowerCase() !== locationSearch.toLowerCase();
  let locationInfoHTML = `
        ${addWeatherIcon(chanceOfRain, chanceOfSnow, chanceOfSunshine)}
        <h2>${locationSearch}</h2>
        ${createItem(notEqual ? "Nearest Area" : "Area", area)}
        ${createItem("Region", region)}
        ${createItem("Country", country)}
        ${createItem(
          "Currently",
          `Feels Like ${feelsLikeF}°F / ${feelsLikeC}°C`
        )}
        ${createItem("Chance of Sunshine", chanceOfSunshine + "%")}
        ${createItem("Chance of Rain", chanceOfRain + "%")}
        ${createItem("Chance of Snow", chanceOfSnow + "%")}
    `;
  locationInfo.innerHTML = locationInfoHTML;

  document.querySelector(".weather-info").style.display = "grid";
  let weatherTodayHTML = `<h3>Today</h3>
    ${createItem("Average Temperature", `${today.avgTemp}°F`)}
    ${createItem("Max Temperature", `${today.maxTemp}°F`)}
    ${createItem("Min Temperature", `${today.minTemp}°F`)}
  `;
  let weatherTomorrowHTML = `<h3>Tomorrow</h3>
    ${createItem("Average Temperature", `${tomorrow.avgTemp}°F`)}
    ${createItem("Max Temperature", `${tomorrow.maxTemp}°F`)}
    ${createItem("Min Temperature", `${tomorrow.minTemp}°F`)}
  `;
  let weatherDayAfterHTML = `<h3>Day After Tomorrow</h3>
    ${createItem("Average Temperature", `${dayAfter.avgTemp}°F`)}
    ${createItem("Max Temperature", `${dayAfter.maxTemp}°F`)}
    ${createItem("Min Temperature", `${dayAfter.minTemp}°F`)}
  `;
  weatherToday.innerHTML = weatherTodayHTML;
  weatherTomorrow.innerHTML = weatherTomorrowHTML;
  weatherDayAfter.innerHTML = weatherDayAfterHTML;
  const previousSearchUl = document.getElementById("previousSearchUl");
  const previousSearchP = document.getElementById("previousSearchP");
  previousSearchP.style.display = "none";
  if (prevSearch) {
    let prevSearchItem = document.createElement("li");
    prevSearchItem.addEventListener("click", () => {
      locationSearch = area;
      getWeatherSearch(area);
    });
    prevSearchItem.innerHTML = `<a class="link">${area}</a> - ${feelsLikeF}°F`;
    previousSearchUl.appendChild(prevSearchItem);
  }
}

function createItem(key, value) {
  return `<p class="item"><span class="head">${key}</span> : ${value}</p>`;
}

function weatherIcon(rain, snow, sunshine) {
  let maxValue = Math.max(rain, snow, sunshine);
  if (maxValue == sunshine)
    return '<img src="./assets/icons8-summer.gif" alt="sun" />';
  if (maxValue == rain)
    return '<img src="./assets/icons8-torrential-rain.gif" alt="rain" />';
  if (maxValue == snow)
    return '<img src="./assets/icons8-light-snow.gif" alt="snow" />';
}