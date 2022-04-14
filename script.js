
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

        // ASSIGN VARIABLES TO THE DATA RECEIVED FROM API VIA FETCH .THEN .. WHICH ARE ARRANGED AS AN ARRAY OF OBJECTS

        // create a variable for the city location which in API form is access through nearest_area array first element areaName array first element key value - MELBORNE
        const cityLocation  = data.nearest_area[0].areaName[0].value
        // create a variable for the country name which in API form is access through nearest_area array first element country array first element key value - AUSTRALIA
        const countryName = data.nearest_area[0].country[0].value
        // create a variable for the region which in API form is access through nearest_area array first element region array first element key value - ONTARIO
        const region = data.nearest_area[0].region[0].value
        // create a variable for the current condition which in API form is access through current_consition array first element areaName array second element key value - FeelsLikeF 
        const currentCondition = data.current_condition[1].FeelsLikeF

        console.log(cityLocation)
        console.log(countryName)
        console.log(region)
        console.log(currentCondition)
        const h2 = document.createElement('h2')
        h2.textContent = cityLocation
        main =  document.querySelector('main')
        main.append(h2)


        // CREATE 3 DIVS WITH TODAY TOMORROW AND THE DAYAFTER TOMORROW TEMPERATURES
        //today

        // create a variable for today's average temp which in API for is access through the weather array first element avgtempF key 
        const todayAvgTemp=data.weather[0].avgtempF
        // create a variable for today's max temp which in API for is access through the weather array first element maxtempF key 
        const todayMaxTemp = data.weather[0].maxtempF
        // create a variable for today's min temp which in API for is access through the weather array first element mintempF key 
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

        // create a variable for the area location in API form is access through the nearest_area first element areaName key  - 
        // const areaLocation = data.nearest_area[0].areaName
        const p = document.createElement('p')
        previous_city = {"cityName":cityLocation,"currentCondition":currentCondition}
        previousSearches.push(previous_city)
        console.log(previousSearches)



    })
    .catch((err => (err)))




});



    

