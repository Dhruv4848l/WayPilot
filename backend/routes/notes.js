const express = require('express');
const router = express.Router();
const { Note, Trip, User } = require('../models');
const { protect } = require('../middleware/authMiddleware');

// @desc    Get all notes for a trip
// @route   GET /api/notes/:tripId
// @access  Private
router.get('/:tripId', protect, async (req, res) => {
  try {
    const notes = await Note.findAll({
      where: { tripId: req.params.tripId },
      include: [{
        model: User,
        as: 'user',
        attributes: ['id', 'firstName', 'lastName', 'photo'],
      }],
      order: [['createdAt', 'DESC']],
    });
    res.json(notes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @desc    Add a note to a trip
// @route   POST /api/notes/:tripId
// @access  Private
router.post('/:tripId', protect, async (req, res) => {
  try {
    const trip = await Trip.findByPk(req.params.tripId);
    if (!trip) return res.status(404).json({ message: 'Trip not found' });

    const { title, content, day } = req.body;
    if (!title || !content) {
      return res.status(400).json({ message: 'title and content are required' });
    }

    const note = await Note.create({
      tripId: trip.id,
      userId: req.user.id,
      title,
      content,
      day: day || null,
    });

    // Refetch with user info
    const fullNote = await Note.findByPk(note.id, {
      include: [{
        model: User,
        as: 'user',
        attributes: ['id', 'firstName', 'lastName', 'photo'],
      }],
    });

    res.status(201).json(fullNote);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @desc    Delete a note
// @route   DELETE /api/notes/:noteId
// @access  Private
router.delete('/:noteId', protect, async (req, res) => {
  try {
    const note = await Note.findByPk(req.params.noteId);
    if (!note) return res.status(404).json({ message: 'Note not found' });
    if (note.userId !== req.user.id) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    await note.destroy();
    res.json({ message: 'Note deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
