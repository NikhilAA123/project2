const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/database");

const Lead = sequelize.define(
  "Lead",
  {
    // Name of the lead (required, non-empty string)
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    // Address of the lead (required)
    address: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    // Contact number (optional)
    contact_number: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    // Status of the lead (New, Active, Inactive)
    status: {
      type: DataTypes.ENUM("New", "Active", "Inactive"),
      defaultValue: "New",
    },
    // Assigned Key Account Manager (optional)
    assigned_kam: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    // Enable timestamps for createdAt and updatedAt
    timestamps: true,
    // Enable paranoid mode for soft deletes
    paranoid: true,
    // Table name in the database
    tableName: "Leads",
  }
);

module.exports = Lead;
