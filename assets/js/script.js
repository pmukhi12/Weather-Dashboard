


// Variable for City-State
//Upd
var searchResult = "New York"
var apiKey = "30148a43276dc2554a57267ec878f1f9"
var cityUrl = "http://api.openweathermap.org/geo/1.0/direct?q=" + searchResult + "&appid=30148a43276dc2554a57267ec878f1f9"
va


// Fetch the location URL, Return the Object in Json Format

function processFetch(response){
    return response.json()
}) 

// Store the data of the first element and pull the latitude and longitude for the Search Location
function parseLocation((data){
    var lat = data[0].lat
    var lon = data[0].lon
    return [lat, lon]
})

var 

function getWeatherByLoc(response) {
    fetch()
}


fetch (cityUrl)
    .then(processFetch)
    .then(parseLocation)
