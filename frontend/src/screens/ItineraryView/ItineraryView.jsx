import React from 'react';

const ActivityExpenseRow = () => (
  <div className="flex items-center gap-8 mb-4">
    <div className="flex-1 card p-4 flex justify-center">
      <span className="text-text-secondary">Physical Activity</span>
    </div>
    <div className="w-8 flex justify-center">
      <span className="text-brand-primary">→</span>
    </div>
    <div className="w-48 card p-4 flex justify-center">
      <span className="text-text-secondary">Expense</span>
    </div>
  </div>
);

const DayBlock = ({ day }) => (
  <div className="mb-12">
    <div className="inline-block border border-brand-primary rounded-full px-4 py-1 mb-6">
      <h3 className="font-semibold">Day {day}</h3>
    </div>
    
    <div className="pl-6 border-l-2 border-brand-primary/20 space-y-2 relative">
      <ActivityExpenseRow />
      <div className="h-6 flex justify-center w-1/2">
        <div className="w-0.5 bg-brand-primary/20"></div>
      </div>
      <ActivityExpenseRow />
      <div className="h-6 flex justify-center w-1/2">
        <div className="w-0.5 bg-brand-primary/20"></div>
      </div>
      <ActivityExpenseRow />
    </div>
  </div>
);

const ItineraryView = () => {
  return (
    <div className="max-w-5xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      {/* Top Search Bar */}
      <div className="flex flex-col md:flex-row gap-4 mb-10 items-center justify-between">
        <div className="w-full md:w-1/2 relative">
          <input 
            type="text" 
            placeholder="Search bar ...." 
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

      <h1 className="text-3xl font-display text-center mb-12">Itinerary for a selected place</h1>

      <div className="max-w-4xl mx-auto">
        <DayBlock day={1} />
        <DayBlock day={2} />
      </div>
    </div>
  );
};

export default ItineraryView;
