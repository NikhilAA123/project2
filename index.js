const express = require("express");
const { sequelize } = require("./config/database");
const leadRoutes = require("./routes/leads");
const contactRoutes = require("./routes/contacts");
const interactionRoutes = require("./routes/interactions");

require("dotenv").config(); // Load environment variables from .env

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// CORS Setup
const cors = require("cors");
app.use(cors());

// Routes
app.use("/api/leads", leadRoutes);
app.use("/api/contacts", contactRoutes);
app.use("/api/interactions", interactionRoutes);

// Test API Endpoint
app.get("/", (req, res) => {
  res.send("Udaan B2B Backend is running!");
});

// Database Sync and Start the Server
(async () => {
  try {
    // Test the database connection
    await sequelize.authenticate();
    console.log("Database connected successfully.");

    // Sync database schema only in development mode
    if (process.env.NODE_ENV === "development") {
      await sequelize.sync({ alter: true });
      console.log("Database schema synchronized.");
    }

    // Start the server
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Error connecting to the database:", error.message);

    // Exit the process on critical errors
    process.exit(1);
  }
})();
