const API = "http://wttr.in";
const query = "?format=j1";


let weaInfo;
const form = document.querySelector('form');
const currentWeather = document.querySelector("#curWea");
const ul = document.querySelector("ul");
const noPre = document.querySelector("#noPre");



form.addEventListener('submit', (event) => {
    event.preventDefault();
    const place = document.querySelector('#cityName');
    let input = place.value;//form input name
    acqWeaInfo(input);
    form.reset();
    noPre.remove();//changes "No previous searches" to the searched city
});


function acqWeaInfo(input) {
    const URL = `${API}/${input}${query}`
    fetch(`${API}/${input}${query}`)
        .then((response) => response.json())
        .then((response) => {
            weaInfo = response; //weaInfo is == the JSON  API data 
            acqWea2(weaInfo, input);
            pastSearches(weaInfo, input);
        })
        .catch((err) => {
            console.log(err);
        })
}

function acqWea2(weaInfo, input) {
    let nArea = weaInfo.nearest_area[0].areaName[0].value
    let wRegion = weaInfo.nearest_area[0].region[0].value
    let wCountry = weaInfo.nearest_area[0].country[0].value
    let wFeels = weaInfo.current_condition[0].FeelsLikeF
    curWea.innerHTML = "";//creates empty string


        const h2 = document.createElement("h2");
        const area = document.createElement("p");
            h2.textContent = input;
            area.innerHTML = `<strong> Nearest Area: </strong> ${nArea}`;//
            currentWeather.append(h2, area);
    
      const region = document.createElement("p");
      const country = document.createElement("p");
      const currently = document.createElement("p");
        region.innerHTML = `<strong> Region: </strong> ${wRegion}`;
        country.innerHTML = `<strong> Country: </strong> ${wCountry}`;
        currently.innerHTML = `<strong> Currently: </strong> Feels Like ${wFeels}°F`;
        currentWeather.append(region, country, currently );

      const upComingWea = document.querySelectorAll(".upComingWea");
      const upComingWea1 = upComingWea[0];
      const upComingWea2 = upComingWea[1];
      const upComingWea3 = upComingWea[2];
   
   
    //TODAY Lower Upcoming Weather
    upComingWea1.innerHTML = "";
    upComingWea1.style = "border: 1px solid gray";
      const today = document.createElement("h2");
      const avgTemp = document.createElement("p");
      const maxTemp = document.createElement("p");
      const minTemp = document.createElement("p");
        today.textContent = "Today";
        avgTemp.innerHTML = `<strong> Average Temperature: </strong> ${weaInfo.weather[0].avgtempF}°F`;
        maxTemp.innerHTML = `<strong> Max Temperature: </strong> ${weaInfo.weather[0].maxtempF}°F`;
        minTemp.innerHTML = `<strong> Min Temperature: </strong> ${weaInfo.weather[0].mintempF}°F`;
        upComingWea1.append(today, avgTemp, maxTemp, minTemp );

    //TOMORROW Lower Upcoming Weather
    upComingWea2.innerHTML = "";
    upComingWea2.style = "border: 1px solid gray";
      const tomorrowWeather = document.createElement("h2");
      const tomorrowAvgTemp = document.createElement("p");
      const tomorrowMaxTemp = document.createElement("p");
      const tomorrowMinTemp = document.createElement("p");
        tomorrowWeather.textContent = "Tomorrow";
        tomorrowAvgTemp.innerHTML = `<strong> Average Temperature: </strong> ${weaInfo.weather[1].avgtempF}°F`;
        tomorrowMaxTemp.innerHTML = `<strong> Max Temperature: </strong> ${weaInfo.weather[1].maxtempF}°F`;
        tomorrowMinTemp.innerHTML = `<strong> Min Temperature: </strong> ${weaInfo.weather[1].mintempF}°F`;
        upComingWea2.append(tomorrowWeather, tomorrowAvgTemp, tomorrowMaxTemp, tomorrowMinTemp);

    //DAY AFTER Lower Upcoming Weather
    upComingWea3.innerHTML = "";
    upComingWea3.style = "border: 1px solid gray";
      const DAT = document.createElement("h2");
      const DATAvgTemp = document.createElement("p");
      const DATMaxTemp = document.createElement("p");
      const DATMinTemp = document.createElement("p");
        DAT.textContent = "Day After Tomorrow";
        DATAvgTemp.innerHTML = `<strong> Average Temperature: </strong> ${weaInfo.weather[2].avgtempF}°F`;
        DATMaxTemp.innerHTML = `<strong> Max Temperature: </strong> ${weaInfo.weather[2].maxtempF}°F`;
        DATMinTemp.innerHTML = `<strong> Min Temperature: </strong> ${weaInfo.weather[2].mintempF}°F`;
        upComingWea3.append(DAT, DATAvgTemp, DATMaxTemp,DATMinTemp);
        

}
    function pastSearches(weaInfo, input) {
      const span = document.createElement("span");
      const a = document.createElement("a");
      const li = document.createElement("li");
      let nArea=weaInfo.nearest_area[0].areaName[0].value
        a.textContent = `${nArea}`;
        a.setAttribute("href", "#");
        li.textContent = ` - ${weaInfo.current_condition[0].FeelsLikeF}°F`;
        ul.append(li);
        li.prepend(a);
        a.addEventListener("click", (event) => {
        acqWea2(weaInfo, input);
    })

}


