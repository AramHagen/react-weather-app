import { Routes, Route, Navigate } from 'react-router-dom';
import AuthPage from './pages/AuthPage/AuthPage';
import Dashboard from './pages/Dashboard/Dashboard';
import NotFoundPage from './pages/NotFoundPage/NotFoundPage';
import Layout from './components/Layout/Layout';
import { useEffect } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch } from 'react-redux';
import { autoLoginThunk } from './redux/auth/authThunk';
import ProtectedRoute from './components/ProtectedRoute'

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
        {/* Redirect root based on authentication */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Navigate to="/dashboard" />
            </ProtectedRoute>
          }
        />
        {/* Auth and protected routes */}
        <Route path="/auth" element={<Layout><AuthPage /></Layout>} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Layout><Dashboard /></Layout>
            </ProtectedRoute>
          }
        />

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
}

export default App;
