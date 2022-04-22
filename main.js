const url = "http://wttr.in";
const urlFormat = "?format=j1";



let data;
const form = document.querySelector('form'); // <= selecting form 
const ul = document.querySelector("ul"); 
const currentWeather = document.querySelector("#currentWeather");
const previousSearch = document.querySelector("section p");//no previous searches 

//temperature widget =>
Widget(data);


form.addEventListener('submit', (event) => {
    event.preventDefault();
    const location = document.querySelector('#location');
    let input = location.value;
    userInput(input);
    previousSearch.remove();    
  });


function userInput (input) {
   fetch(`${url}/${input}${urlFormat}`)
    .then((response) => response.json())
    .then((json) => {   
    data = json;

    findWeatherInfo(data,input);
    previousHistory(data,input);

    })
    .catch((err) => {
        console.log(err);
    })
    form.reset();
}


function findWeatherInfo(data,input) {
currentWeather.innerHTML = "";

const img = document.createElement("img");

if (data.weather[0].hourly[0].chanceofsunshine >= 50) {

    img.src = "./assets/icons8-summer.gif";
    img.alt = "sun";
    currentWeather.append(img);
  
} else if (data.weather[0].hourly[0].chanceofrain >= 50) {
  
    img.src = "./assets/icons8-torrential-rain.gif";
    img.alt = "rain";
    currentWeather.append(img);
} else if (data.weather[0].hourly[0].chanceofsnow >= 50) {
    
    img.src = "./assets/icons8-light-snow.gif";
    img.alt = "snow"
    currentWeather.append(img);
}

if (input === data.nearest_area[0].areaName[0].value){

const h2 = document.createElement("h2");
h2.textContent = data.nearest_area[0].areaName[0].value;
currentWeather.append(h2);


const area = document.createElement("p");
area.innerHTML = `<strong> Area: </strong> ${data.nearest_area[0].areaName[0].value}`;
currentWeather.append(area);

} else {


const h2 = document.createElement("h2");
h2.textContent = input;
currentWeather.append(h2);


const area = document.createElement("p");
area.innerHTML = `<em> Nearest Area: </em> ${data.nearest_area[0].areaName[0].value}`;
currentWeather.append(area);
}
const region = document.createElement("p");
region.innerHTML = `<em> Region: </em> ${data.nearest_area[0].region[0].value}`;
currentWeather.append(region);

const country = document.createElement("p");
country.innerHTML = `<em> Country: </em> ${data.nearest_area[0].country[0].value}`;
currentWeather.append(country);

const currently = document.createElement("p");
currently.innerHTML = `<em> Currently: </em> Feels Like ${data.current_condition[0].FeelsLikeF}°F`;
currentWeather.append(currently);


const sunshine = document.createElement("p");
sunshine.innerHTML = `<em> Chance of Sunshine: </em> ${data.weather[0].hourly[0].chanceofsunshine}`;
currentWeather.append(sunshine);

const rain = document.createElement("p");
rain.innerHTML = `<em> Chance of Rain: </em> ${data.weather[0].hourly[0].chanceofrain}`;
currentWeather.append(rain);

const snow = document.createElement("p");
snow.innerHTML = `<em> Chance of Snow: </em> ${data.weather[0].hourly[0].chanceofsnow}`;
currentWeather.append(snow);

const futureWeather = document.querySelectorAll(".futureWeather");

const weather1 = futureWeather[0];
const weather2 = futureWeather[1];
const weather3 = futureWeather[2];

weather1.innerHTML = "";
weather1.style = "3px dotted rgb(0, 0, 0)";

const today = document.createElement("h2");
today.textContent = "Today";
weather1.append(today);

const avgTemp = document.createElement("p");
avgTemp.innerHTML = `<strong> Average Temperature: </strong> ${data.weather[0].avgtempF}°F`;
weather1.append(avgTemp);

const maxTemp = document.createElement("p");
maxTemp.innerHTML = `<strong> Max Temperature: </strong> ${data.weather[0].maxtempF}°F`;
weather1.append(maxTemp);

const minTemp = document.createElement("p");
minTemp.innerHTML = `<strong> Min Temperature: </strong> ${data.weather[0].mintempF}°F`;
weather1.append(minTemp);



weather2.innerHTML = "";
weather2.style = "3px dotted rgb(0, 0, 0)";


const tomorrowWeather = document.createElement("h2");
tomorrowWeather.textContent = "Tomorrow";
weather2.append(tomorrowWeather);

const tomorrowAvgTemp = document.createElement("p");
tomorrowAvgTemp.innerHTML = `<strong> Average Temperature: </strong> ${data.weather[1].avgtempF}°F`;
weather2.append(tomorrowAvgTemp);

const tomorrowMaxTemp = document.createElement("p");
tomorrowMaxTemp.innerHTML = `<strong> Max Temperature: </strong> ${data.weather[1].maxtempF}°F`;
weather2.append(tomorrowMaxTemp);

const tomorrowMinTemp = document.createElement("p");
tomorrowMinTemp.innerHTML = `<strong> Min Temperature: </strong> ${data.weather[1].mintempF}°F`;
weather2.append(tomorrowMinTemp);


weather3.innerHTML = "";
weather3.style = "3px dotted rgb(0, 0, 0)";

const dayAfterTomorrow = document.createElement("h2");
dayAfterTomorrow.textContent = "Day After Tomorrow";
weather3.append(dayAfterTomorrow);

const dayAfterTomorrowAvgTemp = document.createElement("p");
dayAfterTomorrowAvgTemp.innerHTML = `<strong> Average Temperature: </strong> ${data.weather[2].avgtempF}°F`;
weather3.append(dayAfterTomorrowAvgTemp);

const dayAfterTomorrowMaxTemp = document.createElement("p");
dayAfterTomorrowMaxTemp.innerHTML = `<strong> Max Temperature: </strong> ${data.weather[2].maxtempF}°F`;
weather3.append(dayAfterTomorrowMaxTemp);

const dayAfterTomorrowMinTemp = document.createElement("p");
dayAfterTomorrowMinTemp.innerHTML = `<strong> Min Temperature: </strong> ${data.weather[2].mintempF}°F`;
weather3.append(dayAfterTomorrowMinTemp);
}

