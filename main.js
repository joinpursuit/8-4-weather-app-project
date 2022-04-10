const BASE_URL = "https://wttr.in"
const formSearch = document.querySelector("#searchForm")
formSearch.addEventListener('submit', (event) => {
    event.preventDefault();
    const location = document.querySelector("#place");
    const place = location.value;
    getWeather(place);
})

function getWeather(place) {
  fetch(`${BASE_URL}/${place}?format=j1`)
  .then((response) => response.json())
  .then((json) => {
  console.log(json);
  })
}





