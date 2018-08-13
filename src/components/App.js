import React, { Component } from 'react';
import axios from 'axios';
import Form from './Form'
import '../css/App.css'

class App extends Component {  
  state = {
    weatherData: []
  }

  getLocation = () => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        axios.get('https://api.openweathermap.org/data/2.5/weather?lat='+position.coords.latitude+'&lon='+position.coords.longitude+'&appid=3b29cda6faa9422aaab7ababbaeae5bd&units=metric')
        .then(res => {
          this.setState({ weatherData: res.data });
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
    if(!this.state.weatherData.main){     
      return (
        <div className="mainBlock">
          <Form />
          <h1>or</h1>
          <button className="findMe_btn" onClick={this.getLocation}>Find me</button>
        </div>
      )
    }
    return (
      <div className="mainBlock">
        <Form />
        <div className="weather_description">
          <h1>{this.state.weatherData.name}</h1>
          <span>{this.state.weatherData.main.temp}&deg;</span>
          <span>{this.state.weatherData.weather[0].main}</span>
          <span>{this.state.weatherData.wind.speed}m/s</span>
        </div>
        <h1>or</h1>
        <button className="findMe_btn" onClick={this.getLocation}>Find me</button>
      </div>
    );
  }
}

export default App;
