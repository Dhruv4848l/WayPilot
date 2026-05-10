import React from 'react';

const CommunityPost = () => (
  <div className="card p-6 mb-6">
    <div className="flex items-center gap-4 mb-4">
      <div className="w-12 h-12 rounded-full bg-bg-elevated border border-brand-primary/20"></div>
      <div>
        <h4 className="font-semibold text-text-primary">User Name</h4>
        <p className="text-xs text-text-secondary">2 hours ago</p>
      </div>
    </div>
    <div className="h-48 bg-bg-elevated mb-4 rounded flex items-center justify-center border border-brand-primary/10">
      <span className="text-text-secondary text-sm">Post Image Placeholder</span>
    </div>
    <h3 className="font-display text-xl mb-2 text-brand-primary">Amazing 5 days in Kyoto</h3>
    <p className="text-text-secondary text-sm mb-4">Just finished my trip to Kyoto, the temples were amazing! Highly recommend visiting Fushimi Inari early in the morning to avoid the crowds.</p>
    <div className="flex justify-between items-center border-t border-brand-primary/10 pt-4">
      <div className="flex gap-4">
        <button className="text-text-secondary hover:text-brand-primary">❤️ 24 Likes</button>
        <button className="text-text-secondary hover:text-brand-primary">💬 5 Comments</button>
      </div>
      <button className="btn-outline py-1 px-4 text-sm border-brand-primary/20">Copy Trip</button>
    </div>
  </div>
);

const Community = () => {
  return (
    <div className="max-w-6xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
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

      <div className="flex flex-col lg:flex-row gap-8">
        <div className="flex-1">
          <h2 className="text-3xl font-display mb-8 text-center lg:text-left">Community tab</h2>
          <CommunityPost />
          <CommunityPost />
          <CommunityPost />
        </div>
        
        <div className="w-full lg:w-80">
          <div className="card p-6 sticky top-24">
            <h3 className="font-semibold text-lg mb-4 border-b border-brand-primary/20 pb-2">About Community</h3>
            <p className="text-sm text-text-secondary leading-relaxed mb-4">
              Community section where all the users can share their experience about a certain trip or activity.
            </p>
            <p className="text-sm text-text-secondary leading-relaxed">
              Using the search, groupby or filter and sorting option, the user can narrow down the result that he is looking for...
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Community;
