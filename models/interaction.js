const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');
const Lead = require('./lead');

const Interaction = sequelize.define('Interaction', {
  date: { type: DataTypes.DATE, allowNull: false },
  type: { type: DataTypes.ENUM('Call', 'Visit', 'Order'), allowNull: false },
  notes: { type: DataTypes.TEXT, allowNull: true },
  followUpRequired: { type: DataTypes.BOOLEAN, defaultValue: false },
}, {
  timestamps: true, // Adds createdAt and updatedAt
});

Interaction.belongsTo(Lead, { foreignKey: 'restaurantId', onDelete: 'CASCADE' });
module.exports = Interaction;
