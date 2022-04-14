const form = document.querySelector('#weather');
const widget = document.querySelector('.widget form');
const h4 = document.querySelector('h4');
widget.append(h4);
console.log(widget);
const h2 = document.createElement('h2');
const main = document.querySelector('main');
main.prepend(h2);
const mainArticle = document.querySelector('main article');
const mainPara = document.querySelector('.child2 p');
const ul = document.querySelector('aside section ul');
const para2 = document.createElement('p');
const child3Section = document.querySelector('.child3 section');
child3Section.append(para2);
para2.textContent = 'No previous searches';
console.log(child3Section);
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
    const chanceOfSun = weatherData.weather[0].hourly[1].chanceofsunshine;
    const chanceOfRain = weatherData.weather[0].hourly[1].chanceofrain;
    const chanceOfSnow = weatherData.weather[0].hourly[1].chanceofsnow;
    const img1 = document.createElement('img');
    img1.setAttribute('class', 'chanceofsun');
    const img2 = document.createElement('img');
    img2.setAttribute('class', 'chanceofrain');
    const img3 = document.createElement('img');
    img3.setAttribute('class', 'chanceofsnow');
    const img4 = document.createElement('img');
    img4.setAttribute('class', 'chanceofsun');
    
    
    form.reset();

    mainPara.remove();

    mainArticle.innerHTML = `<h2>${area}</h2><br><strong>Area:</strong> ${area}<br><strong>Region:</strong> ${region}<br><strong>Country:</strong> ${country}<br><strong>Currently:</strong> Feels Like ${currently}ºF<br><strong>Chance of Sunshine:</strong> ${chanceOfSun}<br><strong>Chance of Rain:</strong> ${chanceOfRain}<br><strong>Chance of Snow:</strong> ${chanceOfSnow}`;

    // Found this solution at: `https://stackoverflow.com/questions/12274748/setting-multiple-attributes-for-an-element-at-once-with-javascript`, line 145
    // Helper function
    const setAttributes = (elem, attrs) => {
      for(let key in attrs) {
        elem.setAttribute(key, attrs[key]);
      }
    }

    setAttributes(img1, {'src': 'assets/icons8-summer.gif', 'alt': 'sun'});
    setAttributes(img2, {'src': 'assets/icons8-torrential-rain.gif', 'alt': 'rain'});
    setAttributes(img3, {'src': 'assets/icons8-light-snow.gif', 'alt': 'snow'});
    setAttributes(img4, {'src': 'assets/icons8-rain-cloud.gif', 'alt': 'partly cloudy'});


    if (Number(chanceOfSun) > 50) {
      mainArticle.prepend(img1);
    } else if (Number(chanceOfSun) <= 50 && Number(chanceOfSun) > 0) {
      mainArticle.prepend(img4);
    } else if (Number(chanceOfRain) > 50) {
      mainArticle.prepend(img2);
    } else if (Number(chanceOfSnow) > 50) {
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
    setAttributes(a, {'href': `https://wttr.in/${city}?format=j1`, 'target': '_blank'});

    li.append(a);
    ul.append(li);
    li.append(a);
    a.textContent = city;
    li.innerHTML += ` - ${currently}ºF`;

    console.log(ul)
    console.log(ul.childNodes)

    if(ul.childNodes.length >= 1) {
      para2.remove();
    }
    
  })
  

});

widget.addEventListener('change', (event) => {
  event.preventDefault();
  const idC = document.querySelector('#to-c');
  const idF = document.querySelector('#to-f');
  idC ? console.log(idC) : console.log(idF);
  
});

console.log(mainArticle)
console.log(widget)

