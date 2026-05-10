import React from 'react';
import { motion } from 'framer-motion';

const ResultItem = ({ i }) => (
  <motion.div whileHover={{ y: -2 }} className="card p-4 mb-3 flex justify-between items-center bg-bg-surface">
    <div className="flex items-center gap-4">
      <div className="w-12 h-12 bg-bg-elevated rounded flex items-center justify-center border border-brand-primary/10">
        <span className="text-xs text-text-secondary">IMG</span>
      </div>
      <div>
        <h4 className="font-semibold text-text-primary">Option and its details {i}</h4>
        <p className="text-sm text-text-secondary">Location • Duration • Cost</p>
      </div>
    </div>
    <button className="btn-outline py-1 px-3 text-sm rounded-md border-brand-primary/20">Add</button>
  </motion.div>
);

const CityActivitySearch = () => {
  return (
    <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      {/* Top Search Bar */}
      <div className="flex flex-col md:flex-row gap-4 mb-8 items-center justify-between">
        <div className="w-full md:w-1/2 relative">
          <input 
            type="text" 
            placeholder="Paragliding..." 
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

      <div className="card p-6">
        <h2 className="text-xl font-display mb-4 border-b border-brand-primary/10 pb-2">Results</h2>
        
        <div className="flex flex-col">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <ResultItem key={i} i={i} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CityActivitySearch;
