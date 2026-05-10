const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const City = sequelize.define('City', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  country: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  region: {
    type: DataTypes.STRING,
  },
  costIndex: {
    type: DataTypes.FLOAT,
    defaultValue: 1.0,
  },
  popularity: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
  imageUrl: {
    type: DataTypes.STRING,
  },
  description: {
    type: DataTypes.TEXT,
  },
  lat: {
    type: DataTypes.DOUBLE,
  },
  lng: {
    type: DataTypes.DOUBLE,
  },
}, {
  timestamps: true,
});

module.exports = City;
