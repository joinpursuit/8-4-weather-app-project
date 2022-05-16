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
      // console.log(weather);
      displayWeather(weather, input);
      displayThreeDays(weather);

      // previous code for ul & li
      //document.querySelector("aside section ul li")

      if (!document.querySelector("aside section select option")) {
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
  if (
    input.toLowerCase() ===
    weather.nearest_area[0].areaName[0].value.toLowerCase()
  ) {
    area.innerHTML =
      "<strong>Area:</strong> " + weather.nearest_area[0].areaName[0].value;
  } else {
    area.innerHTML =
      "<strong>Nearest Area:</strong> " +
      weather.nearest_area[0].areaName[0].value;
  }

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
  today.innerHTML = `<strong>Today</strong> <br /><br /> <strong>Average Temperature:</strong> ${weather.weather[0].avgtempF}\u00B0F <br /> <br /><strong>Max Temperature:</strong> ${weather.weather[0].maxtempF}\u00B0F <br /><br /> <strong>Min Temperature:</strong> ${weather.weather[0].mintempF}\u00B0F`;

  today.style.border = "2px solid white";
  today.style.backgroundColor = "rgb(146, 188, 244)";
  today.style.borderRadius = "25px";

  tomorrow.innerHTML = `<strong>Tomorrow</strong> <br /><br /> <strong>Average Temperature:</strong> ${weather.weather[1].avgtempF}\u00B0F <br /> <br /><strong>Max Temperature: </strong> ${weather.weather[1].maxtempF}\u00B0F <br /><br /> <strong>Min Temperature: </strong> ${weather.weather[1].mintempF}\u00B0F`;

  tomorrow.style.border = "2px solid white";
  tomorrow.style.backgroundColor = "rgb(146, 188, 244)";
  tomorrow.style.borderRadius = "25px";

  dayAfter.innerHTML = `<strong>Day After Tomorrow</strong> <br /><br /> <strong>Average Temperature:</strong> ${weather.weather[2].avgtempF}\u00B0F <br /><br /> <strong>Max Temperature: </strong> ${weather.weather[2].maxtempF}\u00B0F <br /><br /> <strong>Min Temperature: </strong> ${weather.weather[2].mintempF}\u00B0F`;

  dayAfter.style.border = "2px solid white";
  dayAfter.style.backgroundColor = "rgb(146, 188, 244)";
  dayAfter.style.borderRadius = "25px";
}

// const previousList = document.querySelector(".previous ul");
// const previousP = document.querySelector(".previous p");

const select = document.querySelector('#list');
const defaultOption = document.querySelector('option');

function addListItem(input, weather) {

  const option = document.createElement('option');
  option.value = input;
  option.text = `${input} - ${weather.current_condition[0].FeelsLikeF}\u00B0F`;

  select.append(option);
  // defaultOption.replaceWith(defaultOption, option);

//previous code for ul & li
  // const searchLink = document.createElement("a");
  // const listItem = document.createElement("li");

  // searchLink.innerHTML = `<a href='#'>${input}</a> - ${weather.current_condition[0].FeelsLikeF}\u00B0F`;

  // listItem.append(searchLink);
  // previousP.remove();
  // previousList.prepend(listItem);

  // searchLink.addEventListener("click", (event) => {
  //   getWeather(event.target.textContent);
  // });
}

select.addEventListener('change', (event) => {
  getWeather(event.target.value);
})

function removeDulplicateLi(input) {

  const searchList = document.querySelectorAll("aside section select option");
  let hasInput = false;

  searchList.forEach((el) => {
    if (el.textContent.includes(input)) {
      hasInput = true;
    }
  });

  if (!hasInput) {
    addListItem(input, weather);
  }
  
  //previous code for ul & li
  // const searchList = document.querySelectorAll("aside section ul li a");
  // let hasInput = false;

  // searchList.forEach((el) => {
  //   if (el.textContent.includes(input)) {
  //     hasInput = true;
  //   }
  // });

  // if (!hasInput) {
  //   addListItem(input, weather);
  // }
}

