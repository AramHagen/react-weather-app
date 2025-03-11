import { useDispatch } from 'react-redux';
import { logoutThunk } from '../../redux/auth/authThunk';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { fetchWeatherThunk } from '../../redux/weather/weatherThunk';
import Loading from '../../components/Loading/Loading'
import { loadUserLocationFromStorage } from '../../redux/weather/weatherSlice';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import WeatherWrapper from '../../components/WeatherWrapper/WeatherWrapper';

function Dashboard() {
    const dispatch = useDispatch();

    // Get weather data and user location from Redux store
    const { currentWeather, loading, error } = useSelector(
        (state) => state.weather
    );

    useEffect(() => {
        dispatch(loadUserLocationFromStorage());

        const userLocation = JSON.parse(localStorage.getItem('userLocation'));
        if (userLocation && !currentWeather && !loading) {
            dispatch(fetchWeatherThunk({ ...userLocation, type: 'current' }));
        }
        if (error) {
            toast.error(error);
        }
    }, [dispatch, currentWeather, loading, error]);

    const handleSignOut = () => {
        dispatch(logoutThunk());
    };

    return (
        <>
            <button style={{ position: 'fixed', top: '10px' }} onClick={handleSignOut}>Sign Out</button>
            {!loading && currentWeather && <WeatherWrapper weather={currentWeather} />}
            {loading &&
                <Loading width="120px" height="120px" />
            }
            <ToastContainer
                position="top-right"
                autoClose={3000}
                hideProgressBar={false}
                closeOnClick
                pauseOnHover
                draggable
                theme="light"
            />
        </>
    )
}

export default Dashboard
