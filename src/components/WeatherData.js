import React, { Component } from 'react';

class WeatherData extends Component{
    state = {
        weatherData : []
    }

    componentDidMount(){
        let weatherLocalData = localStorage.getItem('weather_data');
        if(weatherLocalData){
            weatherLocalData = weatherLocalData.split('&&');
            for (let i = 0; i < weatherLocalData.length; i++){
                this.setState({weatherData : weatherLocalData});
                console.log(this.state.weatherData)
            }
        }else{
            console.log('localstorage not found')
        }
    } 

    render() {
        return (
            <div>
                here is must be weather data 
            </div>
        )
    }
}

export default WeatherData;