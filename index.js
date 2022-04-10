let data;

fetch('wttr.in/Detroit?format=j1')
    .then((response) => response.json())
    .then((json) => {
        data = json;
    })
    .catch((err) => {
        console.log(err);
    })

console.log(data);