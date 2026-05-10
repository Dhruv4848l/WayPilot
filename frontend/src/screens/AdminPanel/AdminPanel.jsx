import React from 'react';

const AdminPanel = () => {
  return (
    <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      {/* Top Search Bar */}
      <div className="flex flex-col md:flex-row gap-4 mb-8 items-center justify-between">
        <div className="w-full md:w-1/2 relative">
          <input 
            type="text" 
            placeholder="Search bar ...." 
            className="input-field pl-4 pr-10"
          />
        </div>
        <div className="flex gap-2 w-full md:w-auto">
          <select className="input-field py-2 text-sm bg-bg-surface"><option>Group by</option></select>
          <select className="input-field py-2 text-sm bg-bg-surface"><option>Filter</option></select>
          <select className="input-field py-2 text-sm bg-bg-surface"><option>Sort by</option></select>
        </div>
      </div>

      <div className="flex gap-4 mb-8 border-b border-brand-primary/20 pb-4 overflow-x-auto">
        <button className="btn-outline bg-brand-primary/10 text-brand-primary px-6 py-2 text-sm whitespace-nowrap">Manage Users</button>
        <button className="btn-outline px-6 py-2 text-sm whitespace-nowrap">Popular cities</button>
        <button className="btn-outline px-6 py-2 text-sm whitespace-nowrap">Popular Activities</button>
        <button className="btn-outline px-6 py-2 text-sm whitespace-nowrap">User Trends and Analytics</button>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        <div className="flex-1 card p-8 flex flex-col items-center justify-center min-h-[400px]">
          {/* Charts Placeholder Area */}
          <div className="flex flex-col md:flex-row gap-8 w-full items-center justify-center">
            <div className="flex flex-col gap-4">
              <div className="w-48 h-8 bg-bg-elevated rounded"></div>
              <div className="w-48 h-8 bg-bg-elevated rounded"></div>
              <div className="w-48 h-8 bg-bg-elevated rounded"></div>
              <div className="w-48 h-8 bg-bg-elevated rounded"></div>
            </div>
            
            <div className="w-48 h-48 rounded-full border-[16px] border-brand-primary border-r-brand-secondary border-t-brand-accent border-l-bg-elevated"></div>
          </div>
          
          <div className="flex flex-col md:flex-row gap-8 w-full items-center justify-center mt-12">
            <div className="w-64 h-32 flex items-end gap-2 border-b border-l border-brand-primary/20 p-2">
              <div className="w-8 bg-brand-primary h-12"></div>
              <div className="w-8 bg-brand-secondary h-20"></div>
              <div className="w-8 bg-brand-accent h-16"></div>
              <div className="w-8 bg-status-danger h-8"></div>
              <div className="w-8 bg-brand-primary h-24"></div>
            </div>
            
            <div className="w-64 flex flex-col gap-2 border-b border-l border-brand-primary/20 p-2 h-32 justify-end">
               <div className="h-4 bg-brand-primary w-full"></div>
               <div className="h-4 bg-brand-secondary w-3/4"></div>
               <div className="h-4 bg-brand-accent w-1/2"></div>
            </div>
          </div>
        </div>

        <div className="w-full lg:w-80 space-y-6">
          <div>
            <h4 className="font-semibold text-brand-primary mb-1">Manage User Profiles:</h4>
            <p className="text-sm text-text-secondary">This section is responsible for managing the users and their actions. This portion of the admin gives access to view all the trips made by the user and other functionalities.</p>
          </div>
          <div>
            <h4 className="font-semibold text-brand-primary mb-1">Popular cities:</h4>
            <p className="text-sm text-text-secondary">Lists all the popular cities where users are visiting based on the current user trends.</p>
          </div>
          <div>
            <h4 className="font-semibold text-brand-primary mb-1">Popular Activities:</h4>
            <p className="text-sm text-text-secondary">List of popular activities users are doing based on current user trend data.</p>
          </div>
          <div>
            <h4 className="font-semibold text-brand-primary mb-1">User Trends and Analytics:</h4>
            <p className="text-sm text-text-secondary">This section will major focus on providing analysis across various points and give useful information to the user.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
