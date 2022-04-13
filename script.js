
const form = document.querySelector('form');
previousSearches = [];
form.addEventListener('submit', (event) => {
    event.preventDefault();

    let location = event.target.location.value;

    let url = `https://wttr.in/${location}?format=j1`;

    // console.log(url)

    fetch(url)
    .then((res) => res.json())
    .then((data) => {

        const cityLocation  = data.nearest_area[0].areaName[0].value
        const countryName = data.nearest_area[0].country[0].value
        const region = data.nearest_area[0].region[0].value
        const currentCondition = data.current_condition[0].FeelsLikeF
        console.log(cityLocation)
        console.log(countryName)
        console.log(region)
        console.log(currentCondition)
        const h2 = document.createElement('h2')
        h2.textContent = cityLocation
        main =  document.querySelector('main')
        main.append(h2)

        //today
        const todayAvgTemp=data.weather[0].avgtempF
        const todayMaxTemp = data.weather[0].maxtempF
        const todayMinTemp = data.weather[0].mintempF

        //tomorrow
        const tomorrowAvgTemp = data.weather[1].avgtempF
        const tomorrowMaxTemp =data.weather[1].maxtempF
        const tomorrowMinTemp =data.weather[1].mintempF

        //dayAfterTomorrow
        const dayAfterAvgTemp = data.weather[2].avgtempF
        const dayAfterMaxTemp =data.weather[2].maxtempF
        const dayAfterMinTemp =data.weather[2].mintempF


        console.log(todayAvgTemp)
        console.log(tomorrowAvgTemp)
        console.log(dayAfterAvgTemp)

        const areaLocation = data.nearest_area[0].areaName
        const p = document.createElement('p')
        previous_city = {"cityName":cityLocation,"currentCondition":currentCondition}
        previousSearches.push(previous_city)
        console.log(previousSearches)



    })
    .catch((err => (err)))




});



    

