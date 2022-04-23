const formInput = document.querySelector("#weaInput");
    
    formInput.addEventListener("submit", (event) => {
      let userInput = event.target.city.value
      const API = `https://wttr.in/${userInput}?format=j1`
      event.preventDefault() 
      fetch(API)
       .then((response) => response.json())
       .then((data) => console.log(data));

       console.log(event.target.city.value)
    });