const form = document.querySelector(".request");

const displayArea = document.querySelector(".current-weather");
const firstP = document.querySelector(".current-weather p");

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const input = event.target.input.value;
  //   console.log(input);
  getWeather(input);
  form.reset();
});

let weather;

function getWeather(input) {
  fetch(`https://wttr.in/${input}?format=j1`)
    .then((res) => res.json())
    .then((data) => {
      weather = data;
      //   console.log(weather);
      displayWeather(weather, input);
      displayThreeDays(weather);

      if (!document.querySelector("aside section ul li")) {
        addListItem(input, weather);
      } else {
        removeDulplicateLi(input);
      }
    });
}

const area = document.createElement("p");
const region = document.createElement("p");
const country = document.createElement("p");
const currently = document.createElement("p");

function displayWeather(weather, input) {
  // if(input !== weather.nearest_area[0].areaName[0].value){
  //     console.log(input, weather.nearest_area[0].areaName[0].value)
  //     area.innerHTML = '<strong>Nearest Area:</strong> ' + weather.nearest_area[0].areaName[0].value;
  // } else if(input === weather.nearest_area[0].areaName[0].value){
  //     area.innerHTML = '<strong>Area:</strong> ' + weather.nearest_area[0].areaName[0].value;
  // }

  area.innerHTML =
    "<strong>Nearest Area:</strong> " +
    weather.nearest_area[0].areaName[0].value;
  region.innerHTML =
    "<strong>Region: </strong>" + weather.nearest_area[0].region[0].value;
  country.innerHTML =
    "<strong>Country: </strong>" + weather.nearest_area[0].country[0].value;
  currently.innerHTML =
    "<strong>Currently:</strong> Feels like " +
    weather.current_condition[0].FeelsLikeF +
    "\u00B0F";

  if (!document.querySelector("main article h2")) {
    const h2 = document.createElement("h2");
    h2.textContent = input;
    firstP.replaceWith(h2);
  } else {
    document.querySelector("main article h2").textContent = input;
  }
}

displayArea.append(area, region, country, currently);

const today = document.createElement("article");
const tomorrow = document.createElement("article");
const dayAfter = document.createElement("article");
const threeDay = document.querySelector("#three-day");

threeDay.append(today, tomorrow, dayAfter);

function displayThreeDays(weather) {
  today.innerHTML = `<strong>Today</strong> <br /> <strong>Average Temperature:</strong> ${weather.weather[0].avgtempF}\u00B0F <br /> <strong>Max Temperature:</strong> ${weather.weather[0].maxtempF}\u00B0F <br /> <strong>Min Temperature:</strong> ${weather.weather[0].mintempF}\u00B0F`;

  tomorrow.innerHTML = `<strong>Tomorrow</strong> <br /> <strong>Average Temperature:</strong> ${weather.weather[1].avgtempF}\u00B0F <br /> <strong>Max Temperature: </strong> ${weather.weather[1].maxtempF}\u00B0F <br /> <strong>Min Temperature: </strong> ${weather.weather[1].mintempF}\u00B0F`;

  dayAfter.innerHTML = `<strong>Day After Tomorrow</strong> <br /> <strong>Average Temperature:</strong> ${weather.weather[2].avgtempF}\u00B0F <br /> <strong>Max Temperature: </strong> ${weather.weather[2].maxtempF}\u00B0F <br /> <strong>Min Temperature: </strong> ${weather.weather[2].mintempF}\u00B0F`;
}

const previousList = document.querySelector(".previous ul");
const previousP = document.querySelector(".previous p");

function addListItem(input, weather) {
  const searchLink = document.createElement("a");
  const listItem = document.createElement("li");

  searchLink.innerHTML = `<a href='#'>${input}</a> - ${weather.current_condition[0].FeelsLikeF}\u00B0F`;

  listItem.append(searchLink);
  previousP.textContent = "";
  previousList.prepend(listItem);

  searchLink.addEventListener("click", (event) => {
    event.preventDefault();
    const inputTwo = event.target.textContent;
    getWeather(inputTwo);
  });
}

function removeDulplicateLi(input) {
  const searchList = document.querySelectorAll("aside section ul li a");
  let hasInput = false;

  searchList.forEach((el) => {
    if (el.textContent.includes(input)) {
      hasInput = true;
    }
  });

  if (!hasInput) {
    addListItem(input, weather);
  }
}
