
const form = document.querySelector('form');
var cloc = document.getElementById("citylocation")
var carea = document.getElementById("cityarea")
var cregion = document.getElementById("cityregion")
var ccountry= document.getElementById("citycountry")
var ccurrent= document.getElementById("citycurrent")
const ps=document.querySelector(".previous-search")
const ul=document.querySelector(".previous-search-list")
var s=document.getElementsByTagName("span")
// previousSearches = [];
form.addEventListener('submit', (event) => {
    event.preventDefault();

    // let input = 
    let location = event.target.location.value;
    getWeatherInfo(location)
    ps.remove()
    
    form.reset();


});

function getWeatherInfo(location){
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

        
        cloc.innerHTML=`${location}`
        carea.innerHTML =`<b>Nearest Area</b> : ${cityLocation}`
        cregion.innerHTML =`<b>Region</b> : ${region}`
        ccountry.innerHTML =`<b>Country </b>: ${countryName}`
        ccurrent.innerHTML=`<b>Currently : </b> Feels like ${currentCondition} F`


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


        // console.log(todayAvgTemp)
        // console.log(tomorrowAvgTemp)
        // console.log(dayAfterAvgTemp)

        const today=document.getElementById("today")

        th1 =document.createElement("strong")
        th1.textContent="Today"
        p1=document.createElement("p")
        p1.innerHTML=`<strong>Average Temperature :</strong> ${todayAvgTemp}F`
        p2=document.createElement("p")
        p2.innerHTML=`<strong>Max Temperature : </strong> ${todayMaxTemp} F`
        p3=document.createElement("p")
        p3.innerHTML=`<strong>Min Temperature : </strong>${todayMinTemp} F`

        today.appendChild(th1)
        today.appendChild(p1)
        today.appendChild(p2)
        today.appendChild(p3)

        const tomorrow=document.getElementById("tomorrow")

        th1 =document.createElement("strong")
        th1.textContent="Tomorrow"
        p4=document.createElement("p")
        p4.innerHTML=`<strong>Average Temperature :</strong> ${dayAfterAvgTemp} F`
        p5=document.createElement("p")
        p5.innerHTML=`<strong>Max Temperature : </strong> ${dayAfterMaxTemp} F`
        p6=document.createElement("p")
        p6.innerHTML=`<strong>Min Temperature : </strong>${dayAfterMinTemp} F`

        tomorrow.appendChild(th1)
        tomorrow.appendChild(p4)
        tomorrow.appendChild(p5)
        tomorrow.appendChild(p6)

        const dayAfter=document.getElementById("dayAfter")

        th1 =document.createElement("strong")
        th1.textContent="dayAfter"
        p7=document.createElement("p")
        p7.innerHTML=`<strong>Average Temperature :</strong> ${tomorrowAvgTemp} F`
        p8=document.createElement("p")
        p8.innerHTML=`<strong>Max Temperature : </strong> ${tomorrowMaxTemp} F`
        p9=document.createElement("p")
        p9.innerHTML=`<strong>Min Temperature : </strong> ${tomorrowMinTemp} F`

        dayAfter.appendChild(th1)
        dayAfter.appendChild(p7)
        dayAfter.appendChild(p8)
        dayAfter.appendChild(p9)
        
        const p = document.createElement('p')
        // previous_city = {"cityName":cityLocation,"currentCondition":currentCondition}
        // previousSearches.push(previous_city)
        // console.log(previousSearches)

        previousSearch(data,location);
        



    })
    .catch((err => alert(err)))

}
const convertForm = document.getElementById("convertForm")
convertForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const tempInput = document.getElementById("temp-to-convert");
    let value = tempInput.value;

    if(!value){
        alert("Temperature value cannot be empty")
        return;
    }
    let cRadio = document.getElementById("to-c");
    let fRadio = document.getElementById("to-f");

    if(cRadio.checked){
        let cel = (value - 32) * (5 / 9);
        cel = cel.toFixed(2);
        tempCalcResult.textContent = cel;
    } else if (fRadio.checked){
        let fah = (value * 9) / 5 + 32;
        fah = fah.toFixed(2);
        tempCalcResult.textContent = fah;
    } else {
        alert("Please select a unit");
    }
});


function  previousSearch(data,location) {
    const li=document.createElement("li");
    const a= document.createElement("a");

    a.textContent=`${data.nearest_area[0].areaName[0].value}`
    a.setAttribute("href","#")
    li.textContent=`${data.current_condition[0].FeelsLikeF} F`;
    ul.append(li);
    li.prepend(a);

    a.addEventListener('click',(event)=>{
        

        getWeatherInfo(location)
    })
    
}


    
// function iconData(data, location){

//  const article = document.getElementById("icon")

//  const img = document.createElement(img)

//  if(data.wearher[0].hourly.chanceofsunchsine >= 50){
//      img.src = "./assets/icons8-summer.gif";
//      img.alt = "sun";
//     //  article.append(img);
//  } else if (data.weather[0].hourly.chanceofrain >=50){
//      img.src = "./assets/icons8-torrential-rain.gif"
//      img.alt = "rain"
//     //  article.append(img)
//  } else if (data.weather[0].hourly.chanceofsnow >=50){
//     img.src = "./assets/icons8-light-snow.gif"
//     img.alt = "snow"
//     // article.append(img)
//  }





// }
