const express = require('express');
const router = express.Router();
const {
    createAddon,
    updateAddon,
    deleteAddon,
    getAddons,
    getAddonsAdmin,
    toggleAddonStatus
} = require('../controllers/addonController');

// User App: Get Active Add-ons
router.get('/', getAddons);

// Admin: Get All Add-ons
router.get('/admin', getAddonsAdmin);

// Create Add-on
router.post('/', createAddon);

// Update Add-on
router.put('/:id', updateAddon);

// Delete Add-on
router.delete('/:id', deleteAddon);

// Toggle Add-on Status
router.patch('/:id/toggle', toggleAddonStatus);

module.exports = router;
