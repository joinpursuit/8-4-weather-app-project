document.addEventListener('DOMContentLoaded', () => {
    setupFormListener()
})

const previousSearchesArr = []

const setupFormListener = () => {
    let form = document.querySelector("#tempform")
    let userInput = document.querySelector("#location")

    form.addEventListener('submit', (event) => {
        event.preventDefault()
        getWeather(userInput.value)
    })
} 

const getWeather = (searchValue) => {
    fetch(`http://wttr.in/${searchValue}?format=j1`)
    .then(response => response.json())
    .then((json) => setUpPage(json, searchValue))
}

const setUpPage = (weatherObj, searchValue) => {
    displayCurrWeather(weatherObj, searchValue)
    displayWeather(weatherObj)
    savePreviousSearch(searchValue, weatherObj)
}

const displayCurrWeather = (weatherObj, searchValue) => {
    console.log(weatherObj)
    let inputBox = document.querySelector("#location")
    inputBox.value = ""


    let currWeatherSection = document.querySelector("#currWeather")
    currWeatherSection.innerText = ""
    
    let cityName = document.createElement('h2')
    cityName.innerText = searchValue

    // let nearestAreaParagraph = document.createElement('p')
    // let nearestAreaString = weatherObj.nearest_area[0].areaName[0].value
    // nearestAreaParagraph.innerHTML = `<b>Nearest Area: </b>${nearestAreaString}`

    let areaParagraph = document.createElement('p')
    let areaString = weatherObj.nearest_area[0].areaName[0].value
    areaParagraph.innerHTML = `<b>Nearest Area: </b>${areaString}`

    let regionParagraph = document.createElement('p')
    let regionString = weatherObj.nearest_area[0].region[0].value
    regionParagraph.innerHTML = `<b>Region:</b> ${regionString}`

    let countryParagraph = document.createElement('p')
    let countryString = weatherObj.nearest_area[0].country[0].value
    countryParagraph.innerHTML = `<b>Country:</b> ${countryString}`

    let currentlyParagraph = document.createElement('p')
    let currentlyString = weatherObj.current_condition[0].FeelsLikeF
    currentlyParagraph.innerHTML = `<b>Currently:</b> Feels like ${currentlyString}°F`

    currWeatherSection.appendChild(cityName)
    currWeatherSection.appendChild(areaParagraph)
    currWeatherSection.appendChild(regionParagraph)
    currWeatherSection.appendChild(countryParagraph)
    currWeatherSection.appendChild(currentlyParagraph)
}

