import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { api } from '../../utils/api';

const CATEGORIES = ['Essentials', 'Clothing', 'Tech', 'Documents', 'Other'];

const categoryColors = {
  Essentials: '#5CC8A8',
  Clothing: '#A882FF',
  Tech: '#64B4FF',
  Documents: '#F4A435',
  Other: '#E8643A',
};

const PackingChecklist = () => {
  const [trips, setTrips] = useState([]);
  const [selectedTripId, setSelectedTripId] = useState('');
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [itemName, setItemName] = useState('');
  const [itemCategory, setItemCategory] = useState('Essentials');
  const [adding, setAdding] = useState(false);

  // Compute trip status from dates
  const getTripStatus = (trip) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const end = new Date(trip.endDate);
    end.setHours(0, 0, 0, 0);
    const start = new Date(trip.startDate);
    start.setHours(0, 0, 0, 0);
    if (today > end) return 'COMPLETED';
    if (today < start) return 'UPCOMING';
    return 'ONGOING';
  };

  const selectedTrip = trips.find((t) => String(t.id) === String(selectedTripId));
  const isReadOnly = selectedTrip ? getTripStatus(selectedTrip) === 'COMPLETED' : false;

  // Fetch trips
  useEffect(() => {
    const fetchTrips = async () => {
      try {
        const data = await api.get('/trips');
        setTrips(data);
        if (data.length > 0) {
          // Select first non-completed trip, or first trip
          const active = data.find((t) => getTripStatus(t) !== 'COMPLETED') || data[0];
          setSelectedTripId(String(active.id));
        }
      } catch (err) {
        console.error('Failed to fetch trips:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchTrips();
  }, []);

  // Fetch checklist when trip changes
  useEffect(() => {
    if (!selectedTripId) return;
    const fetchChecklist = async () => {
      try {
        const data = await api.get(`/checklist/${selectedTripId}`);
        setItems(data.items || []);
      } catch (err) {
        console.error('Failed to fetch checklist:', err);
        setItems([]);
      }
    };
    fetchChecklist();
  }, [selectedTripId]);

  const handleAddItem = async (e) => {
    e.preventDefault();
    if (!itemName.trim() || !selectedTripId) return;
    setAdding(true);
    try {
      const newItem = await api.post(`/checklist/${selectedTripId}/items`, {
        name: itemName.trim(),
        category: itemCategory,
      });
      setItems((prev) => [...prev, newItem]);
      setItemName('');
    } catch (err) {
      console.error('Failed to add item:', err);
    } finally {
      setAdding(false);
    }
  };

  const handleToggle = async (itemId) => {
    try {
      const result = await api.put(`/checklist/items/${itemId}`);
      setItems((prev) =>
        prev.map((item) =>
          item.id === itemId ? { ...item, checked: result.checked } : item
        )
      );
    } catch (err) {
      console.error('Failed to toggle item:', err);
    }
  };

  const handleDelete = async (itemId) => {
    try {
      await api.delete(`/checklist/items/${itemId}`);
      setItems((prev) => prev.filter((item) => item.id !== itemId));
    } catch (err) {
      console.error('Failed to delete item:', err);
    }
  };

  const handleReset = async () => {
    if (!selectedTripId) return;
    try {
      await api.put(`/checklist/${selectedTripId}/reset`);
      setItems((prev) => prev.map((item) => ({ ...item, checked: false })));
    } catch (err) {
      console.error('Failed to reset:', err);
    }
  };

  // Group items by category
  const groupedItems = {};
  for (const cat of CATEGORIES) {
    const catItems = items.filter((i) => i.category === cat);
    if (catItems.length > 0) {
      groupedItems[cat] = catItems;
    }
  }

  const totalItems = items.length;
  const checkedItems = items.filter((i) => i.checked).length;
  const progressPercent = totalItems > 0 ? Math.round((checkedItems / totalItems) * 100) : 0;

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64 text-brand-primary">
        Loading...
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-display mb-6">Packing Checklist</h1>

      {/* Trip Selector */}
      <div className="card p-5 mb-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <label className="text-sm text-text-secondary font-medium shrink-0">Select Trip:</label>
          <select
            value={selectedTripId}
            onChange={(e) => setSelectedTripId(e.target.value)}
            className="input-field py-2 text-sm bg-bg-elevated max-w-md"
          >
            {trips.length === 0 && <option value="">No trips available</option>}
            {trips.map((trip) => {
              const status = getTripStatus(trip);
              const label = status === 'COMPLETED' ? ' (Completed)' : status === 'ONGOING' ? ' (Ongoing)' : ' (Upcoming)';
              return (
                <option key={trip.id} value={trip.id}>
                  {trip.name}{label}
                </option>
              );
            })}
          </select>
          {isReadOnly && (
            <span
              className="text-xs px-3 py-1 rounded-full"
              style={{ background: 'rgba(92,200,168,0.15)', color: '#5CC8A8', border: '1px solid rgba(92,200,168,0.2)' }}
            >
              ✅ Completed — Read Only
            </span>
          )}
        </div>
      </div>

      {!selectedTripId ? (
        <div className="card p-12 text-center">
          <p className="text-text-secondary text-lg">Create a trip first to manage your packing checklist.</p>
        </div>
      ) : (
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Left Column — Add Item Form */}
          {!isReadOnly && (
            <div className="w-full lg:w-72 shrink-0">
              <div className="card p-5 sticky top-24">
                <h3 className="font-display text-lg mb-4 text-brand-primary">Add Item</h3>
                <form onSubmit={handleAddItem} className="space-y-3">
                  <input
                    type="text"
                    placeholder="e.g. Passport"
                    value={itemName}
                    onChange={(e) => setItemName(e.target.value)}
                    className="input-field text-sm"
                    required
                  />
                  <select
                    value={itemCategory}
                    onChange={(e) => setItemCategory(e.target.value)}
                    className="input-field text-sm"
                  >
                    {CATEGORIES.map((cat) => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                  <button
                    type="submit"
                    disabled={adding || !itemName.trim()}
                    className="btn-primary w-full py-2.5 text-sm"
                  >
                    {adding ? 'Adding...' : 'Add'}
                  </button>
                  <button
                    type="button"
                    onClick={handleReset}
                    className="btn-outline w-full py-2 text-sm"
                    disabled={items.length === 0}
                  >
                    Reset all
                  </button>
                </form>
              </div>
            </div>
          )}

          {/* Right Column — Items grouped by category */}
          <div className="flex-1 space-y-5">
            {/* Progress Bar */}
            {totalItems > 0 && (
              <div className="card p-4">
                <div className="flex justify-between text-sm mb-2 text-text-secondary">
                  <span>Progress: {checkedItems}/{totalItems} items packed</span>
                  <span className="text-brand-primary font-semibold">{progressPercent}%</span>
                </div>
                <div className="w-full bg-bg-subtle rounded-full h-2.5 overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${progressPercent}%` }}
                    transition={{ duration: 0.5 }}
                    className="h-full rounded-full"
                    style={{ background: 'linear-gradient(90deg, #F4A435, #5CC8A8)' }}
                  />
                </div>
              </div>
            )}

            {Object.keys(groupedItems).length === 0 ? (
              <div className="card p-8 text-center">
                <p className="text-text-secondary">No items yet. Start adding to your packing list!</p>
              </div>
            ) : (
              Object.entries(groupedItems).map(([category, catItems]) => {
                const catChecked = catItems.filter((i) => i.checked).length;
                const color = categoryColors[category] || '#F4A435';
                return (
                  <div key={category} className="card p-5">
                    <div className="flex items-center justify-between mb-3">
                      <h4
                        className="text-xs font-bold uppercase tracking-wider"
                        style={{ color }}
                      >
                        {category}
                      </h4>
                      <span className="text-xs text-text-disabled">
                        {catChecked}/{catItems.length}
                      </span>
                    </div>
                    <div className="space-y-1">
                      <AnimatePresence>
                        {catItems.map((item) => (
                          <motion.div
                            key={item.id}
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, x: 20 }}
                            className="flex items-center gap-3 p-3 rounded-lg hover:bg-bg-elevated/50 transition-colors group"
                          >
                            <button
                              onClick={() => !isReadOnly && handleToggle(item.id)}
                              disabled={isReadOnly}
                              className="w-5 h-5 rounded border-2 flex items-center justify-center shrink-0 transition-colors"
                              style={{
                                borderColor: item.checked ? color : 'rgba(160,155,140,0.4)',
                                background: item.checked ? color : 'transparent',
                              }}
                            >
                              {item.checked && (
                                <svg className="w-3 h-3 text-bg-base" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                                  <polyline points="20 6 9 17 4 12" />
                                </svg>
                              )}
                            </button>
                            <span
                              className={`flex-1 text-sm ${
                                item.checked
                                  ? 'text-text-disabled line-through'
                                  : 'text-text-primary'
                              }`}
                            >
                              {item.name}
                            </span>
                            {!isReadOnly && (
                              <button
                                onClick={() => handleDelete(item.id)}
                                className="opacity-0 group-hover:opacity-100 text-text-disabled hover:text-[#E85454] transition-all"
                                title="Delete"
                              >
                                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                  <polyline points="3 6 5 6 21 6" />
                                  <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                                </svg>
                              </button>
                            )}
                          </motion.div>
                        ))}
                      </AnimatePresence>
                    </div>
                  </div>
                );
              })
            )}

            {/* Read-only reset info */}
            {isReadOnly && totalItems > 0 && (
              <div
                className="p-3 rounded-lg text-sm text-center"
                style={{ background: 'rgba(244,164,53,0.08)', color: '#F4A435', border: '1px solid rgba(244,164,53,0.15)' }}
              >
                This trip has ended. Checklist is in read-only mode.
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default PackingChecklist;
