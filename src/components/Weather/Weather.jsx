import PropTypes from "prop-types"
import styles from './Weather.module.scss'
function Weather(props) {
    const { city, lowTemp, maxTemp, tempF, weatherCondition } = props;
    return (
        <div className={`${styles['weather-details']}`}>
            <span className={`${styles['city-name']}`}
            >{city}</span>
            <span className={`${styles['temp-f']}`}>{tempF}°</span>
            <span className={`${styles['weather-condition']}`}
            >{weatherCondition}</span>
            <div className={`${styles['weather-degree']}`}>
                <span
                >H:
                    <span>{maxTemp}°</span>
                </span>
                <span
                >L:
                    <span>{lowTemp}°</span>
                </span>
            </div>
        </div>
    )
}

export default Weather

Weather.propTypes = {
    city: PropTypes.string,
    lowTemp: PropTypes.number,
    maxTemp: PropTypes.number,
    tempF: PropTypes.number,
    weatherCondition: PropTypes.string
}