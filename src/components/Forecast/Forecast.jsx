import PropTypes from 'prop-types'
import { ForecastDetailPropTypes } from '../../types/propTypes'
import { getDayAbbreviation } from '../../utils/weatherUtils'
import './Forecast.scss'

function Forecast({ forecastDetails }) {
    const todayAbbreviation = getDayAbbreviation(new Date());
    return (
        <div>
            <div className="forecast-container">
                <div className="forecast-container__title">
                    Weekly Forecast
                </div>
                <div className="forecast-container__list">
                    {forecastDetails.map((item, index) => (
                        <div key={index} className={`forecast-container__item ${item.dayAbbreviation === todayAbbreviation ? 'bg-blueGem' : 'bg-blueGemOP'}`}>
                            <span className="day">{item.dayAbbreviation}</span>
                            <img src={item.icon} />
                            <span className="degree">{item.avgTemp}°</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Forecast
Forecast.propTypes = {
    forecastDetails: PropTypes.arrayOf(ForecastDetailPropTypes)
}