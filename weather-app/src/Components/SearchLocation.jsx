import React, { useState } from 'react';
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete';
import { GetWeatherData, GetWeeklyWeatherData } from '../Services/weatherapi';

export default function SearchLocation({ onCitySelect }) {
  const [address, setAddress] = useState("");

  const handleSelect = async value => {
    const results = await geocodeByAddress(value);
    const ll = await getLatLng(results[0]);
    setAddress(value);
    onCitySelect(value); // Pass selected city to parent component
    GetWeatherData(value); // Fetch weather data for selected city
    GetWeeklyWeatherData(value); //Fetches weather data for selected city for week
  }

  return (
    <div className='flex items-center justify-center mt-16'>
      <PlacesAutocomplete
        value={address}
        onChange={setAddress}
        onSelect={handleSelect}
      >
        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
          <div>
            <input
              className='bg-slate-500 w-max rounded-2xl h-10 text-2xl font-light mr-2 text-bg-slate-500 shadow-sm focus:text-white'
              {...getInputProps({
                placeholder: 'Search Places ...',
              })}
            />
            <div className='autocomplete-dropdown-container'>
              {loading && <div>Loading...</div>}
              {suggestions.map(suggestion => {
                const className = suggestion.active
                  ? 'suggestion-item--active'
                  : 'suggestion-item';
                const style = suggestion.active
                  ? { backgroundColor: '#8697b0', cursor: 'pointer' }
                  : { backgroundColor: '#64748b', cursor: 'pointer' };
                return (
                  <div
                    {...getSuggestionItemProps(suggestion, {
                      className,
                      style,
                    })}
                  >
                    <span>{suggestion.description}</span>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </PlacesAutocomplete>
    <svg
  xmlns="http://www.w3.org/2000/svg"
  viewBox="0 0 24 24"
  id="search"
  className='h-10'
>
  <path
    fill="#FFFFFF"
    d="M21.71,20.29,18,16.61A9,9,0,1,0,16.61,18l3.68,3.68a1,1,0,0,0,1.42,0A1,1,0,0,0,21.71,20.29ZM11,18a7,7,0,1,1,7-7A7,7,0,0,1,11,18Z"
  ></path>
</svg>



    </div>

  );
}




