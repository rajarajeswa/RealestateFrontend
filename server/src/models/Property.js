const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Property = sequelize.define('Property', {
  propertyTitle: DataTypes.STRING,
  propertyType: DataTypes.STRING,
  propertyStatus: DataTypes.STRING,
  propertyPrice: DataTypes.FLOAT,
  bedrooms: DataTypes.INTEGER,
  bathrooms: DataTypes.INTEGER,
  area: DataTypes.FLOAT,
  propertyLength: DataTypes.FLOAT,
  propertyBreadth: DataTypes.FLOAT,
  propertyAddress: DataTypes.STRING,
  propertyCity: DataTypes.STRING,
  propertyState: DataTypes.STRING,
  pincode: DataTypes.STRING,
  landmark: DataTypes.STRING,
  facing: DataTypes.STRING,
  roadFacility: DataTypes.STRING,
  publicTransport: DataTypes.STRING,
  waterSupply: DataTypes.STRING,
  furnishing: DataTypes.STRING,
  propertyAge: DataTypes.INTEGER,
  propertyDescription: DataTypes.TEXT,
  propertyImages: DataTypes.TEXT,

  propertyAgent: DataTypes.STRING,
  propertyDate: DataTypes.DATE
}, {
  tableName: 'property',   // 👈 Use this to explicitly match your DB table
  timestamps: true         // Optional: adds createdAt and updatedAt columns
});

module.exports = Property;
