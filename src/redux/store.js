import { configureStore } from '@reduxjs/toolkit';
import authReducer from './auth/authSlice';
import weatherReducer from './weather/weatherSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    weather: weatherReducer,
  },
});

export default store;
