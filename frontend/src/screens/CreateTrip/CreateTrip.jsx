import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { api } from '../../utils/api';

const CreateTrip = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: '',
    startDate: '',
    endDate: '',
    description: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    setError('');
    setSuccess('');
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!form.name || !form.startDate || !form.endDate) {
      setError('Please fill in trip name, start date, and end date.');
      return;
    }
    if (new Date(form.endDate) < new Date(form.startDate)) {
      setError('End date cannot be before start date.');
      return;
    }

    setLoading(true);
    try {
      const trip = await api.post('/trips', form);
      setSuccess(`Trip "${trip.name}" created successfully!`);
      setTimeout(() => navigate('/trips'), 1200);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row gap-8">
      {/* Left Column: Form */}
      <div className="w-full md:w-1/3">
        <h1 className="text-3xl font-display mb-6">Plan a new trip</h1>
        
        {error && (
          <div className="mb-4 p-3 rounded-lg text-sm" style={{ background: 'rgba(232,84,84,0.15)', color: '#E85454', border: '1px solid rgba(232,84,84,0.3)' }}>
            {error}
          </div>
        )}
        {success && (
          <div className="mb-4 p-3 rounded-lg text-sm" style={{ background: 'rgba(92,200,168,0.15)', color: '#5CC8A8', border: '1px solid rgba(92,200,168,0.3)' }}>
            {success}
          </div>
        )}

        <form className="card p-6 space-y-5" onSubmit={handleSubmit}>
          <div>
            <label className="label-text">Trip Name *</label>
            <input type="text" name="name" value={form.name} onChange={handleChange} className="input-field" placeholder="e.g., Euro Summer 2026" />
          </div>

          <div>
            <label className="label-text">Start Date *</label>
            <input type="date" name="startDate" value={form.startDate} onChange={handleChange} className="input-field" />
          </div>
          
          <div>
            <label className="label-text">Destination / Place</label>
            <input type="text" name="description" value={form.description} onChange={handleChange} className="input-field" placeholder="e.g., Paris, France" />
          </div>
          
          <div>
            <label className="label-text">End Date *</label>
            <input type="date" name="endDate" value={form.endDate} onChange={handleChange} className="input-field" />
          </div>
          
          <button type="submit" disabled={loading} className="btn-primary w-full mt-4">
            {loading ? 'Creating...' : 'Create Trip'}
          </button>
        </form>
      </div>

      {/* Right Column: Suggestions Grid */}
      <div className="w-full md:w-2/3">
        <h2 className="text-2xl font-display mb-6 border-b border-brand-primary/20 pb-2">
          Suggestion for Places to Visit/Activities
        </h2>
        
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <motion.div whileHover={{ scale: 1.02 }} key={`sugg-${i}`} className="card h-40 flex flex-col overflow-hidden relative cursor-pointer">
              <div className="absolute inset-0 bg-bg-elevated flex items-center justify-center">
                <span className="text-text-secondary text-sm">Image Placeholder</span>
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
              <div className="absolute bottom-3 left-3">
                <p className="font-semibold text-sm">Activity {i}</p>
                <p className="text-xs text-brand-primary">$50</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CreateTrip;
