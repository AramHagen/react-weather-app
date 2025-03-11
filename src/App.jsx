import { Routes, Route } from 'react-router-dom';
import AuthPage from './pages/AuthPage/AuthPage';
import Dashboard from './pages/Dashboard/Dashboard';
import CitiesPage from './pages/CitiesPage/CitiesPage';
import CityDetailsPage from './pages/CityDetailsPage/CityDetailsPage';
import NotFoundPage from './pages/NotFoundPage/NotFoundPage';
import Layout from './components/Layout/Layout';
import { useEffect } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch } from 'react-redux';
import { autoLoginThunk } from './redux/auth/authThunk';


import "./App.scss";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    // Auto-login and load user location
    dispatch(autoLoginThunk());
  }, [dispatch]);

  return (
    <>
      <Routes>
        <Route path="/auth" element={<Layout><AuthPage /></Layout>} />
        <Route path="/dashboard" element={<Layout><Dashboard /></Layout>} />
        <Route path="/cities" element={<Layout><CitiesPage /></Layout>} />
        <Route path="/cities/:cityName" element={<Layout><CityDetailsPage /></Layout>} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
}

export default App;
