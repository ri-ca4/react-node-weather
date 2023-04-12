import './App.css';
import { useState } from 'react';
import  axios from 'axios';


function App() {
  const [location, setLocation] = useState('');
  const [weather, setWeather] = useState('');
  const [isResults, setIsResults] = useState(false)

  const getWeather = ()=>{
    const options = {
      method:'GET',
      url: 'http://localhost:5000/weather',
      params: {loc: location}
    };

    axios.request(options).then((response)=>{
      const data = response.data;
      setWeather(data);
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
    <div id="App">
      <div id="search-bar">
        <label name="search">Enter Zip Code</label>
        <input name="search" type="number" onChange={handleOnChange}/>
        <button id="submit" onClick={handleSubmit}>Submit</button>
      </div>
      {
        isResults &&
        <div id="results">
          <h1>{weather.name}</h1>
          <h3>{parseInt((weather.main.temp-273.15)*1.8)+32}&#8457;</h3>
          <p>{weather.weather[0].description}</p>
        </div> 
      }
    </div>
  );
}

export default App;
