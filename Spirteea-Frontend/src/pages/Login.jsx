import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginSuperAdmin, setAuthToken } from '../api';

const Login = () => {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState('');

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSubmitting(true);
        try {
            const res = await loginSuperAdmin({ email, password });
            if (res?.token) {
                setAuthToken(res.token, true);
                if (res.admin) {
                    localStorage.setItem('adminUser', JSON.stringify(res.admin));
                }
                navigate('/dashboard/registrations-enquiry');
            } else {
                setError('Unexpected response from server.');
            }
        } catch (err) {
            setError(err?.message || 'Login failed. Please check your credentials.');
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="login-wrapper">
            <style>
                {`
                @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&family=Raleway:wght@400;700&family=DM+Sans:wght@400;500;700&display=swap');
                @import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css');

                .login-wrapper {
                    background: url('https://img.freepik.com/free-photo/low-angle-shot-high-rise-buildings-clear-sky-frankfurt-germany_181624-30909.jpg?t=st=1721974960~exp=1721978560~hmac=5ac1ac0494641f59edf007ef934ee01de9a07af6046d462a264aba2393b95c1c&w=1060') no-repeat center center fixed;
                    background-size: cover;
                    min-height: 100vh;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    position: relative;
                    padding: 20px;
                    margin: 0;
                    font-family: 'DM Sans', sans-serif;
                }

                .login-wrapper::before {
                    content: '';
                    position: absolute;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    background: rgba(0, 0, 0, 0.35);
                    backdrop-filter: blur(8px);
                    z-index: 1;
                }

                .login-card {
                    display: flex;
                    width: 100%;
                    max-width: 900px;
                    background: #fff;
                    border-radius: 12px;
                    overflow: hidden;
                    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.4);
                    z-index: 2;
                    flex-direction: row;
                    min-height: 500px;
                }

                .login-left-section {
                    flex: 4.5;
                    background: #fff;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    padding: 40px 40px 30px;
                    text-align: center;
                }

                .login-logo {
                    width: 100%;
                    max-width: 180px;
                    height: auto;
                    margin-bottom: 20px;
                }

                .brand-title {
                    color: #1a5153;
                    font-family: 'Raleway', sans-serif;
                    font-size: 1.15rem;
                    font-weight: 700;
                    margin-bottom: 4px;
                }

                .brand-tagline {
                    color: #b49d68;
                    font-family: 'Poppins', sans-serif;
                    font-size: 0.75rem;
                    font-weight: 600;
                    letter-spacing: 0.5px;
                }

                .login-right-section {
                    flex: 5.5;
                    background: linear-gradient(135deg, #1b8587 0%, #78e2e3 100%);
                    padding: 35px 50px 30px;
                    color: #fff;
                    display: flex;
                    flex-direction: column;
                    position: relative;
                }

                .login-heading {
                    font-family: 'Raleway', sans-serif;
                    font-size: 3.2rem;
                    font-weight: 700;
                    margin-bottom: 5px;
                    padding-bottom: 8px;
                    border-bottom: 1px solid rgba(255, 255, 255, 0.4);
                    width: 100%;
                    line-height: 1;
                }

                .form-group {
                    margin-top: 20px;
                    margin-bottom: 12px;
                }

                .form-label {
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    font-family: 'Poppins', sans-serif;
                    font-size: 0.8rem;
                    font-weight: 500;
                    text-transform: uppercase;
                    margin-bottom: 8px;
                    color: #fff;
                }

                .form-label i {
                    font-size: 1rem;
                }

                .login-input {
                    width: 100%;
                    height: 55px;
                    background: #eaebed;
                    border: none;
                    border-radius: 15px;
                    padding: 0 20px;
                    font-size: 1rem;
                    font-family: 'DM Sans', sans-serif;
                    color: #333;
                    outline: none;
                }

                .show-password-btn {
                    background: none;
                    border: none;
                    color: #fff;
                    font-family: 'Poppins', sans-serif;
                    font-size: 0.85rem;
                    font-weight: 400;
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    gap: 6px;
                    padding: 0;
                    margin-top: 8px;
                }

                .login-btn-container {
                    margin-top: 22px;
                }

                .login-submit-btn {
                    width: 180px;
                    height: 50px;
                    background: #000;
                    color: #fff;
                    border: none;
                    border-radius: 50px;
                    font-family: 'Raleway', sans-serif;
                    font-size: 1.1rem;
                    font-weight: 600;
                    cursor: pointer;
                    transition: all 0.2s ease;
                }

                .login-submit-btn:hover {
                    background: #1a1a1a;
                }

                .forgot-password-link {
                    margin-top: auto;
                    align-self: flex-end;
                    color: #fff;
                    font-family: 'Raleway', sans-serif;
                    font-size: 1rem;
                    font-weight: 500;
                    text-decoration: underline;
                    display: flex;
                    align-items: center;
                    gap: 6px;
                    padding-bottom: 2px;
                }

                .forgot-password-link i {
                    font-size: 1rem;
                }

                @media (max-width: 991px) {
                    .login-card {
                        flex-direction: column;
                        max-width: 420px;
                    }
                    .login-left-section {
                        padding: 30px 20px 20px;
                    }
                    .login-right-section {
                        padding: 30px 25px 25px;
                    }
                    .login-heading {
                        font-size: 2.6rem;
                    }
                }
                `}
            </style>

            <div className="login-card">
                <div className="login-left-section">
                    <img 
                        src="/next_assets/static/media/logo-spirita.eb124c62.jpg" 
                        alt="Spirita Logo" 
                        className="login-logo"
                    />
                    <div className="brand-title">Spirita Technologies (I) Pvt.Ltd.</div>
                    <div className="brand-tagline">Converting Potential To Performance....™</div>
                </div>

                <div className="login-right-section">
                    <h1 className="login-heading">Login</h1>
                    
                    <form onSubmit={handleSubmit}>
                        <div className="form-group" style={{ marginTop: '20px' }}>
                            <label className="form-label" htmlFor="email">
                                <i className="fa-solid fa-user"></i>
                                USERNAME/ EMAIL ID
                            </label>
                            <input 
                                type="email" 
                                id="email"
                                name="email"
                                className="login-input" 
                                placeholder="Username/ Email ID"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                autoComplete="username"
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label className="form-label" htmlFor="password">
                                <i className="fa-solid fa-lock"></i>
                                PASSWORD
                            </label>
                            <input 
                                type={showPassword ? "text" : "password"} 
                                id="password"
                                name="password"
                                className="login-input" 
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                autoComplete="current-password"
                                required
                            />
                            <button 
                                type="button" 
                                className="show-password-btn"
                                onClick={togglePasswordVisibility}
                            >
                                <i className={showPassword ? "fa-solid fa-eye-slash" : "fa-solid fa-eye"}></i>
                                Show Password
                            </button>
                        </div>

                        <div className="login-btn-container">
                            <button type="submit" className="login-submit-btn" disabled={submitting}>
                                {submitting ? 'Logging in...' : 'Login'}
                            </button>
                        </div>
                        {error && (
                            <div style={{ marginTop: '10px', color: '#ffe6e6', fontSize: '0.85rem' }}>
                                {error}
                            </div>
                        )}
                    </form>

                    <a href="/forgot-password" className="forgot-password-link" style={{ marginTop: '40px' }}>
                        <i className="fa-solid fa-lock"></i>
                        Forgot Password?
                    </a>
                </div>
            </div>
        </div>
    );
};

export default Login;

