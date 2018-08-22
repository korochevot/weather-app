import React, { Component } from 'react';
import axios from 'axios';
import Form from './Form'
import WeatherData from './WeatherData'
import '../css/App.css'

class App extends Component {  
  state = {
    myWeatherData: []
  }

  getLocation = () => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        axios.get('https://api.openweathermap.org/data/2.5/weather?lat='+position.coords.latitude+'&lon='+position.coords.longitude+'&appid=3b29cda6faa9422aaab7ababbaeae5bd&units=metric')
        .then(res => {
          this.setState({ myWeatherData: res.data });
          console.log(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
      },
      (error) => this.setState({ error: error.message }),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 0 },
    );
  }

  render() {
    return (
      <div className="mainBlock">
        <button className="findMe_btn" onClick={this.getLocation}>Find me</button>
        <h1>or</h1>
        <Form />
        <WeatherData />
        {this.state.myWeatherData.main &&
          <div className="weather_description">
            <h1>{this.state.myWeatherData.name}</h1>
            <span>{this.state.myWeatherData.main.temp}&deg;</span>
            <span>{this.state.myWeatherData.weather[0].main}</span>
            <span>{this.state.myWeatherData.wind.speed}m/s</span>
          </div>
        }
      </div>
    );
  }
}

export default App;
