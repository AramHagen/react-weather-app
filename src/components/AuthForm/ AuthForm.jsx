import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";
import PropTypes from 'prop-types';
import './ AuthForm.scss';

function AuthForm({ isSignUp, onSubmit }) {
    const [isShowPassword, setIsShowPassword] = useState(false);
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    const handleToggleEye = () => {
        setIsShowPassword((prevMode) => !prevMode);
    }
    const onFormSubmit = (data) => {
        onSubmit(data)
    }
    return (
        <form onSubmit={handleSubmit(onFormSubmit)}>
            <div className="container-up">
                <h2 className="title">
                    {isSignUp ? 'Sign Up' : 'Sign in '}
                </h2>
                <div className="input-container pb-4">
                    <label htmlFor="username">Username</label>
                    <div className="mt-2">
                        <input
                            id="username"
                            name="username"
                            type="text"
                            autoComplete="off"
                            placeholder="Username"
                            className="custom-input"
                            {...register('email', {
                                required: 'Email is required',
                                pattern: {
                                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                                    message: 'Invalid email format',
                                },
                            })}
                        />
                        {errors.email && <p className="error">{errors.email.message}</p>}
                    </div>
                </div>
                <div className="input-container">
                    <label htmlFor="password">Password</label>
                    <div className="mt-2 relative">
                        <input
                            id="password"
                            name="password"
                            type={isShowPassword ? 'text' : 'password'}
                            autoComplete="off"
                            placeholder="Password"
                            className="custom-input"
                            {...register('password', {
                                required: 'Password is required',
                                minLength: {
                                    value: 6,
                                    message: 'Password must be at least 6 characters',
                                },
                            })}
                        />
                        <button
                            className="eye-button"
                            type="button"
                            onClick={handleToggleEye}
                        >
                            {!isShowPassword && <IoEyeOutline />}
                            {isShowPassword && <IoEyeOffOutline />}
                        </button>
                        {errors.password && <p className="error">{errors.password.message}</p>}
                    </div>
                </div>
                <div className="mt-2 space-y-6">
                    <div className="location-container">
                        <div className="checkbox-container">
                            <input
                                name="location-permission"
                                type="checkbox"
                                className="custom-checkbox"
                                {...register('locationPermission', {
                                    required: 'Location permission is required'
                                })}
                            />
                        </div>
                        <div className="current-location-descrption">
                            <label
                                htmlFor="location-permission"
                                className="font-medium text-white">Current Location</label>
                            <p className="text-grey">
                                Allow access to your current location for weather
                                updates
                            </p>
                            {errors.locationPermission && <p className="error">Allow location access</p>}
                        </div>
                    </div>
                </div>
            </div>
            <div className="container-buttons">
                <button type="submit">
                    {isSignUp ? 'Sign Up' : 'Sign in '}
                </button>
            </div>
        </form>
    )
}

AuthForm.propTypes = {
    isSignUp: PropTypes.bool.isRequired,
    onSubmit: PropTypes.func.isRequired,
};

export default AuthForm
