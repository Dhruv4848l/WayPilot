const { Trip, Stop, City, StopActivity, Activity, Expense, Checklist, ChecklistCategory, ChecklistItem, Note, Post, sequelize } = require('../models');

// Helper: compute trip status from dates
function computeTripStatus(startDate, endDate) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const start = new Date(startDate);
  start.setHours(0, 0, 0, 0);

  const end = new Date(endDate);
  end.setHours(0, 0, 0, 0);

  if (today < start) return 'UPCOMING';
  if (today > end) return 'COMPLETED';
  return 'ONGOING';
}

// Helper: attach computed status to trip(s)
function attachStatus(trips) {
  if (Array.isArray(trips)) {
    return trips.map(t => {
      const plain = t.toJSON ? t.toJSON() : { ...t };
      plain.status = computeTripStatus(plain.startDate, plain.endDate);
      return plain;
    });
  }
  const plain = trips.toJSON ? trips.toJSON() : { ...trips };
  plain.status = computeTripStatus(plain.startDate, plain.endDate);
  return plain;
}

// @desc    Get logged in user trips
// @route   GET /api/trips
// @access  Private
exports.getTrips = async (req, res) => {
  try {
    const trips = await Trip.findAll({
      where: { userId: req.user.id },
      order: [['startDate', 'ASC']],
    });
    res.json(attachStatus(trips));
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create new trip
// @route   POST /api/trips
// @access  Private
exports.createTrip = async (req, res) => {
  try {
    // req.body may be undefined when multer receives multipart without a file
    const body = req.body || {};
    const { name, description, startDate, endDate } = body;

    if (!name || !startDate || !endDate) {
      return res.status(400).json({ message: 'name, startDate, and endDate are required' });
    }

    let coverPhoto = body.coverPhoto || null;

    // Handle image upload if a file is present
    if (req.file) {
      const cloudinary = require('../config/cloudinary');
      const streamUpload = (fileBuffer) => {
        return new Promise((resolve, reject) => {
          const stream = cloudinary.uploader.upload_stream(
            { folder: 'traveloop/trips' },
            (error, result) => {
              if (result) resolve(result);
              else reject(error);
            }
          );
          stream.end(fileBuffer);
        });
      };
      
      const result = await streamUpload(req.file.buffer);
      coverPhoto = result.secure_url;
    }

    const status = computeTripStatus(startDate, endDate);

    const trip = await Trip.create({
      userId: req.user.id,
      name,
      description,
      startDate,
      endDate,
      coverPhoto,
      status,
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
      res.json(attachStatus(trip));
    } else {
      res.status(404).json({ message: 'Trip not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Copy a trip
// @route   POST /api/trips/:id/copy
// @access  Private
exports.copyTrip = async (req, res) => {
  const t = await sequelize.transaction();
  try {
    const originalTrip = await Trip.findByPk(req.params.id, {
      include: [
        {
          model: Stop,
          as: 'stops',
          include: [
            {
              model: StopActivity,
              as: 'stopActivities'
            }
          ]
        }
      ]
    });

    if (!originalTrip) {
      return res.status(404).json({ message: 'Trip not found' });
    }

    const status = computeTripStatus(originalTrip.startDate, originalTrip.endDate);

    // 1. Create new Trip
    const newTrip = await Trip.create({
      name: `Copy of ${originalTrip.name}`,
      description: originalTrip.description,
      coverPhoto: originalTrip.coverPhoto,
      startDate: originalTrip.startDate,
      endDate: originalTrip.endDate,
      userId: req.user.id,
      status,
      isPublic: false
    }, { transaction: t });

    // 2. Copy Stops and StopActivities
    for (const stop of originalTrip.stops) {
      const newStop = await Stop.create({
        tripId: newTrip.id,
        cityId: stop.cityId,
        arrivalDate: stop.arrivalDate,
        departureDate: stop.departureDate,
        order: stop.order
      }, { transaction: t });

      for (const sa of stop.stopActivities) {
        await StopActivity.create({
          stopId: newStop.id,
          activityId: sa.activityId,
          order: sa.order,
          notes: sa.notes
        }, { transaction: t });
      }
    }

    await t.commit();
    res.status(201).json(newTrip);
  } catch (error) {
    await t.rollback();
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete a trip and all associated data
exports.deleteTrip = async (req, res) => {
  const t = await sequelize.transaction();
  try {
    const trip = await Trip.findByPk(req.params.id);
    if (!trip) {
      return res.status(404).json({ message: 'Trip not found' });
    }
    if (trip.userId !== req.user.id) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    const tripId = trip.id;

    // 1. Delete Posts (and their comments/likes via DB cascade if set, but we'll do it explicitly or rely on Sequelize)
    // Actually, models/index.js says Post.hasMany(Comment, { onDelete: 'CASCADE' })
    // So deleting the post should be enough.
    const posts = await Post.findAll({ where: { tripId } });
    for (const post of posts) {
      await post.destroy({ transaction: t });
    }

    // 2. Delete Checklist items -> categories -> checklists
    const checklists = await Checklist.findAll({ where: { tripId } });
    for (const cl of checklists) {
      const cats = await ChecklistCategory.findAll({ where: { checklistId: cl.id } });
      for (const cat of cats) {
        await ChecklistItem.destroy({ where: { categoryId: cat.id }, transaction: t });
      }
      await ChecklistCategory.destroy({ where: { checklistId: cl.id }, transaction: t });
      await cl.destroy({ transaction: t });
    }

    // 3. Delete notes
    await Note.destroy({ where: { tripId }, transaction: t });

    // 4. Delete expenses
    await Expense.destroy({ where: { tripId }, transaction: t });

    // 5. Delete stop activities -> stops
    const stops = await Stop.findAll({ where: { tripId } });
    for (const stop of stops) {
      await StopActivity.destroy({ where: { stopId: stop.id }, transaction: t });
      await stop.destroy({ transaction: t });
    }

    // 6. Finally delete the trip itself
    await trip.destroy({ transaction: t });

    await t.commit();
    res.json({ message: 'Trip and all associated data deleted successfully' });
  } catch (error) {
    if (t) await t.rollback();
    console.error('Delete Trip Error:', error);
    res.status(500).json({ message: error.message });
  }
};
