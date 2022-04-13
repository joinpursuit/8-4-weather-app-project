const form = document.querySelector('form');
form.addEventListener('submit', (event) => {
    event.preventDefault();
    event.target.userInput.value
    console.log(event.target.userInput.value);
    const BASE_URL = `https://wttr.in/${event.target.userInput.value}?format=j1`;
    getWeather(BASE_URL);
});

const getWeather = BASE_URL => {
    fetch(BASE_URL)
    .then((response) => response.json())
    .then((json) => {
        console.log(json)
    })
}