const BASE_URL = "https://wttr.in";

// Query selecting the form and its input
const form = document.querySelector("form");
const input = document.querySelector("#Adnan");

// Query selecting the articles from the main
const result = document.querySelector("#result");
const placeholder = document.querySelector("#placeholder");
const display = document.querySelector("#display");
const Accra = document.querySelector("#Accra");
const area = document.querySelector("#area");
const region = document.querySelector("#region");
const country = document.querySelector("#country");
const currently = document.querySelector("#currently");

// Query selecting the first aside with 3 articles
const today = document.querySelector("#today");
const tomorrow = document.querySelector("#tomorrow");
const dayAfter = document.querySelector("#dayAfter");

const sunshine = document.querySelector("#sunshine");
const rain = document.querySelector("#rain");
const snow = document.querySelector("#snow");

const avgtemp1 = document.querySelector("#avgtemp1");
const maxtemp1 = document.querySelector("#maxtemp1");
const mintemp1 = document.querySelector("#mintemp1");
const avgtemp2 = document.querySelector("#avgtemp2");
const maxtemp2 = document.querySelector("#maxtemp2");
const mintemp2 = document.querySelector("#mintemp2");
const avgtemp3 = document.querySelector("#avgtemp3");
const maxtemp3 = document.querySelector("#maxtemp3");
const mintemp3 = document.querySelector("#mintemp3");

// Query selecting the aside that shows the previous searches
const right = document.querySelector("#right");
const ullist = document.querySelector("#ullist");
const olds = document.querySelector("#olds");

// let weatherData;
form.addEventListener("submit", (event) => {
  event.preventDefault();
  let userEntry = input.value;
  let city = userEntry[0].toUpperCase() + userEntry.slice(1);
  fetch(`https://wttr.in/${userEntry}?format=j1`)
    .then((response) => response.json())
    .then((response) => {
      let weatherData = response;
      // console.log(weatherData);

      placeholder.classList.add("hidden");
      display.classList.remove("hidden");
      Accra.innerHTML = city;
      // area.innerHTML = `<strong>Area: </strong>${weatherData.nearest_area[0].areaName[0].value}`;
      const cityName = weatherData.nearest_area[0].areaName[0].value;
      if (cityName.toLowerCase() === city.toLowerCase()) {
        area.innerHTML = `<strong>Area: </strong>${weatherData.nearest_area[0].areaName[0].value}`;
      } else {
        area.innerHTML = `<strong>Nearest Area: </strong>${weatherData.nearest_area[0].areaName[0].value}`;
      };
      region.innerHTML = `<strong>Region: </strong>${weatherData.nearest_area[0].region[0].value}`;
      country.innerHTML = `<strong>Country: </strong>${weatherData.nearest_area[0].country[0].value}`;
      currently.innerHTML = `<strong>Currently: </strong>Feels Like ${weatherData.current_condition[0].FeelsLikeF}°F`;
      sunshine.innerHTML = `<strong>Chance of Sunshine: </strong> ${weatherData.weather[0]["hourly"][0]["chanceofsunshine"]}`;
      rain.innerHTML = `<strong>Chance of Rain: </strong> ${weatherData.weather[0]["hourly"][0]["chanceofrain"]}`;
      snow.innerHTML = `<strong>Chance of Snow: </strong> ${weatherData.weather[0]["hourly"][0]["chanceofsnow"]}`;

      // aside with 3 articles
      today.classList.remove("hidden");
      tomorrow.classList.remove("hidden");
      dayAfter.classList.remove("hidden");

      avgtemp1.innerHTML = `<strong>Average Temperature: </strong>${weatherData.weather[0].avgtempF}°F`;
      maxtemp1.innerHTML = `<strong>Max Temperature: </strong>${weatherData.weather[0].maxtempF}°F`;
      mintemp1.innerHTML = `<strong>Min Temperature: </strong>${weatherData.weather[0].mintempF}°F`;

      avgtemp2.innerHTML = `<strong>Average Temperature: </strong>${weatherData.weather[1].avgtempF}°F`;
      maxtemp2.innerHTML = `<strong>Max Temperature: </strong>${weatherData.weather[1].maxtempF}°F`;
      mintemp2.innerHTML = `<strong>Min Temperature: </strong>${weatherData.weather[1].mintempF}°F`;

      avgtemp3.innerHTML = `<strong>Average Temperature: </strong>${weatherData.weather[2].avgtempF}°F`;
      maxtemp3.innerHTML = `<strong>Max Temperature: </strong>${weatherData.weather[2].maxtempF}°F`;
      mintemp3.innerHTML = `<strong>Min Temperature: </strong>${weatherData.weather[2].mintempF}°F`;

      // show previous searches aside
      olds.classList.add("hidden");
      const list = document.createElement("li");
      list.innerHTML = `<a href="#${city}">${city}</a> - ${weatherData.current_condition[0].FeelsLikeF}°F`;
      ullist.append(list);

      // if certain weather, display certain condition
      if (weatherData.weather[0]["hourly"][0]["chanceofsunshine"] > 50) {
        img = document.createElement("img");
        img.setAttribute("src", "./assets/icons8-summer.gif");
        img.setAttribute("alt", "sun");
        display.prepend(img);
      }
      if (weatherData.weather[0]["hourly"][0]["chanceofrain"] > 50) {
        img = document.createElement("img");
        img.setAttribute("src", "./assets/icons8-torrential-rain.gif");
        img.setAttribute("alt", "rain");
        display.prepend(img);
      }
      if (weatherData.weather[0]["hourly"][0]["chanceofsnow"] > 50) {
        img = document.createElement("img");
        img.setAttribute("src", "./assets/icons8-light-snow.gif");
        img.setAttribute("alt", "snow");
        display.prepend(img);
      }
    })
    .catch((error) => {
      console.log(error);
    });
  form.reset();
});
// const main = document.createElement("main");
// const article1 = document.createElement("article");
// const article2 = document.createElement("article");
// const article3 = document.createElement("article");
// main.append(article1, article2, article3);
// const aside = document.createElement("aside");
