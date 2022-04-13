const API_URL = "https://wttr.in/";
const wttrJSON = "?format=j1";

const searchForm = document.getElementById("form");
searchForm.addEventListener("submit", (e) => {
    e.preventDefault();
    console.log(apiCall(searchForm.location.value));
    //console.log(searchForm.location.value);
});

const apiCall = ((location) => {
    const search = API_URL + location + wttrJSON;
    let results;
    fetch(search)
    .then((weather) => weather.json())
    .then((weather) => {
        //console.log(weather);
        results = weather;
    })
    .catch((error) => console.log("ERROR HERE: ", error));
    return results;
});