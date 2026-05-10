const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const ChecklistItem = sequelize.define('ChecklistItem', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  checked: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  // categoryId will be added by association
}, {
  timestamps: false,
});

module.exports = ChecklistItem;
