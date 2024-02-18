import React, { useState, useEffect } from 'react';
import { GetWeatherData, extractWeatherAttributes } from '../Services/weatherapi';
import windsvg from "../assets/wind.svg"
import watersvg from "../assets/water.svg"

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
    <div className='flex flex-row justify-center items-center w-full'>
      <section className='font-Lato flex flex-col bg-slate-700 w-2/12 h-11/12 my-14 mx-2 rounded-2xl'>
        {formattedWeatherData && (
          <>
            <div className='  text-white w-full text-left mb-4 mx-3'>{formattedWeatherData.date}</div>
            <hr className='text-white mb-4 mx-3 text-left' />
            <div className='text-white mb-1 mx-3 text-left text-5xl'>{formattedWeatherData.temperature}°C</div>
            <div className='text-white mb-10 mx-3 text-left text-sm'> feels like {formattedWeatherData.feels_like} °C</div>

            <hr className='text-white mb-4 mx-3 text-left' />
            <div className='text-white mb-4 mx-3 text-left'>{formattedWeatherData.place}</div>
          </>
        )}
      </section>




      <section className='font-Lato flex flex-row bg-slate-700 w-3/12 h-11/12 my-14 mx-2 rounded-2xl'>
        <div>
          {formattedWeatherData && (<>
            <div className='  text-white text-left mb-4 mx-3'>{formattedWeatherData.date}</div>
            <hr className='text-white mb-4 mx-3 text-left w-full' />
            <div className='text-white mb-1 mx-3 text-left text-xl'>High: {formattedWeatherData.temp_max}°C</div>
            <div className='text-white mb-1 mx-3 text-left text-xl'>Low: {formattedWeatherData.temp_min} °C</div>
            <div className='text-white mb-4 text-right '>
              <img src={formattedWeatherData.icon} alt="Weather Icon" />
            </div>
            <p className='text-white mb-4 mx-3 text-left capitalize'>{formattedWeatherData.description}</p>
            
            <hr className='text-white mb-4 mx-3 text-left w-full' />
            <div className='text-white mb-4 mx-3 text-left'>{formattedWeatherData.place}</div>

          </>


          )} </div>


        <div>
        {formattedWeatherData && (
          <>
          <div className='  text-slate-700 text-left mb-4 mx-3'>{formattedWeatherData.date}</div>
          <hr className='text-white mb-4 mx-3 text-left w-full' />
          
            <div>
              <img src={watersvg} alt="humidity icon" className='h-20' />
            </div>

            <p className='text-white mb-4 mx-3 text-left capitalize'>Humidity: {formattedWeatherData.humidity}%</p>

            <div className='text-white '>
              <img src={windsvg} alt="Wind icon" className=' h-16' />
            </div>
            <div className='text-white mb-3 mx-3 text-left'>Wind Speed: {formattedWeatherData.winds} m/s</div>
            <hr className='text-white mb-4 mx-3 text-left w-full' />
            <div className='text-white mb-4 mx-3 text-left'>{formattedWeatherData.place}</div>

          </>
        )

        }

        </div>

      </section>
    </div>
  );
}
