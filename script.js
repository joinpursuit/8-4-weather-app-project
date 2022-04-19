const form = document.querySelector('form');

form.addEventListener('submit', (event) => {
  event.preventDefault();
  let location = event.target.location.value;
  if (location.includes(' ')) {
    location = location.split(' ').join('');
  }

  let url = `https://wttr.in/${location}?format=j1`;
  fetch(url)
    .then((response) => response.json())
    .then((locationData) => {
      console.log(locationData)
      formatLocationData(locationData);
      createPreviousSearch(location, locationData);
      createForecasting(locationData);
      form.reset();
    })
    .catch((error) => {
      console.log(error);
    });
});
const formatLocationData = (locationData) => {
  const { nearest_area, current_condition } = locationData;
  const [areaInfo] = nearest_area;
  const { areaName, country, region } = areaInfo;
  const feelsLike = current_condition[0].FeelsLikeF;
  const weatherDesc = current_condition[0].weatherDesc[0].value
 

const hourlySun = locationData.weather[0].hourly[0].chanceofsunshine;
const hourlyRain = locationData.weather[0].hourly[0].chanceofrain;
const hourlySnow = locationData.weather[0].hourly[0].chanceofsnow;












  

  const main = document.querySelector('.display');
  main.innerText = '';

  const h4 = document.createElement('h4');
  h4.innerText = `${areaName[0].value}`;
  main.prepend(h4);

  const article = document.createElement('article');
  article.innerHTML = `
  <img src="./assets/icons8-summer.gif" alt="sun" />
  
    <p id="area" class="location-info">Area: ${areaName[0].value}</p>
    <p id="region" class="location-info">Region: ${region[0].value}</p>
    <p id="country" class="location-info">Country: ${country[0].value}</p>
   <p id="feels-like" class="location-info">Feels Like: ${feelsLike}°F</p>
     <p id="weather-desc" class="location-info">${weatherDesc}</p>
 <p id="img-desc" class="location-info">Chance of Sunshine:${hourlySun}</p>
 <p id="img-desc" class="location-info">Chance of Rain:${hourlyRain}</p>
 <p id="img-desc" class="location-info">Chance of Snow:${hourlySnow}</p>
     `;
  h4.after(article);
  


};




let formatLocation = (location) => {
  return location.slice(0, 1).toUpperCase() + location.slice(1).toLowerCase();
};

const createPreviousSearch = (location, locationData) => {
  const orgLocation = location;
  document.querySelector('aside  .previous-search ').innerText = '' ;
    
  

  let formattedLoc, formattedClass;
  if (location.includes('')) {
    formattedLoc = location
      .split(' ')
      .map((word) => formatLocation(word))
      .join(' ');
    formattedClass = formattedLoc.split(' ').join(' ');
  } else {
    formattedLoc = formatLocation(location)
  }
  


  let doesLinkExist = document.querySelector(`.${formattedClass || formattedLoc}`);
  if (doesLinkExist) {
    doesLinkExist.remove();
  
  }
  

  const weather = locationData.current_condition[0].FeelsLikeF;
  const ul = document.querySelector('aside ul');
  const li = document.createElement('li');
  li.setAttribute('class', `${formattedClass || location}`);

 
   li.innerHTML = `<a href="#">${formattedLoc}</a>  - ${weather}°F`;
  
 

  
  li.addEventListener('click', () => {
    let url = `https://wttr.in/${orgLocation}?format=j1`;
    fetch(url)
      .then((response) => response.json())
      .then((locationData) => {
        formatLocationData(locationData);
        createPreviousSearch(location, locationData);
        createForecasting(locationData);
      })
      .catch((error ) => {
        console.log(error);
      });
  });
  ul.append(li);
};

const createForecasting = (locationData) => {
  let forecast = locationData.weather;
  console.log(locationData);
  document.querySelectorAll('.forecastDay').forEach((day) => {
    day.remove();
  });

  const aside = document.createElement('aside');
  aside.id = 'forecast';
  document.querySelector('.display').append(aside);

  let days = ['Today', 'Tomorrow', 'Day After Tomorrow'];

  days.forEach((day, index) => {
    const article = document.createElement('article');
    article.classList.add('forecastDay');
    const h2 = document.createElement('h2');
    h2.innerText = day;
    const p1 = document.createElement('p');
    p1.innerText = `Average Temperature: ${forecast[index].avgtempF}°F`;
    const p2 = document.createElement('p');
    p2.innerText = `Max Temperature: ${forecast[index].maxtempF}°F`;
    const p3 = document.createElement('p');
    p3.innerText = `Min Temperature: ${forecast[index].mintempF}°F`;
    
    aside.append(article);
    article.append(h2);
    article.append(p1);
    article.append(p2);
    article.append(p3);
    





  });




};

