import React, { Component } from 'react';
import axios from 'axios';
import Form from './components/Form'

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
        <div>
          <Form />
          or
          <button onClick={this.getLocation}>Find me</button>
        </div>
      )
    }
    return (
      <div>
        <h1>{this.state.weatherData.main.temp}&deg;</h1>
        <h3>{this.state.weatherData.name}</h3>
        <div>{this.state.weatherData.weather[0].description}</div>
        <br/>
      </div>
    );
  }
}

export default App;
