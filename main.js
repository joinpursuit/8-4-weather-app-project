let apiData;

const locationSearch = document.querySelector("#search");
locationSearch.addEventListener("submit", (event) => {
  event.preventDefault();
  const searchInput = event.target.location.value.replace(/\s/g, "_");

  let appropoSearchSyntax =
    searchInput.charAt(0).toUpperCase() + searchInput.slice(1);

  getApiData(appropoSearchSyntax);
  event.target.location.value = "";
});

function getApiData(appropoSearchSyntax) {
  fetch("https://wttr.in/" + appropoSearchSyntax + "?format=j1")
    .then((response) => response.json())
    .then((json) => {
    showTheWeather(json, appropoSearchSyntax);
})
}

function showTheWeather(json, appropoSearchSyntax) {
  document.querySelector("#current-weather").textContent = "";
  document.querySelector(".wrap2 p").style.display = "none";

  let h2 = document.createElement("h2");
  let area = document.createElement("p");
  let region = document.createElement("p");
  let country = document.createElement("p");
  let currently = document.createElement("p");

  h2.textContent = appropoSearchSyntax;
  area.innerHTML = `<strong>Area:</strong> ${json.nearest_area[0].areaName[0].value}`;
  region.innerHTML = `<strong>Region:</strong> ${json.nearest_area[0].region[0].value}`;
  country.innerHTML = `<strong>Country:</strong> ${json.nearest_area[0].country[0].value}`;
  currently.innerHTML = `<strong>Currently:</strong> Feels Like ${json.current_condition[0].FeelsLikeF}°F`;

  document
    .querySelector("#current-weather")
    .append(h2, area, region, country, currently);
}
