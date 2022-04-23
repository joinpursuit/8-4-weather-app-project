const form = document.querySelector('#weather');
// console.log(form);
const main = document.querySelector('main');
const p1 = document.createElement('p');
// console.log(main);
main.prepend(p1);
// console.log(main);
p1.textContent = 'Choose a location to view the weather.'
// console.log(main);
const noPreSe = document.createElement('p');
noPreSe.textContent = 'No previous search';
// console.log(noPreSe);
const asideSection = document.querySelector('aside section');
asideSection.append(noPreSe);
const widget = document.querySelector('.widget');

const form2 = document.querySelector('.widget form')



form.addEventListener('submit', (event)=>{
    event.preventDefault();
    // console.log(event.target);
    const city= document.querySelector('#city').value;
    // const location = document.getElementById('main #location');
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
        const chanceSun = jsonWeatherData.weather[0].hourly[1].chanceofsunshine;
        const chanceRain = jsonWeatherData.weather[0].hourly[1].chanceofrain;
        const chanceSnow = jsonWeatherData.weather[0].hourly[1].chanceofsnow;


        form.reset();

        const mainArticle = document.querySelector('main article');


        const sunImg = document.createElement('img');
        const rainImg = document.createElement('img');
        const snowImg = document.createElement('img');



        snowImg.setAttribute('src','assets/icons8-light-snow.gif');
        snowImg.setAttribute('alt', 'snow');
        console.log(snowImg);
        sunImg.setAttribute('src','assets/icons8-summer.gif');
        sunImg.setAttribute('alt', 'sun');
        rainImg.setAttribute('src', 'assets/icons8-torrential-rain.gif');

        mainArticle.prepend(snowImg)


        if (Number(chanceSnow) > 50) {
            main.prepend(snowImg);
            
        }
        else if (Number(chanceRain) > 50) {
            main.prepend(rainImg);
        }

        else if (Number(chanceSun) > 50){
            main.prepend(sunImg);
        }
        const mainH2 = document.querySelector('main h2');
       ;
        mainH2.textContent = city;
        // console.log(city);
        
     
        mainArticle.innerHTML = `<strong>Area:</strong> ${area}<br><strong>Region:</strong> ${region}<br><strong>Country:</strong> ${country}<br><strong>Currently:</strong> Feels Like ${currentCondition}℉`;

        form.reset();
        const today = document.getElementById('today');
        // console.log(today);
        const tomorrow = document.getElementById('tomorrow');
        // console.log(tomorrow);
        const afterTomorrow = document.getElementById('after');
        // console.log(after);
    
        const h31 = document.createElement('h3');
        // console.log(h3);
        today.append(h31);
        console.log(today);
        const h32 = document.createElement('h3');
        tomorrow.append(h32)
        const h33 = document.createElement('h3');
        afterTomorrow.append(h33);
    
        const todayAveTemp = jsonWeatherData.weather[0].avgtempF;
        console.log(todayAveTemp)
        const todayMaxTemp = jsonWeatherData.weather[0].maxtempF;
        console.log(todayMaxTemp )
        const todayMinTemp = jsonWeatherData.weather[0].mintempF;
        
        const tomorrowAveTemp = jsonWeatherData.weather[1].avgtempF;
        
        const tomorrowMaxTemp = jsonWeatherData.weather[1].maxtempF;
        const tomorrowMinTemp = jsonWeatherData.weather[1].mintempF;
        const afToAveTemp = jsonWeatherData.weather[2].avgtempF;
        
        const afToMaxTemp = jsonWeatherData.weather[2].maxtempF;
        const afToMinTemp = jsonWeatherData.weather[02].mintempF;
        


    
        today.innerHTML = `<h3>Today</h3><br><strong>Average Temperature:</strong> ${todayAveTemp}<br><strong>MaxTemperature:</strong> ${todayMaxTemp}<br><strong>Min Temperature:</strong>${todayMinTemp}`;

        tomorrow.innerHTML = `<h3>Tomorrow</h3><br><strong>AverageTemperature: </strong>${tomorrowAveTemp}<br><strong>MaxTemperature:</strong> ${tomorrowMaxTemp}<br><strong>Min Temperature:</strong> ${tomorrowMinTemp}`;

        afterTomorrow.innerHTML = `<h3>Day After Tomorrow</h3><br><strong>AverageTemperature:</strong> ${afToAveTemp}<br><strong>MaxTemperature:</strong> ${afToMaxTemp}<br><strong>MinTemperature:</strong> ${afToMinTemp}`;



        p1.remove();

        
        li.append(a);
        ul.append(li);
        li.append(a);
        a.textContent = city;
        li.innerHTML += `- ${currentCondition}℉`;
    })


    
    const li = document.createElement('li');
    const a = document.createElement('a');
    const ul = document.querySelector('aside section ul')



    if(ul.childNodes.length >= 1) {
        noPreSe.remove();``
    }

widget.addEventListener('submit', (event) => {
    event.preventDefault();

    const temp = event.target.convert.value;
    console.log(temp);
    let convertTemp = document.querySelector('.#convert-to-temp').value;
    convertTemp = Number(convertTemp);
    const tempConvert = document.querySelector('.widget h4');

    let celsius = (convertTemp - 32) * 5 / 9;
    celsius = celsius.toFixed(2);

    let fahrenheit = (convertTemp * 1.8) + 32;
    fahrenheit = fahrenheit.toFixed(2);

    if ( temp === 'f') {
        tempConvert.innerHTML = fahrenheit; 
    }
    if (temp === 'c') {
        tempConvert.innerHTML = celsius;
    }

    widget.reset();
})

})



































































