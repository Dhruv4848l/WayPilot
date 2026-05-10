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

// @desc    Get activities with pagination (for suggestions)
// @route   GET /api/cities/activities
// @access  Public
exports.getActivities = async (req, res) => {
  try {
    const whereClause = {};
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 6;
    const offset = (page - 1) * limit;

    if (req.query.keyword) {
      whereClause.name = { [Op.like]: `%${req.query.keyword}%` };
    }
    if (req.query.cityId) {
      whereClause.cityId = req.query.cityId;
    }
    if (req.query.type) {
      whereClause.type = req.query.type;
    }

    const { count, rows } = await Activity.findAndCountAll({
      where: whereClause,
      include: [{ model: City, as: 'city', attributes: ['name', 'country', 'imageUrl'] }],
      limit,
      offset,
      order: [['id', 'ASC']],
    });

    res.json({
      activities: rows,
      pagination: {
        page,
        limit,
        total: count,
        totalPages: Math.ceil(count / limit),
        hasMore: offset + rows.length < count,
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
