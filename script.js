const BASE_URL = `https://wttr.in/`;
//query select all elements needed
const input = document.querySelector("#userInput");
const result = document.querySelector("#preload");
const form = document.querySelector("form");
const today = document.querySelector("#today");
const tomorrow = document.querySelector(`#tomorrow`);
const after = document.querySelector(`#after`);
const previous = document.querySelector("#previous");
const list = document.querySelector("#list");
const converter = document.querySelector("#converter");
const toC = document.querySelector("#to-c");
const toF = document.querySelector("#to-f")
const imput2 = document.querySelector("#convert");
const converted = document.querySelector("#converted");
//create main output
const p1 = document.createElement("p");
const p2 = document.createElement("p");
const p3 = document.createElement("p");
const p4 = document.createElement("p");
const p5 = document.createElement("p");
const p6 = document.createElement("p");
const p7 = document.createElement("p");
const h3i = document.createElement("h3");
const h3ii = document.createElement("h3");
const h3iii = document.createElement("h3");
const pi = document.createElement("p");
const pii = document.createElement("p");
const piii = document.createElement("p");
const pI = document.createElement(`p`);
const pII = document.createElement(`p`);
const pIII = document.createElement(`p`);
const pa = document.createElement(`p`);
const pb = document.createElement(`p`);
const pc = document.createElement(`p`);
const img = document.createElement("img");
//create widget
const change = document.createElement("form");
const flabel = document.createElement("label");
const finput = document.createElement("input");
const fdiv = document.createElement("div");
const finput2 = document.createElement("input");
const flabel2 = document.createElement("label");
const fdiv2 = document.createElement("div");
const finput3 = document.createElement("input");
const flabel3 = document.createElement("label");
const finput4 = document.createElement("input");
const h4 = document.createElement("h4");
//add first event listener
form.addEventListener("submit", (event) => {
  event.preventDefault();
  preload.textContent = "";
  const uI = event.target.city.value;
//check if input is truthy
  if (uI) {
    fetch(`${BASE_URL}${uI}?format=j1`)
      .then((response) => response.json())
      .then((response) => {
        p1.innerHTML = `<strong>Area:</strong> ${response.nearest_area[0].areaName[0].value}`;
        p2.innerHTML = `<strong>Region:</strong> ${response.nearest_area[0].region[0].value}`;
        p3.innerHTML = `<strong>Country:</strong> ${response.nearest_area[0].country[0].value}`;
        p4.innerHTML = `<strong>Currently:</strong> Feels like ${response.current_condition[0].FeelsLikeF}°F`;
        p5.innerHTML = `<strong>Chance of Sunshine:</strong> ${response.weather[0].hourly[0].chanceofsunshine}`;
        p6.innerHTML = `<strong>Chance of Rain:</strong> ${response.weather[0].hourly[0].chanceofrain}`;
        p7.innerHTML = `<strong>Chance of Snow:</strong> ${response.weather[0].hourly[0].chanceofsnow}`;
        result.append(p1, p2, p3, p4, p5, p6, p7);
        const h2 = document.createElement("h2");
        h2.textContent = uI;
        result.prepend(h2);
        h3i.innerHTML = `Today`;
        h3ii.innerHTML = `Tomorrow`;
        h3iii.innerHTML = `Day After Tomorrow`;
        pi.innerHTML = `<strong>Average Temperature:</strong> ${response.weather[0].avgtempF}°F`;
        pii.innerHTML = `<strong>Max Temperature:</strong> ${response.weather[0].maxtempF}°F`;
        piii.innerHTML = `<strong>Min Temperature:</strong> ${response.weather[0].mintempF}°F`;
        pI.innerHTML = `<strong>Average Temperature:</strong> ${response.weather[1].avgtempF}°F`;
        pII.innerHTML = `<strong>Max Temperature:</strong> ${response.weather[1].maxtempF}°F`;
        pIII.innerHTML = `<strong>Min Temperature:</strong> ${response.weather[1].mintempF}°F`;
        pa.innerHTML = `<strong>Average Temperature:</strong> ${response.weather[2].avgtempF}°F`;
        pb.innerHTML = `<strong>Max Temperature:</strong> ${response.weather[2].maxtempF}°F`;
        pc.innerHTML = `<strong>Min Temperature:</strong> ${response.weather[2].mintempF}°F`;
        today.append(h3i, pi, pii, piii);
        tomorrow.append(h3ii, pI, pII, pIII);
        after.append(h3iii, pa, pb, pc);

        previous.textContent = "";
        const li = document.createElement("li");
        li.innerHTML = `<a href="#${uI}">${uI}</a> - ${response.current_condition[0].FeelsLikeF}°F`;

        list.append(li);

        if (response.weather[0].hourly[0].chanceofsunshine > 50) {
          img.setAttribute("src", "./assets/icons8-summer.gif");
          img.setAttribute("alt", "sun");
          result.prepend(img);
        }
        if (response.weather[0].hourly[0].chanceofrain > 50) {
          img.setAttribute("src", "./assets/icons8-torrential-rain.gif");
          img.setAttribute("alt", "rain");
          result.prepend(img);
        }
        if (response.weather[0].hourly[0].chanceofsnow > 50) {
          img.setAttribute("src", "./assets/icons8-light-snow.gif");
          img.setAttribute("alt", "snow");
          result.prepend(img);
        }
        //convert temperature widget

        flabel.innerHTML = "Convert the temperature:";
        flabel.setAttribute("for", "temp-to-convert");
        finput.setAttribute("type", "number");
        finput.setAttribute("id", "temp-to-convert");
        finput2.setAttribute("type", "radio");
        finput2.setAttribute("id", "to-c");
        finput2.setAttribute("name", "convert-temp");
        finput2.setAttribute("value", "c");
        flabel2.innerHTML = "To Celcius";
        flabel2.setAttribute("for", "to-c");
        finput3.setAttribute("type", "radio");
        finput3.setAttribute("id", "to-f");
        finput3.setAttribute("name", "convert-temp");
        finput3.setAttribute("value", "f");
        flabel3.setAttribute("for", "to-f");
        flabel3.innerHTML = "To Fahrenheit";
        finput4.setAttribute("type", "submit");
        h4.setAttribute("id", "converted");
        // h4.innerHTML = "<strong>0.00</strong>";
        converter.append(change);
        change.append(flabel, finput, fdiv, fdiv2, finput4, h4);
        fdiv.append(finput2, flabel2);
        fdiv2.append(finput3, flabel3); 
      })
      .catch((error) => {
        console.log(error);
      });
      form.reset();
    } else {
      alert("Please enter a Location");
      h3i.textContent = "";
      h3ii.textContent = "";
      h3iii.textContent = "";
      pi.textContent = "";
      pii.textContent = "";
      piii.textContent = "";
      pI.textContent = "";
      pII.textContent = "";
      pIII.textContent = "";
      pa.textContent = "";
      pb.textContent = "";
      pc.textContent = "";
    }
  });

  change.addEventListener("submit", (e) => {
    e.preventDefault();
  
    let result = 0;
    if (toC.checked) {
      result = (tempToConvert.value - 32) * (5 / 9);
    }
    if (toF.checked) {
      result = (tempToConvert.value * 9) / 5 + 32;
    }
    converted.innerHTML = result.toFixed(2);
  });
