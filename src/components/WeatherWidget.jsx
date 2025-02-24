import React, { useState, useEffect } from "react";
import axios from "axios";

const WeatherWidget = ({ location }) => {
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    const fetchWeather = async () => {
      const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${process.env.REACT_APP_WEATHER_API_KEY}&units=metric`);
      setWeather(response.data);
    };
    fetchWeather();
  }, [location]);

  if (!weather) return <p>Loading weather...</p>;

  return (
    <div className="weather-widget">
      <h4>Weather in {location}</h4>
      <p>{weather.weather[0].description} - {weather.main.temp}°C</p>
    </div>
  );
};

export default WeatherWidget;
