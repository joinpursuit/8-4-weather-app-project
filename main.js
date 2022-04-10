const BASE_URL = "http://wttr.in";
const format_URL = "?format=j1";
//wttr.in/Detroit?format=j1
//wttr.in/Detroit?format=j1

let data;
const form = document.querySelector('form');
const currentWeather = document.querySelector("#currentWeather")

form.addEventListener('submit', (event) => {
    event.preventDefault();
    let input = document.querySelector('#location').value;
      getWeatherData(input);
  });
  
  
function getWeatherData (input) {
    //fetch('wttr.in/Detroit?format=j1')  
    const URL = `${BASE_URL}/${input}${format_URL}`
    //console.log(URL.split(" "));
    //fetch(`${URL}`)
   fetch(`${BASE_URL}/${input}${format_URL}`)
    .then((response) => response.json())
    .then((json) => {   
    data = json;
    // console.log(data);
    findWeatherInfo(data);
    //run function that actually use the data to find stuff and fill it to the HTML 
    })
    .catch((err) => {
        console.log(err);
    })
}



// function strong (text) {
// return `<strong> ${text}</strong>`;

// }


//Melbourne
function findWeatherInfo(data) {//loop the data to look for things we need. / making changes to HTML. 
//like using this const article =  document.createElement('article')
//console.log(data.nearest_area[0].areaName[0].value);

//this removes the P tag
// const removePtag = document.querySelector("#currentWeather p");
// removePtag.remove();

//How to clear it all so it can be new the next time its pressed. 
currentWeather.innerHTML = "";//remove all of the text so it starts over clean. 


//uodate info for #currentWeather
const h2 = document.createElement("h2");
h2.textContent = data.nearest_area[0].areaName[0].value;
currentWeather.append(h2);

//<strong> Area: </strong> ...data. 
const area = document.createElement("p");
area.innerHTML = `<strong> Area: </strong> ${data.nearest_area[0].areaName[0].value}`;
//area.textContent = `Area: ${data.nearest_area[0].areaName[0].value}`;
currentWeather.append(area);

const region = document.createElement("p");
region.innerHTML = `<strong> Region: </strong> ${data.nearest_area[0].region[0].value}`;
currentWeather.append(region);

const country = document.createElement("p");
country.innerHTML = `<strong> Country: </strong> ${data.nearest_area[0].country[0].value}`;
currentWeather.append(country);

const currently = document.createElement("p");
currently.innerHTML = `<strong> Currently: </strong> Feels Like ${data.current_condition[0].FeelsLikeF}°F`;
currentWeather.append(currently);

//update info for futureWeather
const futureWeather = document.querySelectorAll(".futureWeather");//get nodelist of all the article for futureWeather

//console.log(futureWeather);
//select all of the individual article/box.
const futureWeather1 = futureWeather[0];
const futureWeather2 = futureWeather[1];
const futureWeather3 = futureWeather[2];

futureWeather1.innerHTML = "";//clears the today temp box

//info for furtureWeather.
const today = document.createElement("h2");//add today
today.textContent = "Today";
futureWeather1.append(today);

const avgTemp = document.createElement("p");
avgTemp.innerHTML = `<strong> Average Temperature: </strong> ${data.weather[1].avgtempF}°F`;
futureWeather1.append(avgTemp);

const maxTemp = document.createElement("p");
maxTemp.innerHTML = `<strong> Max Temperature: </strong> ${data.weather[1].maxtempF}°F`;
futureWeather1.append(maxTemp);

const minTemp = document.createElement("p");
minTemp.innerHTML = `<strong> Min Temperature: </strong> ${data.weather[1].mintempF}°F`;
futureWeather1.append(minTemp);

//futureWeather1.innerHTML = `<strong> Country: </strong> ${data.nearest_area[0].country[0].value}`;
//futureWeather.append(futureWeather1);



}
