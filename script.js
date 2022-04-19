let BASE_URL = "http://wttr.in/";

const form = document.querySelector("form");
const input = document.querySelector("#location");
//main article variables
const image = document.querySelector("img");
const result = document.querySelector("#result");
const message = document.querySelector("#message");
const display = document.querySelector("#display");
const cityMain = document.querySelector("#cityMain");
const area = document.querySelector("#area");
const region = document.querySelector("#region");
const country = document.querySelector("#country");
const currently = document.querySelector("#currently");
const sunshine = document.querySelector("#sunshine");
const rain = document.querySelector("#rain");
const snow = document.querySelector("#snow");
//Aside bottom article variables
const article1 = document.querySelector("#article1");
const article2 = document.querySelector("#article2");
const article3 = document.querySelector("#article3");
const average1 = document.querySelector("#average1");
const max1 = document.querySelector("#max1");
const min1 = document.querySelector("#min1");
const average2 = document.querySelector("#average2");
const max2 = document.querySelector("#max2");
const min2 = document.querySelector("#min2");
const average3 = document.querySelector("#average3");
const max3 = document.querySelector("#max3");
const min3 = document.querySelector("#min3");
//Aside right variables
const right = document.querySelector("#right");
const list = document.querySelector("#list");
const previous = document.querySelector("#previous");

//Aside left variables
const left = document.querySelector("#left");
const convert = document.querySelector("#convert");
const tempToConvert = document.querySelector("#temp-to-convert");
const toC = document.querySelector("#to-c");
const toF = document.querySelector("#to-f");
const converted = document.querySelector("#converted");

form.addEventListener("submit", (event) => {
  event.preventDefault();
  let userInput = input.value;
  let city = userInput[0].toUpperCase() + userInput.slice(1);
  fetch(`https://wttr.in/${userInput}?format=j1`)
    .then((response) => response.json())
    .then((response) => {
      let weatherFile = response;
      // console.log(weatherFile)
      message.classList.add("hidden");
      display.classList.remove("hidden");
      cityMain.innerHTML = city;
      if (city != `${weatherFile.nearest_area[0].areaName[0].value}`) {
        area.innerHTML = `<strong>Nearest Area: </strong>${weatherFile.nearest_area[0].areaName[0].value}`;
      } else {
        area.innerHTML = `<strong>Area: </strong>${weatherFile.nearest_area[0].areaName[0].value}`;
      }
      region.innerHTML = `<strong>Region: </strong>${weatherFile.nearest_area[0].region[0].value}`;
      country.innerHTML = `<strong>Country: </strong>${weatherFile.nearest_area[0].country[0].value}`;
      currently.innerHTML = `<strong>Currently: </strong>Feels Like ${weatherFile.current_condition[0].FeelsLikeF}°F`;
      sunshine.innerHTML = `<strong>Chance of Sunshine: </strong> ${weatherFile.weather[0]["hourly"][0]["chanceofsunshine"]}`;
      rain.innerHTML = `<strong>Chance of Rain: </strong> ${weatherFile.weather[0]["hourly"][0]["chanceofrain"]}`;
      snow.innerHTML = `<strong>Chance of Snow: </strong> ${weatherFile.weather[0]["hourly"][0]["chanceofsnow"]}`;

      //________________________________________________
      article1.classList.remove("hidden");
      article2.classList.remove("hidden");
      article3.classList.remove("hidden");

      average1.innerHTML = `<strong>Average Temperature: </strong> ${weatherFile.weather[0].avgtempF}°F`;
      max1.innerHTML = `<strong>Max Temperature: </strong> ${weatherFile.weather[0].maxtempF}°F`;
      min1.innerHTML = `<strong>Min Temperature: </strong> ${weatherFile.weather[0].mintempF}°F`;

      average2.innerHTML = `<strong>Average Temperature: </strong> ${weatherFile.weather[1].avgtempF}°F`;
      max2.innerHTML = `<strong>Max Temperature: </strong> ${weatherFile.weather[1].maxtempF}°F`;
      min2.innerHTML = `<strong>Min Temperature: </strong> ${weatherFile.weather[1].mintempF}°F`;

      average3.innerHTML = `<strong>Average Temperature: </strong> ${weatherFile.weather[2].avgtempF}°F`;
      max3.innerHTML = `<strong>Max Temperature: </strong> ${weatherFile.weather[2].maxtempF}°F`;
      min3.innerHTML = `<strong>Min Temperature: </strong> ${weatherFile.weather[2].mintempF}°F`;

      //________________________________________________
      previous.classList.add("hidden");
      const listItem = document.createElement("li");
      listItem.innerHTML = `<a href="#${userInput}">${city}</a> - ${weatherFile.current_condition[0].FeelsLikeF}°F`;
      list.append(listItem);

      //Weather icon, if certain weather, display certain icon.
      if (weatherFile.weather[0]["hourly"][0]["chanceofsunshine"] > 50) {
        // image = document.createElement("img");
        image.classList.remove("hidden");
        image.setAttribute("src", "./assets/icons8-summer.gif");
        image.setAttribute("alt", "sun");
        display.prepend(image);
      } else if (weatherFile.weather[0]["hourly"][0]["chanceofrain"] > 50) {
        // image = document.createElement("img");
        image.classList.remove("hidden");
        image.setAttribute("src", "./assets/icons8-torrential-rain.gif");
        image.setAttribute("alt", "rain");
        display.prepend(image);
      } else if (weatherFile.weather[0]["hourly"][0]["chanceofsnow"] > 50) {
        // image = document.createElement("img");
        image.classList.remove("hidden");
        image.setAttribute("src", "./assets/icons8-light-snow.gif");
        image.setAttribute("alt", "snow");
        display.prepend(image);
      } else {
        image.classList.add("hidden");
      }
    })
    .catch((error) => {
      console.log(error);
    });
  form.reset();
});

//temperature conversion
convert.addEventListener("submit", (e) => {
  e.preventDefault();

  let result = 0;
  if (toC.checked) {
    result = (tempToConvert.value - 32) * (5 / 9);
  }
  if (toF.checked) {
    result = (tempToConvert.value * 9) / 5 + 32;
  }

  converted.innerHTML = result.toFixed(2);
});
