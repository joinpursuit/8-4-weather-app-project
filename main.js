let BASE_URL = "http://wttr.in/";

const form = document.querySelector("form");
const input = document.querySelector("#location");

const image = document.querySelector("img");
const found = document.querySelector("#found");
const message = document.querySelector("#message");
const display = document.querySelector("#display");
const addy = document.querySelector("#addy");
const area = document.querySelector("#area");
const region = document.querySelector("#region");
const country = document.querySelector("#country");
const currently = document.querySelector("#currently");
const sunshine = document.querySelector("#sunshine");
const rain = document.querySelector("#rain");
const snow = document.querySelector("#snow");


const right = document.querySelector("#right");
const list = document.querySelector("#list");
const previous = document.querySelector("#previous");

const page1 = document.querySelector("#page1");
const page2 = document.querySelector("#page2");
const page3 = document.querySelector("#page3");
const mean1 = document.querySelector("#mean1");
const minor1 = document.querySelector("#minor1");
const major1 = document.querySelector("#major1");
const mean2 = document.querySelector("#mean2");
const minor2 = document.querySelector("#minor2");
const major2 = document.querySelector("#major2");
const mean3 = document.querySelector("#mean3");
const minor3 = document.querySelector("#minor3");
const major3 = document.querySelector("#major3");

const left = document.querySelector("#left");
const convert = document.querySelector("#convert");
const tempToConvert = document.querySelector("#temp-to-convert");
const toC = document.querySelector("#to-c");
const toF = document.querySelector("#to-f");
const converted = document.querySelector("#converted");

form.addEventListener("submit", (event) => {
  event.preventDefault();
  let userInput = input.value;
  let city = userInput;
  fetch(`https://wttr.in/${userInput}?format=j1`)
    .then((response) => response.json())
    .then((response) => {
      let weatherFile = response;
  
      message.classList.add("hidden");
      display.classList.remove("hidden");
      addy.innerHTML = city;
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

  
      page1.classList.remove("hidden");
      page2.classList.remove("hidden");
      page3.classList.remove("hidden");

      mean1.innerHTML = `<strong>Average Temperature: </strong> ${weatherFile.weather[0].avgtempF}°F`;
      minor1.innerHTML = `<strong>Max Temperature: </strong> ${weatherFile.weather[0].maxtempF}°F`;
      major1.innerHTML = `<strong>Min Temperature: </strong> ${weatherFile.weather[0].mintempF}°F`;

      mean2.innerHTML = `<strong>Average Temperature: </strong> ${weatherFile.weather[1].avgtempF}°F`;
      minor2.innerHTML = `<strong>Max Temperature: </strong> ${weatherFile.weather[1].maxtempF}°F`;
      major2.innerHTML = `<strong>Min Temperature: </strong> ${weatherFile.weather[1].mintempF}°F`;

      mean3.innerHTML = `<strong>Average Temperature: </strong> ${weatherFile.weather[2].avgtempF}°F`;
      minor3.innerHTML = `<strong>Max Temperature: </strong> ${weatherFile.weather[2].maxtempF}°F`;
      major3.innerHTML = `<strong>Min Temperature: </strong> ${weatherFile.weather[2].mintempF}°F`;


      previous.classList.add("hidden");
      const listItem = document.createElement("li");
      listItem.innerHTML = `<a href="#${userInput}">${city}</a> - ${weatherFile.current_condition[0].FeelsLikeF}°F`;
      list.append(listItem);

      if (weatherFile.weather[0]["hourly"][0]["chanceofsunshine"] > 50) {
        
        image.classList.remove("hidden");
        image.setAttribute("src", "./assets/icons8-summer.gif");
        image.setAttribute("alt", "sun");
        display.prepend(image);
      } else if (weatherFile.weather[0]["hourly"][0]["chanceofrain"] > 50) {
       
        image.classList.remove("hidden");
        image.setAttribute("src", "./assets/icons8-torrential-rain.gif");
        image.setAttribute("alt", "rain");
        display.prepend(image);
      } else if (weatherFile.weather[0]["hourly"][0]["chanceofsnow"] > 50) {
        
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


convert.addEventListener("submit", (e) => {
  e.preventDefault();

  let found = 0;
  if (toC.checked) {
    found = (tempToConvert.value - 32) * (5 / 9);
  }
  if (toF.checked) {
    found = (tempToConvert.value * 9) / 5 + 32;
  }

  converted.innerHTML = found.toFixed(2);
});
