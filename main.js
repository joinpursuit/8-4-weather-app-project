const API = 'https://wttr.in/';



const searchLocationForm = document.querySelector('#search-location form');
searchLocationForm.addEventListener('submit', (event) => {
    event.preventDefault()
    const input = event.target.location.value;
    // console.log(input)
    getData(input) 
    
})

const getData = ((input) => {
    
    fetch(`${API}${input}?format=j1`)
    .then((response) => response.json())
    .then((json) => {
        const result = document.querySelector('#result aside p')
        result.append(searchLocation(json));

    })
    
   
})

const searchLocation = ((json) =>{
const result = document.querySelector('#result aside p')
const resultBox = document.querySelector('#result aside')
const temperature = document.querySelector('#temperature aside p')
const temperatureBox = document.querySelector('#temperature aside')

console.log(json)

let location = json.nearest_area[0].areaName[0].value;
let feelsLike = json.current_condition[0].FeelsLikeF;
let region = json.nearest_area[0].region[0].value
let todayAvgtempF = json.weather[0].avgtempF;


let todayMinTemp = json.weather[0].mintempF;
let todayMaxTemp = json.weather[0].maxtempF;

let tmmAvgTemp = json.weather[1].avgtempF;
let tmmMinTemp = json.weather[1].mintempF;
let tmmMaxTemp = json.weather[1].maxtempF;

let dayAfterAvgTemp = json.weather[2].avgtempF;
let dayAfterMinTemp = json.weather[2].mintempF;
let dayAfterMaxTemp = json.weather[2].maxtempF;



result.textContent = ' ';

let area = document.createElement('h2')
area.textContent = `Area: ${location}`;

let reg = document.createElement('h4')
reg.textContent = `Region: ${region}`;

let temp = document.createElement('h4')
temp.textContent = `Temperature: ${todayAvgtempF} °F`;

let feel = document.createElement('h4')
feel.textContent = `Feels Like: ${feelsLike} °F`;

resultBox.append(area, reg, temp, feel)


temperature.textContent = ' ';

let today = document.createElement('h2')
today.textContent = `Today (${location})`;

let todayAvgTemp = document.createElement('h4')
todayAvgTemp.textContent = `Average Temp: ${todayAvgtempF} °F`;

let todaymintemp = document.createElement('h4')
todaymintemp.textContent = `Min Temp: ${todayMinTemp} °F`;

let todaymaxtemp = document.createElement('h4')
todaymaxtemp.textContent = `Max Temp: ${todayMaxTemp} °F`;

let tommorow = document.createElement('h2')
tommorow.textContent = `Tommorow (${location})`;

let tomAvgTemp = document.createElement('h4')
tomAvgTemp.textContent = `Average Temp: ${tmmAvgTemp} °F`;

let tomMinTemp = document.createElement('h4')
tomMinTemp.textContent = `Min Temp: ${tmmMinTemp} °F`;

let tomMaxTemp = document.createElement('h4')
tomMaxTemp.textContent = `Max Temp: ${tmmMaxTemp} °F`;

let dayAfterTmm = document.createElement('h2')
dayAfterTmm.textContent = `Day After Tommorow (${location})`;

let dayaftavgtemp = document.createElement('h4')
dayaftavgtemp.textContent = `Average Temp: ${dayAfterAvgTemp} °F`;

let dayaftmintemp = document.createElement('h4')
dayaftmintemp.textContent = `Min Temp: ${dayAfterMinTemp} °F`;

let dayaftmaxtemp = document.createElement('h4')
dayaftmaxtemp.textContent = `Max Temp: ${dayAfterMaxTemp} °F`;

let seperator = document.createElement('p')
seperator.textContent = '------------------------------------';


temperatureBox.append(today, todayAvgTemp, todaymintemp, todaymaxtemp, tommorow, tomAvgTemp, tomMinTemp, tomMaxTemp, dayAfterTmm, dayaftavgtemp, dayaftmintemp, dayaftmaxtemp, seperator)


const previous = document.querySelector('#previous-search aside p')
const previousBox = document.querySelector('#previous-search aside')

previous.textContent = ' ';

let prevSearch = document.createElement('h3')
prevSearch.textContent = `${location}: ${todayAvgtempF} °F`;

previousBox.append(prevSearch)


let snow = json.weather[0].totalSnow_cm;
const snowImg = document.createElement('img')
snowImg.setAttribute('src', "./assets/icons8-light-snow.gif")

let sun = json.weather[0].uvIndex;
const sunImg = document.createElement('img')
sunImg.setAttribute('src', "./assets/icons8-summer.gif")

let rain = json.current_condition[0].precipInches;
const rainImg = document.createElement('img')
rainImg.setAttribute('src', "./assets/icons8-torrential-rain.gif")

let wind = json.current_condition[0].windspeedMiles;
const windImg = document.createElement('img')
windImg.setAttribute('src', "./assets/icons8-wind.gif")

if(snow > 1){
    resultBox.append(snowImg)
}
if(sun > 3 && rain < 1){
    resultBox.append(sunImg)
}
if(rain > 10 && todayAvgtempF > 33){
    resultBox.append(rainImg)
}
if(wind > 10){
    resultBox.append(windImg)
}


// document.getElementById('resultBox').reset();


return '';


})


const converter = document.querySelector('#converter form')
converter.addEventListener('submit', (event) => convert(event))

const convert = ((event) =>{
event.preventDefault()

const conInput = event.target.convert.value
// console.log(conInput)
const result = document.querySelector('#converter form p')
const resultBox = document.querySelector('#converter form')

let number;

number = (5/9) * (conInput - 32);
number = Math.floor(number)

result.textContent = `${number}°C`;

})




