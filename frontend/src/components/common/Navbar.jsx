import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useAuthStore from '../../store/authStore';

const Navbar = () => {
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="bg-bg-surface border-b border-brand-primary/20 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex-shrink-0 flex items-center">
            <Link to="/dashboard" className="text-2xl font-display text-brand-primary font-bold">
              Traveloop
            </Link>
          </div>
          <div className="hidden md:flex space-x-8">
            <Link to="/dashboard" className="text-text-primary hover:text-brand-primary transition-colors">Dashboard</Link>
            <Link to="/trips" className="text-text-primary hover:text-brand-primary transition-colors">My Trips</Link>
            <Link to="/explore" className="text-text-primary hover:text-brand-primary transition-colors">Explore</Link>
            <Link to="/checklist" className="text-text-primary hover:text-brand-primary transition-colors">Checklist</Link>
            <Link to="/notes" className="text-text-primary hover:text-brand-primary transition-colors">Notes</Link>
            <Link to="/community" className="text-text-primary hover:text-brand-primary transition-colors">Community</Link>
          </div>
          <div className="flex items-center space-x-4 relative">
            <button 
              onClick={() => setShowDropdown(!showDropdown)}
              className="w-10 h-10 rounded-full bg-bg-elevated border border-brand-primary/30 flex items-center justify-center hover:border-brand-primary transition-colors overflow-hidden"
            >
              {user?.photo ? (
                <img src={user.photo} alt="Profile" className="w-full h-full object-cover" />
              ) : (
                <span className="text-sm font-semibold text-brand-primary">
                  {user?.firstName?.[0]}{user?.lastName?.[0]}
                </span>
              )}
            </button>
            
            {showDropdown && (
              <div className="absolute right-0 top-12 mt-2 w-48 bg-bg-surface border border-brand-primary/20 rounded-xl shadow-xl py-1 z-50">
                <div className="px-4 py-2 border-b border-brand-primary/10">
                  <p className="text-sm font-semibold truncate">{user?.firstName} {user?.lastName}</p>
                  <p className="text-xs text-text-secondary truncate">{user?.email}</p>
                </div>
                <Link 
                  to="/profile" 
                  className="block px-4 py-2 text-sm text-text-primary hover:bg-bg-elevated hover:text-brand-primary"
                  onClick={() => setShowDropdown(false)}
                >
                  Your Profile
                </Link>
                <Link 
                  to="/trips" 
                  className="block px-4 py-2 text-sm text-text-primary hover:bg-bg-elevated hover:text-brand-primary"
                  onClick={() => setShowDropdown(false)}
                >
                  My Trips
                </Link>
                <button 
                  onClick={handleLogout}
                  className="block w-full text-left px-4 py-2 text-sm text-[#E85454] hover:bg-bg-elevated"
                >
                  Sign out
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
