const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');
const Lead = require('./lead');

const Contact = sequelize.define('Contact', {
  name: { type: DataTypes.STRING, allowNull: false },
  role: { type: DataTypes.STRING, allowNull: false },
  phoneNumber: { type: DataTypes.STRING, allowNull: false },
  email: { type: DataTypes.STRING, allowNull: false, unique: true, validate: { isEmail: true } },
}, {
  timestamps: true, // Adds createdAt and updatedAt
});

Contact.belongsTo(Lead, { foreignKey: 'restaurantId', onDelete: 'CASCADE' });
module.exports = Contact;
