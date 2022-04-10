const API = "https://wttr.in/"

// form submit event listener
const locationForm = document.querySelector("#locationForm");
locationForm.addEventListener("submit", (e) => handleSubmit(e));

const mainWeather = document.getElementById('mainWeather');



const handleSubmit = (e) => {
    e.preventDefault();
    const { target } = e;

    const input = target.location.value;
    if (!input) return;
    target.location.value = '';


    fetch(`${API}${input.split(' ').join('+')}?format=j1`)
        .then(res => res.json())
        .then(res => populate(res, input))
        .catch(err => handleError(err))
}


const populate = (res, input) => {
    console.log (res);
    mainWeather.textContent = '';

    const location = document.createElement("p");
    location.setAttribute("id", "locationP");
    location.setAttribute("class", "mainWeatherP");
    location.innerHTML = `<strong>${input}</strong>`;

    const area = document.createElement("p");
    area.setAttribute("id", "areaP");
    area.setAttribute("class", "mainWeatherP");
    area.innerHTML = `<strong>Area: </strong>${res.nearest_area[0].areaName[0].value}`;

    const region = document.createElement("p");
    region.setAttribute("id", "regionP");
    region.setAttribute("class", "mainWeatherP");
    region.innerHTML = `<strong>Region: </strong>${res.nearest_area[0].region[0].value}`;

    const country = document.createElement("p");
    country.setAttribute("id", "countryP");
    country.setAttribute("class", "mainWeatherP");
    country.innerHTML = `<strong>Country: </strong>${res.nearest_area[0].country[0].value}`;

    const currently = document.createElement("p");
    currently.setAttribute("id", "currentlyP");
    currently.setAttribute("class", "mainWeatherP");
    currently.innerHTML = `<strong>Currently: </strong>Feels Like ${res.current_condition[0].FeelsLikeF}${String.fromCharCode(176)}F`;

    mainWeather.append(location, area, region, country, currently)

}

const handleError = (err) => {
    alert(err);
}