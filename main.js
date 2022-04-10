const BASE_URL = "http://wttr.in";
const format_URL = "?format=j1";
//wttr.in/Detroit?format=j1
//wttr.in/Detroit?format=j1

let data;
const form = document.querySelector('form');


form.addEventListener('submit', (event) => {
    event.preventDefault();
    let input = document.querySelector('#location').value;
      getWeatherData(input);
  });
  
  
function getWeatherData (input) {
    //fetch('wttr.in/Detroit?format=j1')  
    const URL = `${BASE_URL}/${input}${format_URL}`
    //console.log(URL.split(" "));
    //fetch(`${URL}`)
   fetch(`${BASE_URL}/${input}${format_URL}`)
    .then((response) => response.json())
    .then((json) => {   
    data = json;
    console.log(data);
    //run function that actually use the data to find stuff and fill it to the HTML 
    })
    .catch((err) => {
        console.log(err);
    })
}

function findWeather(data) {//loop the data to look for things we need. / making changes to HTML. 
//like using this const article =  document.createElement('article')



}