const displayWeather = (weatherObj) => {
    let todaySection = document.querySelector("#today")
    let tmrwSection = document.querySelector("#tomorrow")
    let dayAfterSection = document.querySelector("#dayAfter")
    todaySection.innerText = ""
    tmrwSection.innerText = ""
    dayAfterSection.innerText = ""



    let todaysWeather = weatherObj.weather[0]
    let avgTempTodayParagraph = document.createElement('p')
    let avgTempToday = todaysWeather.avgtempF
    avgTempTodayParagraph.innerHTML = `<b>Average Temperature:</b> ${avgTempToday}°F`
 
    let maxTempTodayParagraph = document.createElement('p')
    let maxTempToday = todaysWeather.maxtempF
    maxTempTodayParagraph.innerHTML = `<b>Max Temperature:</b> ${maxTempToday}°F`

    let minTempTodayParagraph = document.createElement('p')
    let minTempToday = todaysWeather.mintempF
    minTempTodayParagraph.innerHTML = `<b>Min Temperature:</b> ${minTempToday}°F`

    let todayHeading = document.createElement('h2')
    todayHeading.innerText = "Today"

    todaySection.appendChild(todayHeading)
    todaySection.appendChild(avgTempTodayParagraph)
    todaySection.appendChild(maxTempTodayParagraph)
    todaySection.appendChild(minTempTodayParagraph)


    let tmrwsWeather = weatherObj.weather[1]
    let avgTempTmrwParagraph = document.createElement('p')
    let avgTempTmrw = tmrwsWeather.avgtempF
    avgTempTmrwParagraph.innerHTML = `<b>Average Temperature:</b> ${avgTempTmrw}°F`

    let maxTempTmrwParagraph = document.createElement('p')
    let maxTempTmrw = tmrwsWeather.maxtempF
    maxTempTmrwParagraph.innerHTML = `<b>Max Temperature:</b> ${maxTempTmrw}°F`

    let minTempTmrwParagraph = document.createElement('p')
    let minTempTmrw = tmrwsWeather.mintempF
    minTempTmrwParagraph.innerHTML = `<b>Min Temperature:</b> ${minTempTmrw}°F`

    let tmrwHeading = document.createElement('h2')
    tmrwHeading.innerText = "Tomorrow"

    tmrwSection.appendChild(tmrwHeading)  
    tmrwSection.appendChild(avgTempTmrwParagraph)
    tmrwSection.appendChild(maxTempTmrwParagraph)
    tmrwSection.appendChild(minTempTmrwParagraph)


    let dayAfterWeather = weatherObj.weather[2]
    let avgTempDayAfterParagraph = document.createElement('p')
    let avgTempDayAfter = dayAfterWeather.avgtempF
    avgTempDayAfterParagraph.innerHTML = `<b>Average Temperature:</b> ${avgTempDayAfter}°F`

    let maxTempDayAfterParagraph = document.createElement('p')
    let maxTempDayAfter = dayAfterWeather.maxtempF
    maxTempDayAfterParagraph.innerHTML = `<b>Max Temperature:</b> ${maxTempDayAfter}°F`

    let minTempDayAfterParagraph = document.createElement('p')
    let minTempDayAfter = dayAfterWeather.mintempF
    minTempDayAfterParagraph.innerHTML = `<b>Min Temperature:</b> ${minTempDayAfter}°F`

    let dayAfterHeading = document.createElement('h2')
    dayAfterHeading.innerText = "Day After"

    dayAfterSection.appendChild(dayAfterHeading)
    dayAfterSection.appendChild(avgTempDayAfterParagraph)
    dayAfterSection.appendChild(maxTempDayAfterParagraph)
    dayAfterSection.appendChild(minTempDayAfterParagraph)
}

const savePreviousSearch = (cityName, weatherObj) => {
    let currentlyFeelsLike = weatherObj.current_condition[0].FeelsLikeF
    previousSearchesArr.push({
        city: cityName,
        currTemp: currentlyFeelsLike,
        weatherObj: weatherObj
    })

    displayPreviousList()
}

// const displayPreviousList = () => {
//     if (previousSearchesArr.length > 0) {
//         let noPrevSearch = document.querySelector("#prevSearch > section > p")
//         noPrevSearch.innerText = ""
//         noPrevSearch.remove()


//         let prevSearchList = document.querySelector("#prevSearchList")
//         prevSearchList.innerHTML = "" 

//         for (let i = 0; i < previousSearchesArr.length; i++) {
//             let currPrevSearch = previousSearchesArr[i]
//             let listItem = document.createElement('li')
//             let city =  currPrevSearch.city
//             let currTemp = currPrevSearch.currTemp
//             listItem.innerHTML = `<a href="#">${city}</a> - ${currTemp}°F`
//             prevSearchList.appendChild(listItem)
//             listItem.addEventListener('click', () => {
//                 displayCurrWeather(currPrevSearch.weatherObj, city)
//                 displayWeather(currPrevSearch.weatherObj)
//             })
//         }
//     }
// }

const displayPreviousList = () => {
    if (previousSearchesArr.length > 0) {
        let noPrevSearch = document.querySelector("#prevSearch > section > p")

        if (noPrevSearch !== null) {
            noPrevSearch.remove()
        }

        let prevSearchList = document.querySelector("#prevSearchList")
        prevSearchList.innerHTML = "" 

        for (let i = 0; i < previousSearchesArr.length; i++) {
            let currPrevSearch = previousSearchesArr[i]
            let listItem = document.createElement('li')
            let city =  currPrevSearch.city
            let currTemp = currPrevSearch.currTemp
            listItem.innerHTML = `<a href="#">${city}</a> - ${currTemp}°F`
            prevSearchList.appendChild(listItem)
            listItem.addEventListener('click', () => {
                displayCurrWeather(currPrevSearch.weatherObj, city)
                displayWeather(currPrevSearch.weatherObj)
            })
        }
    }
}