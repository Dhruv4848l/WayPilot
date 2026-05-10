const { Trip, Stop, City, StopActivity, Activity } = require('../models');

// @desc    Get logged in user trips
// @route   GET /api/trips
// @access  Private
exports.getTrips = async (req, res) => {
  try {
    const trips = await Trip.findAll({
      where: { userId: req.user.id },
      order: [['createdAt', 'DESC']],
    });
    res.json(trips);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create new trip
// @route   POST /api/trips
// @access  Private
exports.createTrip = async (req, res) => {
  try {
    const { name, description, startDate, endDate, coverPhoto } = req.body;

    const trip = await Trip.create({
      userId: req.user.id,
      name,
      description,
      startDate,
      endDate,
      coverPhoto,
      status: 'UPCOMING',
    });

    res.status(201).json(trip);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get trip by ID
// @route   GET /api/trips/:id
// @access  Private
exports.getTripById = async (req, res) => {
  try {
    const trip = await Trip.findByPk(req.params.id, {
      include: [
        {
          model: Stop,
          as: 'stops',
          include: [
            { model: City, as: 'city' },
            {
              model: StopActivity,
              as: 'stopActivities',
              include: [{ model: Activity, as: 'activity' }],
            },
          ],
          order: [['order', 'ASC']],
        },
      ],
    });

    if (trip) {
      if (trip.userId !== req.user.id && !trip.isPublic) {
        return res.status(401).json({ message: 'Not authorized' });
      }
      res.json(trip);
    } else {
      res.status(404).json({ message: 'Trip not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
