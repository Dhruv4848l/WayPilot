const express = require('express');
const router = express.Router();
const { getBudgetSummary, addExpense } = require('../controllers/budgetController');
const { protect } = require('../middleware/authMiddleware');

router.route('/:tripId')
  .get(protect, getBudgetSummary);

router.route('/:tripId/expenses')
  .post(protect, addExpense);

module.exports = router;
