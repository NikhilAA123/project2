const express = require('express');
const Lead = require('../models/lead');
const router = express.Router();

// Middleware to find a lead by ID
async function findLeadById(req, res, next) {
  try {
    const lead = await Lead.findByPk(req.params.id);
    if (!lead) return res.status(404).json({ error: 'Lead not found' });
    req.lead = lead;
    next();
  } catch (err) {
    console.error('Error finding lead by ID:', err);
    res.status(500).json({ error: err.message });
  }
}

// Create Lead
// Validate request body in the POST /leads route
router.post("/", async (req, res) => {
  try {
    const { name, address, contact_number } = req.body;
    if (!name || !address || !contact_number) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const lead = await Lead.create(req.body);
    res.status(201).json(lead);
  } catch (err) {
    console.error("Error adding lead:", err);
    res.status(500).json({ error: err.message });
  }
});


// Get All Leads (with optional pagination)
router.get('/', async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 10; // Default limit
    const offset = parseInt(req.query.offset) || 0; // Default offset
    const leads = await Lead.findAndCountAll({ limit, offset });
    res.json({ count: leads.count, rows: leads.rows });
  } catch (err) {
    console.error('Error fetching leads:', err);
    res.status(500).json({ error: err.message });
  }
});

// Get Lead by ID
router.get('/:id', findLeadById, (req, res) => {
  res.json(req.lead);
});

// Update Lead
router.put('/:id', findLeadById, async (req, res) => {
  try {
    await req.lead.update(req.body);
    res.json(req.lead);
  } catch (err) {
    console.error('Error updating lead:', err);
    res.status(500).json({ error: err.message });
  }
});

// Delete Lead
router.delete('/:id', findLeadById, async (req, res) => {
  try {
    await req.lead.destroy();
    res.status(204).send(); // No content
  } catch (err) {
    console.error('Error deleting lead:', err);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
