import React from 'react';
import { motion } from 'framer-motion';

const ChecklistCategory = ({ title, count, total, items }) => (
  <div className="mb-6">
    <div className="flex justify-between mb-2">
      <h3 className="font-semibold text-text-primary border-b border-brand-primary/20 pb-1 flex-1">{title}</h3>
      <span className="text-xs text-text-secondary ml-4 self-end">{count}/{total}</span>
    </div>
    <div className="space-y-2 mt-3">
      {items.map((item, idx) => (
        <div key={idx} className="flex items-center gap-3">
          <input type="checkbox" defaultChecked={item.checked} className="w-4 h-4 accent-brand-primary bg-bg-surface border-brand-primary/30" />
          <span className={`text-sm ${item.checked ? 'text-text-secondary line-through' : 'text-text-primary'}`}>
            {item.name}
          </span>
        </div>
      ))}
    </div>
  </div>
);

const PackingChecklist = () => {
  return (
    <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
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
          <select className="input-field py-2 text-sm bg-bg-surface"><option>Group by...</option></select>
          <select className="input-field py-2 text-sm bg-bg-surface"><option>Filter...</option></select>
          <select className="input-field py-2 text-sm bg-bg-surface"><option>Sort by...</option></select>
        </div>
      </div>

      <div className="card p-8">
        <h2 className="text-2xl font-display mb-2">Packing checklist</h2>
        <div className="mb-6">
          <select className="input-field py-2 text-sm bg-bg-elevated border-brand-primary/10 w-64">
            <option>Trip: Paris & Rome Adventure</option>
          </select>
        </div>

        <div className="mb-8">
          <div className="flex justify-between text-sm mb-2 text-text-secondary">
            <span>Progress: 8/12 items packed</span>
          </div>
          <div className="w-full bg-bg-subtle rounded-full h-2 overflow-hidden">
            <motion.div 
              initial={{ width: 0 }} 
              animate={{ width: '66%' }} 
              className="bg-brand-primary h-full"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12">
          <ChecklistCategory 
            title="Documents" 
            count={3} total={4} 
            items={[
              { name: 'Passport', checked: true },
              { name: 'Flight Tickets (printed)', checked: true },
              { name: 'Travel Insurance', checked: true },
              { name: 'Hotel booking confirmation', checked: false }
            ]} 
          />
          <ChecklistCategory 
            title="Clothing" 
            count={1} total={4} 
            items={[
              { name: 'Casual Shirts', checked: true },
              { name: 'Trousers / jeans', checked: false },
              { name: 'Comfortable walking shoes', checked: false },
              { name: 'Light jacket / windbreaker', checked: false }
            ]} 
          />
          <ChecklistCategory 
            title="Electronics" 
            count={1} total={3} 
            items={[
              { name: 'Phone charger', checked: true },
              { name: 'Universal power adapter', checked: false },
              { name: 'Earphone / headphones', checked: false }
            ]} 
          />
        </div>

        <div className="flex flex-wrap gap-4 mt-8 pt-6 border-t border-brand-primary/10">
          <button className="btn-outline py-2 px-4 text-sm">+ Add item to checklist</button>
          <button className="btn-outline py-2 px-4 text-sm">Reset all</button>
          <button className="btn-outline py-2 px-4 text-sm">Share Checklist</button>
        </div>
      </div>
    </div>
  );
};

export default PackingChecklist;
