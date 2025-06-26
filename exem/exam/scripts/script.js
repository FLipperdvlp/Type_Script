import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

const API_KEY = 'YOUR_OPENWEATHERMAP_API_KEY'; // Replace with your actual API key
const DEFAULT_CITY = 'Kyiv'; // Default city if geolocation fails

function App() {
  const [activeTab, setActiveTab] = useState('today');
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState(null);
  const [nearbyCities, setNearbyCities] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get user's location or use default city
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          getCityByCoordinates(latitude, longitude);
        },
        () => {
          fetchWeatherData(DEFAULT_CITY);
        }
      );
    } else {
      fetchWeatherData(DEFAULT_CITY);
    }
  }, []);

  const getCityByCoordinates = async (lat, lon) => {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}`
      );
      fetchWeatherData(response.data.name);
    } catch (err) {
      fetchWeatherData(DEFAULT_CITY);
    }
  };

  const fetchWeatherData = async (cityName) => {
    setLoading(true);
    setError(null);
    try {
      // Current weather
      const weatherResponse = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}&units=metric`
      );
      setWeatherData(weatherResponse.data);
      setCity(weatherResponse.data.name);

      // 5-day forecast
      const forecastResponse = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${API_KEY}&units=metric`
      );
      setForecastData(forecastResponse.data);

      // Nearby cities (using a sample list for demonstration)
      // In a real app, you might use a different API for this
      const nearby = [
        { name: 'Lviv', temp: Math.round(Math.random() * 10 + 10) },
        { name: 'Kharkiv', temp: Math.round(Math.random() * 10 + 10) },
        { name: 'Odesa', temp: Math.round(Math.random() * 10 + 10) },
        { name: 'Dnipro', temp: Math.round(Math.random() * 10 + 10) },
      ];
      setNearbyCities(nearby);
    } catch (err) {
      setError('City not found. Please try another location.');
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (city.trim()) {
      fetchWeatherData(city);
    }
  };

  const formatDate = (timestamp) => {
    const date = new Date(timestamp * 1000);
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const formatTime = (timestamp) => {
    const date = new Date(timestamp * 1000);
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getDayOfWeek = (timestamp) => {
    const date = new Date(timestamp * 1000);
    return date.toLocaleDateString('en-US', { weekday: 'short' });
  };

  const getWindDirection = (degrees) => {
    const directions = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
    const index = Math.round((degrees % 360) / 45);
    return directions[index % 8];
  };

  if (loading && !weatherData) {
    return <div className="loading">Loading weather data...</div>;
  }

  if (error) {
    return (
      <div className="error-page">
        <h2>{error}</h2>
        <button onClick={() => fetchWeatherData(DEFAULT_CITY)}>
          Back to default city
        </button>
      </div>
    );
  }

  return (
    <div className="wrapper">
      <header id="header">
        <div id="header__title">
          <h1>My weather</h1>
        </div>
        <div id="header__search">
          <form onSubmit={handleSearch} className="search__input">
            <input
              type="text"
              name="search"
              id="search"
              placeholder="Weather in your city"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
            <button type="submit">Search</button>
          </form>
        </div>
      </header>
      <menu id="menu">
        <div id="menu__container">
          <ul id="header__menu">
            <li className="menu__item">
              <button
                className={`menu__link ${activeTab === 'today' ? 'active' : ''}`}
                onClick={() => setActiveTab('today')}
              >
                Today
              </button>
            </li>
            <li className="menu__item">
              <button
                className={`menu__link ${
                  activeTab === 'five-days' ? 'active' : ''
                }`}
                onClick={() => setActiveTab('five-days')}
              >
                5-day forecast
              </button>
            </li>
          </ul>
        </div>
      </menu>
      <main>
        {activeTab === 'today' && weatherData && (
          <section id="today">
            <div className="short-info">
              <h2>Current Weather in {weatherData.name}</h2>
              <div className="current-weather">
                <div className="weather-date">
                  {formatDate(weatherData.dt)}
                </div>
                <div className="weather-icon">
                  <img
                    src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}
                    alt={weatherData.weather[0].description}
                  />
                </div>
                <div className="weather-description">
                  {weatherData.weather[0].description}
                </div>
                <div className="weather-temp">
                  {Math.round(weatherData.main.temp)}°C
                </div>
                <div className="weather-feels">
                  Feels like: {Math.round(weatherData.main.feels_like)}°C
                </div>
                <div className="weather-sunrise">
                  Sunrise: {formatTime(weatherData.sys.sunrise)}
                </div>
                <div className="weather-sunset">
                  Sunset: {formatTime(weatherData.sys.sunset)}
                </div>
                <div className="weather-day-length">
                  Day length:{' '}
                  {Math.floor(
                    (weatherData.sys.sunset - weatherData.sys.sunrise) / 3600
                  )}
                  h{' '}
                  {Math.round(
                    ((weatherData.sys.sunset - weatherData.sys.sunrise) % 3600) /
                      60
                  )}
                  m
                </div>
              </div>
            </div>

            <div className="hourly-forecast">
              <h3>Hourly Forecast</h3>
              <div className="hourly-list">
                {forecastData &&
                  forecastData.list.slice(0, 8).map((hour) => (
                    <div key={hour.dt} className="hourly-item">
                      <div className="hourly-time">
                        {formatTime(hour.dt)}
                      </div>
                      <div className="hourly-icon">
                        <img
                          src={`https://openweathermap.org/img/wn/${hour.weather[0].icon}.png`}
                          alt={hour.weather[0].description}
                        />
                      </div>
                      <div className="hourly-description">
                        {hour.weather[0].description}
                      </div>
                      <div className="hourly-temp">
                        {Math.round(hour.main.temp)}°C
                      </div>
                      <div className="hourly-feels">
                        Feels: {Math.round(hour.main.feels_like)}°C
                      </div>
                      <div className="hourly-wind">
                        {Math.round(hour.wind.speed)} m/s{' '}
                        {getWindDirection(hour.wind.deg)}
                      </div>
                    </div>
                  ))}
              </div>
            </div>

            <div className="nearby-cities">
              <h3>Nearby Cities</h3>
              <div className="cities-list">
                {nearbyCities.map((city) => (
                  <div key={city.name} className="city-item">
                    <div className="city-name">{city.name}</div>
                    <div className="city-temp">{city.temp}°C</div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {activeTab === 'five-days' && forecastData && (
          <section id="five-days">
            <div className="five-days-list">
              <h2>5-Day Forecast for {weatherData.name}</h2>
              <div className="days-container">
                {forecastData.list
                  .filter((_, index) => index % 8 === 0)
                  .map((day) => (
                    <div key={day.dt} className="day-item">
                      <div className="day-name">{getDayOfWeek(day.dt)}</div>
                      <div className="day-icon">
                        <img
                          src={`https://openweathermap.org/img/wn/${day.weather[0].icon}.png`}
                          alt={day.weather[0].description}
                        />
                      </div>
                      <div className="day-temp">
                        {Math.round(day.main.temp)}°C
                      </div>
                      <div className="day-description">
                        {day.weather[0].description}
                      </div>
                    </div>
                  ))}
              </div>
            </div>

            <div className="day-hourly">
              <h3>Daily Details</h3>
              {forecastData.list
                .filter((_, index) => index < 8)
                .map((hour) => (
                  <div key={hour.dt} className="hourly-detail">
                    <div className="detail-time">{formatTime(hour.dt)}</div>
                    <div className="detail-icon">
                      <img
                        src={`https://openweathermap.org/img/wn/${hour.weather[0].icon}.png`}
                        alt={hour.weather[0].description}
                      />
                    </div>
                    <div className="detail-temp">
                      {Math.round(hour.main.temp)}°C
                    </div>
                    <div className="detail-wind">
                      Wind: {Math.round(hour.wind.speed)} m/s{' '}
                      {getWindDirection(hour.wind.deg)}
                    </div>
                    <div className="detail-humidity">
                      Humidity: {hour.main.humidity}%
                    </div>
                  </div>
                ))}
            </div>
          </section>
        )}
      </main>
    </div>
  );
}

export default App;