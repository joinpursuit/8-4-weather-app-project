const form = document.querySelector('#weather');
form.addEventListener('submit', (event) => {
  event.preventDefault();
  console.log(event.target);
  const id = document.querySelector('#search-weather').value;
  console.log(id);
  let response;
  const error = 'Could not fetch the requested weather data. Please try again later.';
  fetch(`https://wttr.in/${id}?format=j1`)
  .then((response) => response.json())
  .then((json) => {
    console.log(json);
  })
  .catch((error) => {
    console.log(error);
  })
  form.reset();
});


