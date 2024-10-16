import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { login } from '../../redux/authSlice';
import './login.css'; 
import Logo from '../../assets/faceVisionLogo.png';
import Google from '../../assets/google.png';
import Facebook from '../../assets/facebook.png';
import X from '../../assets/x.png';
import axios from 'axios';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false); // Loading state for UX
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (email && password) {
            setLoading(true); // Start loading
            try {
                const response = await axios.post('http://localhost:5000/api/auth/login', { email, password });
                const { data } = response;

                // Dispatch the login action with user data and token
                dispatch(login({  
                    _id: data._id,
                    username: data.username,
                    email: data.email,
                    phoneNumber: data.phoneNumber,
                    profilePicture: data.profilePicture,
                    token: data.token 
                }));

                // Store token securely if necessary (e.g., in cookies/localStorage)
                localStorage.setItem('token', data.token);

                // Navigate to the dashboard or any protected route
                navigate('/dashboard');
            } catch (error) {
                console.error('Login error:', error.response?.data?.message || error.message);
                alert(error.response?.data?.message || 'Login failed. Please try again.');
            } finally {
                setLoading(false); // End loading
            }
        } else {
            alert('Please enter both email and password.');
        }
    };

    return (
        <div className="login-container">
            <div className="login-card">
                <div className="login-header">
                    <img src={Logo} alt='faceVision' />
                    <h2>Welcome to 360 FaceVision</h2>
                    <p>Please enter your details to Sign In</p>
                </div>
                <div className="social-buttons">
                    <button className="social-button google"><img src={Google} alt='Google' /></button>
                    <button className="social-button apple"><img src={Facebook} alt='Facebook' /></button>
                    <button className="social-button facebook"><img src={X} alt='X' /></button>
                </div>
                <div className="divider">
                    <span>or</span>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="input-group">
                        <label htmlFor="email">Email address</label>
                        <input
                            id="email"
                            type="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="input-group">
                        <label htmlFor="password">Password</label>
                        <input
                            id="password"
                            type="password"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <div className="remember-forgot">
                        <label>
                            <input type="checkbox" />
                            Remember for 30 days
                        </label>
                        <a href="/" className="forgot-password">Forgot password?</a>
                    </div>
                    <button type="submit" className="login-button" disabled={loading}>
                        {loading ? 'Signing in...' : 'Sign in'}
                    </button>
                </form>
                <div className="signup-link">
                    Don't have an account? <a href="/Signup">Create account</a>
                </div>
            </div>
        </div>
    );
};

export default Login;
