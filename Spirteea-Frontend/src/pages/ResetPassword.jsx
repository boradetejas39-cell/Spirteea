import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { resetPasswordWithToken } from '../api';

const ResetPassword = () => {
    const { userId, token } = useParams();
    const navigate = useNavigate();
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (password !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        if (password.length < 6) {
            setError('Password must be at least 6 characters');
            return;
        }

        setSubmitting(true);
        try {
            await resetPasswordWithToken({ userId, token, password });
            setSuccess(true);
            setTimeout(() => navigate('/login'), 3000);
        } catch (err) {
            setError(err?.message || 'Failed to reset password. Link may be expired.');
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
                    font-size: 2.2rem;
                    font-weight: 700;
                    margin-bottom: 5px;
                    padding-bottom: 8px;
                    border-bottom: 1px solid rgba(255, 255, 255, 0.4);
                    width: 100%;
                    line-height: 1.2;
                }

                .form-group {
                    margin-top: 20px;
                    margin-bottom: 15px;
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

                .login-input {
                    width: 100%;
                    height: 50px;
                    background: #eaebed;
                    border: none;
                    border-radius: 12px;
                    padding: 0 15px;
                    font-size: 1rem;
                    font-family: 'DM Sans', sans-serif;
                    color: #333;
                    outline: none;
                }

                .login-submit-btn {
                    width: 100%;
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
                    margin-top: 15px;
                }

                .success-message {
                    text-align: center;
                    padding: 40px 20px;
                }
                .success-icon {
                    font-size: 4rem;
                    color: #fff;
                    margin-bottom: 20px;
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
                    <div className="brand-title" style={{ color: '#1a5153', fontWeight: 700 }}>Spirita Technologies (I) Pvt.Ltd.</div>
                </div>

                <div className="login-right-section">
                    {success ? (
                        <div className="success-message">
                            <div className="success-icon">
                                <i className="fa-solid fa-circle-check"></i>
                            </div>
                            <h2 className="login-heading" style={{ border: 'none', textAlign: 'center' }}>Success!</h2>
                            <p style={{ marginTop: '20px' }}>Your password has been changed successfully. Redirecting you to login...</p>
                        </div>
                    ) : (
                        <>
                            <h1 className="login-heading">Set New Password</h1>
                            <p style={{ fontSize: '0.9rem', opacity: 0.9, marginTop: '10px' }}>
                                Please enter and confirm your new password below.
                            </p>
                            
                            <form onSubmit={handleSubmit}>
                                <div className="form-group">
                                    <label className="form-label">NEW PASSWORD</label>
                                    <input 
                                        type="password" 
                                        className="login-input" 
                                        placeholder="Min 6 characters"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                    />
                                </div>

                                <div className="form-group">
                                    <label className="form-label">CONFIRM PASSWORD</label>
                                    <input 
                                        type="password" 
                                        className="login-input" 
                                        placeholder="Repeat new password"
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        required
                                    />
                                </div>

                                <button type="submit" className="login-submit-btn" disabled={submitting}>
                                    {submitting ? 'Resetting...' : 'Update Password'}
                                </button>
                                
                                {error && (
                                    <div style={{ marginTop: '20px', color: '#ffe6e6', fontSize: '0.85rem' }}>
                                        <i className="fa-solid fa-circle-exclamation" style={{ marginRight: '8px' }}></i>
                                        {error}
                                    </div>
                                )}
                            </form>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ResetPassword;

