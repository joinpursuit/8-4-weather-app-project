const BASE_URL = "https://wttr.in/"
const input = document.querySelector("#location")
let data
const form = document.querySelector("#getWeather")
const main = document.querySelector("main")
const current = document.querySelector("#current")
const three = document.querySelector("#three")
const today = document.querySelector("#today")
const tomorrow = document.querySelector("#tomorrow")
const dayAfter = document.querySelector("#dayAfter")
const sidebar = document.querySelector(".sidebar")
const ul = document.querySelector(".sidebar ul")

form.addEventListener("submit", (event) => {
    event.preventDefault()
    const inputText = event.target.location.value
    fetch(`${BASE_URL}${inputText}?format=j1`)
    .then((response) => response.json())
    .then((json) => {
        data = json
        console.log(data)
        chanceOf(data)
        weather(data)
        previousSearch(data)
        form.reset()
    })
    .catch((error) => {
        alert(error)
    })
})

function previousSearch (data){
    const hyperlink = document.createElement("a")
    const listItem = document.createElement("li")
    hyperlink.innerHTML = `<a href="#">${data.nearest_area[0].areaName[0].value}</a>`
    listItem.textContent = `- ${data['current_condition'][0]['FeelsLikeF']}°F`
    ul.append(listItem)
    listItem.prepend(hyperlink)
    hyperlink.addEventListener("click", (event) => {
        weather(data)
    })
    const myList = [...document.querySelectorAll('li')]
        if(myList.length > 0){
            document.querySelector(".sidebar section p").textContent = ""
        }
}

function weather (data){
    current.innerHTML = "";
    today.innerHTML = "";
    tomorrow.innerHTML = "";
    dayAfter.innerHTML = "";
//current weather article on top
    const currenth1 = document.createElement('h1')
    currenth1.textContent = `${data['nearest_area'][0].areaName[0].value}`
    current.append(currenth1)
    const currentp1 = document.createElement('p')
    currentp1.innerHTML = `<strong>Area:</strong> ${data['nearest_area'][0].areaName[0].value}`
    current.append(currentp1)
    const currentp2 = document.createElement('p')
    currentp2.innerHTML = `<strong>Region:</strong> ${data['nearest_area'][0].region[0].value}`
    current.append(currentp2)
    const currentp3 = document.createElement('p')
    currentp3.innerHTML = `<strong>Country:</strong> ${data['nearest_area'][0].country[0].value}`
    current.append(currentp3)
    const currentp4 = document.createElement('p')
    currentp4.innerHTML = `<strong>Currently:</strong> Feels Like ${data['current_condition'][0]['FeelsLikeF']}°F`
    current.append(currentp4)
    const currentp5 = document.createElement('p')
    currentp5.innerHTML = `<strong>Chance of Sunshine:</strong> ${data.weather[0].hourly[0].chanceofsunshine}%`
    current.append(currentp5)
    const currentp6 = document.createElement('p')
    currentp6.innerHTML = `<strong>Chance of Rain:</strong> ${data.weather[0].hourly[0].chanceofrain}%`
    current.append(currentp6)
    const currentp7 = document.createElement('p')
    currentp7.innerHTML = `<strong>Chance of Snow:</strong> ${data.weather[0].hourly[0].chanceofsnow}%`
    current.append(currentp7)

    //today- average, max, min temp
    const todayh2 = document.createElement('h2')
    todayh2.textContent = `Today`
    today.append(todayh2)
    const todayp1 = document.createElement('p')
    todayp1.innerHTML = `<strong>Average Temperature:</strong> ${data.weather[0].avgtempF}°F`
    today.append(todayp1)
    const todayp2 = document.createElement('p')
    todayp2.innerHTML = `<strong>Max Temperature:</strong> ${data.weather[0].maxtempF}°F`
    today.append(todayp2)
    const todayp3 = document.createElement('p')
    todayp3.innerHTML = `<strong>Min Temperature:</strong> ${data.weather[0].mintempF}°F`
    today.append(todayp3)

    //tomorrow- average, max, min temp
    const tomorrowh2 = document.createElement('h2')
    tomorrowh2.textContent = `Tomorrow`
    tomorrow.append(tomorrowh2)
    const tomorrowp1 = document.createElement('p')
    tomorrowp1.innerHTML = `<strong>Average Temperature:</strong> ${data.weather[1].avgtempF}°F`
    tomorrow.append(tomorrowp1)
    const tomorrowp2 = document.createElement('p')
    tomorrowp2.innerHTML = `<strong>Max Temperature:</strong> ${data.weather[1].maxtempF}°F`
    tomorrow.append(tomorrowp2)
    const tomorrowp3 = document.createElement('p')
    tomorrowp3.innerHTML = `<strong>Min Temperature:</strong> ${data.weather[1].mintempF}°F`
    tomorrow.append(tomorrowp3)

    //day after- average, max, min temp
    const dayAfterh2 = document.createElement('h2')
    dayAfterh2.textContent = `Day After Tomorrow`
    dayAfter.append(dayAfterh2)
    const dayAfterp1 = document.createElement('p')
    dayAfterp1.innerHTML = `<strong>Average Temperature:</strong> ${data.weather[2].avgtempF}°F`
    dayAfter.append(dayAfterp1)
    const dayAfterp2 = document.createElement('p')
    dayAfterp2.innerHTML = `<strong>Max Temperature:</strong> ${data.weather[2].maxtempF}°F`
    dayAfter.append(dayAfterp2)
    const dayAfterp3 = document.createElement('p')
    dayAfterp3.innerHTML = `<strong>Min Temperature:</strong> ${data.weather[2].mintempF}°F`
    dayAfter.append(dayAfterp3)
    //sidebar for previous searches- link and temp
   
}

const input2 = document.querySelector("#temp-to-convert")
const widget = document.querySelector("#widget")
const output = document.querySelector("#output")

const form2 = document.querySelector("#convertTemp")
form2.addEventListener("submit", (event) => {
    event.preventDefault()
    const inputNumber = event.target.degrees.value
    tempConverter(inputNumber)
    form2.reset()
})

function tempConverter (inputNumber){
    if(document.querySelector("#to-c").checked === true){
        let farenheit = (inputNumber * 9/5) +32
        output.textContent =`${farenheit.toFixed(2)}`
        widget.append(output)
        return farenheit
    }
    if(document.querySelector("#to-f").checked === true){
        let celsius = (inputNumber - 32) * 5/9
        output.textContent =`${celsius.toFixed(2)}`
        widget.append(output)
        return celsius
    }
}

function chanceOf (data) {
    if(Number(data.weather[0].hourly[0].chanceofsunshine) > 50){
        const sunny = document.createElement("img")
        sunny.setAttribute('src', './assets/icons8-summer.gif')
        sunny.setAttribute('alt', 'sun')
        current.append(sunny)
    }
    else if(Number(data.weather[0].hourly[0].chanceofrain) > 50){
        const rainy = document.createElement("img")
        rainy.setAttribute('src', './assets/icons8-torrential-rain.gif')
        rainy.setAttribute('alt', 'rain')
        current.append(rainy)
    }
    else if(Number(data.weather[0].hourly[0].chanceofsnow) > 50){
        const snowy = document.createElement("img")
        snowy.setAttribute('src', './assets/icons8-light-snow.gif')
        snowy.setAttribute('alt', 'snow')
        current.append(snowy)
    }
}
