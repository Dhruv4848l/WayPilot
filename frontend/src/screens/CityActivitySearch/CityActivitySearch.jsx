import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { mockCities, mockActivities } from '../../data/mockData';

const CityResultItem = ({ city }) => (
  <motion.div whileHover={{ y: -2 }} className="card p-4 mb-3 flex flex-col sm:flex-row justify-between items-start sm:items-center bg-bg-surface gap-4">
    <div className="flex items-center gap-4 flex-1">
      <div className="w-16 h-16 sm:w-20 sm:h-20 shrink-0 bg-bg-elevated rounded-lg overflow-hidden border border-brand-primary/10">
        <img src={city.image} alt={city.name} className="w-full h-full object-cover" />
      </div>
      <div>
        <h4 className="font-semibold text-lg text-text-primary">{city.name}</h4>
        <p className="text-sm text-brand-primary/80 mb-1">Famous for: {city.famousFor}</p>
        <p className="text-xs text-text-secondary">{city.duration} • {city.cost}</p>
      </div>
    </div>
    <button className="btn-outline py-1.5 px-4 text-sm rounded-md border-brand-primary/20 shrink-0">Add to Trip</button>
  </motion.div>
);

const ActivityResultItem = ({ activity }) => (
  <motion.div whileHover={{ y: -2 }} className="card p-4 mb-3 flex flex-col sm:flex-row justify-between items-start sm:items-center bg-bg-surface gap-4">
    <div className="flex items-center gap-4 flex-1">
      <div className="w-16 h-16 sm:w-20 sm:h-20 shrink-0 bg-bg-elevated rounded-lg overflow-hidden border border-brand-primary/10">
        <img src={activity.image} alt={activity.name} className="w-full h-full object-cover" />
      </div>
      <div>
        <h4 className="font-semibold text-lg text-text-primary">{activity.name}</h4>
        <p className="text-sm text-text-secondary mb-1">{activity.description}</p>
        <p className="text-xs text-brand-primary/80">Available in: {activity.places.map(p => p.name).join(', ')}</p>
      </div>
    </div>
    <button className="btn-outline py-1.5 px-4 text-sm rounded-md border-brand-primary/20 shrink-0">View Places</button>
  </motion.div>
);

const CityActivitySearch = () => {
  const [searchMode, setSearchMode] = useState('activities'); // 'cities' or 'activities'
  const [searchQuery, setSearchQuery] = useState('');

  const filteredCities = mockCities.filter(city => 
    city.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    city.country.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredActivities = mockActivities.filter(activity => 
    activity.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      {/* Top Search Bar */}
      <div className="flex flex-col md:flex-row gap-4 mb-8 items-center justify-between">
        <div className="w-full md:w-1/2 relative">
          <input 
            type="text" 
            placeholder={searchMode === 'activities' ? "Search activities (e.g. Paragliding)..." : "Search cities..."} 
            className="input-field pl-4 pr-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex gap-2 w-full md:w-auto bg-bg-surface p-1 rounded-md border border-brand-primary/20">
          <button 
            className={`px-4 py-2 text-sm rounded-md transition-colors ${searchMode === 'activities' ? 'bg-brand-primary text-[#0F0E0B] font-medium' : 'text-text-secondary hover:text-text-primary'}`}
            onClick={() => setSearchMode('activities')}
          >
            Activities
          </button>
          <button 
            className={`px-4 py-2 text-sm rounded-md transition-colors ${searchMode === 'cities' ? 'bg-brand-primary text-[#0F0E0B] font-medium' : 'text-text-secondary hover:text-text-primary'}`}
            onClick={() => setSearchMode('cities')}
          >
            Cities
          </button>
        </div>
      </div>

      <div className="card p-6">
        <h2 className="text-xl font-display mb-4 border-b border-brand-primary/10 pb-2">Results</h2>
        
        <div className="flex flex-col max-h-[600px] overflow-y-auto pr-2 custom-scrollbar">
          {searchMode === 'activities' ? (
             filteredActivities.length > 0 ? (
               filteredActivities.map((activity) => (
                 <ActivityResultItem key={activity.id} activity={activity} />
               ))
             ) : (
               <p className="text-text-secondary py-4 text-center">No activities found matching your search.</p>
             )
          ) : (
             filteredCities.length > 0 ? (
               filteredCities.map((city) => (
                 <CityResultItem key={city.id} city={city} />
               ))
             ) : (
               <p className="text-text-secondary py-4 text-center">No cities found matching your search.</p>
             )
          )}
        </div>
      </div>
    </div>
  );
};

export default CityActivitySearch;
