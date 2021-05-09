

// variable to store the searched cities in the local storage
var citiesStored = JSON.parse(localStorage.getItem('cities')) || [];

///variable to get the search btn
var searchBtn = document.getElementById('search');


//function to get city that user inputs
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
    // Api Key Variable
    var apiKey = "30148a43276dc2554a57267ec878f1f9"
    // cityUrl - initial API to get the longitude and latitude of the city
    var cityUrl = "http://api.openweathermap.org/geo/1.0/direct?q=" + searchResult + "&appid="+ apiKey
    //fetch the promise from the city API
    fetch(cityUrl)
    //  then return the response in json format
    .then(function (response) {
        return response.json()
    })
    //take the data and return the longitute and latitude
    .then(function (data) {
        console.log(data);
        //store the search in the cities stored array
        citiesStored.push(searchResult)
        // setItem of cities and stringify cities stored 
        localStorage.setItem('cities',JSON.stringify(citiesStored))
        // return the latitude and longitude
        var lat = data[0].lat;
        var lon = data[0].lon;
        //run the function to get the weather data using the latitude and longitude
        getWeatherByLoc(lat,lon);
        })
}


function getWeatherByLoc(lat,lon) {
    // set api key
    var apiKey = "30148a43276dc2554a57267ec878f1f9"
    // create API link to receive weather data
    var locationUrl = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&appid=" + apiKey + "&units=imperial"
    fetch(locationUrl) 
    // return json response 
    .then(function (response){
        console.log(response);
        return response.json();
    })
    // console log the data received
    .then(function(data) {
        console.log(data)
    })
}

// run the getsearchVal function once pushing the search button 
searchBtn.addEventListener('click',getSearchVal)

