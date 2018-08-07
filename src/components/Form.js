import React, { Component } from 'react';
import axios from 'axios';

class Form extends Component{
    constructor(props){
        super(props);   
        this.handleCityChange = this.handleCityChange.bind(this);
    }

    state = {
        weatherData: [],
        city: ''
    }


    handleSubmit(e){
        e.preventDefault();
        axios.get('https://api.openweathermap.org/data/2.5/weather?q=Kyiv,ua&appid=3b29cda6faa9422aaab7ababbaeae5bd&units=metric')
        .then(res => {
            //need fix (Cannot read property 'setState' of undefined)
            //this.setState({ weatherData: res.data });
          console.log(res.data);
        })
    }

    
    handleCityChange(event){
        this.setState({ city: event.target.value });
    }

    render(){
        return(
            <form onSubmit={this.handleSubmit}>
                <input 
                    type="text"
                    placeholder="Enter the city" 
                    value = {this.state.city}
                    onChange = {this.handleCityChange}
                />
                <button>Submit</button>
            </form>
        )
    }
}

export default Form