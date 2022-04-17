let API = "http://wttr.in/";
const form = document.querySelector("form")
const userInput = document.querySelector("#userInput")

function displayWeather(city, data) {

    //Aside left
    const left = document.querySelector("#izquierda")

    //Main
    const currentMain = document.querySelector("#currentMain")
    const poof = document.querySelector("#poof")
    const ciudad = document.querySelector("#ciudad")
    const area = document.querySelector("#area")
    const region = document.querySelector("#region")
    const country = document.querySelector("#country")
    const currently = document.querySelector("#currently")

    //Aside bottom
    const upcoming = document.querySelector("#upcoming")
    const today = document.querySelector("#today")
    const avg = document.querySelector("#avg")
    const max = document.querySelector("#max")
    const min = document.querySelector("#min")

    const tomorrow = document.querySelector("#tomorrow")
    const avg1 = document.querySelector("#avg1")
    const max1 = document.querySelector("#max1")
    const min1 = document.querySelector("#min1")

    const dat = document.querySelector("#dat")
    const avg2 = document.querySelector("#avg2")
    const max2 = document.querySelector("#max2")
    const min2 = document.querySelector("#min2")

    //Aside right
    const right = document.querySelector("#derecha")
    const previous = document.querySelector("#previous")
    const noPre = document.querySelector("#noPre")



    //Once City Is Input
    ciudad.innerHTML = city[0].toUpperCase() + city.slice(1);
    area.innerHTML = `<strong>Area:</strong> ${data.nearest_area[0].areaName[0].value}`
    region.innerHTML = `<strong>Region: </strong>${data.nearest_area[0].region[0].value}`
    country.innerHTML = `<strong>Country:</strong> ${data.nearest_area[0].country[0].value}`
    currently.innerHTML = `<strong>Currently:</strong> Feels Like ${data.current_condition[0].temp_F}°F`

    //Today
    avg.innerHTML = `<strong>Average Temperature:</strong> ${data.weather[0].avgtempF}°F`
    max.innerHTML = `<strong>Max Temperature:</strong> ${data.weather[0].maxtempF}°F`
    min.innerHTML = `<strong>Min Temperature:</strong> ${data.weather[0].mintempF}°F`

    //tommorow
    avg1.innerHTML = `<strong>Average Temperature:</strong> ${data.weather[1].avgtempF}°F`
    max1.innerHTML = `<strong>Max Temperature:</strong> ${data.weather[1].maxtempF}°F`
    min1.innerHTML = `<strong>Min Temperature:</strong> ${data.weather[1].mintempF}°F`

    //DAT
    avg2.innerHTML = `<strong>Average Temperature:</strong> ${data.weather[2].avgtempF}°F`
    max2.innerHTML = `<strong>Max Temperature:</strong> ${data.weather[2].maxtempF}°F`
    min2.innerHTML = `<strong>Min Temperature:</strong> ${data.weather[2].mintempF}°F`

}


form.addEventListener("submit", (event) => {
    let city = userInput.value.toLowerCase()

    event.preventDefault()

    //to hide the initial empty condiition
    poof.classList.add("hidden")

    //to hide the "no previous search"
    noPre.classList.add("hidden")

    //upcoming review
    today.classList.remove("hidden")
    tomorrow.classList.remove("hidden")
    dat.classList.remove("hidden")
    
    


    fetch(`${API}${city}?format=j1`)
        .then((response) => response.json())
        .then((data) => {
            displayWeather(city, data)
            
            const ul = document.querySelector('ul')
            let li = document.createElement("li")
            let preCity = `${city[0].toUpperCase() + city.slice(1)}`
            
            li.innerHTML = `<a href="#">${preCity}</a> - ${data.current_condition[0].temp_F}°F`
            ul.append(li)
            
            li.addEventListener('click', () => {
                displayWeather(city, data)
            })
            
        
    })
})
