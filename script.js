const BASE_URL = 'https://wttr.in';

fetch(`${BASE_URL}`)
    .then ((res) => res.json())
    .then((data) => {
       console.log(data)
    
    })

const form = document.querySelector('.event form');

form.addEventListener('submit', (e) =>{
    e.preventDefault();

    const input = document.querySelector('input');

    const locationSearch = e.target.type.value;
    
    getWeatherSearch(locationSearch);

});

function getWeatherSearch(locationSearch){
    


}