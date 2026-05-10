const express = require('express');
const router = express.Router();
const { getTrips, createTrip, getTripById, copyTrip } = require('../controllers/tripController');
const { protect } = require('../middleware/authMiddleware');
const upload = require('../middleware/uploadMiddleware');

router.route('/')
  .get(protect, getTrips)
  .post(protect, upload.single('coverPhoto'), createTrip);

router.route('/:id')
  .get(protect, getTripById);

router.route('/:id/copy')
  .post(protect, copyTrip);

module.exports = router;
