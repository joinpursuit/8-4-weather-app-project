let link = `https://wttr.in/${city}?format=j1`;

let apiData;
function getApiData() {
    fetch(link)
    .then((response) => response.json())
    .then((json) => (apiData = json))
}
