import React from 'react';
import Header from './header';
import Footer from './footer';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';



class App extends React.Component {
  state = {
    weather: {
      temp: "",
      type: "",
      city: "",
      country: "",
      wind: "",
      humidity: ""
    },
    location: "",
    area: "",
    error: "",
    requestSuccessfull: ""
  };

  updateWeatherDetails = async event => {
    try {
      let area = this.state.location;
      let fetchUrl = `http://api.openweathermap.org/data/2.5/weather?q=${area}&units=metric&APPID=b66ecf3c7e717c4eb45abd13e53ba0ac`;
      let fetchOptions = { mode: "cors" };

      let response = await fetch(fetchUrl, fetchOptions);
      let weatherData = await response.json();

      let newstate = {
        weather: {
          temp: weatherData.main.temp,
          type: weatherData.weather[0].description,
          city: weatherData.name,
          country: weatherData.sys.country,
          wind: weatherData.wind.speed,
          humidity: weatherData.main.humidity
        },
        location: "",
        requestSuccessfull: true
      };

      this.setState(newstate);
      
    } catch (err) {
      this.setState(prevState => ({
        ...prevState,
        requestSuccessfull: false,
        error: err,
        area: prevState.location,
        location: ""
      }));
    }
  };

  handleLocationChange = event => {
    this.setState({ location: event.target.value })
  }


  render() {
    return (
      <div>
       <Header/>
      <Container  style={{position: "relative", height:'100%', margin: 'auto', width:'80%' }} maxWidth='md'>
      <Box my={4}>
      <Typography variant="h4" component="h1" gutterBottom style={{ backgroundColor: '#cfe8fc', height: '100vh' }}>
      
        <p>Area: {this.state.location}</p>
        <p style={{marginBottom:'0px'}}><small>Type a location to get weather</small></p>
        <input type="text" value={this.state.location} onChange={this.handleLocationChange} />
        <button onClick={this.updateWeatherDetails}>
          Get Weather
        </button>
        {this.state.requestSuccessfull === true ? (
          <div>
            SUCCESS <pre>{JSON.stringify(this.state.weather, null, 2)}</pre>
          </div>
        ) : this.state.requestSuccessfull === false ? (
          <div>
            ERROR GETTING DATA FOR '{this.state.area}' ENCOUNTERED ERROR: '{
              this.state.error && this.state.error.message
            }'
            
          </div>
        ) : (
          ""
        )}
      
        </Typography>
        </Box>
            </Container>
              <Footer/>
              </div>
     
    );
  }
}

    export default App;
