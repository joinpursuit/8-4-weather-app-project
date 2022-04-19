//1
const base_url = "http://wttr.in/";
const format_ext = "?format=j1";
const arr = [];
//2
const form = document.querySelector("form");
form.addEventListener("submit", (event) => {
  event.preventDefault();
  const searchInput = event.target.location.value;
  //4
  if(searchInput === ""){
      alert("Input Location")
  }
  else{
  getApiData(searchInput);
  }
});

//3
function getApiData(searchInput) {
  let url = base_url + searchInput + format_ext;
  fetch(url)
    .then((response) => response.json())
    .then((response) => {
      getWeatherData(response, searchInput);
      getPreviousHistory(response, searchInput);
    });
  //9
}

//5 MAIN INFO

function getWeatherData(response, searchInput) {
  const currentWeather = document.querySelector("#current-weather");
  currentWeather.textContent = "";
  const location = document.createElement("h2");
  location.setAttribute("id", "location");
  location.setAttribute("class", "mainWeather");
  location.innerHTML = `<strong>${searchInput}</strong>`;
  form.reset();

  const area = document.createElement("p");
  area.setAttribute("id", "area");
  area.setAttribute("class", "mainWeather");
  const areaName = response.nearest_area[0].areaName[0].value; //11
  if (searchInput === areaName) {
    area.innerHTML = `<strong>Area: </strong>${areaName}`;
  } else {
    area.innerHTML = `<strong>Nearest Area: </strong>${areaName}`;
  }

  const region = document.createElement("p");
  region.setAttribute("id", "region");
  region.setAttribute("class", "mainWeather");
  region.innerHTML = `<strong>Region: </strong>${response.nearest_area[0].region[0].value}`;

  const country = document.createElement("p");
  country.setAttribute("id", "country");
  country.setAttribute("class", "mainWeather");
  country.innerHTML = `<strong>Country: </strong>${response.nearest_area[0].country[0].value}`;

  const currently = document.createElement("p");
  currently.setAttribute("id", "currently");
  currently.setAttribute("class", "mainWeather");
  currently.innerHTML = `<strong>Currently: </strong>Feels Like ${response.current_condition[0].FeelsLikeF}°F`;

  //12 CHANCE DATA
  const sunshine = document.createElement("p");
  const sunChance = response.weather[0].hourly[0].chanceofsunshine;
  sunshine.setAttribute("id", "sunshine");
  sunshine.setAttribute("class", "mainWeather");
  sunshine.innerHTML = `<strong>Chance of Sunshine: </strong>${sunChance}%`;

  const rain = document.createElement("p");
  const rainChance = response.weather[0].hourly[0].chanceofrain;
  rain.setAttribute("id", "rain");
  rain.setAttribute("class", "mainWeather");
  rain.innerHTML = `<strong>Chance of Rain: </strong>${rainChance}%`;

  const snow = document.createElement("p");
  const snowChance = response.weather[0].hourly[0].chanceofsnow;
  snow.setAttribute("id", "snow");
  snow.setAttribute("class", "mainWeather");
  snow.innerHTML = `<strong>Chance of Snow: </strong>${snowChance}%`;
  //12.5 ICONS
  const weatherIcon = document.createElement("img");
  if (sunChance > 50) {
    weatherIcon.setAttribute("src", "./assets/icons8-summer.gif");
    weatherIcon.setAttribute("alt", "sun");
  } else if (rainChance > 50) {
    weatherIcon.setAttribute("src", "./assets/icons8-torrential-rain.gif");
    weatherIcon.setAttribute("alt", "rain");
  } else if (snowChance > 50) {
    weatherIcon.setAttribute("src", "./assets/icons8-light-snow.gif");
    weatherIcon.setAttribute("alt", "snow");
  }

  currentWeather.append(
    weatherIcon,
    location,
    area,
    region,
    country,
    currently,
    sunshine,
    rain,
    snow
  );

  //6 ID for every article
  const today = document.querySelector("#today");
  const tomorrow = document.querySelector("#tomorrow");
  const afterTomorrow = document.querySelector("#afterTomorrow");

  //7 3 DAY FORECASTS
  const averageTemp = document.createElement("p");
  const maxTemp = document.createElement("p");
  const minTemp = document.createElement("p");
  today.textContent = "";
  averageTemp.innerHTML = `<strong>Average Temperature: </strong>${response.weather[0].avgtempF}°F`;
  maxTemp.innerHTML = `<strong>Max Temperature: </strong>${response.weather[0].maxtempF}°F`;
  minTemp.innerHTML = `<strong>Min Temperature: </strong>${response.weather[0].mintempF}°F`;
  today.append(averageTemp, maxTemp, minTemp);

  tomorrow.textContent = "";
  const averageTemp1 = document.createElement("p");
  const maxTemp1 = document.createElement("p");
  const minTemp1 = document.createElement("p");
  averageTemp1.innerHTML = `<strong>Average Temperature: </strong>${response.weather[1].avgtempF}°F`;
  maxTemp1.innerHTML = `<strong>Max Temperature: </strong>${response.weather[1].maxtempF}°F`;
  minTemp1.innerHTML = `<strong>Min Temperature: </strong>${response.weather[1].mintempF}°F`;
  tomorrow.append(averageTemp1, maxTemp1, minTemp1);

  afterTomorrow.textContent = "";
  const averageTemp2 = document.createElement("p");
  const maxTemp2 = document.createElement("p");
  const minTemp2 = document.createElement("p");
  averageTemp2.innerHTML = `<strong>Average Temperature: </strong>${response.weather[2].avgtempF}°F`;
  maxTemp2.innerHTML = `<strong>Max Temperature: </strong>${response.weather[2].maxtempF}°F`;
  minTemp2.innerHTML = `<strong>Min Temperature: </strong>${response.weather[2].mintempF}°F`;
  afterTomorrow.append(averageTemp2, maxTemp2, minTemp2);

  //8 HEADERS FOR 3 DAY
  const todayh3 = document.createElement("h3");
  todayh3.textContent = "Today";
  today.prepend(todayh3);

  const tomorrowh3 = document.createElement("h3");
  tomorrowh3.textContent = "Tomorrow";
  tomorrow.prepend(tomorrowh3);

  const afterTomorrowh3 = document.createElement("h3");
  afterTomorrowh3.textContent = "Day After Tomorrow";
  afterTomorrow.prepend(afterTomorrowh3);
}

//10 Previous Search history with a link
function getPreviousHistory(response, searchInput) {
  const ul = document.querySelector("ul");
  document.querySelector("section p").style.display = "none";
  const historyli = document.createElement("li");
  const alink = document.createElement("a");

  alink.textContent = `${response.nearest_area[0].areaName[0].value}`;
  alink.setAttribute("href", "#");
  historyli.textContent = ` - ${response.current_condition[0].FeelsLikeF}°F`;
  if (!arr.includes(alink.textContent)) {
    arr.push(alink.textContent);
    ul.append(historyli);
    historyli.prepend(alink);
  }
  alink.addEventListener("click", (event) => {
    event.preventDefault();
    getWeatherData(response, searchInput); // keeps the data
  });
}

const convertForm = document.querySelector("#conform");
convertForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const tempConvert = event.target.temp.value;
  convertTemp(tempConvert);
});
function convertTemp(tempConvert) {
    
  
}
