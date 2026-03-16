import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { resetPasswordSuperAdmin } from '../api';

const ForgotPassword = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [submitting, setSubmitting] = useState(false);
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setMessage('');
        setSubmitting(true);
        try {
            const res = await resetPasswordSuperAdmin({ email });
            setMessage(res.message || 'If an account exists with this email, a reset link will be sent to admin@spireeta.com.');
        } catch (err) {
            setError(err?.message || 'Failed to send reset link.');
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="login-wrapper">
            <style>
                {`
                @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&family=Raleway:wght@400;700&family=DM+Sans:wght@400;500;700&display=swap');

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
                    background: rgba(0, 0, 0, 0.4);
                    backdrop-filter: blur(10px);
                    z-index: 1;
                }

                .login-card {
                    display: flex;
                    width: 100%;
                    max-width: 950px;
                    background: #fff;
                    border-radius: 8px;
                    overflow: hidden;
                    box-shadow: 0 25px 50px rgba(0, 0, 0, 0.5);
                    z-index: 2;
                    flex-direction: row;
                    min-height: 480px;
                }

                .login-left-section {
                    flex: 1;
                    background: #fff;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    padding: 40px;
                    text-align: center;
                }

                .login-logo {
                    width: 100%;
                    max-width: 200px;
                    height: auto;
                    margin-bottom: 25px;
                }

                .brand-title {
                    color: #1a5153;
                    font-family: 'Raleway', sans-serif;
                    font-size: 1.1rem;
                    font-weight: 700;
                    margin-bottom: 5px;
                }

                .brand-tagline {
                    color: #b49d68;
                    font-family: 'Poppins', sans-serif;
                    font-size: 0.75rem;
                    font-weight: 600;
                    letter-spacing: 0.3px;
                }

                .login-right-section {
                    flex: 1;
                    background: linear-gradient(135deg, #10b1ba 0%, #7ee0e6 100%);
                    padding: 50px 60px;
                    color: #fff;
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                }

                .login-heading {
                    font-family: 'Poppins', sans-serif;
                    font-size: 3.5rem;
                    font-weight: 700;
                    margin-bottom: 30px;
                    line-height: 1.1;
                    letter-spacing: -1px;
                }

                .form-group {
                    margin-bottom: 20px;
                    width: 100%;
                    max-width: 420px;
                }

                .form-label {
                    display: block;
                    font-family: 'Poppins', sans-serif;
                    font-size: 0.85rem;
                    font-weight: 600;
                    text-transform: uppercase;
                    margin-bottom: 10px;
                    color: #fff;
                    letter-spacing: 0.5px;
                }

                .login-input {
                    width: 100%;
                    height: 55px;
                    background: #eaebed;
                    border: none;
                    border-radius: 12px;
                    padding: 0 25px;
                    font-size: 1rem;
                    font-family: 'DM Sans', sans-serif;
                    color: #333;
                    outline: none;
                }

                .login-input::placeholder {
                    color: #888;
                }

                .back-link {
                    color: #8e1a1a;
                    font-family: 'Poppins', sans-serif;
                    font-size: 0.95rem;
                    font-weight: 500;
                    text-decoration: none;
                    cursor: pointer;
                    margin-bottom: 30px;
                    display: inline-block;
                    transition: opacity 0.2s;
                }

                .back-link:hover {
                    opacity: 0.8;
                }

                .login-submit-btn {
                    width: 220px;
                    height: 65px;
                    background: #000;
                    color: #fff;
                    border: none;
                    border-radius: 40px;
                    font-family: 'Poppins', sans-serif;
                    font-size: 1.2rem;
                    font-weight: 600;
                    cursor: pointer;
                    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    text-align: center;
                    line-height: 1.2;
                }

                .login-submit-btn:hover {
                    background: #1a1a1a;
                    transform: translateY(-2px);
                    box-shadow: 0 10px 20px rgba(0,0,0,0.2);
                }

                .login-submit-btn:active {
                    transform: translateY(0);
                }

                @media (max-width: 768px) {
                    .login-card {
                        flex-direction: column;
                        max-width: 450px;
                    }
                    .login-heading {
                        font-size: 2.8rem;
                    }
                    .login-right-section {
                        padding: 40px 30px;
                    }
                }
                `}
            </style>

            <div className="login-card">
                <div className="login-left-section">
                    <img 
                        src="https://spireeta.com/assets/img/logo/logo-spirita.jpeg" 
                        alt="Spirita Logo" 
                        className="login-logo"
                    />
                    <div className="brand-title">Spirita Technologies (I) Pvt.Ltd.</div>
                    <div className="brand-tagline">Converting Potential To Performance...™</div>
                </div>

                <div className="login-right-section">
                    <h1 className="login-heading">Forgot Password</h1>
                    
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label className="form-label">EMAIL ADDRESS</label>
                            <input 
                                type="email" 
                                className="login-input" 
                                placeholder="Email Address"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>

                        <div className="back-link" onClick={() => navigate('/login')}>
                            Back to login
                        </div>

                        <button type="submit" className="login-submit-btn" disabled={submitting}>
                            {submitting ? 'Processing...' : 'Get reset link'}
                        </button>
                        
                        {(message || error) && (
                            <div style={{ 
                                marginTop: '20px', 
                                padding: '12px', 
                                background: error ? 'rgba(255,0,0,0.2)' : 'rgba(255,255,255,0.2)', 
                                borderRadius: '8px', 
                                fontSize: '0.85rem',
                                color: '#fff',
                                maxWidth: '420px'
                            }}>
                                {error || message}
                            </div>
                        )}
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ForgotPassword;
