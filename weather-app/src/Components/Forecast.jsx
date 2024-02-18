import React, { useState, useEffect } from 'react';
import { GetWeeklyWeatherData } from '../Services/weatherapi';

export default function Forecast({ selectedCity }) {
  const [weeklyWeatherData, setWeeklyWeatherData] = useState(null);

  useEffect(() => {
    if (selectedCity) {
      // Fetch weekly weather data for the selected city
      GetWeeklyWeatherData(selectedCity)
        .then((data1) => {
          setWeeklyWeatherData(data1);
        })
        .catch((error) => {
          console.error('Error fetching weather data:', error.message);
        });
    }
  }, [selectedCity]);

  if (!weeklyWeatherData) {
    return <div className='text-white text-2xl font-Lato'>Enter a location please c:</div>;
  }

  return (
    <div className='flex flex-row justify-center items-center w-full'>
      {weeklyWeatherData.map((forecast, index) => (
        <section key={index} className='font-Lato flex flex-col bg-slate-700 my-4 mx-4 rounded-2xl'>
          <div className='text-white w-full text-left mb-4 mx-3 my-2'>{forecast.date} at {forecast.dt_text}</div>
            <hr className='text-white mb-4 mx-3 text-left' />
            <div className='text-white mb-1 mx-3 text-left text-5xl'>{forecast.temp}°C</div>
          <div className='text-white mb-1 mx-3 text-left'> feels like {forecast.feels_like} °C</div>
          <div className='text-white mb-4 text-right'>
            <img src={forecast.icon} alt="Weather Icon" />
          </div>
          <p className='text-white mb-4 mx-3 text-left capitalize'>{forecast.description}</p>
          <hr className='text-white mb-4 mx-3 text-left' />
          <div className='text-white mb-4 mx-3 text-left'>{forecast.place}</div>
        </section>
      ))}
    </div>
  );
}
