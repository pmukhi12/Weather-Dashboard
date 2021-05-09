

// variable to store the searched cities in the local storage
var citiesStored = JSON.parse(localStorage.getItem('cities')) || [];

///variable to get the search btn
var searchBtn = document.getElementById('search');

//variable to get current weather
var currentWeatherId = document.getElementById('current-weather');

//humidity
var humidityEl = document.getElementById('humidity');

//day 1 element
var day01El = document.getElementById('day-01');

//day 2 element
var day02El = document.getElementById('day-02');

//day 3 element
var day03El = document.getElementById('day-03');

//day 4 element
var day04El = document.getElementById('day-04');

//day 5 element
var day05El = document.getElementById('day-05');

//function to get city that user inputs
function getSearchVal () {
    var searchValue = document.getElementById('city-input').value;
    console.log({searchValue});
    if (searchValue) {
        getGeoLocation(searchValue);
        document.getElementById('city-input').value = '';
    }
    
}


// Fetch the location URL, Return the Object in Json Format

function getGeoLocation(searchResult) {
    // Api Key Variable
    var apiKey = "30148a43276dc2554a57267ec878f1f9";
    // cityUrl - initial API to get the longitude and latitude of the city
    var cityUrl = "http://api.openweathermap.org/geo/1.0/direct?q=" + searchResult + "&appid="+ apiKey;
    //fetch the promise from the city API
    fetch(cityUrl)
    //  then return the response in json format
    .then(function (response) {
        return response.json();
    })
    //take the data and return the longitute and latitude
    .then(function (data) {
        console.log(data);
        //store the search in the cities stored array
        citiesStored.push(searchResult);
        // setItem of cities and stringify cities stored 
        localStorage.setItem('cities',JSON.stringify(citiesStored));
        // return the latitude and longitude
        var lat = data[0].lat;
        var lon = data[0].lon;
        //run the function to get the weather data using the latitude and longitude
        getWeatherByLoc(lat,lon);
        })
}


function getWeatherByLoc(lat,lon) {
    // set api key
    var apiKey = "30148a43276dc2554a57267ec878f1f9";
    // create API link to receive weather data
    var locationUrl = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&appid=" + apiKey + "&units=imperial";
    fetch(locationUrl) 
    // return json response 
    .then(function (response){
        console.log(response);
        return response.json();
    })
    // return the data from the api 
    .then(function(data) {
        console.log(data);
        var temperature = data.current.temp;
        var humidity = data.current.humidity;
        var day02temp = data.daily[1].temp.day;
        var day03temp = data.daily[2].temp.day;
        var day04temp = data.daily[3].temp.day;
        var day05temp = data.daily[4].temp.day;
        // assign the temperatures to the elements 
        humidityEl.textContent = "The humidity is currently: " + humidity;
        day01El.textContent = moment().format('ddd MMM Do, YYYY') + ": The weather is currently " + temperature + " degrees Farenheit!"
        day02El.textContent = moment().add(1,'days').format('ddd MMM Do, YYYY') + ": The weather will be " + day02temp + " degrees Farenheit!"
        day03El.textContent = moment().add(2,'days').format('ddd MMM Do, YYYY') + ": The weather will be " + day03temp + " degrees Farenheit!"
        day04El.textContent = moment().add(3,'days').format('ddd MMM Do, YYYY') + ": The weather will be " + day04temp + " degrees Farenheit!"
        day05El.textContent = moment().add(4,'days').format('ddd MMM Do, YYYY') + ": The weather will be " + day05temp + " degrees Farenheit!"
    })
}

// run the getsearchVal function once pushing the search button 
searchBtn.addEventListener('click',getSearchVal);

