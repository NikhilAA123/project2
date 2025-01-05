const express = require('express');
const Contact = require('../models/contact');
const router = express.Router();
const { Op } = require('sequelize');

// Add Contact
router.post('/', async (req, res) => {
  try {
    const { name, role, phoneNumber, email, restaurantId } = req.body;

    // Validate required fields
    if (!name || !role || !phoneNumber || !email || !restaurantId) {
      return res.status(400).json({ error: 'All fields (name, role, phoneNumber, email, restaurantId) are required.' });
    }

    // Create the contact
    const contact = await Contact.create(req.body);
    res.status(201).json(contact);
  } catch (err) {
    console.error('Error adding contact:', err);
    res.status(500).json({ error: 'Failed to add contact.' });
  }
});

// Get Contacts by Restaurant ID (with optional pagination)
router.get('/:restaurantId', async (req, res) => {
  try {
    const { limit = 10, offset = 0 } = req.query;

    // Fetch contacts for the specified restaurant
    const contacts = await Contact.findAndCountAll({
      where: { restaurantId: req.params.restaurantId },
      limit: parseInt(limit),
      offset: parseInt(offset),
    });

    res.json({
      count: contacts.count,
      rows: contacts.rows,
    });
  } catch (err) {
    console.error('Error fetching contacts:', err);
    res.status(500).json({ error: 'Failed to fetch contacts.' });
  }
});

module.exports = router;
