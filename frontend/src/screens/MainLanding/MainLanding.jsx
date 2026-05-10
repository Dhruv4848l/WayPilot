import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { api } from '../../utils/api';
import useAuthStore from '../../store/authStore';
import { regionsData } from '../../data/regions';

const ITEMS_PER_PAGE = 8;

const MainLanding = () => {
  const user = useAuthStore((s) => s.user);
  const [trips, setTrips] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(regionsData.length / ITEMS_PER_PAGE);
  const currentRegions = regionsData.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  useEffect(() => {
    const fetchTrips = async () => {
      try {
        const data = await api.get('/trips');
        setTrips(data);
      } catch (err) {
        // user may not be logged in
      }
    };
    fetchTrips();
  }, []);

  const greeting = () => {
    const h = new Date().getHours();
    if (h < 12) return 'Good morning';
    if (h < 18) return 'Good afternoon';
    return 'Good evening';
  };

  return (
    <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      {/* Banner Image Placeholder */}
      <div className="w-full h-64 md:h-80 bg-bg-elevated border border-brand-primary/20 rounded-2xl flex flex-col items-center justify-center mb-8 relative overflow-hidden">
        <h1 className="text-4xl md:text-5xl font-display text-text-primary z-10 text-center px-4">
          {greeting()}, {user?.firstName || 'Explorer'} 🌅
        </h1>
        <p className="text-text-secondary mt-2 z-10">Where to next?</p>
        <div className="absolute inset-0 bg-black/40"></div>
        <span className="absolute bottom-4 right-4 text-xs text-text-disabled">Banner Image</span>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col md:flex-row gap-4 mb-10 items-center justify-between">
        <div className="w-full md:w-1/2 relative">
          <input 
            type="text" 
            placeholder="Search for cities, activities..." 
            className="input-field pl-4 pr-10"
          />
        </div>
        <div className="flex gap-2 w-full md:w-auto">
          <select className="input-field py-2 text-sm bg-bg-surface">
            <option>Sort by...</option>
            <option>A to Z</option>
            <option>Oldest first</option>
            <option>Newest First</option>
          </select>
        </div>
      </div>

      {/* Top Regional Selections */}
      <div className="mb-12">
        <h2 className="text-2xl font-display mb-6 border-b border-brand-primary/20 pb-2">Top Regional Selections</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          {currentRegions.map((region) => (
            <motion.div whileHover={{ scale: 1.02 }} key={`region-${region.id}`} className="card overflow-hidden h-48 relative cursor-pointer group">
              <div className="absolute inset-0 bg-bg-elevated flex items-center justify-center">
                <img src={region.image} alt={region.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
              <div className="absolute bottom-4 left-4 right-4">
                <h3 className="font-semibold text-lg text-white">{region.name}</h3>
              </div>
            </motion.div>
          ))}
        </div>
        
        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-2 mt-6">
            <button 
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className={`px-3 py-1 rounded text-sm ${currentPage === 1 ? 'text-text-disabled cursor-not-allowed' : 'text-text-secondary hover:text-brand-primary hover:bg-bg-elevated'}`}
            >
              Prev
            </button>
            
            {Array.from({ length: totalPages }).map((_, idx) => {
              const page = idx + 1;
              return (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`w-8 h-8 rounded flex items-center justify-center text-sm transition-colors ${
                    currentPage === page 
                      ? 'bg-brand-primary text-bg-base font-bold' 
                      : 'text-text-secondary hover:bg-bg-elevated hover:text-text-primary'
                  }`}
                >
                  {page}
                </button>
              );
            })}
            
            <button 
              onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className={`px-3 py-1 rounded text-sm ${currentPage === totalPages ? 'text-text-disabled cursor-not-allowed' : 'text-text-secondary hover:text-brand-primary hover:bg-bg-elevated'}`}
            >
              Next
            </button>
          </div>
        )}
      </div>

      {/* My Trips */}
      <div className="mb-12">
        <div className="flex justify-between items-end mb-6 border-b border-brand-primary/20 pb-2">
          <h2 className="text-2xl font-display">My Trips</h2>
          <Link to="/trips" className="text-brand-primary hover:underline text-sm">View all</Link>
        </div>
        {trips.length === 0 ? (
          <div className="card p-8 text-center">
            <p className="text-text-secondary mb-4">No trips yet — start exploring!</p>
            <Link to="/trips/new" className="btn-primary">Plan your first trip</Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {trips.slice(0, 3).map((trip) => {
              const days = Math.ceil((new Date(trip.endDate) - new Date(trip.startDate)) / (1000 * 60 * 60 * 24));
              return (
                <motion.div whileHover={{ y: -4 }} key={trip.id} className="card overflow-hidden h-56 flex flex-col">
                  <div className="h-2/3 bg-bg-elevated flex items-center justify-center border-b border-brand-primary/10">
                    <span className="text-text-secondary">Image Placeholder</span>
                  </div>
                  <div className="p-4 flex-1 flex flex-col justify-center">
                    <h3 className="font-semibold text-lg">{trip.name}</h3>
                    <p className="text-sm text-text-secondary">{trip.status} • {days} Days</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>

      {/* Floating Action Button */}
      <Link to="/trips/new" className="fixed bottom-8 right-8 btn-primary shadow-lg z-50">
        + Plan a trip
      </Link>
    </div>
  );
};

export default MainLanding;
