import { createAsyncThunk } from '@reduxjs/toolkit';
import { getAuth } from 'firebase/auth';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import { getDayAbbreviation, getCorrectIcon } from '../../utils/weatherUtils';
const WEATHER_API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

// Fetch weather data from WeatherAPI
async function fetchWeatherData(latitude, longitude) {
  try {
    const response = await fetch(
      `https://api.weatherapi.com/v1/forecast.json?key=${WEATHER_API_KEY}&q=${latitude},${longitude}&days=7`
    );
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching weather data:', error);
    throw error; // Propagate the error to be handled by the thunk
  }
}

// Thunk to fetch weather and prepare data
export const fetchWeatherThunk = createAsyncThunk(
  'weather/fetchWeather',
  async ({ type, cityName, latitude, longitude }, { rejectWithValue }) => {
    try {
      const weatherData = await fetchWeatherData(latitude, longitude);

      const preparedWeather = {
        city: weatherData.location.name,
        tempF: weatherData.current.temp_f,
        weatherCondition: weatherData.current.condition.text,
        maxTemp: weatherData.forecast.forecastday[0].day.maxtemp_f,
        lowTemp: weatherData.forecast.forecastday[0].day.mintemp_f,
        forecastDetails: await Promise.all(
          weatherData.forecast.forecastday.map(async (day) => ({
            dayAbbreviation: getDayAbbreviation(day.date),
            icon: await getCorrectIcon(day.day.condition),
            avgTemp: day.day.avgtemp_f,
          }))
        ),
      };

      return {
        type,
        cityName,
        latitude,
        longitude,
        weatherData: preparedWeather,
      };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Fetch user's saved cities from Firebase
export const fetchCitiesThunk = createAsyncThunk(
  'weather/fetchCities',
  async (_, { rejectWithValue }) => {
    try {
      const auth = getAuth();
      const user = auth.currentUser;
      if (!user) throw new Error('User not authenticated');

      const db = getFirestore();
      const citiesCollection = collection(db, `users/${user.uid}/cities`);
      const snapshot = await getDocs(citiesCollection);

      const cities = snapshot.docs.map((doc) => ({
        name: doc.data().name,
        latitude: doc.data().latitude,
        longitude: doc.data().longitude,
      }));

      return cities; // Returns array: [{ name, latitude, longitude }]
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
