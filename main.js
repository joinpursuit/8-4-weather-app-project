let apiData;

const locationSearch = document.querySelector('#search')
locationSearch.addEventListener('submit', (event) =>{
    event.preventDefault();
    const searchInput = (event.target.location.value).replace(/\s/g , "")
    let appropoSearchSyntax = searchInput.charAt(0).toUpperCase() + searchInput.slice(1)
    getApiData(appropoSearchSyntax)
})


function getApiData (appropoSearchSyntax) {
    fetch('https://wttr.in/' + appropoSearchSyntax + '?format=j1')
    .then((response) => response.json())
    .then((json) => (apiData = json))
}

