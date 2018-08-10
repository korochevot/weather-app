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
            this.setState({ weatherData: res.data });
            console.log(this.state.weatherData);
            //need to update data in App component
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
            <form className="form" onSubmit={this.handleSubmit}>
                <input 
                    type="text"
                    placeholder="Enter the city" 
                    value = {this.state.city}
                    onChange = {this.handleCityChange}
                />
                <button className="submit_btn">Submit</button>
            </form>
        )
    }
}

export default Form