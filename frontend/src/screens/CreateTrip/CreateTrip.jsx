import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { api } from '../../utils/api';

const ActivityCard = ({ activity, index }) => {
  const cityName = activity.city?.name || '';
  const costDisplay = activity.cost > 0 ? `₹${Number(activity.cost).toLocaleString('en-IN')}` : 'Free';

  // Format duration
  const formatDuration = (mins) => {
    if (!mins) return '';
    if (mins < 60) return `${mins} min`;
    const h = Math.floor(mins / 60);
    const m = mins % 60;
    return m > 0 ? `${h}h ${m}m` : `${h}h`;
  };

  // Type badge colors
  const typeBadge = {
    SIGHTSEEING: { bg: 'rgba(92,200,168,0.15)', color: '#5CC8A8', label: '🏛️ Sightseeing' },
    FOOD: { bg: 'rgba(244,164,53,0.15)', color: '#F4A435', label: '🍽️ Food' },
    ADVENTURE: { bg: 'rgba(232,100,58,0.15)', color: '#E8643A', label: '🏔️ Adventure' },
    SHOPPING: { bg: 'rgba(168,130,255,0.15)', color: '#A882FF', label: '🛍️ Shopping' },
    CULTURE: { bg: 'rgba(100,180,255,0.15)', color: '#64B4FF', label: '🎭 Culture' },
    TRANSPORT: { bg: 'rgba(150,150,150,0.15)', color: '#969696', label: '🚗 Transport' },
    STAY: { bg: 'rgba(255,180,100,0.15)', color: '#FFB464', label: '🏨 Stay' },
    OTHER: { bg: 'rgba(200,200,200,0.15)', color: '#C8C8C8', label: '✨ Experience' },
  };

  const badge = typeBadge[activity.type] || typeBadge.OTHER;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
      whileHover={{ y: -6, scale: 1.02 }}
      className="card overflow-hidden cursor-pointer group"
      style={{ borderRadius: '1rem' }}
    >
      {/* Image */}
      <div className="relative h-44 overflow-hidden">
        <img
          src={activity.imageUrl}
          alt={activity.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          loading="lazy"
          onError={(e) => {
            e.target.src = `https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800`;
          }}
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

        {/* Type badge */}
        <div
          className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-xs font-semibold backdrop-blur-sm"
          style={{ background: badge.bg, color: badge.color, border: `1px solid ${badge.color}30` }}
        >
          {badge.label}
        </div>

        {/* Price badge */}
        <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full text-xs font-bold backdrop-blur-sm"
          style={{
            background: activity.cost > 0 ? 'rgba(244,164,53,0.9)' : 'rgba(92,200,168,0.9)',
            color: '#0F0E0B',
          }}
        >
          {costDisplay}
        </div>

        {/* Bottom info on image */}
        <div className="absolute bottom-3 left-3 right-3">
          <h3 className="font-semibold text-sm text-white leading-tight drop-shadow-lg">{activity.name}</h3>
          <p className="text-xs text-white/70 mt-0.5">{cityName}</p>
        </div>
      </div>

      {/* Details */}
      <div className="p-3.5">
        <p className="text-xs text-text-secondary line-clamp-2 leading-relaxed mb-2">
          {activity.description}
        </p>
        <div className="flex items-center justify-between">
          <span className="text-xs text-text-disabled flex items-center gap-1">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
            {formatDuration(activity.duration)}
          </span>
          {activity.cost > 0 && (
            <span className="text-xs font-semibold text-brand-primary">
              {costDisplay}
              <span className="text-text-disabled font-normal"> /person</span>
            </span>
          )}
        </div>
      </div>
    </motion.div>
  );
};

