import React from 'react';

const NoteCard = () => (
  <div className="card p-4 mb-4">
    <div className="flex justify-between items-start mb-2">
      <h3 className="font-semibold text-text-primary">Hotel check-in details - Rome stop</h3>
      <div className="flex gap-2">
        <button className="text-text-secondary hover:text-brand-primary text-sm">Edit</button>
        <button className="text-text-secondary hover:text-status-danger text-sm">Del</button>
      </div>
    </div>
    <p className="text-sm text-text-secondary mb-2">check in after 2pm, room 302, breakfast included (7-10am)</p>
    <p className="text-xs text-brand-primary/80 font-mono">Day 3: June 14 2025</p>
  </div>
);

const TripNotes = () => {
  return (
    <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      {/* Top Search Bar */}
      <div className="flex flex-col md:flex-row gap-4 mb-8 items-center justify-between">
        <div className="w-full md:w-1/2 relative">
          <input type="text" placeholder="Search bar ...." className="input-field pl-4 pr-10" />
        </div>
        <div className="flex gap-2 w-full md:w-auto">
          <select className="input-field py-2 text-sm bg-bg-surface"><option>Group by</option></select>
          <select className="input-field py-2 text-sm bg-bg-surface"><option>Filter</option></select>
          <select className="input-field py-2 text-sm bg-bg-surface"><option>Sort by</option></select>
        </div>
      </div>

      <div className="card p-8">
        <h2 className="text-2xl font-display mb-6">Trip notes</h2>
        
        <div className="flex justify-between items-center mb-6">
          <select className="input-field py-2 text-sm bg-bg-elevated border-brand-primary/10 w-64">
            <option>Trip: Paris & Rome Adventure</option>
          </select>
          <button className="btn-outline py-2 px-4 text-sm">+ Add note</button>
        </div>

        <div className="flex gap-2 mb-6 border-b border-brand-primary/20 pb-4">
          <button className="px-4 py-1 text-sm bg-bg-subtle border border-brand-primary text-brand-primary rounded">All</button>
          <button className="px-4 py-1 text-sm text-text-secondary hover:text-text-primary">by Day</button>
          <button className="px-4 py-1 text-sm text-text-secondary hover:text-text-primary">by Stop</button>
        </div>

        <div className="space-y-2">
          <NoteCard />
          <NoteCard />
          <NoteCard />
        </div>
      </div>
    </div>
  );
};

export default TripNotes;
