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
const fp = document.createElement("p");
const finput = document.createElement("input");
const fdiv = document.createElement("div");
const finput2 = document.createElement("input");
const flabel = document.createElement("label");
const fdiv2 = document.createElement("div");
const finput3 = document.createElement("input");
const flabel2 = document.createElement("label");
const finput4 = document.createElement("input");
const fp2 = document.createElement("p");
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
        fp.innerHTML = "Convert the temperature:";
        finput.setAttribute("type", "number");
        finput2.setAttribute("type", "radio");
        finput2.setAttribute("id", "celcius");
        flabel.setAttribute("for", "celcius")
        flabel.innerHTML = "To Celcius";
        finput3.setAttribute("type", "radio");
        finput3.setAttribute("id", "fahrenheit");
        flabel2.setAttribute("for", "fahrenheit");
        flabel2.innerHTML = "To Fahrenheit";
        finput4.setAttribute("type", "submit");
        fp2.innerHTML = "<strong>0.00</strong>";
        converter.append(change);
        change.append(fp, finput, fdiv, fdiv2, finput4, fp2);
        fdiv.append(finput2, flabel);
        fdiv2.append(finput3, flabel2);

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

