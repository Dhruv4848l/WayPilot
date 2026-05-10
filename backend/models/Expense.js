const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Expense = sequelize.define('Expense', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  category: {
    type: DataTypes.ENUM('HOTEL', 'TRAVEL', 'FOOD', 'ACTIVITY', 'OTHER'),
    allowNull: false,
  },
  amount: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  label: {
    type: DataTypes.STRING,
  },
  day: {
    type: DataTypes.INTEGER,
  },
  // tripId will be added by association
}, {
  timestamps: true,
});

module.exports = Expense;
