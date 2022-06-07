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

//geolocalisation

function showTemp(response) {
  let temp = Math.round(response.data.main.temp);
  let temperature = document.querySelector("#temperature");

  temperature.innerHTML = `${temp}`;
  document.querySelector("#city").innerHTML = response.data.name;

  //icon for temp
  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].icon);
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

/*conversion C to F
celsiusTemperature = response.data.main.temp;
temperatureElement.innerHTML = Math.round(celsiusTemperature);

function displayFahrenheitTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");

  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let fahrenheiTemperature = (celsiusTemperature * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(fahrenheiTemperature);
}

function displayCelsiusTemperature(event) {
  event.preventDefault();
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}
let celsiusTemperature = null;

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displayFahrenheitTemperature);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", displayCelsiusTemperature);
*/
