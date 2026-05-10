import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { api } from '../../utils/api';
import useAuthStore from '../../store/authStore';

const NOTE_TYPES = [
  { value: '📝 Note', label: '📝 Note', color: '#F4A435' },
  { value: '💡 Tip', label: '💡 Tip', color: '#5CC8A8' },
  { value: '⚠️ Warning', label: '⚠️ Warning', color: '#E85454' },
  { value: '✨ Experience', label: '✨ Experience', color: '#A882FF' },
  { value: '🍽️ Food Tip', label: '🍽️ Food Tip', color: '#E8643A' },
  { value: '💰 Budget Tip', label: '💰 Budget Tip', color: '#64B4FF' },
];

const typeColorMap = {};
NOTE_TYPES.forEach((t) => { typeColorMap[t.value] = t.color; });

const NoteCard = ({ note, onDelete, canDelete }) => {
  // Extract type tag from title if present (e.g., "[💡 Tip] ...")
  const tagMatch = note.title.match(/^\[(.+?)\]\s*/);
  const tag = tagMatch ? tagMatch[1] : null;
  const displayTitle = tagMatch ? note.title.replace(tagMatch[0], '') : note.title;
  const tagColor = tag ? (typeColorMap[tag] || '#F4A435') : '#F4A435';

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="card p-5 mb-4 group"
    >
      <div className="flex justify-between items-start gap-3">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap mb-2">
            {tag && (
              <span
                className="text-xs font-bold px-2.5 py-0.5 rounded-full shrink-0"
                style={{
                  background: `${tagColor}18`,
                  color: tagColor,
                  border: `1px solid ${tagColor}40`,
                }}
              >
                {tag}
              </span>
            )}
            <h3 className="font-semibold text-text-primary">{displayTitle}</h3>
          </div>
          <p className="text-sm text-text-secondary whitespace-pre-wrap leading-relaxed">
            {note.content}
          </p>
          <div className="flex items-center gap-3 mt-3">
            {note.user && (
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 rounded-full bg-bg-elevated border border-brand-primary/20 overflow-hidden flex items-center justify-center">
                  {note.user.photo ? (
                    <img src={note.user.photo} alt="" className="w-full h-full object-cover" />
                  ) : (
                    <span className="text-[8px] font-bold text-brand-primary">
                      {note.user.firstName?.[0]}
                    </span>
                  )}
                </div>
                <span className="text-xs text-text-disabled">
                  {note.user.firstName} {note.user.lastName}
                </span>
              </div>
            )}
            {note.day && (
              <span className="text-xs text-brand-primary/70 font-mono">Day {note.day}</span>
            )}
            <span className="text-xs text-text-disabled">
              {new Date(note.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}
            </span>
          </div>
        </div>
        {canDelete && (
          <button
            onClick={() => onDelete(note.id)}
            className="opacity-0 group-hover:opacity-100 text-text-disabled hover:text-[#E85454] transition-all shrink-0"
            title="Delete"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="3 6 5 6 21 6" />
              <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
            </svg>
          </button>
        )}
      </div>
    </motion.div>
  );
};

