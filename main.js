const BASE_URL = "http://wttr.in";
const format_URL = "?format=j1";
//wttr.in/Detroit?format=j1
//wttr.in/Detroit?format=j1

let data;
const form = document.querySelector('form');
const currentWeather = document.querySelector("#currentWeather");
const ul = document.querySelector("ul");
const hisotryPtag = document.querySelector("section p");

tempWidget(data);

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
    findWeatherInfo(data,input);
    previousHistory(data,input);

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
function findWeatherInfo(data,input) {//loop the data to look for things we need. / making changes to HTML. 

currentWeather.innerHTML = "";//remove all of the text so it starts over clean. 

const img = document.createElement("img");//makes img tag. 

// img.src = "assets/icons8-summer.gif";
//     currentWeather.append(img);
//console.log(data.weather[0].hourly[0].chanceofsunshine);

if (data.weather[0].hourly[0].chanceofsunshine >= 50) {
    //change the icon display and append. 
    img.src = "./assets/icons8-summer.gif";
    img.alt = "sun";
    currentWeather.append(img);
    //img.innerHTML = ;
} else if (data.weather[0].hourly[0].chanceofrain >= 50) {
    //change icon to rain and append.
    img.src = "./assets/icons8-torrential-rain.gif";
    img.alt = "rain";
    currentWeather.append(img);
} else if (data.weather[0].hourly[0].chanceofsnow >= 50) {
    //change icon to snow and append. 
    img.src = "./assets/icons8-light-snow.gif";
    img.alt = "snow"
    currentWeather.append(img);
}



if (input === data.nearest_area[0].areaName[0].value){//if name is the same = use area. 

//uodate info for #currentWeather
const h2 = document.createElement("h2");
h2.textContent = data.nearest_area[0].areaName[0].value;
currentWeather.append(h2);

//<strong> Area: </strong> ...data. 
const area = document.createElement("p");
area.innerHTML = `<strong> Area: </strong> ${data.nearest_area[0].areaName[0].value}`;//area but sometimes needs to change?
//area.textContent = `Area: ${data.nearest_area[0].areaName[0].value}`;
currentWeather.append(area);

} else {

//uodate info for #currentWeather
const h2 = document.createElement("h2");
h2.textContent = input;
currentWeather.append(h2);

//<strong> Area: </strong> ...data. 
const area = document.createElement("p");
area.innerHTML = `<strong> Nearest Area: </strong> ${data.nearest_area[0].areaName[0].value}`;//area but sometimes needs to change?
//area.textContent = `Area: ${data.nearest_area[0].areaName[0].value}`;
currentWeather.append(area);


}


const region = document.createElement("p");
region.innerHTML = `<strong> Region: </strong> ${data.nearest_area[0].region[0].value}`;
currentWeather.append(region);

const country = document.createElement("p");
country.innerHTML = `<strong> Country: </strong> ${data.nearest_area[0].country[0].value}`;
currentWeather.append(country);

const currently = document.createElement("p");
currently.innerHTML = `<strong> Currently: </strong> Feels Like ${data.current_condition[0].FeelsLikeF}°F`;
currentWeather.append(currently);



//addition - chance of sunshine/ chance of rain/ chance of snow. 

//chanceOfSunshine
const sunshine = document.createElement("p");
sunshine.innerHTML = `<strong> Chance of Sunshine: </strong> ${data.weather[0].hourly[0].chanceofsunshine}`;
currentWeather.append(sunshine);

//chanceOfRain
const rain = document.createElement("p");
rain.innerHTML = `<strong> Chance of Rain: </strong> ${data.weather[0].hourly[0].chanceofrain}`;
currentWeather.append(rain);

//chanceOfSnow
const snow = document.createElement("p");
snow.innerHTML = `<strong> Chance of Snow: </strong> ${data.weather[0].hourly[0].chanceofsnow}`;
currentWeather.append(snow);





//update info for futureWeather
const futureWeather = document.querySelectorAll(".futureWeather");//get nodelist of all the article for futureWeather


//console.log(futureWeather);
//select all of the individual article/box.
const futureWeather1 = futureWeather[0];
const futureWeather2 = futureWeather[1];
const futureWeather3 = futureWeather[2];

futureWeather1.innerHTML = "";//clears the today temp box
futureWeather1.style = "border: 1px solid #237474";


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


//futureWeather1.innerHTML = `<strong> Country: </strong> ${data.nearest_area[0].country[0].value}`;
//futureWeather.append(futureWeather1);


futureWeather2.innerHTML = "";//clears the today temp box
futureWeather2.style = "border: 1px solid #237474";


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
futureWeather3.style = "border: 1px solid #237474";

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
function previousHistory (data,input){//MAYBE DONT NEED THIS FUNCTION? JUST CODE IT IN ONE?

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
    findWeatherInfo(data,input);
})

}


