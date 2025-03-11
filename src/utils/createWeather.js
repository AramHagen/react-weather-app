import { getCorrectIcon } from './weatherUtils';
import { getDayAbbreviation } from './dateUtils'; // Assuming you have this!

export async function createWeather(data) {
  const forecastDetails = await Promise.all(
    data.forecast.forecastday.map(async (forecast) => {
      const icon = await getCorrectIcon(forecast.day.condition);
      const dayAbbreviation = getDayAbbreviation(forecast.date);
      return {
        dayAbbreviation,
        icon,
        avgtemp: forecast.day.avgtemp_f,
      };
    })
  );

  return {
    city: data.location.name,
    tempF: data.current.temp_f,
    weatherCondition: data.current.condition.text,
    maxTemp: data.forecast.forecastday[0].day.maxtemp_f,
    lowTemp: data.forecast.forecastday[0].day.mintemp_f,
    location: location,
    forecastDetails,
  };
}
