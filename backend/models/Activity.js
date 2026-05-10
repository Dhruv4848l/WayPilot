const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Activity = sequelize.define('Activity', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
  },
  type: {
    type: DataTypes.ENUM('SIGHTSEEING', 'FOOD', 'ADVENTURE', 'SHOPPING', 'CULTURE', 'TRANSPORT', 'STAY', 'OTHER'),
    allowNull: false,
  },
  cost: {
    type: DataTypes.DECIMAL(10, 2),
    defaultValue: 0,
  },
  duration: {
    type: DataTypes.INTEGER, // in minutes
  },
  imageUrl: {
    type: DataTypes.STRING,
  },
  // cityId will be added by association
}, {
  timestamps: true,
});

module.exports = Activity;
