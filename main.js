//BASE_URL + UserInput + format_URL = completed Fetch 
const BASE_URL = "http://wttr.in";
const format_URL = "?format=j1";

//****************** form selector ********** */
let data;
const form = document.querySelector('form');
const currentWeather = document.querySelector("#currentWeather");
const ul = document.querySelector("ul");
const previousSearch = document.querySelector("section p");

Widget(data);

// ******************** listen to form for a submit **************
// ********* when submit happens fetch the response on line 27*********
form.addEventListener('submit', (event) => {
    event.preventDefault();
    const location = document.querySelector('#location');
    let input = location.value;
    UserInput(input);
     //previousSearch.textContent = "";
    previousSearch.remove();
  });
  
  
function UserInput (input) {
   fetch(`${BASE_URL}/${input}${format_URL}`)
    .then((response) => response.json())
    .then((json) => {   
    data = json;
    // console.log(data);
    findWeatherInfo(data,input);
    previousHistory(data,input);
    })
    .catch((err) => {
        console.log(err);
    })
    form.reset();
}


// ************************** clears the inner Html******************
function findWeatherInfo(data,input) {
currentWeather.innerHTML = "";
// create a image tag
const img = document.createElement("img"); 

//************************ If/else image temp ***************** */
if (data.weather[0].hourly[0].chanceofsunshine >= 50) {
    //change the icon display and append. 
    img.src = "./assets/its sunny.png";
    img.alt = "sun";
    currentWeather.append(img);
    //img.innerHTML = ;
} else if (data.weather[0].hourly[0].chanceofrain >= 50) {
    //change icon to rain and append.
    img.src = "./assets/its rain.jpeg";
    img.alt = "rain";
    currentWeather.append(img);
} else if (data.weather[0].hourly[0].chanceofsnow >= 50) {
    //change icon to snow and append. 
    img.src = "./assets/it cold.jpeg";
    img.alt = "snow"
    currentWeather.append(img);
}


// *********************** find nearest are if no match ****************
if (input === data.nearest_area[0].areaName[0].value){ 

    //update info for #currentWeather
const h2 = document.createElement("h2");
h2.textContent = data.nearest_area[0].areaName[0].value;
currentWeather.append(h2);


const area = document.createElement("p");
area.innerHTML = `<strong> Area: </strong> ${data.nearest_area[0].areaName[0].value}`;//area but sometimes needs to change?
//area.textContent = `Area: ${data.nearest_area[0].areaName[0].value}`;
currentWeather.append(area);

} else {

//uodate info for #currentWeather
const h2 = document.createElement("h2");
h2.textContent = input;
currentWeather.append(h2);
 
// ************************************ imperfect messageing*************
const area = document.createElement("p");
area.innerHTML = `<strong> Nearest Area: </strong> ${data.nearest_area[0].areaName[0].value}`;//area but sometimes needs to change?
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


// ************************** futureWeather append to dataWeather
const futureWeather1 = futureWeather[0];
const futureWeather2 = futureWeather[1];
const futureWeather3 = futureWeather[2];

//clear and add color
futureWeather1.innerHTML = "";
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


// Clear and add color
futureWeather2.innerHTML = "";
futureWeather2.style = "border: 1px solid #237474";

//info for furtureWeather.
const tomorrowWeather = document.createElement("h2");
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


//clear and add clear
futureWeather3.innerHTML = "";
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

// *************************** list previous searches
function previousHistory (data,input){
 const span = document.createElement("span");
 const li = document.createElement("li");
 const a = document.createElement("a");
 
a.textContent = `${data.nearest_area[0].areaName[0].value}`;
a.setAttribute ("href", "#");

li.textContent = ` - ${data.current_condition[0].FeelsLikeF}°F`;
    
    ul.append(li);
    li.prepend(a);

// ********************listen for click to start previous search li    
a.addEventListener("click", (event) => { 
    findWeatherInfo(data,input);
})

}

// convert to 
function Widget(data) {
    const Widget = document.querySelector("#Widget");
    //make the form 
    const formWidget = document.createElement("form");
    Widget.append(formWidget);

    //make label.   
    const label = document.createElement("label");
    label.textContent = "Convert the temperature:";
    formWidget.append(label);

    //make input
    const input = document.createElement('input');
    input.type = "number";//both works.
    input.id = "temp-to-convert";
    formWidget.append(input);

    //label for to-c
    const labelC = document.createElement("label");
    labelC.textContent = "To Celsius";
    labelC.setAttribute('for', "to-c");
    formWidget.append(labelC);

    //make C radios button. 
    const inputRadioC = document.createElement("input");
    inputRadioC.type = 'radio';
    inputRadioC.id = "to-c";
    inputRadioC.name = "convert-temp";
    inputRadioC.value = "c";
    formWidget.append(inputRadioC);

    //add break
    const br = document.createElement('br');
    formWidget.append(br);

    //label for to-f
    const labelF = document.createElement("label");
    labelF.textContent = "To Fahrenheit";
    labelF.setAttribute('for', "to-f");

    formWidget.append(labelF);

    //make F radios button
    const inputRadioF = document.createElement("input");
    inputRadioF.type = 'radio';
    inputRadioF.id = "to-f";
    inputRadioF.name = "convert-temp";
    inputRadioF.value = "f";
    formWidget.append(inputRadioF);

    //make submit button
    const inputWidget = document.createElement("input");
    inputWidget.type = "submit";
    formWidget.append(inputWidget);

    //make h4 that shows result
    const h4 = document.createElement("h4");
    h4.textContent = "0.00";
    formWidget.append(h4);

// ********************* listener for C to F convert
    formWidget.addEventListener('submit', (event) => {
    event.preventDefault();
    const temperature = document.querySelector("#temp-to-convert").value;
    const celsiusOut = document.querySelector('input[name="convert-temp"]:checked');

    calTemp(temperature, celsiusOut);

    formWidget.reset();
    
  });
  

}
// ***************** calculations of conversion c to f ******************
function calTemp(temperature,celsiusOut) {
    let convertedTemp = 0;
    let h4temp = document.querySelector('h4');

    if (celsiusOut === null && temperature === "") {
        h4temp.textContent = "Please provide temp and conversion";
    } else if (temperature === "") {
    h4temp.textContent = "Empty Temperature";
   } else if (celsiusOut === null) {
    //console.log("Error empty radio")
    h4temp.textContent = "Empty Radio";
    }  else if (celsiusOut.value === "c") {
    convertedTemp = (temperature - 32) * (5/9);
    h4temp.textContent = convertedTemp.toFixed(2);
    } else if (celsiusOut.value === "f") {
    convertedTemp = (temperature* 1.8) + 32;
    h4temp.textContent = convertedTemp.toFixed(2);
    } 
}
