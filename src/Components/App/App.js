import React, { useState } from 'react';
import './App.css';

const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;
const api = { key: API_KEY, base: 'https://api.openweathermap.org/data/2.5/' };
const date = new Date(Date.now());

function App() {
  const [query, setQuery] = useState('');
  const [weather, setWeather] = useState({});

  const search = event => {
    if (event.key === "Enter") {
      fetch(`${api.base}weather?q=${query}&units=metric&appid=${api.key}`)
        .then(response => response.json())
        .then(result => {
          setWeather(result);
          setQuery('');
          console.log(result);
        });
    }
  }

  return (
    <div className={(typeof weather.main == 'undefined') ? 'App' : (weather.main.temp >= 16) ? 'App warm' : 'App cold'}>
      <div className='search-box'>
        <input
          type='text'
          className='search-bar'
          placeholder='Location name'
          onChange={e => setQuery(e.target.value)}
          value={query}
          onKeyPress={search}
        ></input>
      </div>
      {(typeof weather.main == 'undefined') ? ('') : (
        <div className='results-box'>
          <div className='location-box'>
            <div className='location'>{weather.name}, {weather.sys.country}</div>
            <div className='date'>{date.toDateString()}</div>
          </div>
          <div className='temp-box'>
            <div className='temp'>{weather.main.temp.toFixed(1)}°</div>
            <div className='feels-like'>Feels like: {weather.main.feels_like.toFixed(1)}°</div>
          </div>
          <div className='weather-box'>
            <div className='weather'>{weather.weather[0].main}</div>
            <img src={`http://openweathermap.org/img/w/${weather.weather[0].icon}.png`} />
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
