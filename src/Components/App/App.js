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
      <div className='header'>
        <div className='header-logo'>mini weather</div>
      </div>
      <div className='search-box'>
        <input
          type='text'
          className='search-bar'
          placeholder='Type a place and press enter...'
          onChange={e => setQuery(e.target.value)}
          value={query}
          onKeyPress={search}
        ></input>
      </div>
      {(typeof weather.main == 'undefined') ? ('') : (
        <div className='results-box'>
          <div className='location-box'>
            <div className='location-info'>
              <div className='date'>{`
              ${date.toLocaleDateString('en-us', { weekday: 'long' })},  
              ${date.toLocaleDateString('en-us', { day: '2-digit' })} 
              ${date.toLocaleDateString('en-us', { month: 'short' })} 
              ${date.toLocaleDateString('en-us', { year: 'numeric' })}
              `}</div>
              <div className='location'>{weather.name}, {weather.sys.country}</div>
            </div>
          </div>
          <div className='temp-box'>
            <div className='temp-info'>
              <div className='temp-subtitle'>Currently</div>
              <div className='temp'>{weather.main.temp.toFixed(1)}°c</div>
              <div className='feels-like'>Feels like {weather.main.feels_like.toFixed(1)}°</div>
            </div>
          </div>
          <div className='weather-box'>
            <div className='weather'>{weather.weather[0].main}</div>
            <img src={`icons/${weather.weather[0].icon}.png`} />
          </div>
        </div>
      )}
      <div className='footer'>
        <div className='openweather-logo'></div>
        <div className='author'>Developed by Abel Areiza</div>
        <div className='social-media'>
          <ul>
            <li className='github'><a href='https://github.com/abelareiza'><span></span>/abelareiza</a></li>
            <li className='linkedin'><a href='https://www.linkedin.com/in/abel-areiza/'><span></span>/abel-areiza</a></li>
            <li className='twitter'><a href='https://twitter.com/Enjuavel/'><span></span>@Enjuavel</a></li>
          </ul>
        </div>
      </div>
    </div >
  );
}

export default App;