// use span, look back**

function previousHistory (data,input){
 const span = document.createElement("span");
 const li = document.createElement("li");
 const a = document.createElement("a");

a.textContent = `${data.nearest_area[0].areaName[0].value}`;
a.setAttribute ("href", "#");
//console.log(data.nearest_area[0].areaName[0].value)
li.textContent = ` - ${data.current_condition[0].FeelsLikeF}°F`;

    ul.append(li);
    li.prepend(a);



a.addEventListener("click", (event) => {
    findWeatherInfo(data,input);
})

}


function Widget(data) {
    const Widget = document.querySelector("#Widget");

 //seperate form ***

    const formForWidget = document.createElement("form");
    Widget.append(formForWidget);

  
    const label = document.createElement("label");
    label.textContent = "convert the temperature:";
    formForWidget.append(label);

    //seperate  input ***

    const input = document.createElement('input');
    input.type = "number";
    input.id = "temp-to-convert";
    formForWidget.append(input);


    //button for celsius radio ***

    const celsiusRadiobutton = document.createElement("input");
    celsiusRadiobutton.type = 'radio';
    celsiusRadiobutton.id = "to-c";
    celsiusRadiobutton.name = "convert-temp";
    celsiusRadiobutton.value = "c";
    formForWidget.append(celsiusRadiobutton);

    //label for celsius ***

    const celsiusLabel = document.createElement("label");
    celsiusLabel.textContent = "to celsius";
    celsiusLabel.setAttribute('for', "to-c");
    formForWidget.append(celsiusLabel);


    const br = document.createElement('br');
    formForWidget.append(br);

  // button for farenheit ***

    const fahrenheitRadiobutton = document.createElement("input");
    fahrenheitRadiobutton.type = 'radio';
    fahrenheitRadiobutton.id = "to-f";
    fahrenheitRadiobutton.name = "convert-temp";
    fahrenheitRadiobutton.value = "f";
    formForWidget.append(fahrenheitRadiobutton);

  // label for farenheit ***

     const fahrenheitLabel = document.createElement("label");
     fahrenheitLabel.textContent = "to fahrenheit";
     fahrenheitLabel.setAttribute('for', "to-f");
     formForWidget.append(fahrenheitLabel);

    //submit button widget ***
    const inputForWidget = document.createElement("input");
    inputForWidget.type = "submit";
    formForWidget.append(inputForWidget);

    // result
    const h4 = document.createElement("h4");
    h4.textContent = "0.00";
    formForWidget.append(h4);


    // adds click event to converion***

    formForWidget.addEventListener('submit', (event) => {
    event.preventDefault();

    const temperature = document.querySelector("#temp-to-convert").value;
    const celsiusOutput = document.querySelector('input[name="convert-temp"]:checked');
    calculatedTemp(temperature, celsiusOutput);
    formForWidget.reset();

  });


}

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
    convertedTemp = (temperature - 32) * (5/9);
    h4temp.textContent = convertedTemp.toFixed(2);

    } else if (celsiusOutput.value === "f") {
    convertedTemp = (temperature* 1.8) + 32;
    h4temp.textContent = convertedTemp.toFixed(2);
    } 
} 
