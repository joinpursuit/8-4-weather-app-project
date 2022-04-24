const BASE_URL = "https://www.wttr.in";

//here we want to grab the input (form) and place in a variable
let inputForm = document.querySelector("form");
inputForm.addEventListener("submit", (event) => {
  event.preventDefault();
  //input is the country/place typed in to input field
  const input = inputForm.querySelector('input[id="locationID"]').value;

  console.log(input);
  fetch(`${BASE_URL}/${input}?format=j1`)
    .then((response) => response.json())
    .then((json) => {
      console.log(json);
      createLocationInformation(json);
    })
    .catch((error) => {
      console.log(error);
    });
  inputForm.reset();
});

//here we want to fetch the url and receive the json object with the information and place the information in the html to be printed to screen
const pickAlocationId = (input) => {
  console.log(input);
  fetch(`${BASE_URL}/${input}?format=j1`)
    .then((response) => response.json())
    .then((json) => {
      console.log(json);
      createLocationInformation(json);
    });
};

//here we want to
const createLocationInformation = (json) => {
  //name of location
  const h4 = document.getElementById("input-location");
  // //Area
  const p1 = document.getElementById("area");
  // //Region
  const p2 = document.getElementById("region");
  // //Country
  const p3 = document.getElementById("country");
  // //currently feels like
  const p4 = document.getElementById("feels-like");
  //ptag
  const p5 = document.getElementById("current-weather-p");

  const widgetSection = document.getElementById("widget");

  //replace innerContent of tags with information from json
  h4.textContent = `${json.nearest_area[0].areaName[0].value}`;
  p1.textContent = `Area: ${json.nearest_area[0].areaName[0].value}`;
  p2.textContent = `Region: ${json.nearest_area[0].region[0].value}`;
  p3.textContent = `Country: ${json.nearest_area[0].country[0].value}`;

  p4.textContent = `Currently: Feels like ${json.current_condition[0].FeelsLikeF} °F`;
  //this toggles the ptag for choose location
  p5.classList.add("inactive");
  p5.classList.remove("active");

  //toggles the widget
  widgetSection.classList.add("active");
  widgetSection.classList.remove("inactive");

  previousSearches(json);

  //return article;
  showInfoNextThreeDays(json);
};

const showInfoNextThreeDays = (json) => {
  const weatherForThreeDays = document.getElementById("future-weather");
  weatherForThreeDays.classList.add("active");
  //text = Today
  const todayTag = document.getElementById("today-title");

  //text = Average Temperature
  const avg = document.getElementById("today-avg");

  //Text = Max temp
  const max = document.getElementById("today-max");

  //text - min temp
  const min = document.getElementById("today-min");

  const article2 = document.getElementById("tomorrow");

  //text = Tomorrow
  const tomorrowTag = document.getElementById("tomorrow-title");

  //text = Average Temperature
  const average = document.getElementById("tomorrow-avg");

  //Text = Max temp
  const maximum = document.getElementById("tomorrow-max");

  //text - min temp
  const minimum = document.getElementById("tomorrow-min");

  const article3 = document.getElementById("day-after");

  //text = day after
  const dayAfterTag = document.getElementById("day-after-title");

  //text = Average Temperature
  const avgTemperature = document.getElementById("day-after-avg");

  //Text = Max temp
  const maxTemperature = document.getElementById("day-after-max");

  //text - min temp
  const minTemperature = document.getElementById("day-after-min");

  //text content -  Article 1 - data taken from Array 1

  //text = Average Temperature
  avg.textContent = `Average Temperature: ${json.weather[0].avgtempF}°F`;

  //Text = Max temp
  max.textContent = `Max Temperature ${json.weather[0].maxtempF}°F`;

  //text - min temp;
  min.textContent = `Min Temperature: ${json.weather[0].mintempF}°F`;

  //text content -  Article 2

  //text = Average Temperature
  average.textContent = `Average Temperature: ${json.weather[1].avgtempF}°F`;

  //Text = Max temp
  maximum.textContent = `Max Temperature: ${json.weather[1].maxtempF}°F`;

  //text - min temp
  minimum.textContent = `Min Temperature: ${json.weather[1].mintempF}°F`;

  //text content -  Article 3
  //text = day after Array 3
  // dayAfterTag.textContent = `Day After Tomorrow`;

  //text = Average Temperature
  avgTemperature.textContent = `Average Temperature:${json.weather[2].avgtempF}°F`;

  //Text = Max temp
  maxTemperature.textContent = `Max Temperature:  ${json.weather[2].maxtempF}°F`;

  //text - min temp
  minTemperature.textContent = `Min Temperature:  ${json.weather[2].mintempF}°F`;

  //console.log(minTemperature);
};

//stores previous searches in the h4 tag
const previousSearches = (json) => {
  const ul = document.querySelector("ul");
  const li = document.createElement("li");
  const atag = document.createElement("a");

  atag.setAttribute("href", "#main");
  atag.setAttribute("alt", main);

  li.textContent = `${json.nearest_area[0].country[0].value}: ${json.current_condition[0].FeelsLikeF} °F`;

  atag.append(li);
  ul.append(atag);
  return li;
};

let convertTempForm = document.getElementById("convert-temp");
convertTempForm.addEventListener("submit", (event) => {
  event.preventDefault();
  let convertTempInput = convertTempForm.querySelector(
    'input[id="temp-to-convert"]'
  ).value;

  let toCelsius = document.querySelector('input[id="to-c"]:checked');

  let toFahrenheit = document.querySelector('input[id="to-f"]:checked');

  let radios = document.getElementsByName("convert-temp");

  const converttag = document.getElementById("convert-h4");

  for (let i = 0; i < radios.length; i++) {
    if (radios[i].checked) {
      let celsiusTemp = (Number(convertTempInput) - 32) * (5 / 9);

      converttag.textContent = `${celsiusTemp.toFixed(2)}°C`;
    } else {
      let farenheitTemp = (Number(convertTempInput) * 9) / (5 + 32);

      converttag.textContent = `${farenheitTemp.toFixed(2)}°F`;
    }
  }

  convertTempForm.append(converttag);
});

const toggle = () => {
  let toggleInfo = document.getElementById("sidebar-ptag");
  let ultag = document.querySelector("ul");
  if (toggleInfo.style.display === "none" && ultag.children === "undefined") {
    toggleInfo.style.display = "block";
  } else {
    toggleInfo.style.display = "none";
  }
};
