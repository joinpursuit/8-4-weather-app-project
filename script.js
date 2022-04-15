
const form = document.querySelector('form');
var cloc = document.getElementById("citylocation")
var carea = document.getElementById("cityarea")
var cregion = document.getElementById("cityregion")
var ccountry= document.getElementById("citycountry")
var ccurrent= document.getElementById("citycurrent")
const ps=document.querySelector(".previous-search")
const psl=document.querySelector(".previous-search-list")
previousSearches = [];
form.addEventListener('submit', (event) => {
    event.preventDefault();

    // let input = 
    let location = event.target.location.value;

    let url = `https://wttr.in/${location}?format=j1`;

    console.log(url)

    fetch(url)
    .then((res) => res.json())
    .then((data) => {
        console.log("DATA:",data)

        // ASSIGN VARIABLES TO THE DATA RECEIVED FROM API VIA FETCH .THEN .. WHICH ARE ARRANGED AS AN ARRAY OF OBJECTS

        // create a variable for the city location which in API form is access through nearest_area array first element areaName array first element key value - MELBORNE
        var cityLocation  = data.nearest_area[0].areaName[0].value
        // create a variable for the country name which in API form is access through nearest_area array first element country array first element key value - AUSTRALIA
        var countryName = data.nearest_area[0].country[0].value
        // create a variable for the region which in API form is access through nearest_area array first element region array first element key value - ONTARIO
        var region = data.nearest_area[0].region[0].value
        // create a variable for the current condition which in API form is access through current_consition array first element areaName array second element key value - FeelsLikeF 
        var currentCondition = data.current_condition[0].FeelsLikeF

        console.log(cityLocation)
        // console.log(countryName)
        // console.log(region)
        // console.log(currentCondition)
        // const h2 = document.createElement('h2')
        // const h2Text = document.createTextNode(`${cityLocation}`)
        // h2.appendChild(h2Text)
        // main =  document.getElementsByClassName("main")[1]
        // main.appendChild(h2)

        
        cloc.innerHTML=`${location}`
        carea.innerHTML =`<b>Area</b> : ${cityLocation}`
        cregion.innerHTML =`<b>Region</b> : ${region}`
        ccountry.innerHTML =`<b>Country </b>: ${countryName}`
        ccurrent.innerHTML=`<b>Currently : </b>Feels like ${currentCondition}F`


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

        
        const p = document.createElement('p')
        previous_city = {"cityName":cityLocation,"currentCondition":currentCondition}
        previousSearches.push(previous_city)
        console.log(previousSearches)

        if(previousSearches){
            for(let i=0;i<previousSearches.length;i++){
                li=document.createElement('li')
                link=document.createElement("a")
                linkText=document.createTextNode(previousSearches[i].cityName)
                current = document.createTextNode(`${currentCondition}F`)
                link.appendChild(linkText)
                li.appendChild(link)
                ps.innerHTML=li
            }

            
            
        }else{
            ps.innerHTML="No previous searches"
        }

        



    })
    .catch((err => alert(err)))




});



    

