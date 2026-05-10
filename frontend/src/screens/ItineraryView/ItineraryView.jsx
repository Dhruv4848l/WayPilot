import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { api } from '../../utils/api';

const ACTIVITY_TYPES = [
  { value: 'FOOD', label: '🍽️ Breakfast / Lunch / Dinner' },
  { value: 'ACTIVITY', label: '🎯 Activity / Adventure' },
  { value: 'HOTEL', label: '🏨 Stay / Hotel' },
  { value: 'TRAVEL', label: '🚗 Transport / Travel' },
  { value: 'OTHER', label: '✨ Sightseeing / Other' },
];

const typeColors = {
  FOOD: { bg: 'rgba(244,164,53,0.12)', border: 'rgba(244,164,53,0.3)', text: '#F4A435' },
  ACTIVITY: { bg: 'rgba(232,100,58,0.12)', border: 'rgba(232,100,58,0.3)', text: '#E8643A' },
  HOTEL: { bg: 'rgba(168,130,255,0.12)', border: 'rgba(168,130,255,0.3)', text: '#A882FF' },
  TRAVEL: { bg: 'rgba(150,150,150,0.12)', border: 'rgba(150,150,150,0.3)', text: '#969696' },
  OTHER: { bg: 'rgba(92,200,168,0.12)', border: 'rgba(92,200,168,0.3)', text: '#5CC8A8' },
};

const typeLabels = {
  FOOD: '🍽️ Meal',
  ACTIVITY: '🎯 Activity',
  HOTEL: '🏨 Stay',
  TRAVEL: '🚗 Transport',
  OTHER: '✨ Other',
};

const ActivityRow = ({ item, onDelete, readOnly }) => {
  const colors = typeColors[item.category] || typeColors.OTHER;
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      className="flex items-center gap-3 mb-3"
    >
      <div
        className="flex-1 rounded-xl p-4 flex items-center justify-between"
        style={{ background: colors.bg, border: `1px solid ${colors.border}` }}
      >
        <div className="flex items-center gap-3 flex-1 min-w-0">
          <span
            className="text-xs font-semibold px-2 py-0.5 rounded-full shrink-0"
            style={{ background: colors.border, color: '#0F0E0B' }}
          >
            {typeLabels[item.category] || item.category}
          </span>
          <span className="text-text-primary font-medium truncate">{item.description}</span>
          {item.label && (
            <span className="text-xs text-text-secondary hidden sm:inline">({item.label})</span>
          )}
        </div>
        <div className="flex items-center gap-3 shrink-0">
          <span
            className="font-bold text-sm"
            style={{ color: item.amount > 0 ? colors.text : '#5CC8A8' }}
          >
            {item.amount > 0 ? `₹${Number(item.amount).toLocaleString('en-IN')}` : 'Free'}
          </span>
          {!readOnly && (
            <button
              onClick={() => onDelete(item.id)}
              className="text-text-disabled hover:text-[#E85454] transition-colors text-lg"
              title="Remove"
            >
              ×
            </button>
          )}
        </div>
      </div>
    </motion.div>
  );
};

const AddActivityForm = ({ day, tripId, onAdded }) => {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ description: '', category: 'FOOD', amount: '', label: '' });
  const [saving, setSaving] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.description.trim()) return;
    setSaving(true);
    try {
      const item = await api.post(`/trips/${tripId}/itinerary`, {
        day,
        category: form.category,
        amount: parseFloat(form.amount) || 0,
        description: form.description.trim(),
        label: form.label.trim(),
      });
      onAdded(item);
      setForm({ description: '', category: 'FOOD', amount: '', label: '' });
      setOpen(false);
    } catch (err) {
      console.error('Failed to add activity:', err);
    } finally {
      setSaving(false);
    }
  };

  if (!open) {
    return (
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => setOpen(true)}
        className="w-full py-3 rounded-xl text-sm font-medium transition-all flex items-center justify-center gap-2"
        style={{
          background: 'rgba(244,164,53,0.08)',
          border: '1px dashed rgba(244,164,53,0.3)',
          color: '#F4A435',
        }}
      >
        <span className="text-lg">+</span> Add Activity / Meal / Visit
      </motion.button>
    );
  }

  return (
    <motion.form
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: 'auto' }}
      exit={{ opacity: 0, height: 0 }}
      onSubmit={handleSubmit}
      className="card p-5 space-y-3"
      style={{ border: '1px solid rgba(244,164,53,0.2)' }}
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <input
          type="text"
          placeholder="Activity name (e.g., Lunch at Cafe Royal)"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          className="input-field text-sm"
          autoFocus
          required
        />
        <select
          value={form.category}
          onChange={(e) => setForm({ ...form, category: e.target.value })}
          className="input-field text-sm"
        >
          {ACTIVITY_TYPES.map((t) => (
            <option key={t.value} value={t.value}>{t.label}</option>
          ))}
        </select>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <input
          type="number"
          placeholder="Expense ₹ (optional)"
          value={form.amount}
          onChange={(e) => setForm({ ...form, amount: e.target.value })}
          className="input-field text-sm"
          min="0"
          step="any"
        />
        <input
          type="text"
          placeholder="Notes (optional)"
          value={form.label}
          onChange={(e) => setForm({ ...form, label: e.target.value })}
          className="input-field text-sm"
        />
      </div>
      <div className="flex gap-2 pt-1">
        <button type="submit" disabled={saving} className="btn-primary py-2 px-5 text-sm">
          {saving ? 'Adding...' : 'Add'}
        </button>
        <button
          type="button"
          onClick={() => setOpen(false)}
          className="btn-outline py-2 px-5 text-sm"
        >
          Cancel
        </button>
      </div>
    </motion.form>
  );
};

