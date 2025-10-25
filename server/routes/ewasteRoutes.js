// server/routes/ewasteRoutes.js
const express = require('express');
const router = express.Router();
const EwasteItem = require('../models/Ewasteitem');

// ✅ GET - View All E-Waste Products
router.get('/', async (req, res) => {
  try {
    const items = await EwasteItem.find().sort({ createdAt: -1 });
    res.status(200).json(items);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch items", error });
  }
});

// ✅ POST - Add a New E-Waste Product
router.post('/', async (req, res) => {
  try {
    const newItem = new EwasteItem(req.body);
    await newItem.save();
    res.status(201).json(newItem);
  } catch (error) {
    res.status(400).json({ message: "Failed to add item", error });
  }
});

// ✅ DELETE - Remove a Product by ID
router.delete('/:id', async (req, res) => {
  try {
    await EwasteItem.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: "Item deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete item", error });
  }
});

module.exports = router;