const CreateTrip = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: '',
    startDate: '',
    endDate: '',
    description: '',
  });
  const [coverPhoto, setCoverPhoto] = useState(null);
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Activities state
  const [activities, setActivities] = useState([]);
  const [activitiesLoading, setActivitiesLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [totalCount, setTotalCount] = useState(0);

  const fetchActivities = async (pageNum, append = false) => {
    try {
      if (pageNum === 1) setActivitiesLoading(true);
      else setLoadingMore(true);

      const data = await api.get(`/cities/activities?page=${pageNum}&limit=6`);

      if (append) {
        setActivities(prev => [...prev, ...data.activities]);
      } else {
        setActivities(data.activities);
      }
      setHasMore(data.pagination.hasMore);
      setTotalCount(data.pagination.total);
      setPage(pageNum);
    } catch (err) {
      console.error('Failed to fetch activities:', err);
    } finally {
      setActivitiesLoading(false);
      setLoadingMore(false);
    }
  };

  useEffect(() => {
    fetchActivities(1);
  }, []);

  const handleLoadMore = () => {
    fetchActivities(page + 1, true);
  };

  const handleChange = (e) => {
    setError('');
    setSuccess('');
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    if (e.target.files[0]) {
      setCoverPhoto(e.target.files[0]);
    }
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
      const formData = new FormData();
      formData.append('name', form.name);
      formData.append('startDate', form.startDate);
      formData.append('endDate', form.endDate);
      formData.append('description', form.description);
      if (coverPhoto) {
        formData.append('coverPhoto', coverPhoto);
      }

      const trip = await api.postFormData('/trips', formData);
      setSuccess(`Trip "${trip.name}" created successfully!`);
      setTimeout(() => navigate('/trips'), 1200);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row gap-8 items-start">
      {/* Left Column: Form (Sticky) */}
      <div className="w-full lg:w-1/3 sticky top-8 order-1 lg:order-1">
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
            <input type="text" name="name" value={form.name} onChange={handleChange} className="input-field" placeholder="e.g., Rajasthan Road Trip 2026" />
          </div>

          <div>
            <label className="label-text">Start Date *</label>
            <input type="date" name="startDate" value={form.startDate} onChange={handleChange} className="input-field" />
          </div>
          
          <div>
            <label className="label-text">Destination / Place</label>
            <input type="text" name="description" value={form.description} onChange={handleChange} className="input-field" placeholder="e.g., Jaipur, Rajasthan" />
          </div>
          
          <div>
            <label className="label-text">End Date *</label>
            <input type="date" name="endDate" value={form.endDate} onChange={handleChange} className="input-field" />
          </div>

          <div>
            <label className="label-text">Trip Cover Photo</label>
            <input type="file" accept="image/*" onChange={handleFileChange} className="input-field cursor-pointer file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-brand-primary/10 file:text-brand-primary hover:file:bg-brand-primary/20" style={{ padding: '0.4rem' }} />
          </div>
          
          <button type="submit" disabled={loading} className="btn-primary w-full mt-4">
            {loading ? 'Creating...' : 'Create Trip'}
          </button>
        </form>
      </div>

      {/* Right Column: Suggestions Grid (Scrollable container) */}
      <div className="w-full lg:w-2/3 max-h-[85vh] overflow-y-auto pl-2 pr-2 custom-scrollbar order-2 lg:order-2">
        <div className="flex items-center justify-between mb-6 border-b border-brand-primary/20 pb-2">
          <h2 className="text-2xl font-display">
            Popular Activities
          </h2>
          {totalCount > 0 && (
            <span className="text-sm text-text-secondary">
              Showing {activities.length} of {totalCount}
            </span>
          )}
        </div>

        {activitiesLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
            {[1, 2, 3, 4, 5, 6].map(i => (
              <div key={i} className="card h-72 animate-pulse">
                <div className="h-44 bg-bg-elevated" />
                <div className="p-3.5 space-y-2">
                  <div className="h-3 bg-bg-elevated rounded w-3/4" />
                  <div className="h-3 bg-bg-elevated rounded w-1/2" />
                </div>
              </div>
            ))}
          </div>
        ) : activities.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-text-secondary text-lg">No activities found.</p>
            <p className="text-text-disabled text-sm mt-2">Run the seed script to populate data.</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
              <AnimatePresence>
                {activities.map((activity, idx) => (
                  <ActivityCard key={activity.id} activity={activity} index={idx % 6} />
                ))}
              </AnimatePresence>
            </div>

            {/* Load More Button */}
            {hasMore && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex justify-center mt-8 pb-8"
              >
                <button
                  onClick={handleLoadMore}
                  disabled={loadingMore}
                  className="group relative px-8 py-3 rounded-full font-semibold text-sm overflow-hidden transition-all duration-300"
                  style={{
                    background: 'linear-gradient(135deg, rgba(244,164,53,0.1), rgba(232,100,58,0.1))',
                    border: '1px solid rgba(244,164,53,0.3)',
                    color: '#F4A435',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'linear-gradient(135deg, rgba(244,164,53,0.2), rgba(232,100,58,0.2))';
                    e.currentTarget.style.borderColor = 'rgba(244,164,53,0.5)';
                    e.currentTarget.style.transform = 'translateY(-2px)';
                    e.currentTarget.style.boxShadow = '0 4px 20px rgba(244,164,53,0.15)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'linear-gradient(135deg, rgba(244,164,53,0.1), rgba(232,100,58,0.1))';
                    e.currentTarget.style.borderColor = 'rgba(244,164,53,0.3)';
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  {loadingMore ? (
                    <span className="flex items-center gap-2">
                      <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                      </svg>
                      Loading...
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      Load More Activities
                      <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 transition-transform group-hover:translate-y-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="6 9 12 15 18 9" />
                      </svg>
                    </span>
                  )}
                </button>
              </motion.div>
            )}

            {/* All loaded indicator */}
            {!hasMore && activities.length > 0 && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center text-text-disabled text-sm mt-6 pb-8"
              >
                ✨ You've explored all {totalCount} activities!
              </motion.p>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default CreateTrip;
