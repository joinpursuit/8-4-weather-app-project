// give the url a variable name 
const BASE_URL = "https://wttr.in";
// create a variable for the form event
const searchForm = document.querySelector("form.event");
// create a GLOBAL variable for a location search by the user
let locationSearch = "";
// create a variable for the convertForm accessed by ID
const locationInfo = document.getElementById("locationInfo");
// create a variable for the weather for today accessed by ID
const convertForm = document.getElementById("convertForm");
// create a variable for the temperature conversion results accessed by ID
const tempCalcResult = document.getElementById("tempCalcResult");
// create a variable for the location info submitted by the user accessed by ID
const weatherToday = document.getElementById("weatherToday");
// create a variable for the weather for tomorrow accessed by ID
const weatherTomorrow = document.getElementById("weatherTomorrow");
// creat a variable for the weather for the day after accessed by ID
const weatherDayAfter = document.getElementById("weatherDayAfter");
// create a variable for the box that dispays user location info
const displayPlaceHolder = document.getElementsByClassName(
  "display-placeholder"
)[0];
// create a variable for the previous search listings accessed by ID
const previousSearchUl = document.getElementById("previousSearchUl");
// create a varaible for the previous search accessed by ID
const previousSearchP = document.getElementById("previousSearchP");


// add an event listener to the form when submit is used
searchForm.addEventListener("submit", (e) => {
  // prevent the page from refreshing 
  e.preventDefault();

  // create a variable for the box the user inputs the location with the ID location 
  const input = document.querySelector("#location");
  // remove the white spaces around the user input value inside the blank location search
  locationSearch = input.value.trim();

  // if the location search is blank 
  if (!locationSearch) {
    // give the user an alert message
    alert("Location cannot be empty");
  } else {
    // else run the function get weather search with the search location
    getWeatherSearch(locationSearch, true);
  }
  // after search is done the text box will return blank 
  input.value = "";
});


// add an event listner to the convert Fahrenheit to Celcius form with submit is used - WIDGET
convertForm.addEventListener("submit", (e) => {
  // prevent the page from refreshing
  e.preventDefault();

  // create a variable for the temp to conversion input box
  const tempInput = document.getElementById("temp-to-convert");
  // create a variable for the value inside the temp conversion input box
  let value = tempInput.value;

  // if the temperature conversion input box is empty
  if (!value) {
    // give the user an alert message
    alert("Temperature value cannot be empty");
    return;
  }

  // create radio buttons for celcius conversion accessed by ID 
  let cRadio = document.getElementById("to-c");
    // create radio buttons for celcius conversion accessed by ID 
  let fRadio = document.getElementById("to-f");

  // if celcuis radio button is checked 
  if (cRadio.checked) {
    // celcius conversion equal the value(in Farenheit) - 32 * (5/9)
    let cel = (value - 32) * (5 / 9);
    // celcius conversion to the 2 decimal place 
    cel = cel.toFixed(2);
    // conversion result number made a string (text.Content doesn't do that)
    tempCalcResult.innerText = cel;

    // else is farenheit button is checked 
  } else if (fRadio.checked) {
    // farenheit conversion equal to value(in Celcius) * 9 / 5 + 32
    let fah = (value * 9) / 5 + 32;
    // farhenheit conversion to the 2 decimal place
    fah = fah.toFixed(2);
    // conversion result number made a string (text.Content doesn't do that)
    tempCalcResult.innerText = fah;
  } else {
    // else give an alert to provide number to convert
    alert("Please select a unit");
  }
});

// Make a request to wttr API with the user entered location
// create a function used in out event listeners with the users location search 
function getWeatherSearch(locationSearch, createPrevSearch) {
  let url = `${BASE_URL}/${locationSearch}?format=j1`;
  // fetch API INFORMTION through a promise from JS to JSON
  fetch(url)
    .then((res) => res.json())
    // assign that API data to a function with the data as a parameter and previous search info
    .then((data) => parseNeededData(data, createPrevSearch))
    .catch((error) => console.log("Error: ", error));
}

/*
Needed Data to create main section from searchForm event : 
    Area, Region, Country, FeelsLike
    (Today, Tomorrow, DayAfterTomorrow):
        Avg Temp,
        Max Temp,
        Min Temp
    Chance of Sunshine,
    Chance of Rain,
    Chance of Snow
*/

// create a function to pull the specific data from fetch to create our main section  and the info from the previous search
function parseNeededData(jsonData, createPrevSearch) {
  // create variables for key value of average temp -- ICONS
  let avgTempKey = "avgtempF";
  let maxTempKey = "maxtempF";
  let minTempKey = "mintempF";
  // create variables for the array index values --- MAIN DISPLAY
  let feelsLike = jsonData.current_condition[0].FeelsLikeF;
  let area = jsonData.nearest_area[0].areaName[0].value;
  let region = jsonData.nearest_area[0].region[0].value;
  let country = jsonData.nearest_area[0].country[0].value;

  // create variables for the weather for today.tomorrow and day after --- 3 DAYS 
  let today = {
    avgTemp: jsonData.weather[0][avgTempKey],
    maxTemp: jsonData.weather[0][maxTempKey],
    minTemp: jsonData.weather[0][minTempKey],
  };
  let tomorrow = {
    avgTemp: jsonData.weather[1][avgTempKey],
    maxTemp: jsonData.weather[1][maxTempKey],
    minTemp: jsonData.weather[1][minTempKey],
  };
  let dayAfter = {
    avgTemp: jsonData.weather[2][avgTempKey],
    maxTemp: jsonData.weather[2][maxTempKey],
    minTemp: jsonData.weather[2][minTempKey],
  };
  let chanceOfRain = jsonData.weather[0].hourly[0].chanceofrain;
  let chanceOfSnow = jsonData.weather[0].hourly[0].chanceofsnow;
  let chanceOfSunshine = jsonData.weather[0].hourly[0].chanceofsunshine;

  // call the functional with the parameters we created that will update with the users specific location search --------------- ACTION TO UPDATE THOSE PARAMTERS WITH USER SEARCH 
  updateHTML({
    feelsLike,
    area,
    region,
    country,
    today,
    tomorrow,
    dayAfter,
    chanceOfRain,
    chanceOfSnow,
    chanceOfSunshine,
    createPrevSearch,
  });
}

