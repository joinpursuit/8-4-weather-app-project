const description = document.querySelector('.description');
const header = document.createElement('h2');
const strongArea = document.createElement("strong");
const strongRegion = document.createElement('strong');
const strongCountry = document.createElement('strong');
const strongCurrent = document.createElement('strong');
const strongSunshine = document.createElement('strong');
const strongRain = document.createElement('strong');
const strongSnow = document.createElement('strong');
const pArea = document.createElement("p");
const pRegion = document.createElement("p");
const pCountry = document.createElement('p');
const pCurrent = document.createElement('p');
const pSunshine = document.createElement('p');
const pRain = document.createElement('p');
const pSnow = document.createElement('p');
const icon = document.createElement("img");
const header0 = document.createElement('h4');
const header1 = document.createElement('h4');
const header2 = document.createElement('h4');
let loc = document.querySelector("#place");
const daysWeather = document.querySelectorAll('.weather');
const br = document.createElement('br');
const form = document.querySelector('#converter');
const result = document.querySelector('#resultTemp');
const searches = document.querySelector(".searches");
const pSearch = document.querySelector('.searches p');
const BASE_URL = "https://wttr.in";
const formSearch = document.querySelector("#searchForm");
const pastSearches = {};

formSearch.addEventListener('submit', (event) => {
  let place = loc.value;
  if (place) {
  getWeather(place);
  formSearch.reset();
  daysWeather.forEach( day => {
  day.textContent = "";
  });
  }
  event.preventDefault(); 
});

form.addEventListener('submit', (event) => {
  event.preventDefault();
  const tempToConvert = event.target.tempToConvert.value;
  let active = document.querySelector('input[name="convert-temp"]:checked').value;
  let resultTemperature = 0;
  if (active === 'c') {
    resultTemperature = (tempToConvert - 32) * (5 / 9);
  } else if (active === 'f') {
    resultTemperature = (tempToConvert * (9 / 5)) + 32;
  }
  result.textContent = resultTemperature.toFixed(2).toString();
});

function getWeather(place) {
  fetch(`${BASE_URL}/${place}?format=j1`)
  .then((response) => response.json())
  .then((json) => {
  createElements(json, place);
  });
}

function createElements(json, place) {
  let area = json.nearest_area[0].areaName[0].value;
  let region = json.nearest_area[0].region[0].value;
  let country = json.nearest_area[0].country[0].value;
  let currently = json.current_condition[0].FeelsLikeF;
  let sunshine = json.weather[0].hourly[0].chanceofsunshine;
  let rain = json.weather[0].hourly[0].chanceofrain;
  let snow = json.weather[0].hourly[0].chanceofsnow;
  description.textContent = "";
   pSearch.textContent = "";
  
  if (place.toLowerCase() === area.toLowerCase()) {
    header.textContent = area;
    description.append(header);
    pArea.textContent = area;
    strongArea.textContent = 'Area: ';
    pArea.prepend(strongArea);
    description.append(pArea);
  } else {
   header.textContent = place;
   description.append(header);
   pArea.textContent = area;
   strongArea.textContent = 'Nearest Area: ';
   pArea.prepend(strongArea);
   description.append(pArea);
  }
   pRegion.textContent = region;
   strongRegion.textContent = 'Region: ';
   pRegion.prepend(strongRegion);
   description.append(pRegion);
   pCountry.textContent = country; 
   strongCountry.textContent = "Country: ";
   pCountry.prepend(strongCountry);
   description.append(pCountry); 
   pCurrent.textContent = `Feels like ${currently}°F`;
   strongCurrent.textContent = "Currently: ";
   pCurrent.prepend(strongCurrent);
   description.append(pCurrent); 
   pSunshine.textContent = sunshine;
   strongSunshine.textContent = "Chance of Sunshine: ";
   pSunshine.prepend(strongSunshine);
   description.append(pSunshine);
   pRain.textContent = rain;
   strongRain.textContent = "Chance of Rain: ";
   pRain.prepend(strongRain);
   description.append(pRain);
   pSnow.textContent = snow;
   strongSnow.textContent = "Chance of Snow: ";
   pSnow.prepend(strongSnow);
   description.append(pSnow);
   if (sunshine > 50) {
      icon.setAttribute('src','./assets/icons8-summer.gif');
      icon.setAttribute('alt', 'sun');
   } else if (rain > 50) {
    icon.setAttribute('src','./assets/icons8-torrential-rain.gif');
    icon.setAttribute('alt', 'rain');
   } else if (snow > 50) {
    icon.setAttribute('src','./assets/icons8-light-snow.gif');
    icon.setAttribute('alt', 'snow');
   } else {
    icon.setAttribute('src','./assets/favicon.ico');
    icon.setAttribute('alt', 'star icon');
   }
  description.prepend(icon);
  header0.textContent = 'Today';
  header1.textContent = 'Tomorrow';
  header2.textContent = 'Day After Tomorrow'
  daysWeather[0].append(header0);
  daysWeather[1].append(header1);
  daysWeather[2].append(header2);
  for (let i = 0; i < daysWeather.length; i++) {
    let strong = document.createElement("strong");
    let strong2 = document.createElement('strong');
    let strong3 = document.createElement('strong');
    let pAve = document.createElement('p');
    let pMax = document.createElement('p');
    let pMin = document.createElement('p');
    strong.textContent = "Average Temperature: ";
    strong2.textContent = "Max Tempeture: ";
    strong3.textContent = "Min Tempeture: ";
    pAve.textContent = json.weather[i].avgtempF;
    pMax.textContent = json.weather[i].maxtempF;
    pMin.textContent = json.weather[i].mintempF;
    pAve.prepend(strong);
    pMax.prepend(strong2);
    pMin.prepend(strong3);
    daysWeather[i].append(pAve);
    daysWeather[i].append(pMax);
    daysWeather[i].append(pMin);  
  }

  if (!pastSearches.hasOwnProperty(place)) {
    pastSearches[place] = true;
    const linkSearch = document.createElement('a');
    const temperature = document.createElement('p');
    const li = document.createElement('li');
    const link = document.createTextNode(place);
     linkSearch.setAttribute("href","#");
     linkSearch.setAttribute("title", place)
     linkSearch.appendChild(link);
     temperature.append ( "-" + currently + "°F");
     temperature.prepend(li);
     li.prepend(linkSearch);
     searches.append(temperature);
    const links = document.querySelectorAll("a")
     li.addEventListener('click', (e) => {
      console.log(links.innerHTML);
      for (let i = 0; i < links.length; i++) {
      place = links[i].innerHTML;
      } 
      getWeather(place);
      formSearch.reset();
      e.preventDefault(); 
      daysWeather.forEach( day => {
       day.textContent = "";
      });  
     }); 
    }
  }