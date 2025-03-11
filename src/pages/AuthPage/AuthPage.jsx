import styles from './AuthPage.module.scss';
import { useEffect, useState } from 'react';
import AuthForm from '../../components/AuthForm/ AuthForm';
import { useDispatch, useSelector } from 'react-redux';
import { authThunk, autoLoginThunk } from '../../redux/auth/authThunk';
import { useNavigate } from 'react-router-dom';
import Loading from '../../components/Loading/Loading';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function AuthPage() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { isAuthenticated, loading, error } = useSelector((state) => state.auth);

    const [isSignUp, setIsSignUp] = useState(false);
    const toggleAuthMode = () => setIsSignUp((prevMode) => !prevMode);

    const handleAuthSubmit = async ({ email, password }) => {
        await dispatch(authThunk({ email, password, isSignUp }));
    };

    useEffect(() => {
        dispatch(autoLoginThunk()); // Automatically logs in if there's a session
    }, [dispatch]);

    useEffect(() => {
        if (isAuthenticated) {
            navigate('/dashboard');
        }
        if (error) {
            toast.error(error);
        }
    }, [isAuthenticated, error, navigate]);


    return (
        <>
            <div
                className={`${styles['auth-container']} h-full w-full relative`}
            >
                <div className={`${styles['form-container']}`}>
                    <AuthForm isSignUp={isSignUp} onSubmit={handleAuthSubmit} />
                </div>
                <button onClick={toggleAuthMode} className={`${styles['toggle-btn']}`}>
                    {isSignUp ? 'Already have an account? Login' : "Don't have an account? Sign Up"}
                </button>
                <div
                    className={`${styles.copyright}`}
                >
                    Copyright by <a href="https://github.com/AramHagen">Aram Hagen</a>
                </div>
            </div>
            {loading && <div
                className={`${styles['loading-container']}`}
            >
                <Loading width="120px" height="120px" />
            </div>}
            {/* Add Toast container */}
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
    );
}

export default AuthPage;