//do I want the widget to be another function???
function tempWidget(data) {
    const tempWidget = document.querySelector("#tempWidget");
    //make the form 
    const formForWidget = document.createElement("form");
    tempWidget.append(formForWidget);

    //make label.   
    const label = document.createElement("label");
    label.textContent = "Convert the temperature:";
    formForWidget.append(label);

    //make input
    const input = document.createElement('input');
    //input.setAttribute('type', 'number' );
    input.type = "number";//both works.
    input.id = "temp-to-convert";
    formForWidget.append(input);

    //label for to-c
    const labelToC = document.createElement("label");
    labelToC.textContent = "To Celsius";
    labelToC.setAttribute('for', "to-c");
    //labelToC.for = "to-c";
    formForWidget.append(labelToC);

    //make C radios button. 
    const inputRadioC = document.createElement("input");
    inputRadioC.type = 'radio';
    inputRadioC.id = "to-c";
    inputRadioC.name = "convert-temp";
    inputRadioC.value = "c";
    formForWidget.append(inputRadioC);

    //add break
    const br = document.createElement('br');
    formForWidget.append(br);

    //label for to-f
    const labelToF = document.createElement("label");
    labelToF.textContent = "To Fahrenheit";
    labelToF.setAttribute('for', "to-f");
    //labelToF.for = "to-f"; //do  not work for some reason... not sure why. 
    formForWidget.append(labelToF);

    //make F radios button
    const inputRadioF = document.createElement("input");
    inputRadioF.type = 'radio';
    inputRadioF.id = "to-f";
    inputRadioF.name = "convert-temp";
    inputRadioF.value = "f";
    formForWidget.append(inputRadioF);

    //make submit button
    const inputForWidget = document.createElement("input");
    inputForWidget.type = "submit";
    formForWidget.append(inputForWidget);

    //make h4 that shows result
    const h4 = document.createElement("h4");
    h4.textContent = "0.00";
    formForWidget.append(h4);

    //need for a eventlistener - to run the convertion then it should be good. 


    formForWidget.addEventListener('submit', (event) => {
    event.preventDefault();
    
    // const location = document.querySelector('#location');
    // let input = location.value;
    // getWeatherData(input);
    const temperature = document.querySelector("#temp-to-convert").value;
    //console.log(temperature);
    const radioOutput = document.querySelector('input[name="convert-temp"]:checked');//got this from https://stackoverflow.com/questions/1423777/how-can-i-check-whether-a-radio-button-is-selected-with-javascript
    //console.log(radioOutput);

    calTemp(temperature, radioOutput);

    formForWidget.reset();
    
  });
  

}

function calTemp(temperature,radioOutput) {
    //if radio is C to c to f - else vice versa. 
    let convertedTemp = 0;
    let h4temp = document.querySelector('h4');

    if (radioOutput === null && temperature === "") {
        h4temp.textContent = "Please provide temp and conversion";
    } else if (temperature === "") {
    h4temp.textContent = "Empty Temperature";
    //console.log("missing temp");
   } else if (radioOutput === null) {
    //console.log("Error empty radio")
    h4temp.textContent = "Empty Radio";
    }  else if (radioOutput.value === "c") {
    //cal F to C
    convertedTemp = (temperature - 32) * (5/9);
    h4temp.textContent = convertedTemp.toFixed(2);
    } else if (radioOutput.value === "f") {
    //cal C to F
    convertedTemp = (temperature* 1.8) + 32;
    h4temp.textContent = convertedTemp.toFixed(2);
    } 
}