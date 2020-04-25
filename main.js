const api = {
  key: "651ab2f69643896f482a1fb3dd3f8ced",
  baseurl:"https://api.openweathermap.org/data/2.5/"
}
const searchbox = document.querySelector(".search-box");
searchbox.addEventListener('keypress', setQuery);

function setQuery(evt) {
  if(evt.keyCode == 13) {
    getResults(searchbox.value);
  }
}

function getResults(query) {
  fetch(`${api.baseurl}weather?q=${query}&units=metric&APPID=${api.key}`)
    .then(weather => {
      return weather.json();
    }).then(displayResults);
}

function displayResults(weather) {
  toggleVisibility(weather.cod);
  if(weather.cod == 200) {
    let city = document.querySelector('.location .city')
    city.innerText = `${weather.name}, ${weather.sys.country}`;

    let now = new Date()
    let date = document.querySelector('.location .date');
    date.innerText = dateBuilder(now);

    let temp = document.querySelector('.current .temp');
    temp.innerHTML = `${Math.round(weather.main.temp)}<span>°C</span>`;

    let weatherText = document.querySelector('.current .weather');
    weatherText.innerHTML =weather.weather[0].main;

    let hiLow =  document.querySelector('.hi-low');
    hiLow.innerHTML = `${weather.main.temp_min}°C / ${weather.main.temp_max}°C`;
  }
}

function toggleVisibility (status) {
  let location = document.querySelector('.location');
  let current = document.querySelector('.current');
  let message = document.querySelector('.no-city-found .message');
  if(status == 200) {
    location.style.display = 'block';
    current.style.display = 'block';
    message.style.display = 'none';
  } else {
    location.style.display = 'none';
    current.style.display = 'none';
    message.style.display = 'block';
    message.innerText = "City Not Found!"
  }
}

function dateBuilder(d) {
  let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

  let day = days[d.getDay()];
  let date = d.getDate();
  let month = months[d.getMonth()];
  let year = d.getFullYear();

  return `${day} ${date} ${month} ${year}`;
}