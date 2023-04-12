import './App.css';
import { useState } from 'react';
import  axios from 'axios';


function App() {
  const [location, setLocation] = useState('');
  const [city, setCity] = useState('');
  const [temp, setTemp] = useState('')
  const [weather, setWeather] = useState('');
  const [isResults, setIsResults] = useState(false)

  const getWeather = ()=>{
    const options = {
      method:'GET',
      url: 'https://wonderful-weather.herokuapp.com/weather',
      // url: 'http://localhost:5000/weather',
      params: {loc: location}
    };

    axios.request(options).then((response)=>{
      const data = response.data;
      setCity(data.name);
      setTemp(data.main.temp);
      setWeather(data.weather[0].description)
    }).catch((error)=>{
      console.log(error);
    });
  };

  function handleOnChange(e){
    setLocation(e.target.value);
  };

  function handleSubmit(){
    var regex = /^\d{5}$/;
    if(regex.test(location)){
      getWeather();
      setIsResults(true)
    }else{
      alert("please enter a 5 digit zip code");
    };
  };


  return (
    <div class="App">
      <div id="search">
        <h2>Enter Zip Code</h2>
        <input name="search" type="number" onChange={handleOnChange}/><br/>
        <button id="submit" onClick={handleSubmit}>Submit</button>
      </div>
      {
        isResults &&
        <div id="results">
          <h1 id="city">{city}</h1>
          <h1 id="temp">{parseInt((temp-273.15)*1.8)+32}&#8457;</h1>
          <p id="weather">{weather}</p>
        </div> 
      }
    </div>
  );
}

export default App;
