import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { api } from '../../utils/api';

const TripCard = ({ trip, onDelete }) => {
  const days = Math.ceil((new Date(trip.endDate) - new Date(trip.startDate)) / (1000 * 60 * 60 * 24)) + 1;
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (window.confirm(`Are you sure you want to delete "${trip.name}"? This will permanently remove all associated checklist items and notes.`)) {
      setIsDeleting(true);
      await onDelete(trip.id);
      setIsDeleting(false);
    }
  };
  
  return (
    <motion.div whileHover={{ y: -2 }} className="card p-4 flex items-center justify-between mb-4 bg-bg-surface group">
      <div className="flex-1 flex items-center gap-4">
        <div className="w-16 h-16 bg-bg-elevated rounded-lg flex items-center justify-center border border-brand-primary/10 overflow-hidden shrink-0">
          {trip.coverPhoto ? (
            <img src={trip.coverPhoto} alt={trip.name} className="w-full h-full object-cover" />
          ) : (
            <span className="text-xs text-text-secondary">Image</span>
          )}
        </div>
        <div>
          <h3 className="font-semibold text-lg">{trip.name}</h3>
          <p className="text-sm text-text-secondary">
            {trip.description || 'No description'} • {days} Day{days !== 1 ? 's' : ''}
          </p>
          <p className="text-xs text-text-disabled mt-1">
            {new Date(trip.startDate).toLocaleDateString()} — {new Date(trip.endDate).toLocaleDateString()}
          </p>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <button 
          onClick={handleDelete}
          disabled={isDeleting}
          className="opacity-0 group-hover:opacity-100 p-2 text-text-disabled hover:text-[#E85454] transition-all"
          title="Delete Trip"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="3 6 5 6 21 6" />
            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
          </svg>
        </button>
        <Link to={`/trips/${trip.id}/view`} className="btn-outline py-1.5 px-4 text-sm">View</Link>
      </div>
    </motion.div>
  );
};

const EmptyState = ({ label }) => (
  <p className="text-text-disabled text-sm py-4 pl-2">No {label} trips yet.</p>
);

const UserTripListing = () => {
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchTrips = async () => {
    try {
      const data = await api.get('/trips');
      setTrips(data);
    } catch (err) {
      console.error('Failed to fetch trips:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTrips();
  }, []);

  const handleDeleteTrip = async (tripId) => {
    try {
      await api.delete(`/trips/${tripId}`);
      setTrips(prev => prev.filter(t => t.id !== tripId));
    } catch (err) {
      console.error('Failed to delete trip:', err);
      alert('Failed to delete trip. Please try again.');
    }
  };

  // Compute status from dates (mirrors backend logic for resilience)
  const getTripCategory = (trip) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const start = new Date(trip.startDate);
    start.setHours(0, 0, 0, 0);
    const end = new Date(trip.endDate);
    end.setHours(0, 0, 0, 0);

    if (today < start) return 'UPCOMING';
    if (today > end) return 'COMPLETED';
    return 'ONGOING';
  };

  const ongoing   = trips.filter(t => getTripCategory(t) === 'ONGOING');
  const upcoming  = trips.filter(t => getTripCategory(t) === 'UPCOMING');
  const completed = trips.filter(t => getTripCategory(t) === 'COMPLETED');

  return (
    <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-display">My Trips</h1>
        <Link to="/trips/new" className="btn-primary text-sm">+ New Trip</Link>
      </div>

      {loading ? (
        <p className="text-text-secondary text-center py-12">Loading trips...</p>
      ) : trips.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-text-secondary text-lg mb-4">You haven't planned any trips yet.</p>
          <Link to="/trips/new" className="btn-primary">Plan your first trip</Link>
        </div>
      ) : (
        <div className="space-y-8">
          <div>
            <h2 className="text-2xl font-display mb-4 border-b border-brand-primary/20 pb-2">Ongoing</h2>
            {ongoing.length > 0 ? ongoing.map(t => <TripCard key={t.id} trip={t} onDelete={handleDeleteTrip} />) : <EmptyState label="ongoing" />}
          </div>

          <div>
            <h2 className="text-2xl font-display mb-4 border-b border-brand-primary/20 pb-2">Upcoming</h2>
            {upcoming.length > 0 ? upcoming.map(t => <TripCard key={t.id} trip={t} onDelete={handleDeleteTrip} />) : <EmptyState label="upcoming" />}
          </div>

          <div>
            <h2 className="text-2xl font-display mb-4 border-b border-brand-primary/20 pb-2">Completed</h2>
            {completed.length > 0 ? completed.map(t => <TripCard key={t.id} trip={t} onDelete={handleDeleteTrip} />) : <EmptyState label="completed" />}
          </div>
        </div>
      )}
    </div>
  );
};

export default UserTripListing;
