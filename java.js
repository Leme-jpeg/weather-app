//DAY AND TIME

function formatDate(date) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let day = days[date.getDay()];
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  let formattedDate = ` ${day} ${hours}:${minutes}`;

  return formattedDate;
}
let h3 = document.querySelector("h3");
h3.innerHTML = formatDate(new Date());

//SEARCH ENGINE

function search(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#searchBar");
  let city = `${searchInput.value}`;

  //search for city temperature
  let apiKey = "9ab9f10d069bf5de9f1339fafe61add1";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(`${apiUrl}&appid=${apiKey}`).then(showTemp);
}

let form = document.querySelector(".searchbar");
form.addEventListener("submit", search);

//FORECAST DAYS
function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}

//FORECAST
function displayForecast(response) {
  let forecast = response.data.daily;

  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `
			<div class="col-2">
				<div class="card">

						<div class="card-header">
						<h5 class="forecastDay">${formatDay(forecastDay.dt)}</h5>
						</div>
					<div class="card-bod">
					 
						<p class="card-text">
							<div forecastTemp>min ${Math.round(forecastDay.temp.min)}°C max${Math.round(
          forecastDay.temp.max
        )}°C </div>

         <img src="http://openweathermap.org/img/wn/${
           forecastDay.weather[0].icon
         }@2x.png"
          alt="" class="emo"/>
							
							<div class="description">${forecastDay.weather[0].description}</div>
						</p>
					</div>
				</div>
			</div>`;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}
//get 7 days
function getForecast(coordinates) {
  let apiKey = "9ab9f10d069bf5de9f1339fafe61add1";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

//geolocalisation
function showTemp(response) {
  celsiusTemperature = Math.round(response.data.main.temp);
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = `${celsiusTemperature}`;
  document.querySelector("#city").innerHTML = response.data.name;

  let windElement = document.querySelector("#wind");
  windElement.innerHTML = Math.round(response.data.wind.speed);
  let descriptionElement = document.querySelector("#description");
  descriptionElement.innerHTML = response.data.weather[0].description;
  //icon for temp
  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].icon);

  getForecast(response.data.coord);
}

function coordinate(position) {
  console.log(position.coords.latitude);
  console.log(position.coords.longitude);

  let lat = position.coords.latitude;
  let lon = position.coords.longitude;

  let apiKey = "9ab9f10d069bf5de9f1339fafe61add1";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

  axios.get(`${apiUrl}&appid=${apiKey}`).then(showTemp);
}
navigator.geolocation.getCurrentPosition(coordinate);

//conversion C to F

function displayFahrenheitTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  let fahrenheiTemperature = (celsiusTemperature * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(fahrenheiTemperature);
}

function displayCelsiusTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}
let celsiusTemperature = null;

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displayFahrenheitTemperature);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", displayCelsiusTemperature);
