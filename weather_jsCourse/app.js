const storage = new Storage;
const weatherLocation = storage.getLocationData();

const weather = new Weather(weatherLocation.city, weatherLocation.state);
const ui = new UI;

document.addEventListener('DOMContentLoaded', getWeatherLoad);

document.getElementById('w-change-btn').addEventListener('click', (e) => {
  const city = document.getElementById('city').value;
  const state = document.getElementById('state').value;

  weather.changeLocation(city, state);
  storage.setLocationData(city, state);
  getWeatherLoad();

  $('#locModal').modal('hide');
})

function getWeatherLoad() {
  weather.getWeather()
    .then(result => {
      ui.paint(result)
    })
    .catch(err => console.log(err))
}