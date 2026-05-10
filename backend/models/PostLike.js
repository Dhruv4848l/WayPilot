const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const PostLike = sequelize.define('PostLike', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  // postId and userId will be added by association
}, {
  timestamps: true,
});

module.exports = PostLike;
