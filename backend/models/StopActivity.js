const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const StopActivity = sequelize.define('StopActivity', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  scheduledTime: {
    type: DataTypes.DATE,
  },
  cost: {
    type: DataTypes.DECIMAL(10, 2),
  },
  notes: {
    type: DataTypes.TEXT,
  },
  // stopId and activityId will be added by association
}, {
  timestamps: true,
});

module.exports = StopActivity;
