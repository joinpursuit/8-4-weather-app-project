//BASE_URL + userinput + format_URL = completed fetch
const BASE_URL = "http://wttr.in";
const format_URL = "?format=j1";


//form selector - creating DOM 
let data;
const form = document.querySelector('form');//selecting form from html 
const currentWeather = document.querySelector("#currentWeather");
const ul = document.querySelector("ul");//bullet points 
const previousSearch = document.querySelector("section p");//no previous searches 

Widget(data);//temperature widget


//listen to the form in the html for a submit
//when a submit happens, fetch a response - line 28 
form.addEventListener('submit', (event) => {
    event.preventDefault();
    const location = document.querySelector('#location');
    let input = location.value;
    userInput(input);
    previousSearch.remove();    
  });
  
  
function userInput (input) {
   fetch(`${BASE_URL}/${input}${format_URL}`)
    .then((response) => response.json())
    .then((json) => {   
    data = json;
   
    findWeatherInfo(data,input);
    previousHistory(data,input);

    //catch the errors for the fetch
    })
    .catch((err) => {
        console.log(err);
    })
    form.reset();
}

//function that clears the text, the inner HTML, gives a clean slate 
function findWeatherInfo(data,input) {
currentWeather.innerHTML = "";
//create a img tag
const img = document.createElement("img");

//images for changing temperatures 
if (data.weather[0].hourly[0].chanceofsunshine >= 50) {
    //change the icon display and append, adds to the weather
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


//if there is no exact match for area name, find the nearest are
if (input === data.nearest_area[0].areaName[0].value){

//update info for currentWeather
const h2 = document.createElement("h2");
h2.textContent = data.nearest_area[0].areaName[0].value;
currentWeather.append(h2);

//message handling for imperfect location matching 
const area = document.createElement("p");
area.innerHTML = `<strong> Area: </strong> ${data.nearest_area[0].areaName[0].value}`;
currentWeather.append(area);

} else {

//update info for #currentWeather
const h2 = document.createElement("h2");
h2.textContent = input;
currentWeather.append(h2);

//imperfect messaging 
const area = document.createElement("p");
area.innerHTML = `<strong> Nearest Area: </strong> ${data.nearest_area[0].areaName[0].value}`;
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
//imperfect messaging 



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
const futureWeather = document.querySelectorAll(".futureWeather");

//future weathers appended to json (data) weather
const futureWeather1 = futureWeather[0];
const futureWeather2 = futureWeather[1];
const futureWeather3 = futureWeather[2];

//clear and add color 
futureWeather1.innerHTML = "";
futureWeather1.style = "border: 2px solid #8FC5D7";


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


//clear and add color 
futureWeather2.innerHTML = "";
futureWeather2.style = "border: 2px solid #8FC5D7";


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


//clear and add color 
futureWeather3.innerHTML = "";
futureWeather3.style = "border: 2px solid #8FC5D7";

//info for futureWeather.
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

//shows all previous history & makes previous searches into a list 
function previousHistory (data,input){
 const span = document.createElement("span");
 const li = document.createElement("li");
 const a = document.createElement("a");
 
a.textContent = `${data.nearest_area[0].areaName[0].value}`;
a.setAttribute ("href", "#");

li.textContent = ` - ${data.current_condition[0].FeelsLikeF}°F`;
    
    ul.append(li);
    li.prepend(a);


//listen for click to start the previous history list above 
a.addEventListener("click", (event) => {
    findWeatherInfo(data,input);
})

}

//fahrenheit to celsius converter 
function Widget(data) {
    const Widget = document.querySelector("#Widget");
    //make the form 
    const formForWidget = document.createElement("form");
    Widget.append(formForWidget);

    //make label.   
    const label = document.createElement("label");
    label.textContent = "Convert the temperature:";
    formForWidget.append(label);

    //make input
    const input = document.createElement('input');
    input.type = "number";
    input.id = "temp-to-convert";
    formForWidget.append(input);

    //Celsius Label 
    const celsiusLabel = document.createElement("label");
    celsiusLabel.textContent = "To Celsius";
    celsiusLabel.setAttribute('for', "to-c");
    formForWidget.append(celsiusLabel);

    //make Celsius radio button. 
    const celsiusRadiobutton = document.createElement("input");
    celsiusRadiobutton.type = 'radio';
    celsiusRadiobutton.id = "to-c";
    celsiusRadiobutton.name = "convert-temp";
    celsiusRadiobutton.value = "c";
    formForWidget.append(celsiusRadiobutton);

    //add break
    const br = document.createElement('br');
    formForWidget.append(br);

    //Fahrenheit Label
    const fahrenheitLabel = document.createElement("label");
    fahrenheitLabel.textContent = "To Fahrenheit";
    fahrenheitLabel.setAttribute('for', "to-f");
    formForWidget.append(fahrenheitLabel);

    //make Fahrenheit radio button
    const fahrenheitRadiobutton = document.createElement("input");
    fahrenheitRadiobutton.type = 'radio';
    fahrenheitRadiobutton.id = "to-f";
    fahrenheitRadiobutton.name = "convert-temp";
    fahrenheitRadiobutton.value = "f";
    formForWidget.append(fahrenheitRadiobutton);

    //make submit button
    const inputForWidget = document.createElement("input");
    inputForWidget.type = "submit";
    formForWidget.append(inputForWidget);

    //make header (h4) that shows result
    const h4 = document.createElement("h4");
    h4.textContent = "0.00";
    formForWidget.append(h4);

  
    //listening for the click for the conversion button 
    formForWidget.addEventListener('submit', (event) => {
    event.preventDefault();
  
    const temperature = document.querySelector("#temp-to-convert").value;
    const celsiusOutput = document.querySelector('input[name="convert-temp"]:checked');
    calculatedTemp(temperature, celsiusOutput);
    formForWidget.reset();
    
  });
  

}
// Calculation and conversion of temperature from celsius to fahrenheit and vice versa 
function calculatedTemp(temperature,celsiusOutput) {
    let convertedTemp = 0;
    let h4temp = document.querySelector('h4');

    if (celsiusOutput === null && temperature === "") {
        h4temp.textContent = "Please provide temp and conversion";
    } else if (temperature === "") {
    h4temp.textContent = "Empty Temperature";

   } else if (celsiusOutput === null) {
    h4temp.textContent = "Empty Radio";

    }  else if (celsiusOutput.value === "c") {
    //calculate Fahrenheit to Celsius
    convertedTemp = (temperature - 32) * (5/9);
    h4temp.textContent = convertedTemp.toFixed(2);

    } else if (celsiusOutput.value === "f") {
    //calculate Celsius to Fahrenheit
    convertedTemp = (temperature* 1.8) + 32;
    h4temp.textContent = convertedTemp.toFixed(2);
    } 
}