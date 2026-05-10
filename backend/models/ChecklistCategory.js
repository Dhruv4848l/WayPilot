const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const ChecklistCategory = sequelize.define('ChecklistCategory', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  // checklistId will be added by association
}, {
  timestamps: false,
});

module.exports = ChecklistCategory;
