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

        
    })
    


})



































































