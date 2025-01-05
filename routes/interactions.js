const express = require('express');
const Interaction = require('../models/interaction');
const { sequelize } = require('../config/database');
const router = express.Router();
const { Op } = require('sequelize');
const moment = require('moment-timezone'); // Add for timezone handling

// Log Interaction
// POST route to log an interaction
router.post('/', async (req, res) => {
  try {
    const { date, type, notes, followUpRequired, restaurantId } = req.body;

    // Validate required fields
    if (!date || !type || !restaurantId) {
      return res.status(400).json({ error: 'Date, type, and restaurantId are required.' });
    }

    // Create the interaction in the database
    const interaction = await Interaction.create(req.body);
    res.status(201).json(interaction); // Send back the created interaction as a response
  } catch (err) {
    console.error('Error logging interaction:', err);
    res.status(500).json({ error: 'Failed to log interaction.' });
  }
});

// Get Today's Interactions
router.get("/today", async (req, res) => {
  try {
    const today = moment().startOf('day').toDate(); // Start of today (00:00:00)
    
    const interactions = await Interaction.findAll({
      where: {
        date: {
          [Op.gte]: today, // Greater than or equal to the start of today
          [Op.lt]: moment(today).add(1, 'day').toDate()  // Less than the start of the next day
        }
      }
    });

    res.status(200).json(interactions);
  } catch (error) {
    console.error("Error fetching today's interactions:", error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
