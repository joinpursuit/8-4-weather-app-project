let search = false

//HTML FORMAT
const body = document.querySelector('body')

const header = document.createElement('header')
const h1 = document.createElement('h1')
h1.textContent = 'Weather App'

const p = document.createElement('p')
p.textContent = "Pick a Location"

const form = document.createElement('form')
form.setAttribute('type','submit')

const input = document.createElement('input')
input.setAttribute('type','text')

const submit = document.createElement('input')
submit.setAttribute('type','submit')
submit.textContent = "Submit"

const main = document.createElement('main')
main.setAttribute('id','location')
//main.textContent = "Choose a location to view the weather"

const aside = document.createElement('aside')
form.append(p, input, submit)
header.append(h1,form )


const article = document.createElement('article')
//article.textContent = "Choose a location to view the weather"
article.setAttribute("class","location")
const pArticle = document.createElement('p')
pArticle.textContent = "Choose a location to view the weather"
article.append(pArticle)
//`article` - this will contain the current weather (starts empty)

const previousSearch = document.createElement('aside')
//`aside` (will contain weather history)
const p1 = document.createElement('p')
p1.textContent = "No previous searches"
const section = document.createElement('section')
section.textContent = "Previous Searches"

const article1 = document.createElement('article')
article1.setAttribute('class','today')
const article2 = document.createElement('article')
article2.setAttribute('class', 'tomorrow')
const article3 = document.createElement('article')
article3.setAttribute('class','dayafter')

const sectionArticle = document.createElement('section')
const ul = document.createElement('ul')
previousSearch.append(section)
section.append(p1, ul)
body.append(header, main, previousSearch)

sectionArticle.append(article1, article2, article3)
main.append(article, sectionArticle)

//`h4` with the text `Previous Searches`
//The sidebar includes an empty `ul` and a message inside a `p` element that lets the user know no searches have been made yet
// CSS Grid should be used to structure the page

//See an `h1` with the text "Weather App" in the header.
form.addEventListener('submit', (event)=> {
  event.preventDefault()
  let location
  location = input.value.replace(' ','') + "?format=j1"
  let value = input.value
  console.log(value)
  
  //const area = p.createElement('p')
  
  let API = `https://wttr.in/${location}`
  let apiWeather 
  fetch(API)
  .then((response)=>response.json())
  .then((json)=>{
    apiWeather = json
    console.log(apiWeather, location)
    //populate main section 
    //article.textContent = ''
    showWeather(apiWeather)
    today(apiWeather)
    tomorrow(apiWeather)
    dayAfterTomorrow(apiWeather)
    if(!search){
      search = true
    }
    //previousLocation(apiWeather.current_condition[0].temp_F)
      p1.textContent = ''
      const li = document.createElement('li')
      const a = document.createElement('a')
      a.setAttribute('href',`#`)
      //alert(apiWeather.current_condition[0].FeelsLikeF)
      a.textContent= `${value} -${apiWeather.current_condition[0].temp_F} F°`
      li.append(a)
      ul.append(li)
    li.addEventListener('click',(event)=>{
      showWeather(apiWeather)
    }) 
  })
  .catch((error)=> console.log(error))

  form.reset()
})

// const previousLocation = (api) =>{
//   p1.textContent = ''
//   const li = document.createElement('li')
//   const a = document.createElement('a')
//   a.setAttribute('href',`#`)
//   a.textContent= `${value} -${api} F°`
//   li.append(a)
//   const ul = document.querySelector('ul')
//   ul.append(li)
// }

//showWeather Outline
const h2 = document.createElement('h2')
const areaBold = document.createElement('p')
areaBold.setAttribute('class','areaBold')
const regionBold = document.createElement('p')
regionBold.setAttribute('class','regionBold')
const countryBold = document.createElement('p')
countryBold.setAttribute('class','countryBold')
const tempBold = document.createElement('p')
tempBold.setAttribute('class','tempBold')
article.append(h2, areaBold, regionBold, countryBold,tempBold);

