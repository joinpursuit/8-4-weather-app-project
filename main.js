const BASE_URL = "https://wttr.in/"
const input = document.querySelector("#location")
let data
const form = document.querySelector("form")
const main = document.querySelector("main")
const current = document.querySelector("#current")

form.addEventListener("submit", (event) => {
    event.preventDefault()
    const inputText = event.target.location.value
    fetch(`${BASE_URL}${inputText}?format=j1`)
    .then((response) => response.json())
    .then((json) => {
        data = json
        weather(data)
    })
    .catch((error) => {
        alert(error)
    })
})

function weather (data){
//city name = array data.nearest_area[0].areaName[0].value
// data.current_condition[0].FeelsLikeF in aside
//add searches to sidebar ul 

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
}