

// Variable for City-State
//Upd
var searchBtn = document.getElementById('search');

function getSearchVal () {
    var searchValue = document.getElementById('city-input').value;
    console.log({searchValue})
    if (searchValue) {
        getGeoLocation(searchValue);
        document.getElementById('city-input').value = ''
    }
    
}


// Fetch the location URL, Return the Object in Json Format

function getGeoLocation(searchResult) {
    var apiKey = "30148a43276dc2554a57267ec878f1f9"
    var cityUrl = "http://api.openweathermap.org/geo/1.0/direct?q=" + searchResult + "&appid="+ apiKey
    fetch(cityUrl)
        .then(function (response) {
            console.log(response)
            return response.json()
        })
        .then(function (data) {
            console.log(data);
            var lat = data[0].lat;
            var lon = data[0].lon;
            getWeatherByLoc(lat,lon);
        })
}

// Store the data of the first element and pull the latitude and longitude for the Search Location
function parseLocation(data){
    var lat = data[0].lat
    var lon = data[0].lon
    return [lat, lon]
}

function getWeatherByLoc(lat,lon) {
    var apiKey = "30148a43276dc2554a57267ec878f1f9"
    var locationUrl = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&appid=" + apiKey + "&units=imperial"
    fetch(locationUrl) 
    .then(function (response){
        console.log(response);
        return response.json();
    })
    .then(function(data) {
        console.log(data)
    })

}

// getGeoLocation('Boston')
searchBtn.addEventListener('click',getSearchVal)

