import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import useAuthStore from '../../store/authStore';

const Registration = () => {
  const navigate = useNavigate();
  const { register, loading, error, clearError } = useAuthStore();

  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    city: '',
    country: '',
    password: '',
    confirmPassword: '',
    additionalInfo: '',
  });
  const [localError, setLocalError] = useState('');

  const handleChange = (e) => {
    clearError();
    setLocalError('');
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLocalError('');

    // Validate
    if (!form.firstName || !form.lastName || !form.email || !form.password) {
      setLocalError('Please fill in all required fields.');
      return;
    }
    if (form.password !== form.confirmPassword) {
      setLocalError('Passwords do not match.');
      return;
    }
    if (form.password.length < 6) {
      setLocalError('Password must be at least 6 characters.');
      return;
    }

    try {
      const { confirmPassword, ...payload } = form;
      await register(payload);
      navigate('/dashboard');
    } catch (err) {
      // error is already set in the store
    }
  };

  const displayError = localError || error;

  return (
    <div className="min-h-screen bg-bg-base py-12 px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-2xl card p-8 md:p-10"
      >
        <div className="text-center mb-8">
          <h1 className="text-3xl font-display text-brand-primary mb-2">Traveloop</h1>
          <h2 className="text-xl text-text-secondary">Create a new account</h2>
        </div>

        {/* Photo Upload Placeholder */}
        <div className="flex flex-col items-center justify-center mb-10">
          <div className="w-24 h-24 rounded-full border-2 border-dashed border-brand-primary/50 flex items-center justify-center bg-bg-elevated text-text-secondary cursor-pointer hover:border-brand-primary transition-colors">
            Photo
          </div>
        </div>

        {displayError && (
          <div className="mb-6 p-3 rounded-lg text-sm" style={{ background: 'rgba(232,84,84,0.15)', color: '#E85454', border: '1px solid rgba(232,84,84,0.3)' }}>
            {displayError}
          </div>
        )}

        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="label-text">First Name *</label>
              <input type="text" name="firstName" value={form.firstName} onChange={handleChange} className="input-field" />
            </div>
            <div>
              <label className="label-text">Last Name *</label>
              <input type="text" name="lastName" value={form.lastName} onChange={handleChange} className="input-field" />
            </div>
            <div>
              <label className="label-text">Email Address *</label>
              <input type="email" name="email" value={form.email} onChange={handleChange} className="input-field" />
            </div>
            <div>
              <label className="label-text">Phone Number</label>
              <input type="tel" name="phone" value={form.phone} onChange={handleChange} className="input-field" />
            </div>
            <div>
              <label className="label-text">City</label>
              <input type="text" name="city" value={form.city} onChange={handleChange} className="input-field" />
            </div>
            <div>
              <label className="label-text">Country</label>
              <input type="text" name="country" value={form.country} onChange={handleChange} className="input-field" />
            </div>
            <div>
              <label className="label-text">Password *</label>
              <input type="password" name="password" value={form.password} onChange={handleChange} className="input-field" placeholder="Min 6 characters" />
            </div>
            <div>
              <label className="label-text">Confirm Password *</label>
              <input type="password" name="confirmPassword" value={form.confirmPassword} onChange={handleChange} className="input-field" placeholder="Re-enter password" />
            </div>
          </div>
          
          <div>
            <label className="label-text">Additional Information</label>
            <textarea name="additionalInfo" value={form.additionalInfo} onChange={handleChange} className="input-field min-h-[100px] resize-y"></textarea>
          </div>
          
          <div className="flex justify-center pt-4">
            <button type="submit" disabled={loading} className="btn-primary w-full md:w-auto px-12">
              {loading ? 'Creating Account...' : 'Register'}
            </button>
          </div>
        </form>

        <p className="mt-8 text-center text-text-secondary">
          Already have an account? <Link to="/login" className="text-brand-primary hover:underline">Login here</Link>
        </p>
      </motion.div>
    </div>
  );
};

export default Registration;
