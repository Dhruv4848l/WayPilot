const { Op } = require('sequelize');
const { City, Activity } = require('../models');

// @desc    Get all cities or search cities
// @route   GET /api/cities
// @access  Public
exports.getCities = async (req, res) => {
  try {
    const whereClause = req.query.keyword
      ? { name: { [Op.like]: `%${req.query.keyword}%` } }
      : {};

    const cities = await City.findAll({ where: whereClause });
    res.json(cities);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get activities for a city or search
// @route   GET /api/activities
// @access  Public
exports.getActivities = async (req, res) => {
  try {
    const whereClause = {};

    if (req.query.keyword) {
      whereClause.name = { [Op.like]: `%${req.query.keyword}%` };
    }
    if (req.query.cityId) {
      whereClause.cityId = req.query.cityId;
    }

    const activities = await Activity.findAll({
      where: whereClause,
      include: [{ model: City, as: 'city', attributes: ['name', 'country'] }],
    });
    res.json(activities);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
