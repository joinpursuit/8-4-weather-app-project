let data;
let userData;

const form = document.querySelector('form');
form.addEventListener('submit', (event) => {
    event.preventDefault();
    userData = event.target.userInput.value
    console.log(userData)
    // const BASE_URL = `https://wttr.in/${userData}?format=j1`;
    fetch(`https://wttr.in/${userData}?format=j1`)
    .then((response) => response.json())
    .then((json) => {
        data = json
        console.log(data)

        getWeather(data)
    })
    .catch((error) => {
        alert(error)
    })
});

const getWeather = data => {
    if (userData) {
        const article = document.querySelector('#current-weather')
        article.textContent = `${data.nearest_area[0].areaName[0].value.toUpperCase()}
        Area: ${data.nearest_area[0].areaName[0].value}
        Region: ${data.nearest_area[0].region[0].value}
        Country: ${data.nearest_area[0].country[0].value}
        Currently: Feels Like ${data.current_condition[0].FeelsLikeF}`

        const article2 = document.querySelector('#today')
        article2.textContent = `TODAY \nAverage Temperature: ${data.weather[0].avgtempF} \nMax Temperature: ${data.weather[0].maxtempF} \nMin Temperature: ${data.weather[0].mintempF}`

        const article3 = document.querySelector('#tomorrow')
        article3.textContent = `TOMORROW \nAverage Temperature: ${data.weather[1].avgtempF} \nMax Temperature: ${data.weather[1].maxtempF} \nMin Temperature: ${data.weather[1].mintempF}`

        const article4 = document.querySelector('#day-after-tomorrow')
        article4.textContent = `TODAY \nAverage Temperature: ${data.weather[2].avgtempF} \nMax Temperature: ${data.weather[2].maxtempF} \nMin Temperature: ${data.weather[2].mintempF}`

    } else {
        error
    }
}



















// const getWeather = BASE_URL => {
//     fetch(BASE_URL)
//     .then((response) => response.json())
//     .then((json) => {
//         // console.log(json)
//         const currentCondition = json.current_condition
//         const nearestArea = json.nearest_area

//         createWeatherApp(data);
//     })
// }