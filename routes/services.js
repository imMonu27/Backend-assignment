const express = require('express');
const router = express.Router();
const Service = require('../models/Service');





// Add a new service
router.post('/', async (req, res) => {
    const { name, description, price } = req.body;
    if (!name || price === undefined) {
        return res.status(400).json({ message: 'Service name and price are required.' });
    }

    try {
        const service = new Service({ name, description, price });
        const savedService = await service.save();
        res.status(201).json(savedService);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get all services
router.get('/', async (req, res) => {
    try {
        const services = await Service.find();
        res.json(services);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Update a service
router.put('/:id', async (req, res) => {
    const { name, description, price } = req.body;
    try {
        const updatedService = await Service.findByIdAndUpdate(
            req.params.id,
            { name, description, price },
            { new: true }
        );
        if (!updatedService) return res.status(404).json({ message: 'Service not found.' });
        res.json(updatedService);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Delete a service
router.delete('/:id', async (req, res) => {
    try {
        const deletedService = await Service.findByIdAndDelete(req.params.id);
        if (!deletedService) return res.status(404).json({ message: 'Service not found.' });
        res.json({ message: 'Service deleted successfully.' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
