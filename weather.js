const rootUrl = "http://wttr.in/";
const frontUrl = "?format=j1";
const newArr = [];

const form = document.querySelector("form");
form.addEventListener("submit", (event) => {
  event.preventDefault();
  const searchInput = event.target.location.value;
 
  if (searchInput === "") {
    alert("Input Location");
  } else {
    showApiData(searchInput);
  }
});


function showApiData(searchInput) {
  let url = rootUrl + searchInput + frontUrl;
  fetch(url)
    .then((response) => response.json())
    .then((response) => {
      showWeatherData(response, searchInput);
      showPreviousHistory(response, searchInput);
    });
  
}


function showWeatherData(response, searchInput) {
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
  const areaName = response.nearest_area[0].areaName[0].value;
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


  const today = document.querySelector("#today");
  const tomorrow = document.querySelector("#tomorrow");
  const dayaftertomorrow = document.querySelector("#dayaftertomorrow");

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

  dayaftertomorrow.textContent = "";
  const averageTemp2 = document.createElement("p");
  const maxTemp2 = document.createElement("p");
  const minTemp2 = document.createElement("p");
  averageTemp2.innerHTML = `<strong>Average Temperature: </strong>${response.weather[2].avgtempF}°F`;
  maxTemp2.innerHTML = `<strong>Max Temperature: </strong>${response.weather[2].maxtempF}°F`;
  minTemp2.innerHTML = `<strong>Min Temperature: </strong>${response.weather[2].mintempF}°F`;
  dayaftertomorrow.append(averageTemp2, maxTemp2, minTemp2);

  const todayh3 = document.createElement("h3");
  todayh3.textContent = "today";
  today.prepend(todayh3);

  const tomorrowh3 = document.createElement("h3");
  tomorrowh3.textContent = "tomorrow";
  tomorrow.prepend(tomorrowh3);

  const dayaftertomorrowh3 = document.createElement("h3");
  dayaftertomorrowh3.textContent = "dayaftertomorrow";
  dayaftertomorrow.prepend(dayaftertomorrowh3);
}

function showPreviousHistory(response, searchInput) {
  const ul = document.querySelector("ul");
  document.querySelector("section p").style.display = "none";
  const historyli = document.createElement("li");
  const alink = document.createElement("a");

  alink.textContent = `${response.nearest_area[0].areaName[0].value}`;
  alink.setAttribute("href", "#");
  historyli.textContent = ` - ${response.current_condition[0].FeelsLikeF}°F`;
  if (!newArr.includes(alink.textContent)) {
    newArr.push(alink.textContent);
    ul.append(historyli);
    historyli.prepend(alink);
  }
  alink.addEventListener("click", (event) => {
    event.preventDefault();
    showWeatherData(response, searchInput); 
  });
}

const convertForm = document.querySelector("#convert");
convertForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const tempConvert = event.target.temp.value;
  convertTemp(tempConvert, event);
});
function convertTemp(tempConvert, event) {
  const result = document.querySelector("#converted");
  if (tempConvert === "") {
    alert("Please add Conversion");
  }
  if (event.target[2].checked) {
    result.textContent = (tempConvert * (9 / 5) + 32).toFixed(2);
  } else {
    result.textContent = ((tempConvert - 32) * (5 / 9)).toFixed(2);
  }
}