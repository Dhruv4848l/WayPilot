import React from 'react';
import { motion } from 'framer-motion';

const SectionBlock = ({ num }) => (
  <motion.div whileHover={{ y: -2 }} className="card p-6 mb-6">
    <h3 className="text-xl font-display mb-4 border-b border-brand-primary/10 pb-2">Section {num}:</h3>
    <p className="text-text-secondary mb-2">All the necessary information about this section.</p>
    <p className="text-sm text-text-secondary mb-6">This can be anything like travel section, hotel or any other activity.</p>
    
    <div className="flex flex-wrap gap-4">
      <div className="btn-outline py-2 px-4 border-text-secondary text-text-secondary cursor-default">
        Date Range: xxx to yyy
      </div>
      <button className="btn-outline py-2 px-4">
        Budget of this section
      </button>
    </div>
  </motion.div>
);

const BuildItinerary = () => {
  return (
    <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <div className="flex justify-between items-center mb-8 border-b border-brand-primary/20 pb-4">
        <h1 className="text-3xl font-display">Traveloop Itinerary Builder</h1>
      </div>

      <div className="space-y-2">
        <SectionBlock num={1} />
        <SectionBlock num={2} />
        <SectionBlock num={3} />
      </div>

      <div className="mt-8 flex justify-center">
        <button className="btn-outline px-8 py-3 flex items-center gap-2">
          <span>+</span> Add another Section
        </button>
      </div>
    </div>
  );
};

export default BuildItinerary;
