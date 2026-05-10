const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Checklist = sequelize.define('Checklist', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  // tripId and userId will be added by association
}, {
  timestamps: true,
});

module.exports = Checklist;
