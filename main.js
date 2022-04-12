const h2 = document.querySelector('h2');
const form = document.querySelector('form');
const main = document.querySelector('main');
const ul = document.querySelector('ul');








form.addEventListener('submit', (event) =>{
    event.preventDefault();
    console.log(event.target.city.value);
    const inputCity = document.querySelector('#city').value;
    
    const BASE_URL = `https://wttr.in/${inputCity}?format=j1`;

    fetch(BASE_URL)
    .then((response) => response.json())
    .then((json) =>{
        console.log(json);
    })
})