// create a function that with the updated parameters from the users specific search location to attach a matching icon depending on the conditionlal statement ----- ({}) are used for multiple parameters ---- SPECIFY WHICH VALUES TO UPDATE WITH USER SEARCH 
function updateHTML({
  feelsLike,
  area,
  region,
  country,
  today,
  tomorrow,
  dayAfter,
  chanceOfRain,
  chanceOfSnow,
  chanceOfSunshine,
  createPrevSearch,
}) {

  // the middile section display will be blank until a user does a search
  displayPlaceHolder.style.display = "none";
  // the location search display will be centered in block form
  locationInfo.style.display = "block";
  // create a variable for imperfect user location search with conditional for lower case text
  let isImperfect = area.toLowerCase() !== locationSearch.toLowerCase();
  // create a variable to display all the user location search information as follows;
  // call the function to add icon with the parameters from max values
  // header should print the user location search
  // call function if location search is imperfect return the nearest area if not return the area
  // call function to create region with user search  
  // call function to create country with user seach etc...
  let locationInfoHTML = `
        ${addWeatherIcon(chanceOfRain, chanceOfSnow, chanceOfSunshine)}
        <h2>${locationSearch}</h2>
        ${createItem(isImperfect ? "Nearest Area" : "Area", area)}
        ${createItem("Region", region)}
        ${createItem("Country", country)}
        ${createItem("Currently", `Feels Like ${feelsLike}&deg;F`)}
        ${createItem("Chance of Sunshine", chanceOfSunshine)}
        ${createItem("Chance of Rain", chanceOfRain)}
        ${createItem("Chance of Snow", chanceOfSnow)}
      `;

      // updating the location info section after the functions have been called with users search parameters
  locationInfo.innerHTML = locationInfoHTML;

  // weather-info aside is set to display: none
  // because it shows the border when it is empty
  // so make it display none by default and
  // make it visible when we need to show the data
  document.querySelector(".weather-info").style.display = "grid";

  // create a variable for the 3 boxes under the main weather information with today tomorrow and the dayAfter
  let weatherTodayHTML = `
    <h3>Today</h3>
    ${createItem("Average Temperature", `${today.avgTemp}&deg;F`)}
    ${createItem("Max Temperature", `${today.maxTemp}&deg;F`)}
    ${createItem("Min Temperature", `${today.minTemp}&deg;F`)}
  `;
  let weatherTomorrowHTML = `
    <h3>Tomorrow</h3>
    ${createItem("Average Temperature", `${tomorrow.avgTemp}&deg;F`)}
    ${createItem("Max Temperature", `${tomorrow.maxTemp}&deg;F`)}
    ${createItem("Min Temperature", `${tomorrow.minTemp}&deg;F`)}
  `;
  let weatherDayAfterHTML = `
    <h3>Day After Tomorrow</h3>
    ${createItem("Average Temperature", `${dayAfter.avgTemp}&deg;F`)}
    ${createItem("Max Temperature", `${dayAfter.maxTemp}&deg;F`)}
    ${createItem("Min Temperature", `${dayAfter.minTemp}&deg;F`)}


  `;
  weatherToday.innerHTML = weatherTodayHTML;
  weatherTomorrow.innerHTML = weatherTomorrowHTML;
  weatherDayAfter.innerHTML = weatherDayAfterHTML;


  // the previous search display with be empty until a user search is done
  previousSearchP.style.display = "none";
  // create a conditional event listenter to the users location search that will create a listing of the searches with link of the area and feels like temperature 
  if (createPrevSearch) {
    let prevSearchItem = document.createElement("li");
    // add event listener to the seeach link when clicked will store the search area and calls the getWeather function with the search area again
    prevSearchItem.addEventListener("click", () => {
      locationSearch = area;
      getWeatherSearch(area, false);
    });

    // update the previous search section a link with the search area and feels like in degree
    prevSearchItem.innerHTML = `<a class="link">${area}</a> - ${feelsLike}&deg;F`;
    // add theat item as a li to the ul
    previousSearchUl.appendChild(prevSearchItem);
  }
}
// function to create icons with the key value(average temp)and give the value in p tag
function createItem(key, value) {
  return `<p class="item"><span class="head">${key}</span> : ${value}</p>`;
}

// create a function to add the icon depending on the paramter values 
function addWeatherIcon(rain, snow, sunshine) {
  // create a variable equal to the max value of rain, snow or sunshine 
  let maxValue = Math.max(rain, snow, sunshine);
  // conditional statement to assign an icon on the max value 
  if (maxValue === sunshine)
    return '<img src="./assets/icons8-summer.gif" alt="sun" />';
  if (maxValue === rain)
    return '<img src="./assets/icons8-torrential-rain.gif" alt="rain" />';
  if (maxValue === snow)
    return '<img src="./assets/icons8-light-snow.gif" alt="snow" />';
}


