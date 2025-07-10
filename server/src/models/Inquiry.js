const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Inquiry = sequelize.define('Inquiry', {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: false
  },
  buy: {
    type: DataTypes.STRING
  },
  message: {
    type: DataTypes.TEXT
  }
}, {
  tableName: 'inquiries',
  timestamps: false
});

module.exports = Inquiry;
