// // weatherUtils.js

// export function extractWeatherAttributes(data) {
//     if (!data) {
//       return null;
//     }
  
//     const {
//       name,
//       main: { temp, feels_like, temp_max, temp_min, humidity },
//       weather: [{ main, description, icon }],
//       sys: { country },
//       dt,
//     } = data;
  
//     const date = new Date(dt * 1000).toLocaleDateString();
//     const IconUrl = `http://openweathermap.org/img/wn/${icon}@2x.png`;
  
//     return {
//       name,
//       icon: IconUrl,
//       temperature: temp,
//       description,
//       date,
//       place: `${name}, ${country}`,
//     };
//   }
  