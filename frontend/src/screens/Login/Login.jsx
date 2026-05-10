import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import useAuthStore from '../../store/authStore';

const Login = () => {
  const navigate = useNavigate();
  const { login, loading, error, clearError } = useAuthStore();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [localError, setLocalError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLocalError('');
    clearError();

    if (!email || !password) {
      setLocalError('Please enter both email and password.');
      return;
    }

    try {
      await login(email, password);
      navigate('/dashboard');
    } catch (err) {
      // error is already set in the store
    }
  };

  const displayError = localError || error;

  return (
    <div className="min-h-screen flex bg-bg-base">
      {/* Left side: Branding */}
      <div className="hidden lg:flex lg:w-1/2 bg-bg-surface relative items-center justify-center border-r border-brand-primary/10">
        <div className="text-center px-12">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-80 h-80 mb-8 mx-auto"
          >
            <img src="/logo.jpg" alt="Traveloop Logo" className="w-full h-full object-contain drop-shadow-2xl" />
          </motion.div>
          <h1 className="text-6xl font-display text-brand-primary mb-4 tracking-tight">Traveloop</h1>
          <p className="text-text-secondary text-xl font-light">Personalized Travel Planning Made Easy</p>
        </div>
      </div>

      {/* Right side: Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md"
        >
          <div className="text-center mb-10 lg:hidden">
            <h1 className="text-4xl font-display text-brand-primary mb-2">Traveloop</h1>
          </div>
          
          <h2 className="text-3xl font-display mb-8 text-text-primary">Welcome Back</h2>

          {displayError && (
            <div className="mb-6 p-3 rounded-lg text-sm" style={{ background: 'rgba(232,84,84,0.15)', color: '#E85454', border: '1px solid rgba(232,84,84,0.3)' }}>
              {displayError}
            </div>
          )}
          
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label className="label-text">Email</label>
              <input 
                type="email" 
                value={email} 
                onChange={(e) => { setEmail(e.target.value); clearError(); setLocalError(''); }} 
                className="input-field" 
                placeholder="Enter your email" 
              />
            </div>
            
            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label className="block text-sm font-medium text-text-secondary">Password</label>
                <a href="#" className="text-sm text-brand-primary hover:underline">Forgot password?</a>
              </div>
              <input 
                type="password" 
                value={password} 
                onChange={(e) => { setPassword(e.target.value); clearError(); setLocalError(''); }} 
                className="input-field" 
                placeholder="Enter your password" 
              />
            </div>
            
            <button type="submit" disabled={loading} className="btn-primary w-full mt-8">
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </form>
          
          <p className="mt-8 text-center text-text-secondary">
            Don't have an account? <Link to="/register" className="text-brand-primary hover:underline">Register Users</Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default Login;
