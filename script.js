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
      console.log(locationData);
      formatLocationData(locationData);
      createPreviousSearch(location, locationData);
      createForecasting(locationData);
     event.target.reset();
    })
    .catch((error) => {
      console.log(error);
    });
});
const formatLocationData = (locationData) => {
  
  const areaName = locationData.nearest_area[0].areaName[0].value;
  const regionLoc = locationData.nearest_area[0].region[0].value;
  const country = locationData.nearest_area[0].country[0].value;
  const feelsLike = locationData.current_condition[0].FeelsLikeF;

  const hourlySun = Number(locationData.weather[0].hourly[0].chanceofsunshine);
  const hourlyRain = Number(locationData.weather[0].hourly[0].chanceofrain);
  const hourlySnow = Number(locationData.weather[0].hourly[0].chanceofsnow);

if (!formatLocationData) {
  location = areaName;
}

let image;
if (hourlySun > 50) {
  image = `<img class="icon" alt="sun" src="./assets/icons8-summer.gif">\n`;
} else if (hourlyRain > 50) {
  image = `<img class="icon" alt="rain" src="./assets/icons8-torrential-rain.gif">\n`;
} else { (hourlySnow > 50) 
  image = `<img class="icon" alt="snow" src="./assets/icons8-light-snow.gif">\n`;
}

if (location !== areaName) {
  areaLabel = 'Nearest Area';
} else {
  areaLabel = 'Area';
}

  const main = document.querySelector('.display');
  main.innerHTML = '';

  const h4 = document.createElement('h4');
  h4.innerText = `${areaName}`;
  main.prepend(h4);

  const article = document.createElement('article');
  article.innerHTML = `${image}
  
    <p id="area" class="location-info">${areaLabel}: ${areaName}</p>
    <p id="region" class="location-info">Region: ${regionLoc}</p>
    <p id="country" class="location-info">Country: ${country}</p>
   <p id="feels-like" class="location-info">Feels Like: ${feelsLike}°F</p>
    
 <p id="img-desc" class="location-info">Chance of Sunshine:${hourlySun}%</p>
 <p id="img-desc" class="location-info">Chance of Rain:${hourlyRain}%</p>
 <p id="img-desc" class="location-info">Chance of Snow:${hourlySnow}%</p>
     `;
  h4.after(article);
};

let formatLocation = (location) => {
  return location.slice(0, 1).toUpperCase() + location.slice(1).toLowerCase();
};

const createPreviousSearch = (location, locationData) => {
  const orgLocation = formatLocation;
  document.querySelector('aside  .previous-search ').innerHTML = '';

  let formattedLoc, formattedClass;
  if (!location.includes('')) {
    formattedLoc = location
  } else {
    formattedLoc = formatLocation(location);
  }

  let doesLinkExist = document.querySelector(
    `.${formattedClass || formattedLoc}`
  );
  if (doesLinkExist) {
    doesLinkExist.remove();
  }

  const weather = locationData.current_condition[0].FeelsLikeF;
  const ul = document.querySelector('aside ul');
  const li = document.createElement('li');
  li.setAttribute('class', `${formattedClass || location}`);
  
  li.innerHTML = `<a href=#>${formattedLoc}</a>  - ${weather}°F`;
  ul.append(li);

  li.addEventListener('click', () => {
    let url = `https://wttr.in/${orgLocation}?format=j1`;
    fetch(url)
      .then((response) => response.json())
      .then((locationData) => {
        formatLocationData(locationData);
        createPreviousSearch(location, locationData);
        createForecasting(locationData);
      })
     
  });
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
const tempConversion = document.querySelector(
  'aside.temperature-conversion form'
);
tempConversion.addEventListener('submit', (event) => {
  event.preventDefault();

  const temperature = event.target.querySelector('#temp-to-convert').value;

  const tempTypes = event.target.querySelectorAll('.temperature');

  if (tempTypes[0].checked) {
    event.target.querySelector('h4').textContent = `°F is equivalent to ${(
      ((temperature - 32) * 5) /
      9
    ).toFixed(2)} °C`;
  } else if (tempTypes[1].checked) {
    event.target.querySelector('h4').textContent = `°C is equivalent to ${(
      (temperature * 9) / 5 +
      32
    ).toFixed(2)} °F`;
  }
});