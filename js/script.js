const form = document.querySelector('#weather');
const widget = document.querySelector('.widget form');
const h4 = document.querySelector('h4');
widget.append(h4);
const img1 = document.createElement('img');
const img2 = document.createElement('img');
const img3 = document.createElement('img');
const h2 = document.createElement('h2');
const main = document.querySelector('main');
const mainArticle = document.querySelector('main article');
main.prepend(h2);
const mainPara = document.querySelector('main p');
const ul = document.querySelector('aside section ul');
const para2 = document.createElement('p');
const child4Section = document.querySelector('aside section');
child4Section.append(para2);
para2.textContent = 'No previous searches';

let response;

form.addEventListener('submit', (event) => {
  event.preventDefault();

  const city = document.querySelector('#search-weather').value;

  fetch(`https://wttr.in/${city}?format=j1`)
  .then((response) => response.json())
  .then((json) => {
    const weatherData = json;
    const area = weatherData.nearest_area[0].areaName[0].value;
    const region = weatherData.nearest_area[0].region[0].value;
    const country = weatherData.nearest_area[0].country[0].value;
    const currently = weatherData.current_condition[0].FeelsLikeF;
    const chanceOfSun = weatherData.weather[0].hourly[1].chanceofsunshine;
    const chanceOfRain = weatherData.weather[0].hourly[1].chanceofrain;
    const chanceOfSnow = weatherData.weather[0].hourly[1].chanceofsnow;
    
    form.reset();

    mainPara.remove();

    mainArticle.innerHTML = `<h2>${area}</h2><p><strong>Area:</strong> ${area}</p><p><strong>Region:</strong> ${region}</p><p><strong>Country:</strong> ${country}</p><p><strong>Currently:</strong> Feels Like ${currently}ºF</p><p><strong>Chance of Sunshine:</strong> ${chanceOfSun}</p><p><strong>Chance of Rain:</strong> ${chanceOfRain}</p><p><strong>Chance of Snow:</strong> ${chanceOfSnow}</p>`;

    

    
    // Found this solution at: `https://stackoverflow.com/questions/12274748/setting-multiple-attributes-for-an-element-at-once-with-javascript`, line 145
    // Helper function
    
    const setAttributes = (elem, attrs) => {
      for(let key in attrs) {
        elem.setAttribute(key, attrs[key]);
      }
    }
    
    setAttributes(img1, {'src': './assets/icons8-summer.gif', 'alt': 'sun'});
    setAttributes(img2, {'src': './assets/icons8-torrential-rain.gif', 'alt': 'rain'});
    console.log(img2)
    setAttributes(img3, {'src': './assets/icons8-light-snow.gif', 'alt': 'snow'});
    console.log(img3)
    
    if (Number(chanceOfSun) > 50) {
      mainArticle.prepend(img1);
    } 
    if (Number(chanceOfRain) > 50) {
      mainArticle.prepend(img2);
    }
    if (Number(chanceOfSnow) > 50) {
      mainArticle.prepend(img3);
    }

    const today = document.querySelector('.next #today');
    const tomorrow = document.querySelector('.next #tomorrow');
    const after = document.querySelector('.next #after');

    const h3 = document.createElement('h3');
    const todayAveTemp = weatherData.weather[0].avgtempF;
    const todayMaxTemp = weatherData.weather[0].maxtempF;
    const todayMinTemp = weatherData.weather[0].mintempF;
    const tomorrowAveTemp = weatherData.weather[1].avgtempF;
    const tomorrowMaxTemp = weatherData.weather[1].maxtempF;
    const tomorrowMinTemp = weatherData.weather[1].mintempF;
    const afterAveTemp = weatherData.weather[2].avgtempF;
    const afterMaxTemp = weatherData.weather[2].maxtempF;
    const afterMinTemp = weatherData.weather[2].mintempF;
    
    today.append(h3);
    today.innerHTML = `<h3>Today</h3><br><strong>Average Temperature:</strong> ${todayAveTemp}<br><strong>Max Temperature:</strong> ${todayMaxTemp}<br><strong>Min Temperature:</strong> ${todayMinTemp}`;

    tomorrow.append(h3);
    tomorrow.innerHTML = `<h3>Tomorrow</h3><br><strong>Average Temperature:</strong> ${tomorrowAveTemp}<br><strong>Max Temperature:</strong> ${tomorrowMaxTemp}<br><strong>Min Temperature:</strong> ${tomorrowMinTemp}`;

    after.append(h3);
    after.innerHTML = `<h3>Day After Tomorrow</h3><br><strong>Average Temperature:</strong> ${afterAveTemp}<br><strong>Max Temperature:</strong> ${afterMaxTemp}<br><strong>Min Temperature:</strong> ${afterMinTemp}`;

    const li = document.createElement('li');
    const a = document.createElement('a');
    
    

    // Call the helper function
    setAttributes(a, {'href': '#'});

    li.append(a);
    ul.append(li);
    li.append(a);
    a.textContent = city;
    li.innerHTML += ` - ${currently}ºF`;

    if(ul.childNodes.length >= 1) {
      para2.remove();
    }


    
  })
  

});

widget.addEventListener('submit', (event) => {
  event.preventDefault();

  const degrees = event.target.convert.value;
  console.log(degrees)
  let temp = document.querySelector('#temp-to-convert').value;
  temp = Number(temp);
  const convertTemp = document.querySelector('.widget h4');

  let celsius = (temp - 32) * 5 / 9;
  celsius = celsius.toFixed(2);
    
  let fahrenheit = (temp * 1.8) + 32;
  fahrenheit = fahrenheit.toFixed(2);
  console.log(celsius, fahrenheit)
  if (degrees === 'c') {
    convertTemp.innerHTML = celsius;
  }
  if (degrees === 'f') { 
    convertTemp.innerHTML = fahrenheit;
  }

  widget.reset();
  

});



