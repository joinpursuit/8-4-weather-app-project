let BASE_URL = "http//wttr.in/";

//weather form pick location and submit____v
const form = document.querySelector('form');
const input = document.querySelector('location');

//********************************* */ main article area
const result = document.querySelector('#result');
const message = document.querySelector('#message');
const display = document.querySelector('#display');
const city = document.querySelector('#city');
const area = document.querySelector('#ares');
const region = document.querySelector('#region');
const country = document.querySelector('#country');
const current = document.querySelector('#current');

//********************************************** */ aside right arragement
const right = document.querySelector('#right');
const list = document.querySelector('#list');
const previous = document.querySelector('#previous');

//**************************************************aside bottom article area
const article = document.querySelector('article');
const average = document.querySelector('article');
const max = document.querySelector('max');
const mix = document.querySelector('mix');
const article2 = document.querySelector('article2');
const average2 = document.querySelector('article');
const max2 = document.querySelector('max2');
const mix2 = document.querySelector('mix3');
const article3 = document.querySelector('article3');
const average3 = document.querySelector('article');
const max3 = document.querySelector('max3');
const mix3 = document.querySelector('mix3');


//*****************************user city inputed in weather
const userInput = document =

form.addEventListener('submit', () => {
    event.preventDefault();
    let userInput = input.value.toLowerCase();
    let city = userInput[0].toUpperCase() + userInput.slice(1);
    fetch(`${BASE_URL}${userInput}?format=j1`)
        .then((response) => response.json())
        .then((response) => {
        //    
            let weatherResponse = response;
            message.classList.add("hidden");
            display.classList.remove("hidden");
            cityMain.innerHTML = city;
            area.innerHTML =
            region.innerHTML =
            currently.innerHTML = 

            

//***************************************************************

            article.classList.remove("hidden");
            article2.classList.remove("hidden")
            article3.classList.remove("hidden")
//**************************************************************

            average.innerHTML =
            max.innerHTML =
            min.innerHTML =

            average2.innerHTML =
            max2.innerHTML =
            min2.innerHTML =

            average3.innerHTML =
            max3.innerHTML =
            min3.innerHTML =

//****************************************************************

            previous.classList.add("hidden");
            const listItem = document.createElement("li");
            listItem. innerHTML =
            list.append(error);
        })
        .catch((error) => {

        });
        form.reset();
})

