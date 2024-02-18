
const API_KEY = '8b2dc2db9bbca5a622bfe541197ae7dc';


export async function GetWeatherData(city) {
  try {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`);

    if (!response.ok) {
      throw new Error('yes problemo');
    }
    const data = await response.json();
    console.log('API Response:', data);
    return data;
  }

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
    clouds:{all},
    wind:{speed, deg, gust},

  } = data;

  const date = new Date(dt * 1000).toLocaleDateString();
  const IconUrl = `http://openweathermap.org/img/wn/${icon}@2x.png`;

  return {
    name,
    icon: IconUrl,
    temperature: temp, feels_like, temp_max, temp_min, humidity,
    description,
    date,
    place: `${name}, ${country}`,
    cloud:all,
    winds:speed,
  };
}

//get hourly data
export async function GetWeeklyWeatherData(city) {
  try {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric`);
    if (!response.ok) {
      throw new Error('Failed to fetch weather data');
    }
    //list to display the days
    const data1 = await response.json();
    const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
//filters all the results to only show one result per day
    const WeeklyData = data1.list.filter(weatherData => weatherData.dt_txt.endsWith("15:00:00")).map(weatherData => {
      const dayIndex = new Date(weatherData.dt * 1000).getDay();
      return {
        temp: weatherData.main.temp,
        feels_like: weatherData.main.feels_like,
        weather: weatherData.weather[0].main,
        description: weatherData.weather[0].description,
        icon: `http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`,
        country: data1.city.country,
        name: data1.city.name,
        dt_text: weatherData.dt_txt.split(" ")[1],
        date: dayNames[dayIndex],
      };
    });

    console.log("Weekly Data", WeeklyData);

    return WeeklyData


  } catch (error) {
    console.error('Error fetching weather data:', error);
    throw error;
  }
}

//get 3 hours of weather data 



export async function Get3HourlyWeatherData(city) {
  try {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric`);
    if (!response.ok) {
      throw new Error('Failed to fetch weather data hourly');
    }
    const data2 = await response.json();
    const HourlyData = data2.list.map(HourlyData => ({
      temp: HourlyData.main.temp,
      feels_like: HourlyData.main.feels_like,
      weather: HourlyData.weather[0].main,
      description: HourlyData.weather[0].description,
      icon: `http://openweathermap.org/img/wn/${HourlyData.weather[0].icon}@2x.png`,
      country: data2.city.country,
      name: data2.city.name,
      dt_text: HourlyData.dt_txt,
      date: new Date(HourlyData.dt * 1000).toLocaleDateString(),
    }));

    console.log("hourly Data", HourlyData);
    return HourlyData;


  } catch (error) {
    console.error('Error fetching weather data:', error);
    throw error;
  }

}
