const BASE_URL = "https://wttr.in/"
const input = document.querySelector("#location")
let data
const form = document.querySelector("form")
const main = document.querySelector("main")
const current = document.querySelector("#current")
const today = document.querySelector("#today")
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
        weather(data)
        console.log(data)
        const li = document.createElement("li")
        li.textContent = `${inputText.charAt(0).toUpperCase() + inputText.slice(1)}`
        ul.append(li)
        form.reset()
    })
    .catch((error) => {
        alert(error)
    })
})

function weather (data){
//current weather article on top
    const currenth1 = document.createElement('h1')
    currenth1.textContent = `${data['nearest_area'][0].areaName[0].value}`
    current.append(currenth1)
    const currentp1 = document.createElement('p')
    currentp1.textContent = `Area: ${data['nearest_area'][0].areaName[0].value}`
    current.append(currentp1)
    const currentp2 = document.createElement('p')
    currentp2.textContent = `Region: ${data['nearest_area'][0].region[0].value}`
    current.append(currentp2)
    const currentp3 = document.createElement('p')
    currentp3.textContent = `Country: ${data['nearest_area'][0].country[0].value}`
    current.append(currentp3)
    const currentp4 = document.createElement('p')
    currentp4.textContent = `Currently: Feels Like ${data['current_condition'][0]['FeelsLikeF']}°F`
    current.append(currentp4)

    //today- average, max, min temp
    const todayh2 = document.createElement('h2')
    todayh2.textContent = `Today`
    today.append(todayh2)
    const todayp1 = document.createElement('p')
    todayp1.textContent = `Average Temperature: ${data.weather[0].avgtempF}°F`
    today.append(todayp1)
    const todayp2 = document.createElement('p')
    todayp2.textContent = `Max Temperature: ${data.weather[0].maxtempF}°F`
    today.append(todayp2)
    const todayp3 = document.createElement('p')
    todayp3.textContent = `Min Temperature: ${data.weather[0].mintempF}°F`
    today.append(todayp3)

    //tomorrow- average, max, min temp
    const tomorrowh2 = document.createElement('h2')
    tomorrowh2.textContent = `Tomorrow`
    tomorrow.append(tomorrowh2)
    const tomorrowp1 = document.createElement('p')
    tomorrowp1.textContent = `Average Temperature: ${data.weather[1].avgtempF}°F`
    tomorrow.append(tomorrowp1)
    const tomorrowp2 = document.createElement('p')
    tomorrowp2.textContent = `Max Temperature: ${data.weather[1].maxtempF}°F`
    tomorrow.append(tomorrowp2)
    const tomorrowp3 = document.createElement('p')
    tomorrowp3.textContent = `Min Temperature: ${data.weather[1].mintempF}°F`
    tomorrow.append(tomorrowp3)

    //day after- average, max, min temp
    const dayAfterh2 = document.createElement('h2')
    dayAfterh2.textContent = `Day After Tomorrow`
    dayAfter.append(dayAfterh2)
    const dayAfterp1 = document.createElement('p')
    dayAfterp1.textContent = `Average Temperature: ${data.weather[2].avgtempF}°F`
    dayAfter.append(dayAfterp1)
    const dayAfterp2 = document.createElement('p')
    dayAfterp2.textContent = `Max Temperature: ${data.weather[2].maxtempF}°F`
    dayAfter.append(dayAfterp2)
    const dayAfterp3 = document.createElement('p')
    dayAfterp3.textContent = `Min Temperature: ${data.weather[2].mintempF}°F`
    dayAfter.append(dayAfterp3)
    //sidebar for previous searches- link and temp
   
}