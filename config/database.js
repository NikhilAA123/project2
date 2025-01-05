const { Sequelize } = require('sequelize');
require('dotenv').config(); // Load environment variables

// Create the Sequelize instance
const sequelize = new Sequelize(
  process.env.DB_NAME || 'default_db',  // Database name with default
  process.env.DB_USER || 'root',       // Username with default
  process.env.DB_PASSWORD || '',       // Password with default
  {
    host: process.env.DB_HOST || 'localhost', // Default host
    dialect: 'mysql',
    logging: process.env.NODE_ENV === 'development' ? console.log : false, // Logs only in dev mode
  }
);

// Test the DB connection
(async () => {
  try {
    await sequelize.authenticate();
    console.log('Database connected successfully');
  } catch (err) {
    console.error('Error connecting to the database:', err.message);
    process.exit(1); // Exit the process on a connection failure
  }
})();

// Export the sequelize instance
module.exports = { sequelize };