const DayBlock = ({ day, dayDate, activities, tripId, onAdded, onDelete, readOnly }) => {
  const dayTotal = activities.reduce((sum, a) => sum + (parseFloat(a.amount) || 0), 0);

  return (
    <div className="mb-10">
      <div className="flex items-center gap-4 mb-4">
        <div
          className="inline-flex items-center gap-2 rounded-full px-5 py-1.5"
          style={{ border: '1px solid rgba(244,164,53,0.4)', background: 'rgba(244,164,53,0.06)' }}
        >
          <h3 className="font-semibold text-brand-primary">Day {day}</h3>
        </div>
        {dayDate && (
          <span className="text-xs text-text-secondary">
            {new Date(dayDate).toLocaleDateString('en-IN', { weekday: 'short', day: 'numeric', month: 'short' })}
          </span>
        )}
        {dayTotal > 0 && (
          <span className="text-xs font-semibold text-brand-primary ml-auto">
            Day Total: ₹{dayTotal.toLocaleString('en-IN')}
          </span>
        )}
      </div>

      <div className="pl-6 border-l-2 border-brand-primary/20 space-y-1">
        <AnimatePresence>
          {activities.map((item) => (
            <ActivityRow key={item.id} item={item} onDelete={onDelete} readOnly={readOnly} />
          ))}
        </AnimatePresence>

        {activities.length === 0 && (
          <p className="text-text-disabled text-sm py-3 pl-2 italic">No activities added yet for this day.</p>
        )}

        {!readOnly && (
          <div className="pt-2">
            <AddActivityForm day={day} tripId={tripId} onAdded={onAdded} />
          </div>
        )}
      </div>
    </div>
  );
};

const ItineraryView = () => {
  const { id } = useParams();
  const [trip, setTrip] = useState(null);
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const data = await api.get(`/trips/${id}/itinerary`);
      setTrip(data.trip);
      setExpenses(data.expenses);
    } catch (err) {
      console.error('Failed to load itinerary:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [id]);

  const handleAdded = (newItem) => {
    setExpenses((prev) => [...prev, newItem]);
  };

  const handleDelete = async (expenseId) => {
    try {
      await api.delete(`/trips/${id}/itinerary/${expenseId}`);
      setExpenses((prev) => prev.filter((e) => e.id !== expenseId));
    } catch (err) {
      console.error('Failed to delete:', err);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64 text-brand-primary">
        Loading itinerary...
      </div>
    );
  }

  if (!trip) {
    return (
      <div className="flex justify-center items-center h-64 text-text-secondary">
        Trip not found.
      </div>
    );
  }

  // Compute number of days
  const start = new Date(trip.startDate);
  const end = new Date(trip.endDate);
  const numDays = Math.ceil((end - start) / (1000 * 60 * 60 * 24)) + 1;

  // Check if trip is completed (read-only)
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const endDate = new Date(trip.endDate);
  endDate.setHours(0, 0, 0, 0);
  const readOnly = today > endDate;

  // Grand total
  const grandTotal = expenses.reduce((sum, e) => sum + (parseFloat(e.amount) || 0), 0);

  return (
    <div className="max-w-5xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      {/* Trip Header */}
      <div className="card p-6 mb-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-display text-brand-primary">{trip.name}</h1>
            <p className="text-text-secondary text-sm mt-1">
              {new Date(trip.startDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}
              {' — '}
              {new Date(trip.endDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}
              {' • '}
              <span className="text-brand-primary font-semibold">{numDays} Day{numDays !== 1 ? 's' : ''}</span>
            </p>
            {trip.description && (
              <p className="text-text-secondary text-sm mt-1">📍 {trip.description}</p>
            )}
          </div>
          <div className="text-right">
            <p className="text-xs text-text-secondary">Total Expenses</p>
            <p className="text-2xl font-bold text-brand-primary">
              ₹{grandTotal.toLocaleString('en-IN')}
            </p>
          </div>
        </div>
      </div>

      {readOnly && (
        <div
          className="mb-6 p-3 rounded-lg text-sm text-center"
          style={{ background: 'rgba(92,200,168,0.1)', color: '#5CC8A8', border: '1px solid rgba(92,200,168,0.2)' }}
        >
          ✅ This trip is completed. Itinerary is in read-only mode.
        </div>
      )}

      {/* Day Blocks */}
      <div className="max-w-4xl mx-auto">
        {Array.from({ length: numDays }, (_, i) => {
          const dayNum = i + 1;
          const dayDate = new Date(start);
          dayDate.setDate(dayDate.getDate() + i);
          const dayActivities = expenses.filter((e) => e.day === dayNum);

          return (
            <DayBlock
              key={dayNum}
              day={dayNum}
              dayDate={dayDate}
              activities={dayActivities}
              tripId={id}
              onAdded={handleAdded}
              onDelete={handleDelete}
              readOnly={readOnly}
            />
          );
        })}
      </div>
    </div>
  );
};

export default ItineraryView;
