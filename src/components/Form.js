import React, { Component } from 'react';
import axios from 'axios';
import '../css/Form.css'

class Form extends Component{
    state = {
        weatherData: [],
        city: ''
    }

    handleSubmit = (event) => {
        event.preventDefault();
        const userCity = this.state.city;
        axios.get('https://api.openweathermap.org/data/2.5/weather?q='+userCity+'&appid=3b29cda6faa9422aaab7ababbaeae5bd&units=metric')
        .then(res => {
            this.setState({ weatherData: res.data});

            let localStorageData = localStorage.getItem('weather_data');
            if(!localStorageData){
                localStorage.setItem('weather_data', JSON.stringify(res.data));
            }else{
                localStorage.setItem('weather_data', localStorageData + '&&' + JSON.stringify(res.data));
            }


            
        })
        .catch((err) => {
            console.log(err);
        });
    }
    
    handleCityChange = (event) =>{
        this.setState({ city: event.target.value });
    }
    
    render(){
        return(
            <div>
                <form className="form" onSubmit={this.handleSubmit}>
                    <input 
                        type="text"
                        placeholder="Enter the city" 
                        value = {this.state.city}
                        onChange = {this.handleCityChange}
                    />
                    <button className="submit_btn">Submit</button>
                </form>
                {this.state.weatherData.main &&
                    <div className="weather_description">
                        <h1>{this.state.weatherData.name}</h1>
                        <span>{this.state.weatherData.main.temp}&deg;</span>
                        <span>{this.state.weatherData.weather[0].main}</span>
                        <span>{this.state.weatherData.wind.speed}m/s</span>
                    </div>
                }
            </div>           
        )
    }
}

export default Form