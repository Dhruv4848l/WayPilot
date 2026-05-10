import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import useAuthStore from '../../store/authStore';
import { api } from '../../utils/api';

const UserProfile = () => {
  const { user, updateProfile, loading } = useAuthStore();
  const [isEditing, setIsEditing] = useState(false);
  const [trips, setTrips] = useState([]);
  const fileInputRef = useRef(null);

  const [form, setForm] = useState({
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    phone: user?.phone || '',
    city: user?.city || '',
    country: user?.country || '',
    additionalInfo: user?.additionalInfo || '',
  });

  const [photoFile, setPhotoFile] = useState(null);
  const [photoPreview, setPhotoPreview] = useState(user?.photo || null);
  const [localError, setLocalError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    const fetchTrips = async () => {
      try {
        const data = await api.get('/trips');
        setTrips(data);
      } catch (err) {
        console.error('Failed to fetch trips', err);
      }
    };
    fetchTrips();
  }, []);

  const handleInputChange = (e) => {
    setLocalError('');
    setSuccess('');
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        setLocalError('Please select an image file');
        return;
      }
      setPhotoFile(file);
      setPhotoPreview(URL.createObjectURL(file));
      setLocalError('');
      setSuccess('');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLocalError('');
    setSuccess('');

    const formData = new FormData();
    Object.keys(form).forEach(key => {
      if (form[key]) formData.append(key, form[key]);
    });
    if (photoFile) {
      formData.append('photo', photoFile);
    }

    try {
      await updateProfile(formData);
      setSuccess('Profile updated successfully!');
      setIsEditing(false);
    } catch (err) {
      setLocalError(err.message || 'Failed to update profile');
    }
  };

  const completedTrips = trips.filter(t => t.status === 'COMPLETED');

  return (
    <div className="max-w-6xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      
      {localError && (
        <div className="mb-4 p-3 rounded-lg text-sm" style={{ background: 'rgba(232,84,84,0.15)', color: '#E85454', border: '1px solid rgba(232,84,84,0.3)' }}>
          {localError}
        </div>
      )}
      {success && (
        <div className="mb-4 p-3 rounded-lg text-sm" style={{ background: 'rgba(92,200,168,0.15)', color: '#5CC8A8', border: '1px solid rgba(92,200,168,0.3)' }}>
          {success}
        </div>
      )}

      <div className="flex flex-col md:flex-row gap-8 mb-12">
        {/* User Image & Info */}
        <div className="w-full md:w-1/3 card p-8 flex flex-col items-center text-center relative">
          <div 
            className={`w-32 h-32 rounded-full bg-bg-elevated border-2 flex items-center justify-center mb-6 overflow-hidden relative ${isEditing ? 'border-brand-primary cursor-pointer hover:opacity-80' : 'border-brand-primary/50'}`}
            onClick={() => isEditing && fileInputRef.current?.click()}
          >
            {photoPreview ? (
              <img src={photoPreview} alt="Profile" className="w-full h-full object-cover" />
            ) : (
              <span className="text-4xl text-brand-primary">{user?.firstName?.[0]}{user?.lastName?.[0]}</span>
            )}
            {isEditing && (
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center text-xs text-white opacity-0 hover:opacity-100 transition-opacity">
                Change Photo
              </div>
            )}
          </div>
          <input 
            type="file" 
            ref={fileInputRef} 
            className="hidden" 
            accept="image/*"
            onChange={handlePhotoChange}
          />
          
          <h2 className="text-2xl font-display mb-2">{user?.firstName} {user?.lastName}</h2>
          <p className="text-text-secondary mb-6">Explorer {user?.city && user?.country ? `from ${user.city}, ${user.country}` : ''}</p>
          
          {!isEditing ? (
            <button onClick={() => setIsEditing(true)} className="btn-outline w-full mb-4">Edit Profile</button>
          ) : (
            <div className="flex w-full gap-2 mb-4">
              <button onClick={() => { setIsEditing(false); setPhotoPreview(user?.photo); }} className="btn-outline flex-1 py-2" disabled={loading}>Cancel</button>
              <button onClick={handleSubmit} className="btn-primary flex-1 py-2" disabled={loading}>
                {loading ? 'Saving...' : 'Save'}
              </button>
            </div>
          )}
          
          <div className="text-left w-full mt-4 text-sm text-text-secondary">
            <p className="mb-2"><strong className="text-text-primary">Email:</strong> {user?.email}</p>
            {user?.phone && <p className="mb-2"><strong className="text-text-primary">Phone:</strong> {user?.phone}</p>}
          </div>
        </div>

        {/* User Stats / Details / Edit Form */}
        <div className="w-full md:w-2/3 card p-8 flex flex-col">
          <h3 className="text-xl font-display mb-6 border-b border-brand-primary/20 pb-2">Profile Details</h3>
          
          {isEditing ? (
            <form className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="label-text">First Name</label>
                  <input type="text" name="firstName" value={form.firstName} onChange={handleInputChange} className="input-field" />
                </div>
                <div>
                  <label className="label-text">Last Name</label>
                  <input type="text" name="lastName" value={form.lastName} onChange={handleInputChange} className="input-field" />
                </div>
                <div>
                  <label className="label-text">Phone</label>
                  <input type="text" name="phone" value={form.phone} onChange={handleInputChange} className="input-field" />
                </div>
                <div>
                  <label className="label-text">City</label>
                  <input type="text" name="city" value={form.city} onChange={handleInputChange} className="input-field" />
                </div>
                <div>
                  <label className="label-text">Country</label>
                  <input type="text" name="country" value={form.country} onChange={handleInputChange} className="input-field" />
                </div>
              </div>
              <div>
                <label className="label-text">About Me / Additional Info</label>
                <textarea name="additionalInfo" value={form.additionalInfo} onChange={handleInputChange} className="input-field min-h-[100px]"></textarea>
              </div>
            </form>
          ) : (
            <div className="text-text-secondary">
              <h4 className="font-semibold text-text-primary mb-2">About Me</h4>
              <p className="mb-6">{user?.additionalInfo || "No additional information provided yet."}</p>
              
              <div className="grid grid-cols-2 gap-4 mt-8">
                <div className="bg-bg-elevated p-4 rounded-lg border border-brand-primary/10 text-center">
                  <span className="block text-2xl font-bold text-brand-primary">{trips.length}</span>
                  <span className="text-sm">Total Trips</span>
                </div>
                <div className="bg-bg-elevated p-4 rounded-lg border border-brand-primary/10 text-center">
                  <span className="block text-2xl font-bold text-brand-primary">{completedTrips.length}</span>
                  <span className="text-sm">Completed Trips</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Previous Trips Section */}
      <div>
        <h3 className="text-2xl font-display mb-6 border-b border-brand-primary/20 pb-2">Previous Trips</h3>
        {completedTrips.length === 0 ? (
          <p className="text-text-secondary">You haven't completed any trips yet.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {completedTrips.map((trip) => {
              const days = Math.ceil((new Date(trip.endDate) - new Date(trip.startDate)) / (1000 * 60 * 60 * 24));
              return (
                <motion.div whileHover={{ y: -4 }} key={trip.id} className="card overflow-hidden">
                  <div className="h-48 bg-bg-elevated flex items-center justify-center border-b border-brand-primary/10 overflow-hidden relative">
                    {trip.coverPhoto ? (
                      <img src={trip.coverPhoto} alt={trip.name} className="w-full h-full object-cover" />
                    ) : (
                      <span className="text-text-secondary">Trip Image</span>
                    )}
                  </div>
                  <div className="p-4 flex justify-between items-center">
                    <div>
                      <h4 className="font-semibold text-lg text-text-primary">{trip.name}</h4>
                      <p className="text-sm text-text-secondary">{days} Days • Completed {new Date(trip.endDate).getFullYear()}</p>
                    </div>
                    <Link to={`/trips/${trip.id}/view`} className="btn-outline py-1.5 px-4 text-sm">View</Link>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default UserProfile;
