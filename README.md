# Weather App with React, Firebase, and Redux

This is a weather application built with React, using Firebase for authentication and Redux for state management. The app fetches weather data from WeatherAPI and displays it for the user's current location.

## Features

- **User Authentication**: Firebase Authentication for sign-up, log-in, and token refresh.
- **Weather Data**: Fetches and displays current weather information for the user's location.
- **State Management**: Redux is used to manage the application's state.
- **SASS Styling**: Clean and modular styling with SASS.
- **Environment Variables**: API keys and sensitive data are managed using environment variables.

## Project Structure

```
src/
├── assets/           # Static assets like images or icons
├── components/       # Reusable React components
├── pages/            # Application pages (Login, Weather)
├── redux/            # Redux slices and Thunks
├── styles/           # SASS files for styling
├── types/            # Type definitions (if using TypeScript or for custom types)
├── utils/            # Utility functions (e.g., weather data processing)
├── App.jsx           # Main app component
├── main.jsx          # ReactDOM rendering
└── firebase.js       # Firebase configuration
```

## Environment Variables

Create a `.env` file at the root of your project and add the following variables:

```
VITE_WEATHER_API_KEY=
VITE_FIREBASE_API_KEY=
VITE_FIREBASE_AUTH_DOMAIN=
VITE_FIREBASE_PROJECT_ID=
VITE_FIREBASE_STORAGE_BUCKET=
VITE_FIREBASE_MESSAGING_SENDER_ID=
VITE_FIREBASE_APP_ID=
```

## Installation

1. Clone the repository:

```bash
git clone git@github.com:AramHagen/react-weather-app.git
cd your-repo
```

2. Install dependencies:

```bash
npm install
```

3. Run the development server:

```bash
npm run dev
```

4. To run tests:

```bash
npm run test
```

## Usage

- **Sign up / Log in**: Users can sign up or log in using Firebase Authentication.
- **Weather Data**: Once logged in, the app fetches and displays weather data for the user's current location.
- **Token Refresh**: Firebase automatically refreshes tokens to keep users logged in.

## Technologies

- **React**
- **Redux**
- **Firebase Authentication**
- **WeatherAPI**
- **SASS**
- **Vite**
