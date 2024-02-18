import React, { useState, useEffect } from 'react';
import { Get3HourlyWeatherData  } from '../Services/weatherapi';

export default function HourlyForecast({selectedCity}) {
  const [hourlyData, setHourlyData] = useState(null);


  
  useEffect(() => {
    if (selectedCity) {
      // Fetch weekly weather data for the selected city
      Get3HourlyWeatherData(selectedCity)
        .then((data2) => {
          setHourlyData(data2);
        })
        .catch((error) => {
          console.error('Error fetching weather data:', error.message);
        });
    }
  }, [selectedCity]);

  if (!hourlyData) {
    return <div className='text-white text-2xl font-Lato'>Enter a location please c:</div>;
  }

  
  return (
    <div className='flex flex-row justify-center items-center w-full'>
      {hourlyData.map((three_hourly, index) => (
        <section key={index} className='font-Lato flex flex-col bg-slate-700 my-4 mx-4 rounded-2xl'>
          <div className='text-white w-full text-left mb-4 mx-3 my-2'>{three_hourly.date}</div>
            <hr className='text-white mb-4 mx-3 text-left' />
            <div className='text-white mb-1 mx-3 text-left text-5xl'>{three_hourly.temp}°C</div>
          <div className='text-white mb-1 mx-3 text-left'> feels like {three_hourly.feels_like} °C</div>
          <div className='text-white mb-4 text-right'>
            <img src={three_hourly.icon} alt="Weather Icon" />
          </div>
          <p className='text-white mb-4 mx-3 text-left capitalize'>{three_hourly.description}</p>
          <hr className='text-white mb-4 mx-3 text-left' />
          <div className='text-white mb-4 mx-3 text-left'>{three_hourly.place}</div>
        </section>
      ))}
    </div>
  );


}
