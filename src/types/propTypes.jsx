import PropTypes from "prop-types"
export const ForecastDetailPropTypes = PropTypes.shape({
    avgTemp: PropTypes.number,
    dayAbbreviation: PropTypes.string,
    icon: PropTypes.string
})

export const WeatherPropTypes = {
    city: PropTypes.string,
    lowTemp: PropTypes.number,
    maxTemp: PropTypes.number,
    tempF: PropTypes.number,
    weatherCondition: PropTypes.string,
    forecastDetails: PropTypes.arrayOf(ForecastDetailPropTypes)
}