// WeatherInfo.js
import React from 'react';

const WeatherInfo = ({ weatherData }) => {
  if (!weatherData) {
    return null;
  }

  const { name, icon, temperature, description, date, place } = weatherData;

  return (
    <div className="weather-info">
      <h2>{place}</h2>
      <p>Date: {date}</p>
      <p>Temperature: {temperature}°C</p>
      <p>Description: {description}</p>
      <img src={icon} alt="Weather icon" />
    </div>
  );
};

export default WeatherInfo;
