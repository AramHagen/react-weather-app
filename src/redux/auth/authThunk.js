import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onIdTokenChanged,
  getIdToken,
  getAuth,
  onAuthStateChanged,
  signOut,
} from 'firebase/auth';
import { auth } from '../../firebase';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { fetchWeatherThunk } from '../weather/weatherThunk';

// Helper to extract only serializable user data
const extractUserData = (user) => ({
  uid: user.uid,
  email: user.email,
});
// Auth Thunk for signup/login
export const authThunk = createAsyncThunk(
  'auth/authThunk',
  async ({ email, password, isSignUp }, { rejectWithValue, dispatch }) => {
    try {
      const userCredential = isSignUp
        ? await createUserWithEmailAndPassword(auth, email, password)
        : await signInWithEmailAndPassword(auth, email, password);

      const user = userCredential.user;
      const token = await getIdToken(user);
      const userData = extractUserData(user);

      // Get user's location after sign-in or sign-up
      try {
        const position = await new Promise((resolve, reject) => {
          navigator.geolocation.getCurrentPosition(resolve, reject);
        });

        const { latitude, longitude } = position.coords;
        localStorage.setItem(
          'userLocation',
          JSON.stringify({ latitude, longitude })
        ); // Save location

        dispatch(fetchWeatherThunk({ latitude, longitude })); // Fetch weather data
      } catch (locationError) {
        console.error('Failed to get user location:', locationError.message);
      }
      return { user: userData, token }; // Triggers 'fulfilled'
    } catch (error) {
      return rejectWithValue(error.message); // Triggers 'rejected'
    }
  }
);

// Auto-login (check current user on app load)
export const autoLoginThunk = createAsyncThunk(
  'auth/autoLogin',
  async (_, { rejectWithValue }) => {
    const auth = getAuth();

    return new Promise((resolve, reject) => {
      onAuthStateChanged(auth, (user) => {
        if (user) {
          resolve({
            user: {
              email: user.email,
              uid: user.uid,
              refreshToken: user.refreshToken,
            },
            token: user.accessToken || null,
          });
        } else {
          reject(rejectWithValue('No user login'));
        }
      });
    });
  }
);

// Add a new thunk for refreshing tokens
export const refreshTokenThunk = createAsyncThunk(
  'auth/refreshTokenThunk',
  async (user, { rejectWithValue }) => {
    try {
      const token = await getIdToken(user, true); // Force token refresh
      const userData = extractUserData(user);
      return { user: userData, token };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Update the setupTokenRefresh
export const setupTokenRefresh = () => (dispatch) => {
  onIdTokenChanged(auth, (user) => {
    if (user) {
      dispatch(refreshTokenThunk(user));
    } else {
      dispatch(logoutThunk());
    }
  });
};

export const logoutThunk = createAsyncThunk('auth/logoutThunk', async () => {
  await signOut(auth);
  window.location.href = '/auth';
});