const showWeather = (weather) => {

  const h2 = document.querySelector('h2')
  h2.textContent = weather.nearest_area[0].areaName[0].value
  const areaBold = document.querySelector('.areaBold')
  areaBold.innerHTML = `<strong>Nearest Area:</strong> ${weather.nearest_area[0].areaName[0].value}`
  const regionBold = document.querySelector('.regionBold')
  regionBold.innerHTML = `<strong>Region:</strong> ${weather.nearest_area[0].region[0].value}`
  const countryBold = document.querySelector('.countryBold')
  countryBold.innerHTML = `<strong>Country:</strong> ${weather.nearest_area[0].country[0].value}`
  const tempBold = document.querySelector('.tempBold')
  tempBold.innerHTML = `<strong>Currently:</strong> ${weather.current_condition[0].FeelsLikeF} F°`
}


const today = (temperature) => {
if(search === false){
  const h3 = document.createElement('h3')
  h3.textContent = 'Today'
  const average = document.createElement('p')
  average.setAttribute('id','today-average')
  average.innerHTML =`<strong>Average Temperature:</strong> ${temperature.weather[0].avgtempF} F°`
  const max = document.createElement('p')
  max.setAttribute('id','today-max')
  max.innerHTML = `<strong>Max Temperature:</strong> ${temperature.weather[0].maxtempF} F°`
  const min = document.createElement('p')
  min.setAttribute('id','today-min')
  min.innerHTML = `<strong>Min Temperature:</strong> ${temperature.weather[0].mintempF} F°`
  article1.append(h3, average, max, min)
}else{
  const average =document.querySelector("#today-average")
  average.innerHTML =`<strong>Average Temperature:</strong> ${temperature.weather[0].avgtempF} F°`
  const max = document.querySelector('#today-max')
  max.innerHTML = `<strong>Max Temperature:</strong> ${temperature.weather[0].maxtempF} F°`
  const min = document.querySelector("#today-min")
  min.innerHTML = `<strong>Min Temperature:</strong> ${temperature.weather[0].mintempF} F°`
}
  
}

const tomorrow = (temperature) => {
  if(search === false){
    const h3 = document.createElement('h3')
    h3.textContent = 'Tomorrow'
    const average = document.createElement('p')
    average.setAttribute('id','tomorrow-average')
    average.innerHTML =`<strong>Average Temperature:</strong> ${temperature.weather[1].avgtempF} F°`
    const max = document.createElement('p')
    max.setAttribute('id','tomorrow-max')
    max.innerHTML = `<strong>Max Temperature:</strong> ${temperature.weather[1].maxtempF} F°`
    const min = document.createElement('p')
    min.setAttribute('id','tomorrow-min')
    min.innerHTML = `<strong>Min Temperature:</strong> ${temperature.weather[1].mintempF} F°`
    article2.append(h3, average, max, min)
  }else{
  const average =document.querySelector("#tomorrow-average")
  average.innerHTML =`<strong>Average Temperature:</strong> ${temperature.weather[0].avgtempF} F°`
  const max = document.querySelector('#tomorrow-max')
  max.innerHTML = `<strong>Max Temperature:</strong> ${temperature.weather[0].maxtempF} F°`
  const min = document.querySelector("#tomorrow-min")
  min.innerHTML = `<strong>Min Temperature:</strong> ${temperature.weather[0].mintempF} F°`
  }
}

const dayAfterTomorrow = (temperature) => {
  if(search === false){
    const h3 = document.createElement('h3')
    h3.textContent = 'Day After Tomorrow'
    const average = document.createElement('p')
    average.setAttribute('id','dayAfterTomorrow-average')
    average.innerHTML =`<strong>Average Temperature:</strong> ${temperature.weather[2].avgtempF} F°`
    const max = document.createElement('p')
    max.setAttribute('id','dayAfterTomorrow-max')
    max.innerHTML = `<strong>Max Temperature:</strong> ${temperature.weather[2].maxtempF} F°`
    const min = document.createElement('p')
    min.setAttribute('id','dayAfterTomorrow-min')
    min.innerHTML = `<strong>Min Temperature:</strong> ${temperature.weather[2].mintempF} F°`
    article3.append(h3, average, max, min) 
  }else{
    const average =document.querySelector("#dayAfterTomorrow-average")
  average.innerHTML =`<strong>Average Temperature:</strong> ${temperature.weather[0].avgtempF} F°`
  const max = document.querySelector('#dayAfterTomorrow-max')
  max.innerHTML = `<strong>Max Temperature:</strong> ${temperature.weather[0].maxtempF} F°`
  const min = document.querySelector("#dayAfterTomorrow-min")
  min.innerHTML = `<strong>Min Temperature:</strong> ${temperature.weather[0].mintempF} F°`

  }
}