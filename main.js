const BASE_URL = "http://wttr.in";
const format_URL = "?format=j1";
//wttr.in/Detroit?format=j1
//wttr.in/Detroit?format=j1

let data;
const form = document.querySelector('form');
const currentWeather = document.querySelector("#currentWeather");
const ul = document.querySelector("ul");
const hisotryPtag = document.querySelector("section p");



form.addEventListener('submit', (event) => {
    event.preventDefault();
    const location = document.querySelector('#location');
    //console.log(location.textContent);

    let input = location.value;
    getWeatherData(input);

    form.reset();
    //hisotryPtag.textContent = "";
    hisotryPtag.remove();
    
       
   
      //NEEDS TO GO HERE TO UPDATE? - 
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
    previousHistory(data);
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
avgTemp.innerHTML = `<strong> Average Temperature: </strong> ${data.weather[0].avgtempF}°F`;
futureWeather1.append(avgTemp);

const maxTemp = document.createElement("p");
maxTemp.innerHTML = `<strong> Max Temperature: </strong> ${data.weather[0].maxtempF}°F`;
futureWeather1.append(maxTemp);

const minTemp = document.createElement("p");
minTemp.innerHTML = `<strong> Min Temperature: </strong> ${data.weather[0].mintempF}°F`;
futureWeather1.append(minTemp);

// const date = document.createElement("p");
// date.innerHTML = `<strong> Min Temperature: </strong> ${data.weather[0].date}`;
// futureWeather1.append(date);



//futureWeather1.innerHTML = `<strong> Country: </strong> ${data.nearest_area[0].country[0].value}`;
//futureWeather.append(futureWeather1);


futureWeather2.innerHTML = "";//clears the today temp box

//info for furtureWeather.
const tomorrowWeather = document.createElement("h2");//add today
tomorrowWeather.textContent = "Tomorrow";
futureWeather2.append(tomorrowWeather);

const tomorrowAvgTemp = document.createElement("p");
tomorrowAvgTemp.innerHTML = `<strong> Average Temperature: </strong> ${data.weather[1].avgtempF}°F`;
futureWeather2.append(tomorrowAvgTemp);

const tomorrowMaxTemp = document.createElement("p");
tomorrowMaxTemp.innerHTML = `<strong> Max Temperature: </strong> ${data.weather[1].maxtempF}°F`;
futureWeather2.append(tomorrowMaxTemp);

const tomorrowMinTemp = document.createElement("p");
tomorrowMinTemp.innerHTML = `<strong> Min Temperature: </strong> ${data.weather[1].mintempF}°F`;
futureWeather2.append(tomorrowMinTemp);



futureWeather3.innerHTML = "";//clears the today temp box

//info for furtureWeather.
const dayAfterTomorrow = document.createElement("h2");//add today
dayAfterTomorrow.textContent = "Day After Tomorrow";
futureWeather3.append(dayAfterTomorrow);

const dayAfterTomorrowAvgTemp = document.createElement("p");
dayAfterTomorrowAvgTemp.innerHTML = `<strong> Average Temperature: </strong> ${data.weather[2].avgtempF}°F`;
futureWeather3.append(dayAfterTomorrowAvgTemp);

const dayAfterTomorrowMaxTemp = document.createElement("p");
dayAfterTomorrowMaxTemp.innerHTML = `<strong> Max Temperature: </strong> ${data.weather[2].maxtempF}°F`;
futureWeather3.append(dayAfterTomorrowMaxTemp);

const dayAfterTomorrowMinTemp = document.createElement("p");
dayAfterTomorrowMinTemp.innerHTML = `<strong> Min Temperature: </strong> ${data.weather[2].mintempF}°F`;
futureWeather3.append(dayAfterTomorrowMinTemp);





}



//link/ text is input. 
//eventlisterner if clicked- runn the functions again. 

//a link to the api ?? why 
function previousHistory (data){//MAYBE DONT NEED THIS FUNCTION? JUST CODE IT IN ONE?

//<li><a onclick="setSelectedTestPlan(this);" href="javascript:void(0);">New Test</a></li>
 const span = document.createElement("span");
 const li = document.createElement("li");
 const a = document.createElement("a");
 
a.textContent = `${data.nearest_area[0].areaName[0].value}`;
a.setAttribute ("href", "#");

li.textContent = ` - ${data.current_condition[0].FeelsLikeF}°F`;
    
    ul.append(li);
    li.prepend(a);

//I need to make it click - send me the new info. 

a.addEventListener("click", (event) => {//how to target the li. - im not sure. // rn just a is clickable.
    //when its click - update page to the info. remove the ul from the list. 
    findWeatherInfo(data);
})

}