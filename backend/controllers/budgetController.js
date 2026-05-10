const { Expense, Trip } = require('../models');

// @desc    Get budget summary for a trip
// @route   GET /api/budget/:tripId
// @access  Private
exports.getBudgetSummary = async (req, res) => {
  try {
    const trip = await Trip.findByPk(req.params.tripId);

    if (!trip) {
      return res.status(404).json({ message: 'Trip not found' });
    }

    if (trip.userId !== req.user.id && !trip.isPublic) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    const expenses = await Expense.findAll({
      where: { tripId: req.params.tripId },
    });

    let totalSpent = 0;
    const categoryBreakdown = {
      HOTEL: 0,
      TRAVEL: 0,
      FOOD: 0,
      ACTIVITY: 0,
      OTHER: 0,
    };

    expenses.forEach((exp) => {
      const amount = parseFloat(exp.amount);
      totalSpent += amount;
      categoryBreakdown[exp.category] += amount;
    });

    res.json({
      totalBudget: parseFloat(trip.totalBudget),
      totalSpent,
      remaining: parseFloat(trip.totalBudget) - totalSpent,
      categoryBreakdown,
      expenses,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Add an expense to a trip
// @route   POST /api/budget/:tripId/expenses
// @access  Private
exports.addExpense = async (req, res) => {
  try {
    const { category, amount, description, label, day } = req.body;
    const trip = await Trip.findByPk(req.params.tripId);

    if (!trip) {
      return res.status(404).json({ message: 'Trip not found' });
    }

    if (trip.userId !== req.user.id) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    const expense = await Expense.create({
      tripId: req.params.tripId,
      category,
      amount,
      description,
      label,
      day,
    });

    res.status(201).json(expense);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
