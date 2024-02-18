

const API_KEY = '8b2dc2db9bbca5a622bfe541197ae7dc';


export async function GetWeatherData(city) {
  //london is just a placeholder 
  try{
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`);
    
  if (!response.ok) {
    throw new Error('yes problemo');
  }
  const data = await response.json();
  console.log('API Response:', data);
  return data;}

  catch (error) {
    console.error('Error fetching weather data:', error);
    throw error;
  }
  
}

export function extractWeatherAttributes(data) {
  if (!data) {
    return null;
  }

  const {
    name,
    main: { temp, feels_like, temp_max, temp_min, humidity },
    weather: [{ main, description, icon }],
    sys: { country },
    dt,
  } = data;

  const date = new Date(dt * 1000).toLocaleDateString();
  const IconUrl = `http://openweathermap.org/img/wn/${icon}@2x.png`;

  return {
    name,
    icon: IconUrl,
    temperature: temp, feels_like,
    description,
    date,
    place: `${name}, ${country}`,
  };
}

export async function GetWeeklyWeatherData(city) {
  try {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric`);
    if (!response.ok) {
      throw new Error('Failed to fetch weather data');
    }
    const data1 = await response.json();
    
    const WeeklyData = data1.list.filter(weatherData => weatherData.dt_txt.endsWith("15:00:00")).map(weatherData=> ({
      temp: weatherData.main.temp,
      feels_like: weatherData.main.feels_like,
      weather: weatherData.weather[0].main,
      description: weatherData.weather[0].description,
      icon: `http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`,
      country: data1.city.country,
      name: data1.city.name,
      dt_text: weatherData.dt_txt.split(" ")[1],
      date: new Date(weatherData.dt * 1000).toLocaleDateString(),
    }));

    console.log("Weekly Data", WeeklyData);
    return WeeklyData


  } catch (error) {
    console.error('Error fetching weather data:', error);
    throw error;
  }
}

export function extractWeeklyWeatherAttributes(data1) {
  if (!data1 || !data1.list || data1.list.length === 0) {
    return null;
  }

  const weeklyData = data1.list.map(weatherData => {
    return {
      temp: weatherData.main.temp,
      feels_like: weatherData.main.feels_like,
      weather: weatherData.weather[0].main,
      description: weatherData.weather[0].description,
      icon: `http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`,
      country: data1.city.country,
      name: data1.city.name,
      dt_text: weatherData.dt_txt,
      date: new Date(weatherData.dt * 1000).toLocaleDateString(),
    };
  });

  return weeklyData;
}

