document.body.style.backgroundSize = 'cover'
const locationSearch = document.querySelector("#search");
locationSearch.addEventListener("submit", (event) => {
  event.preventDefault();
  const searchInput = event.target.location.value;
  
  let appropoSearchSyntax =
  searchInput.charAt(0).toUpperCase() + searchInput.slice(1);
  
  getApiData(appropoSearchSyntax, searchInput);
  event.target.location.value = "";
});

function getApiData(appropoSearchSyntax, searchInput) {
  fetch("https://wttr.in/" + searchInput + "?format=j1")
  .then((response) => response.json())
  .then((json) => {
    const listArr = [];
    showTheWeather(json, listArr, appropoSearchSyntax, searchInput);
  });
}

function showTheWeather(json, listArr, appropoSearchSyntax, searchInput) {
  document.querySelector('.wrap3').style.visibility = 'visible'
  document.querySelector("#current-weather").textContent = "";
  document.querySelector(".wrap2 p").style.display = "none";
  document.querySelector("#sideBar p").style.display = "none";
  document.body.style.backgroundImage = "url('https://source.unsplash.com/1600x900/?" + searchInput + "')"
  
  let h2 = document.createElement("h2");
  let area = document.createElement("p");
  let region = document.createElement("p");
  let country = document.createElement("p");
  let currently = document.createElement("p");
  let sunshine = document.createElement("p");
  let rain = document.createElement("p");
  let snow = document.createElement("p");
  
  h2.textContent = searchInput;
  if (appropoSearchSyntax === json.nearest_area[0].areaName[0].value) {
    area.innerHTML = `<strong>Area:</strong> ${json.nearest_area[0].areaName[0].value}`;
  } else {
    area.innerHTML = `<strong>Nearest Area:</strong> ${json.nearest_area[0].areaName[0].value}`;
  }
  region.innerHTML = `<strong>Region:</strong> ${json.nearest_area[0].region[0].value}`;
  country.innerHTML = `<strong>Country:</strong> ${json.nearest_area[0].country[0].value}`;
  currently.innerHTML = `<strong>Currently:</strong> Feels Like ${json.current_condition[0].FeelsLikeF}°F`;
  sunshine.innerHTML = `<strong>Chance of Sunshine:</strong> ${json.weather[0].hourly[0].chanceofsunshine}%`;
  rain.innerHTML = `<strong>Chance of Rain:</strong> ${json.weather[0].hourly[0].chanceofrain}%`;
  snow.innerHTML = `<strong>Chance of Snow:</strong> ${json.weather[0].hourly[0].chanceofsnow}%`;
  
  const img = document.createElement('img')
  
  if (json.weather[0].hourly[0].chanceofsnow > 50) {
    img.setAttribute('src', './assets/icons8-light-snow.gif')
    img.setAttribute('alt','snow')
    document
    .querySelector("#current-weather")
    .prepend(img);
  }
  if (json.weather[0].hourly[0].chanceofrain > 50) {
    img.setAttribute('src','./assets/icons8-torrential-rain.gif')
    img.setAttribute('alt','rain')
    document
    .querySelector("#current-weather")
    .prepend(img);
  }
  if (json.weather[0].hourly[0].chanceofsunshine > 50) {
    img.setAttribute('src', './assets/icons8-summer.gif')
    img.setAttribute('alt','sun')
    document
    .querySelector("#current-weather")
    .prepend(img);
  }
  
  

  document
  .querySelector("#current-weather")
  .append(h2, area, region, country, currently, sunshine, rain, snow);
  
  const todayHead = document.createElement("h3");
  const tomorrowHead = document.createElement("h3");
  const overmorrowHead = document.createElement("h3");
  
  todayHead.textContent = "Today";
  tomorrowHead.textContent = "Tomorrow";
  overmorrowHead.textContent = "Day After Tomorrow";
  
  const today = document.querySelector("#today");
  const tomorrow = document.querySelector("#tomorrow");
  const overmorrow = document.querySelector("#overmorrow");
  
  const todayAvg = document.createElement("p");
  const todayMax = document.createElement("p");
  const todayMin = document.createElement("p");
  
  const tomorrowAvg = document.createElement("p");
  const tomorrowMax = document.createElement("p");
  const tomorrowMin = document.createElement("p");
  
  const overmorrowAvg = document.createElement("p");
  const overmorrowMax = document.createElement("p");
  const overmorrowMin = document.createElement("p");
  
  today.textContent = "";
  todayAvg.innerHTML = `<strong>Average Temperature:</strong> ${json.weather[0].avgtempF}°F`;
  todayMax.innerHTML = `<strong>Max Temperature:</strong> ${json.weather[0].maxtempF}°F`;
  todayMin.innerHTML = `<strong>Min Temperature:</strong> ${json.weather[0].mintempF}°F`;
  
  tomorrow.textContent = "";
  tomorrowAvg.innerHTML = `<strong>Average Temperature:</strong> ${json.weather[1].avgtempF}°F`;
  tomorrowMax.innerHTML = `<strong>Max Temperature:</strong> ${json.weather[1].maxtempF}°F`;
  tomorrowMin.innerHTML = `<strong>Min Temperature:</strong> ${json.weather[1].mintempF}°F`;
  
  overmorrow.textContent = "";
  overmorrowAvg.innerHTML = `<strong>Average Temperature:</strong> ${json.weather[2].avgtempF}°F`;
  overmorrowMax.innerHTML = `<strong>Max Temperature:</strong> ${json.weather[2].maxtempF}°F`;
  overmorrowMin.innerHTML = `<strong>Min Temperature:</strong> ${json.weather[2].mintempF}°F`;
  
  today.prepend(todayHead);
  today.append(todayAvg, todayMax, todayMin);
  
  tomorrow.prepend(tomorrowHead);
  tomorrow.append(tomorrowAvg, tomorrowMax, tomorrowMin);
  
  overmorrow.prepend(overmorrowHead);
  overmorrow.append(overmorrowAvg, overmorrowMax, overmorrowMin);
  
  const ul = document.querySelector("ul");
  
  const link = document.createElement("a");
  link.textContent = json.nearest_area[0].areaName[0].value;
  link.setAttribute("href", "#");
  link.style.color = 'white'
  
  const previousSearches = document.createElement("li");
  previousSearches.textContent = ` - ${json.current_condition[0].FeelsLikeF}°F`;
  
  if (!listArr.includes(link.textContent)) {
    listArr.push(link.textContent);
    ul.append(previousSearches);
    previousSearches.prepend(link);
  }
  
  link.addEventListener("click", () =>
  showTheWeather(json, listArr, appropoSearchSyntax, searchInput)
  );

 

}

