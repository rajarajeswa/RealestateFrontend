const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const User = sequelize.define('User', {
  username: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  contact: 
  { 
    type: DataTypes.BIGINT },
  address: 
  { type: DataTypes.STRING }
}, {
  tableName: 'users',   // DB table name
  timestamps: false     // disable createdAt/updatedAt
});

module.exports = User;
