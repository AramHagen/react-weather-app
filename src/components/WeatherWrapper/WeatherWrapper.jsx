import styles from './WeatherWrapper.module.scss'
import Forecast from '../Forecast/Forecast';
import Weather from '../Weather/Weather';
import PropTypes from 'prop-types';
import { WeatherPropTypes } from '../../types/propTypes'
function WeatherWrapper({ weather }) {
    return (
        <div className={`${styles['weather-container']}`}>
            <Weather city={weather.city} lowTemp={weather.lowTemp} maxTemp={weather.maxTemp} tempF={weather.tempF} weatherCondition={weather.weatherCondition} />
            <Forecast forecastDetails={weather.forecastDetails} />
        </div>
    )
}

export default WeatherWrapper
WeatherWrapper.propTypes = {
    weather: PropTypes.shape(WeatherPropTypes)
}