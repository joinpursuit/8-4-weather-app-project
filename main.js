const form = document.querySelector('#weather');
// console.log(form);
const main = document.querySelector('main');
const p1 = document.createElement('p');
// console.log(main);
main.prepend(p1);
// console.log(main);
p1.textContent = 'Choose a location to view the weather.'
// console.log(main);




form.addEventListener('submit', (event)=>{
    event.preventDefault();
    // console.log(event.target);
    const city= document.querySelector('#city').value;
    const location = document.getElementById('main #location');
    // console.log(city);
    fetch(`https://wttr.in/${city}?format=j1`)
    .then((response) => response.json())
    .then((jsonData)=> {
        const jsonWeatherData = jsonData;
        // console.log(jsonWeatherData);
        const area = jsonWeatherData.nearest_area[0].areaName[0].value;
        // console.log(area);
        const region = jsonWeatherData.nearest_area[0].region[0].value;
        // console.log(region); 
        const country = jsonWeatherData.nearest_area[0].country[0].value;
        // console.log(country);
        const currentCondition = jsonWeatherData.current_condition[0].FeelsLikeF;
        // console.log(currentCondition);
        const mainH2 = document.querySelector('main h2');
        // console.log(mainArticle);
        mainH2.textContent = city;
        // console.log(city);
        const mainArticle = document.querySelector('main article');
        // 
        mainArticle.innerHTML = `<strong>Area:</strong> ${area}<br><strong>Region:</strong> ${region}<br><strong>Country:</strong> ${country}<br><strong>Currently:</strong> Feels Like ${currentCondition}℉`;

        p1.remove();

        
    })
    
    form.reset();
})



























































// const h2 = document.querySelector('h2');
// const form = document.querySelector('form');
// const main = document.querySelector('main');
// const ul = document.querySelector('ul');
// const li = document.createElement('li');
// const a = document.createElement('a');
// li.append(a);

// let response;








// form.addEventListener('submit', (event) =>{
//     event.preventDefault();
//     console.log(event.target.city.value);
//     const inputCity = document.querySelector('#city').value;
    
//     const BASE_URL = `https://wttr.in/${inputCity}?format=j1`;

//     fetch(BASE_URL)
//     .then((response) => response.json())
//     .then((json) =>{
//         console.log(json);
//     })
// })
