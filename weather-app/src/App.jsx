import React, { useState } from 'react';
import SearchLocation from './Components/SearchLocation';
import GeneralInfo from './Components/GeneralInfo';
import Forecast from './Components/Forecast';
import HourlyForecast from './Components/HourlyForecast';

export default function App() {
  const [selectedCity, setSelectedCity] = useState(null);

  const handleCitySelect = (city) => {
    setSelectedCity(city);
  };

  return (
    <div>
      <SearchLocation onCitySelect={handleCitySelect} />
      <GeneralInfo selectedCity={selectedCity} />
      <section className='flex flex-row'>
        {[...Array(1)].map((_, index) => (
          <Forecast key={index} selectedCity={selectedCity} forecastIndex={index} />
          
        ))}
      </section>
      <HourlyForecast selectedCity={selectedCity}/>;

    </div>
  );
}
