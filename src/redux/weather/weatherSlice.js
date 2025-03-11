import { createSlice } from '@reduxjs/toolkit';
import { fetchWeatherThunk, fetchCitiesThunk } from './weatherThunk';

const initialState = {
  currentWeather: null, // User's current location weather
  cities: [], // Array of cities with name, latitude, and longitude
  cityWeather: {}, // Weather data for each city: { cityName: { lat, lon, weatherData } }
  userLocation: JSON.parse(localStorage.getItem('userLocation')) || null, // Load location directly, // Store user's latitude and longitude
  loading: false,
  error: null,
};

const weatherSlice = createSlice({
  name: 'weather',
  initialState,
  reducers: {
    setUserLocation: (state, action) => {
      state.userLocation = action.payload; // Store latitude and longitude
      localStorage.setItem('userLocation', JSON.stringify(action.payload));
    },
    loadUserLocationFromStorage: (state) => {
      const storedLocation = JSON.parse(localStorage.getItem('userLocation'));
      if (storedLocation) {
        state.userLocation = storedLocation;
      }
    },
    addCity: (state, action) => {
      const city = action.payload;
      if (!state.cities.find((c) => c.name === city.name)) {
        state.cities.push(city);
      }
    },
    removeCity: (state, action) => {
      const cityName = action.payload;
      state.cities = state.cities.filter((city) => city.name !== cityName);
      delete state.cityWeather[cityName];
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch weather (for both current location and cities)
      .addCase(fetchWeatherThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchWeatherThunk.fulfilled, (state, action) => {
        state.loading = false;
        const { type, cityName, latitude, longitude, weatherData } =
          action.payload;
        if (type === 'current') {
          state.currentWeather = weatherData;
          state.userLocation = { latitude, longitude };
        } else if (type === 'city' && cityName) {
          state.cityWeather[cityName] = { latitude, longitude, ...weatherData };
        }
      })
      .addCase(fetchWeatherThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Fetch cities from Firebase
      .addCase(fetchCitiesThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCitiesThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.cities = action.payload; // [{ name, latitude, longitude }]
      })
      .addCase(fetchCitiesThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { addCity, removeCity, clearError, loadUserLocationFromStorage } =
  weatherSlice.actions;
export default weatherSlice.reducer;
