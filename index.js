// const BASE_URL = "https://www.wttr.in/Detroit?format=j1";
const BASE_URL = "https://www.wttr.in";

//After Search - in the main section
//FORM
//1 Input in typed into the input field in the form
//2 then we submit the input
//2 then we grab the input from the API
//3. and print it to the screen

//here we want to grab the input (form) and place in a variable
let inputForm = document.querySelector("form");
inputForm.addEventListener("submit", (event) => {
  event.preventDefault();
  //input is the country/place typed in to input field
  const input = inputForm.querySelector('input[id="locationID"]').value;

  console.log(input);
  pickAlocationId(input);
});

//here we want to fetch the url and receive the json object with the information and place the information in the html to be printed to screen
const pickAlocationId = (input) => {
  fetch(`${BASE_URL}/${input}?format=j1`)
    .then((response) => response.json())
    .then((json) => {
      console.log(json);
      createLocationInformation(json);
    });
};

//.catch goes here

//here we want to
const createLocationInformation = (json) => {
  const main = document.querySelector("main");
  const article = document.querySelector("article");
  //name of location
  const h4 = document.createElement("h4");
  //Area
  const p1 = document.createElement("p");
  //Region
  const p2 = document.createElement("p");
  //Country
  const p3 = document.createElement("p");
  //currently feels like
  const p4 = document.createElement("p");

  //append
  main.append(article);
  article.append(h4, p1, p2, p3, p4);

  //replace innerContent of tags with information from json
  h4.textContent = `${json.nearest_area[0].areaName[0].value}`;
  p1.textContent = `Area: ${json.nearest_area[0].areaName[0].value}`;
  p2.textContent = `Region: ${json.nearest_area[0].region[0].value}`;
  p3.textContent = `Country: ${json.nearest_area[0].country[0].value}`;
  p4.textContent = `Currently: Feels like ${json.current_condition[0].FeelsLikeF} F`;

  return article;
};
