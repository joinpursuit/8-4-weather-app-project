// Get's our API data for city we search for : 
const BASE_URL = 'https://wttr.in'
let cityAPIData;
let previousSearches = {};
function getWeather(city) {
    fetch(`${BASE_URL}/${city}?format=j1`)
        .then((res) => res.json())
        .then((data) => {
            cityAPIData = data;
            // console.log(cityAPIData['nearest_area'][0]['areaName'])
            locationWeather(cityAPIData);
            previousSearch(previousSearches);

        })
        .catch((error) => {
            console.log(error)
        })
}

// Grabs 'city' value :
const form = document.querySelector("form");
form.addEventListener("submit", (event) => {
    event.preventDefault();
    const input = event.target.pick_location.value;
    // console.log(input);
    getWeather(input);
    form.reset();
});

// function 

function locationWeather(cityAPIData) {
    deleteContent('main') //> deletes section content & needs a string
    const objCity = cityAPIData['nearest_area'][0];
    const cityName = objCity['areaName'][0]['value'];
    const main = document.querySelector('main');
    const weather = cityAPIData['weather'][0]['hourly'][0]
    // ----------------- Creates Header using function ----------------- //
    createHeader('main', cityName);
    // ----------------- Creates PTags using function ----------------- //
    
    createPTags("main", "Area", cityName);
    createPTags("main", "Region", objCity['region'][0]['value']);
    createPTags("main", "Country", objCity['country'][0]['value']);
    // Sentence is different so I did not use the createPTags function !
    const temp = cityAPIData['current_condition'][0]['FeelsLikeF']
    main.innerHTML += `<p><span class='bolded'>Currently:</span> Feels like ${temp}°F </p>`
    // ------------------- Additional Data Needed ------------------- //
    createPTags("main", "Chance of Sunshine", weather['chanceofsunshine']);
    createPTags("main", "Chance of Rain", weather['chanceofrain']);
    createPTags("main", "Chance of Snow", weather['chanceofsnow']);
    // ---------------- Previous Search Saving data ----------------- //
    previousSearches[objCity['areaName'][0]['value']] = temp;

    forecast(cityAPIData);
    getImage(weather);
}

function createHeader(location, name) {
    const search = document.querySelector(location);
    search.innerHTML += `<h2></span>${name}</p>`
}

function createPTags(location, key, value) {
    const search = document.querySelector(location);
    search.innerHTML += `<p><span class='bolded'>${key}:</span> ${value}</p>`
}

// Updates headers and p tags, both if they exist or NOT!
function deleteContent(location) {
    const mainPTag = document.querySelectorAll(`${location} p`);
    const header = document.querySelector(`${location} h2`)
    if (header && mainPTag) {
        header.remove();
        mainPTag.forEach(x => x.remove());
    } else {
        mainPTag.forEach(x => x.remove());
    }
}


function forecast(cityAPIData) {
    let array = ['#today', '#tmrrw', '#afterTmrw']
    array.forEach(x => deleteContent(x))
    const today = cityAPIData['weather'][0];
    const tomorrow = cityAPIData['weather'][1];
    const afterTmrw = cityAPIData['weather'][2];
    // ------------------ For TODAY's Forecast!!! ------------------ //
    createHeader('#today', 'Today');
    createPTags('#today', 'Average Temperature', today['avgtempF']);
    createPTags('#today', 'Max Temperature', today['maxtempF']);
    createPTags('#today', 'Min Temperature', today['mintempF']);

    // ------------------ For TOMORROW's Forecast!!! ------------------ //
    createHeader('#tmrrw', 'Tomorrow');
    createPTags('#tmrrw', 'Average Temperature', tomorrow['avgtempF']);
    createPTags('#tmrrw', 'Max Temperature', tomorrow['maxtempF']);
    createPTags('#tmrrw', 'Min Temperature', tomorrow['mintempF']);

    // --------------- For DAY AFTER TMRW's Forecast!!! --------------- //
    createHeader('#afterTmrw', 'Day After Tomorrow');
    createPTags('#afterTmrw', 'Average Temperature', afterTmrw['avgtempF']);
    createPTags('#afterTmrw', 'Max Temperature', afterTmrw['maxtempF']);
    createPTags('#afterTmrw', 'Min Temperature', afterTmrw['mintempF']);
}

// ----------------------- For Weather Images ----------------------- //
function getImage(weather) {
    const imagePlacement = document.querySelector('main');
    const imgTag = document.createElement('img')
    document.querySelectorAll('img').forEach(x => x.remove());
    // CHANCE OF SUN SHINEEEEE
    if (weather['chanceofsunshine'] > 50) {
        imgTag.setAttribute('src', './assets/icons8-summer.gif');
        imgTag.setAttribute('alt', 'sun');
        imagePlacement.prepend(imgTag)
    }
    // CHANCE OF RAIN 
    if (weather['chanceofrain'] > 50) {
        imgTag.setAttribute('src', './assets/icons8-torrential-rain.gif');
        imgTag.setAttribute('alt', 'rain');
        imagePlacement.prepend(imgTag)
    }
    // CHANCE OF SNOW 
    if (weather['chanceofsnow'] > 50) {
        imgTag.setAttribute('src', './assets/icons8-light-snow.gif');
        imgTag.setAttribute('alt', 'snow');
        imagePlacement.prepend(imgTag)
    }
}


// ---------------------- PREVIOUS SEARCHES ---------------------- //
function previousSearch(previousSearches) {
    const aside = document.querySelector('aside ul');
    const pTag = document.querySelector('#one p');
    const aTags = document.querySelectorAll('ul a');
    const liTags = document.querySelectorAll('ul li');
    if (Object.keys(previousSearches).length > 1) {
        if (pTag !== null) {
            pTag.remove();
        }

        aTags.forEach(x => x.remove());
        liTags.forEach(x => x.remove());
        for (const [key, value] of Object.entries(previousSearches)) {
            aside.innerHTML += `<li><a href='#' onclick="clickedOnSearch('${key}')">${key}</a> - ${value}°F</li>`
        }
    }
}

function clickedOnSearch(city){
    console.log("im here");
    getWeather(city); 
}
// ------------------------------------------------------------------ //

// ------------------ WORKING TEMPERATURE CONVERTER ------------------ //
const temp = document.querySelector(".convertTemp");
temp.addEventListener("submit", (event) => {
    event.preventDefault();
    // console.log(event.target['temp-to-convert'].value)
    const input = event.target['temp-to-convert'].value;
    let selectedbtn = document.querySelector('input[type="radio"]:checked').value;
    // console.log(selectedbtn)
    convertTemp(input, selectedbtn);
    temp.reset();

});


function convertTemp(temp, selectedbtn) {
    const h4 = document.querySelector('.convertTemp h4')
    let answer;
    if (selectedbtn === 'f') {
        answer = ((temp * (9 / 5)) + 32).toFixed(2)
        h4.innerHTML = answer;
    } else {
        answer = (((temp - 32) * 5) / 9).toFixed(2);
        h4.innerHTML = answer;
    }
}