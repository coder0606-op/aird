import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

export default function AdminLogin() {
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const [baseNumber, setBaseNumber] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [errorMsg, setErrorMsg] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/admin', { replace: true });
    }
  }, [isAuthenticated, navigate]);

  const handleQuickFill = () => {
    setBaseNumber('3165514265');
    setPassword('airdreamtravel123');
    setErrorMsg('');
    toast.success('Authorized credentials filled! Click Login.');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setLoading(true);

    try {
      const success = await login(baseNumber, password);
      if (success) {
        toast.success('Welcome back to Admin Control Center!');
        navigate('/admin', { replace: true });
      } else {
        setErrorMsg('Invalid Base Number or Password.');
        toast.error('Authentication failed.');
      }
    } catch (err) {
      setErrorMsg(err.message || 'Login error occurred. Please check credentials.');
      toast.error('Login error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-login-screen">
      <div className="admin-login-card">
        {/* Brand Header */}
        <div className="admin-login-brand">
          <img
            src="/assets/air-dream-badge.svg"
            alt="Air Dream Logo"
            className="admin-navbar-logo"
            id="loginBrandLogo"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = '/image/logo.png';
            }}
          />
          <div className="air-dream-brand-text">
            <span className="air-dream-brand-name">Air Dream</span>
            <span className="air-dream-brand-sub">TRAVEL &amp; TOURISM</span>
          </div>
        </div>

        <div className="admin-login-header">
          <h2>Admin Sign In</h2>
          <p>Authorized access only. Enter your registered Base Number and Password to access the control center.</p>
        </div>

        {/* Error Banner */}
        {errorMsg && (
          <div className="login-error-banner" style={{ display: 'flex' }}>
            <i className="fa-solid fa-triangle-exclamation"></i>
            <span>{errorMsg}</span>
          </div>
        )}

        <form className="admin-login-form" onSubmit={handleSubmit}>
          <div className="form-field">
            <label htmlFor="loginBaseNumber">Admin Base Number</label>
            <div className="login-input-wrap">
              <i className="fa-solid fa-id-badge login-input-icon"></i>
              <input
                type="text"
                className="login-input-field"
                id="loginBaseNumber"
                placeholder="3165514265"
                value={baseNumber}
                onChange={(e) => setBaseNumber(e.target.value)}
                required
                autoComplete="username"
              />
            </div>
          </div>

          <div className="form-field">
            <label htmlFor="loginPassword">Password</label>
            <div className="login-input-wrap">
              <i className="fa-solid fa-lock login-input-icon"></i>
              <input
                type={showPassword ? 'text' : 'password'}
                className="login-input-field"
                id="loginPassword"
                placeholder="airdreamtravel123"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete="current-password"
              />
              <button
                type="button"
                className="password-toggle-btn"
                onClick={() => setShowPassword(!showPassword)}
                aria-label="Toggle Password Visibility"
              >
                <i className={`fa-solid ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`}></i>
              </button>
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <label style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '0.8rem', color: '#475569', cursor: 'pointer' }}>
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
              />
              Remember session
            </label>
            <Link to="/" style={{ fontSize: '0.8rem', color: '#0284c7', textDecoration: 'none', fontWeight: 600 }}>
              Live Site ↗
            </Link>
          </div>

          <button type="submit" className="login-btn-submit" disabled={loading}>
            <i className={`fa-solid ${loading ? 'fa-spinner fa-spin' : 'fa-right-to-bracket'}`}></i>{' '}
            {loading ? 'Authenticating...' : 'Login to Admin Hub'}
          </button>

          {/* Quick Fill Button */}
          <div
            className="login-quick-helper"
            onClick={handleQuickFill}
            title="Click to autofill authorized login details"
            style={{ cursor: 'pointer' }}
          >
            <i className="fa-solid fa-key"></i> Quick Fill: <strong>3165514265</strong> / <strong>airdreamtravel123</strong>
          </div>
        </form>
      </div>
    </div>
  );
}