const TripNotes = () => {
  const { user } = useAuthStore();
  const [trips, setTrips] = useState([]);
  const [selectedTripId, setSelectedTripId] = useState('');
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ title: '', content: '', type: '📝 Note', day: '' });
  const [adding, setAdding] = useState(false);
  const [filter, setFilter] = useState('all');

  // Fetch trips
  useEffect(() => {
    const fetchTrips = async () => {
      try {
        const data = await api.get('/trips');
        setTrips(data);
        if (data.length > 0) {
          setSelectedTripId(String(data[0].id));
        }
      } catch (err) {
        console.error('Failed to fetch trips:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchTrips();
  }, []);

  // Fetch notes when trip changes
  useEffect(() => {
    if (!selectedTripId) return;
    const fetchNotes = async () => {
      try {
        const data = await api.get(`/notes/${selectedTripId}`);
        setNotes(data);
      } catch (err) {
        console.error('Failed to fetch notes:', err);
        setNotes([]);
      }
    };
    fetchNotes();
  }, [selectedTripId]);

  const handleAdd = async (e) => {
    e.preventDefault();
    if (!form.title.trim() || !form.content.trim()) return;
    setAdding(true);
    try {
      const title = `[${form.type}] ${form.title.trim()}`;
      const newNote = await api.post(`/notes/${selectedTripId}`, {
        title,
        content: form.content.trim(),
        day: form.day ? parseInt(form.day) : null,
      });
      setNotes((prev) => [newNote, ...prev]);
      setForm({ title: '', content: '', type: '📝 Note', day: '' });
      setShowForm(false);
    } catch (err) {
      console.error('Failed to add note:', err);
    } finally {
      setAdding(false);
    }
  };

  const handleDelete = async (noteId) => {
    try {
      await api.delete(`/notes/${noteId}`);
      setNotes((prev) => prev.filter((n) => n.id !== noteId));
    } catch (err) {
      console.error('Failed to delete note:', err);
    }
  };

  // Filter notes
  const filteredNotes = filter === 'all'
    ? notes
    : notes.filter((n) => n.title.includes(`[${filter}]`));

  // Get trip day count
  const selectedTrip = trips.find((t) => String(t.id) === String(selectedTripId));
  const numDays = selectedTrip
    ? Math.ceil((new Date(selectedTrip.endDate) - new Date(selectedTrip.startDate)) / (1000 * 60 * 60 * 24)) + 1
    : 0;

  if (loading) {
    return <div className="flex justify-center items-center h-64 text-brand-primary">Loading...</div>;
  }

  return (
    <div className="max-w-5xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <h1 className="text-3xl font-display">Travel Tips & Notes</h1>
        {selectedTripId && (
          <button
            onClick={() => setShowForm(!showForm)}
            className="btn-primary py-2 px-5 text-sm"
          >
            {showForm ? 'Cancel' : '+ Add Note'}
          </button>
        )}
      </div>

      {/* Trip Selector */}
      <div className="card p-4 mb-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <label className="text-sm text-text-secondary font-medium shrink-0">Select Trip:</label>
          <select
            value={selectedTripId}
            onChange={(e) => setSelectedTripId(e.target.value)}
            className="input-field py-2 text-sm bg-bg-elevated max-w-md"
          >
            {trips.length === 0 && <option value="">No trips</option>}
            {trips.map((trip) => (
              <option key={trip.id} value={trip.id}>{trip.name}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Add Note Form */}
      <AnimatePresence>
        {showForm && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
          >
            <form onSubmit={handleAdd} className="card p-6 mb-6 space-y-4" style={{ border: '1px solid rgba(244,164,53,0.2)' }}>
              <h3 className="font-display text-lg text-brand-primary">Share a Tip or Note</h3>
              <p className="text-xs text-text-secondary -mt-2">
                Share your experience, warnings, tips about food, budget, or anything that helps fellow travelers!
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <select
                  value={form.type}
                  onChange={(e) => setForm({ ...form, type: e.target.value })}
                  className="input-field text-sm"
                >
                  {NOTE_TYPES.map((t) => (
                    <option key={t.value} value={t.value}>{t.label}</option>
                  ))}
                </select>
                <input
                  type="text"
                  placeholder="Title (e.g., Best street food in Jaipur)"
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  className="input-field text-sm sm:col-span-2"
                  required
                />
              </div>
              <textarea
                placeholder="Write your tip, experience, or warning here... &#10;e.g., 'Don't forget to carry water bottles — the heat is intense in May!'"
                value={form.content}
                onChange={(e) => setForm({ ...form, content: e.target.value })}
                className="input-field text-sm min-h-[100px] resize-y"
                required
              />
              <div className="flex items-center gap-3">
                {numDays > 0 && (
                  <select
                    value={form.day}
                    onChange={(e) => setForm({ ...form, day: e.target.value })}
                    className="input-field text-sm w-40"
                  >
                    <option value="">General (no day)</option>
                    {Array.from({ length: numDays }, (_, i) => (
                      <option key={i + 1} value={i + 1}>Day {i + 1}</option>
                    ))}
                  </select>
                )}
                <button type="submit" disabled={adding} className="btn-primary py-2 px-6 text-sm ml-auto">
                  {adding ? 'Posting...' : 'Post Note'}
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Filter Tabs */}
      {notes.length > 0 && (
        <div className="flex gap-2 mb-6 flex-wrap">
          <button
            onClick={() => setFilter('all')}
            className={`px-3 py-1.5 text-xs rounded-full transition-colors ${
              filter === 'all'
                ? 'bg-brand-primary text-bg-base font-semibold'
                : 'text-text-secondary hover:text-text-primary border border-brand-primary/20'
            }`}
          >
            All ({notes.length})
          </button>
          {NOTE_TYPES.map((t) => {
            const count = notes.filter((n) => n.title.includes(`[${t.value}]`)).length;
            if (count === 0) return null;
            return (
              <button
                key={t.value}
                onClick={() => setFilter(t.value)}
                className={`px-3 py-1.5 text-xs rounded-full transition-colors ${
                  filter === t.value
                    ? 'font-semibold'
                    : 'hover:opacity-80'
                }`}
                style={{
                  background: filter === t.value ? `${t.color}25` : 'transparent',
                  color: t.color,
                  border: `1px solid ${t.color}${filter === t.value ? '60' : '30'}`,
                }}
              >
                {t.label} ({count})
              </button>
            );
          })}
        </div>
      )}

      {/* Notes List */}
      {!selectedTripId ? (
        <div className="card p-12 text-center">
          <p className="text-text-secondary text-lg">Create a trip first to start adding notes.</p>
        </div>
      ) : filteredNotes.length === 0 ? (
        <div className="card p-12 text-center">
          <p className="text-2xl mb-2">📝</p>
          <p className="text-text-secondary">
            {notes.length === 0
              ? "No notes yet. Share your first tip or experience!"
              : "No notes match this filter."}
          </p>
        </div>
      ) : (
        <AnimatePresence>
          {filteredNotes.map((note) => (
            <NoteCard
              key={note.id}
              note={note}
              onDelete={handleDelete}
              canDelete={note.userId === user?.id}
            />
          ))}
        </AnimatePresence>
      )}
    </div>
  );
};

export default TripNotes;
