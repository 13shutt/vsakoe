class Weather {
  constructor(city, state) {
    this.apiKey = '60c3e3a909568cb3';
    this.city = city;
    this.state = state;
  }

  async getWeather(url) {
    const response = await fetch(`http://api.wunderground.com/api/${this.apiKey}/conditions/q/${this.state}/${this.city}.json`);

    const responseData = await response.json();

    return responseData.current_observation;
  }

  changeLocation(city, state) {
    this.city = city;
    this.state = state;
  }
}