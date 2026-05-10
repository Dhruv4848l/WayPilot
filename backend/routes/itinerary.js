const express = require('express');
const router = express.Router();
const { Expense, Trip } = require('../models');
const { protect } = require('../middleware/authMiddleware');

// @desc    Get all activities/expenses for a trip grouped by day
// @route   GET /api/trips/:tripId/itinerary
// @access  Private
router.get('/:tripId/itinerary', protect, async (req, res) => {
  try {
    const trip = await Trip.findByPk(req.params.tripId);
    if (!trip) return res.status(404).json({ message: 'Trip not found' });
    if (trip.userId !== req.user.id && !trip.isPublic) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    const expenses = await Expense.findAll({
      where: { tripId: req.params.tripId },
      order: [['day', 'ASC'], ['createdAt', 'ASC']],
    });

    res.json({ trip, expenses });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @desc    Add an activity/expense to a trip day
// @route   POST /api/trips/:tripId/itinerary
// @access  Private
router.post('/:tripId/itinerary', protect, async (req, res) => {
  try {
    const trip = await Trip.findByPk(req.params.tripId);
    if (!trip) return res.status(404).json({ message: 'Trip not found' });
    if (trip.userId !== req.user.id) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    const { day, category, amount, description, label } = req.body;
    if (!day || !category || !description) {
      return res.status(400).json({ message: 'day, category, and description are required' });
    }

    const expense = await Expense.create({
      tripId: trip.id,
      day,
      category,
      amount: amount || 0,
      description,
      label: label || '',
    });

    res.status(201).json(expense);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @desc    Delete an activity/expense
// @route   DELETE /api/trips/:tripId/itinerary/:expenseId
// @access  Private
router.delete('/:tripId/itinerary/:expenseId', protect, async (req, res) => {
  try {
    const expense = await Expense.findByPk(req.params.expenseId);
    if (!expense) return res.status(404).json({ message: 'Activity not found' });

    const trip = await Trip.findByPk(req.params.tripId);
    if (!trip || trip.userId !== req.user.id) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    await expense.destroy();
    res.json({ message: 'Activity removed' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
