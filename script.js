//DATE AND HOUR

function formatDate () {
  let now = new Date();
  let date = now.getDate();
  let year = now.getFullYear();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  let day = days[now.getDay()];
  let months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec"
  ];
  let month = months[now.getMonth()];
  let hour = now.getHours();
  let minute = now.getMinutes();
  let currentDate = document.querySelector("#date");
  currentDate.innerHTML = `${day} ${date} ${month} ${year}, ${hour}:${minute}`;
}

function showTemperature(response) {
  console.log(response.data);
  let temperatureElement = document.querySelector("#temperature");
  let cityElement = document.querySelector("h1");
  let iconElement = document.querySelector("#icon-temperature");
  let windElement = document.querySelector("#wind-speed");
  let humidityElement = document.querySelector("#humidity");
  let descriptionElement = document.querySelector("#description");
  temperatureElement.innerHTML = Math.round(response.data.main.temp);
  cityElement.innerHTML = response.data.name;
  iconElement.setAttribute("src", `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
  windElement.innerHTML = Math.round(response.data.wind.speed);
  humidityElement.innerHTML = response.data.main.humidity;
  descriptionElement.innerHTML = response.data.weather[0].description;
  //FORECAST API
  let lat = response.data.coord.lat;
  let lon = response.data.coord.lon;
  let apiKey = "3b0ffc0f73dbf8aed77c35d6e45972de";
  apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=hourly,current,minutely,alerts&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showForecast);
}
//FORECAST
function showForecast(response) {
  let temperatureElement1 = document.querySelector("#weather-forecast-1");
  let temperatureElement2 = document.querySelector("#weather-forecast-2");
  let temperatureElement3 = document.querySelector("#weather-forecast-3");
  let temperatureElement4 = document.querySelector("#weather-forecast-4");
  let iconForecastElement1 = document.querySelector("#icon-forecast-1");
  let iconForecastElement2 = document.querySelector("#icon-forecast-2");
  let iconForecastElement3 = document.querySelector("#icon-forecast-3");
  let iconForecastElement4 = document.querySelector("#icon-forecast-4");
  temperatureElement1.innerHTML = `${Math.round(response.data.daily[0].temp.day)}°`;
  temperatureElement2.innerHTML = `${Math.round(response.data.daily[1].temp.day)}°`;
  temperatureElement3.innerHTML = `${Math.round(response.data.daily[2].temp.day)}°`;
  temperatureElement4.innerHTML = `${Math.round(response.data.daily[3].temp.day)}°`;
  iconForecastElement1.setAttribute("src", `https://openweathermap.org/img/wn/${response.data.daily[0].weather[0].icon}.png`);
  iconForecastElement2.setAttribute("src", `https://openweathermap.org/img/wn/${response.data.daily[1].weather[0].icon}.png`);
  iconForecastElement3.setAttribute("src", `https://openweathermap.org/img/wn/${response.data.daily[2].weather[0].icon}.png`);
  iconForecastElement4.setAttribute("src", `https://openweathermap.org/img/wn/${response.data.daily[3].weather[0].icon}.png`);
}

//API
function search(city) {
  let apiKey = "3b0ffc0f73dbf8aed77c35d6e45972de";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(showTemperature);

}
//DEFAULT SEARCH
search("Warsaw");
formatDate();

function handleSubmit(event) {
  event.preventDefault();
  let cityInputElement = document.querySelector("#city-search");
  search(cityInputElement.value);
}
//CURRENT POSITION TEMPERATURE//
function showCurrentLocation(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiKey = "3b0ffc0f73dbf8aed77c35d6e45972de";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(showTemperature);

  apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=hourly,current,minutely,alerts&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showForecast);
}

function showPosition() {
  navigator.geolocation.getCurrentPosition(showCurrentLocation);
}

//TO FAHRENHEIT
function displayFahrenheitTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let temperature = temperatureElement.innerHTML;
  temperature = Number(temperature);
  temperatureElement.innerHTML = Math.round((temperature * 9) / 5 + 32);
}
//TO CELSIUS
function displayCelsiusTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  fahrenheitLink.classList.remove("active");
  celsiusLink.classList.add("active");
  let temperature = temperatureElement.innerHTML;
  temperature = Number(temperature);
  temperatureElement.innerHTML = Math.round((temperature - 32 ) * 5 / 9);
}

//Search button
let form = document.querySelector("#city-form");
form.addEventListener("submit", handleSubmit);

//current location button
let button = document.querySelector("button");
button.addEventListener("click", showPosition);

//TEMPERATURE CALCULATION 
let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displayFahrenheitTemperature);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", displayCelsiusTemperature);


