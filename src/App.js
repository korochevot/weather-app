import React, { Component } from 'react';
import axios from 'axios';
import Form from './components/Form'

class App extends Component {
  state = {
    weatherData: []
  }

  componentDidMount() {
    axios.get('https://api.openweathermap.org/data/2.5/weather?q=Odessa,ua&appid=3b29cda6faa9422aaab7ababbaeae5bd&units=metric')
      .then(res => {
        this.setState({ weatherData: res.data });
        console.log(res.data);
      })
  }

  render() {
    if(!this.state.weatherData.main) return null;
    return (
      <div>
        <h1>{this.state.weatherData.main.temp}&deg;</h1>
        <h3>{this.state.weatherData.name}</h3>
        <div>{this.state.weatherData.weather[0].description}</div>
        <br/>
        <Form />
      </div>
    );
  }
}

export default App;
