const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Note = sequelize.define('Note', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  day: {
    type: DataTypes.INTEGER,
  },
  // tripId, userId, and stopCityId will be added by association
}, {
  timestamps: true,
});

module.exports = Note;
