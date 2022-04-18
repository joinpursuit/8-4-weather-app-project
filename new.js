const BASE_URL = "https://wttr.in";

// Query selecting the form and its input
const form = document.querySelector("form");
const input = document.querySelector("#Adnan");

// Query selecting the articles from the main
const main = document.querySelector("main");
const placeholder = document.querySelector("#placeholder");

const below = document.querySelector("#below");

// Query selecting the aside that shows the previous searches
const right = document.querySelector("#right");
const ullist = document.querySelector("#ullist");
const olds = document.querySelector("#olds");


// let weatherData;
form.addEventListener("submit", (event) => {
  event.preventDefault();
  let userEntry = input.value;
  let city = userEntry[0].toUpperCase() + userEntry.slice(1);
  fetchData(userEntry, city);
  form.reset();
});

function fetchData(userEntry, city) {
  fetch(`https://wttr.in/${userEntry}?format=j1`)
    .then((response) => response.json())
    .then((response) => {
      let weatherData = response;

      main.prepend(
        mainArticle(
          city,
          weatherData,
          userEntry,
          placeholder,
          focastDays(below, weatherData)
        )
      );

      // show previous searches aside
      olds.classList.add("hidden");
      const list = document.createElement("li");
      list.innerHTML = `<a href="#${city}">${city}</a> - ${weatherData.current_condition[0].FeelsLikeF}°F`;
      ullist.append(list);
    })
    .catch((error) => {
      console.log(error);
    });
}

function mainArticle(city, weatherData, userEntry, placeholder) {
  //  const section = document.createElement("section");
  placeholder.classList.add("hidden");
  const result = document.querySelector("main article");
  result.setAttribute("id", `${city}`);
  const image = document.createElement("img");
  const location = document.createElement("h2");
  location.innerHTML = city;
  const area = document.createElement("p");
  //  area.innerHTML = `<strong>Area: </strong>${weatherData.nearest_area[0].areaName[0].value}`;
  const cityName = weatherData.nearest_area[0].areaName[0].value;
  if (cityName.toLowerCase() === city.toLowerCase()) {
    area.innerHTML = `<strong>Area: </strong>${weatherData.nearest_area[0].areaName[0].value}`;
  } else {
    area.innerHTML = `<strong>Nearest Area: </strong>${weatherData.nearest_area[0].areaName[0].value}`;
  }
  const region = document.createElement("p");
  region.innerHTML = `<strong>Region: </strong>${weatherData.nearest_area[0].region[0].value}`;
  const country = document.createElement("p");
  country.innerHTML = `<strong>Country: </strong>${weatherData.nearest_area[0].country[0].value}`;
  const currently = document.createElement("p");
  currently.innerHTML = `<strong>Currently: </strong>Feels Like ${weatherData.current_condition[0].FeelsLikeF}°F`;
  const sunshine = document.createElement("p");
  sunshine.innerHTML = `<strong>Chance of Sunshine: </strong> ${weatherData.weather[0]["hourly"][0]["chanceofsunshine"]}`;
  const rain = document.createElement("p");
  rain.innerHTML = `<strong>Chance of Rain: </strong> ${weatherData.weather[0]["hourly"][0]["chanceofrain"]}`;
  const snow = document.createElement("p");
  snow.innerHTML = `<strong>Chance of Snow: </strong> ${weatherData.weather[0]["hourly"][0]["chanceofsnow"]}`;

  if (weatherData.weather[0]["hourly"][0]["chanceofsunshine"] > 50) {
    // img = document.createElement("img");
    image.setAttribute("src", "./assets/icons8-summer.gif");
    image.setAttribute("alt", "sun");
    // display.prepend(img);
  }
  if (weatherData.weather[0]["hourly"][0]["chanceofrain"] > 50) {
    // img = document.createElement("img");
    image.setAttribute("src", "./assets/icons8-torrential-rain.gif");
    image.setAttribute("alt", "rain");
    // display.prepend(image);
  }
  if (weatherData.weather[0]["hourly"][0]["chanceofsnow"] > 50) {
    // image = document.createElement("image");
    image.setAttribute("src", "./assets/icons8-light-snow.gif");
    image.setAttribute("alt", "snow");
    // display.prepend(img);
  }

  result.prepend(
    image,
    location,
    area,
    region,
    country,
    currently,
    sunshine,
    rain,
    snow
  );

  return result;
}

function focastDays(below, weatherData) {
  below.classList.remove("hidden");
  const today = document.createElement("article");
  today.classList.add("today");
  const titleToday = document.createElement("h3");
  titleToday.innerHTML = "Today";
  const avgtemp1 = document.createElement("p");
  avgtemp1.innerHTML = `<strong>Average Temperature: </strong>${weatherData.weather[0].avgtempF}°F`;
  const maxtemp1 = document.createElement("p");
  maxtemp1.innerHTML = `<strong>Max Temperature: </strong>${weatherData.weather[0].maxtempF}°F`;
  const mintemp1 = document.createElement("p");
  mintemp1.innerHTML = `<strong>Min Temperature: </strong>${weatherData.weather[0].mintempF}°F`;
  today.append(titleToday, avgtemp1, maxtemp1, mintemp1);

  const tomorrow = document.createElement("article");
  tomorrow.classList.add("tomorrow");
  const titleTomorrow = document.createElement("h3");
  titleTomorrow.innerHTML = "Tomorrow";
  const avgtemp2 = document.createElement("p");
  avgtemp2.innerHTML = `<strong>Average Temperature: </strong>${weatherData.weather[1].avgtempF}°F`;
  const maxtemp2 = document.createElement("p");
  maxtemp2.innerHTML = `<strong>Max Temperature: </strong>${weatherData.weather[1].maxtempF}°F`;
  const mintemp2 = document.createElement("p");
  mintemp2.innerHTML = `<strong>Min Temperature: </strong>${weatherData.weather[1].mintempF}°F`;
  tomorrow.append(titleTomorrow, avgtemp2, maxtemp2, mintemp2);

  const dayAfter = document.createElement("article");
  dayAfter.classList.add("dayAfter");
  const titleDayAfter = document.createElement("h3");
  titleDayAfter.innerHTML = "Day After Tomorrow";
  const avgtemp3 = document.createElement("p");
  avgtemp3.innerHTML = `<strong>Average Temperature: </strong>${weatherData.weather[2].avgtempF}°F`;
  const maxtemp3 = document.createElement("p");
  maxtemp3.innerHTML = `<strong>Max Temperature: </strong>${weatherData.weather[2].maxtempF}°F`;
  const mintemp3 = document.createElement("p");
  mintemp3.innerHTML = `<strong>Min Temperature: </strong>${weatherData.weather[2].mintempF}°F`;
  dayAfter.append(titleDayAfter, avgtemp3, maxtemp3, mintemp3);

  below.append(today, tomorrow, dayAfter);

  return below;
}
