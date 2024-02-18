import React, { useState, useEffect } from 'react';
import { GetWeatherData, extractWeatherAttributes } from '../Services/weatherapi';

export default function GeneralInfo({ selectedCity }) {
  const [weatherData, setWeatherData] = useState(null);

  useEffect(() => {
    if (selectedCity) {
      // Fetch weather data for the selected city
      GetWeatherData(selectedCity)
        .then((data) => {
          setWeatherData(data);
        })
        .catch((error) => {
          console.error('Error fetching weather data:', error.message);
        });
    }
  }, [selectedCity]);

  if (!weatherData) {
    return <div className=' text-white text-2xl font-Lato'> Enter a location please c:</div>;
  }

  const formattedWeatherData = extractWeatherAttributes(weatherData);

  return (
    <div className='flex justify-center items-center w-full'>
    <section className='font-Lato flex flex-col bg-slate-700 w-5/12 h-11/12 my-14 mx-14 rounded-2xl'>
      {formattedWeatherData && (
        <>
          <div className='  text-white w-full text-left mb-4 mx-3'>{formattedWeatherData.date}</div>
          <hr className='text-white mb-4 mx-3 text-left' />
          <div className='text-white mb-1 mx-3 text-left text-5xl'>{formattedWeatherData.temperature}°C</div>
          <div className='text-white mb-1 mx-3 text-left'> feels like {formattedWeatherData.feels_like} °C</div>
          <div className='text-white mb-4 text-right '>
            <img src={formattedWeatherData.icon} alt="Weather Icon"  />
          </div>
          <p className='text-white mb-4 mx-3 text-left capitalize'>{formattedWeatherData.description}</p>

          <hr className='text-white mb-4 mx-3 text-left' />
          <div className='text-white mb-4 mx-3 text-left'>{formattedWeatherData.place}</div>
        </>
      )}
    </section>
    </div>
  );
}
