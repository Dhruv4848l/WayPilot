const express = require('express');
const router = express.Router();
const { getTrips, createTrip, getTripById, copyTrip } = require('../controllers/tripController');
const { protect } = require('../middleware/authMiddleware');

router.route('/')
  .get(protect, getTrips)
  .post(protect, createTrip);

router.route('/:id')
  .get(protect, getTripById);

router.route('/:id/copy')
  .post(protect, copyTrip);

module.exports = router;
