const form = document.querySelector('#weather');
const h2 = document.createElement('h2');
const main = document.querySelector('main');
main.prepend(h2);

let response;

form.addEventListener('submit', (event) => {
  event.preventDefault();
  console.log(event.target);
  const city = document.querySelector('#search-weather').value;

  fetch(`https://wttr.in/${city}?format=j1`)
  .then((response) => response.json())
  .then((json) => {
    const weatherData = json;
    const area = weatherData.nearest_area[0].areaName[0].value;
    const region = weatherData.nearest_area[0].region[0].value;
    const country = weatherData.nearest_area[0].country[0].value;
    const currently = weatherData.current_condition[0].FeelsLikeF;

    const prompt = document.querySelector('main p');
    prompt.innerHTML = `<h2>${area}</h2><br><strong>Area:</strong> ${area}<br><strong>Region:</strong> ${region}<br><strong>Country:</strong> ${country}<br><strong>Currently:</strong> Feels like ${currently}ºF`;

    const today = document.querySelector('.next #today');
    const h3 = document.createElement('h3');
    const todayAveTemp = weatherData.weather[0].avgtempF;
    const todayMaxTemp = weatherData.weather[0].maxtempF;
    const todayMinTemp = weatherData.weather[0].mintempF;
    // if (weatherData.weather[0].date[weatherData.weather[0].date.length-1] === weatherData.weather[0])
    // const tomorrowAveTemp = weatherData.weather[0].avgtempF;
    // const tomorrowMaxTemp = weatherData.weather[0].maxtempF;
    // const tomorrowMinTemp = weatherData.weather[0].mintempF;
    // const afterAveTemp = weatherData.weather[0].avgtempF;
    // const afterMaxTemp = weatherData.weather[0].maxtempF;
    // const afterMinTemp = weatherData.weather[0].mintempF;
    
    for (let aveTemp in weatherData.weather[0]) {
      console.log(aveTemp);
    }


    today.append(h3);
    // console.log(today);
    today.innerHTML = `<h3>Today</h3><br><strong>Average Temperature:</strong> ${todayAveTemp}<br><strong>Max Temperature:</strong> ${todayMaxTemp}<br><strong>Min Temperature:</strong> ${todayMinTemp}`;

    tomorrow.append(h3);
    tomorrow.innerHTML = `<h3>Tomorrow</h3><br><strong>Average Temperature:</strong> ${todayAveTemp}<br><strong>Max Temperature:</strong> ${todayMaxTemp}<br><strong>Min Temperature:</strong> ${todayMinTemp}`;

    after.append(h3);
    after.innerHTML = `<h3>Day After Tomorrow</h3><br><strong>Average Temperature:</strong> ${todayAveTemp}<br><strong>Max Temperature:</strong> ${todayMaxTemp}<br><strong>Min Temperature:</strong> ${todayMinTemp}`;
  })
  
  form.reset();
  
});

