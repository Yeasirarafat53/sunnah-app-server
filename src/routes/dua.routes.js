const express = require('express');
const router = express.Router();
const Dua = require('../models/Dua');

const authMiddleware = require('../middleware/auth.middleware');

// GET সব দোয়া
router.get('/', async (req, res) => {
    try {
        const duas = await Dua.find().populate('category', 'name');
        res.json({ success: true, data: duas });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// POST নতুন দোয়া
router.post('/', authMiddleware, async (req, res) => {
    try {
        const dua = await Dua.create(req.body);
        res.status(201).json({ success: true, data: dua });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
});

// PUT দোয়া update করো  ← এটা নতুন
router.put('/:id', authMiddleware, async (req, res) => {
    try {
        const dua = await Dua.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json({ success: true, data: dua });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
});

// DELETE দোয়া
router.delete('/:id', authMiddleware, async (req, res) => {
    try {
        await Dua.findByIdAndDelete(req.params.id);
        res.json({ success: true, message: 'Dua deleted' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

module.exports = router;