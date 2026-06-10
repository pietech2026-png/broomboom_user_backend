const AddOn = require('../models/AddOn');

// @desc    Create new Add-on
// @route   POST /api/addons
exports.createAddon = async (req, res) => {
    try {
        const addon = await AddOn.create(req.body);
        res.status(201).json(addon);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// @desc    Update Add-on
// @route   PUT /api/addons/:id
exports.updateAddon = async (req, res) => {
    try {
        const addon = await AddOn.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!addon) return res.status(404).json({ message: 'Add-on not found' });
        res.status(200).json(addon);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// @desc    Delete Add-on
// @route   DELETE /api/addons/:id
exports.deleteAddon = async (req, res) => {
    try {
        const addon = await AddOn.findByIdAndDelete(req.params.id);
        if (!addon) return res.status(404).json({ message: 'Add-on not found' });
        res.status(200).json({ message: 'Add-on deleted successfully' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// @desc    Get Active Add-ons (User App)
// @route   GET /api/addons
exports.getAddons = async (req, res) => {
    try {
        const addons = await AddOn.find({ isActive: true }).sort({ name: 1 });
        res.status(200).json(addons);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get All Add-ons (Admin)
// @route   GET /api/addons/admin
exports.getAddonsAdmin = async (req, res) => {
    try {
        const addons = await AddOn.find().sort({ createdAt: -1 });
        res.status(200).json(addons);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Toggle Add-on status
// @route   PATCH /api/addons/:id/toggle
exports.toggleAddonStatus = async (req, res) => {
    try {
        const addon = await AddOn.findById(req.params.id);
        if (!addon) return res.status(404).json({ message: 'Add-on not found' });

        addon.isActive = !addon.isActive;
        await addon.save();

        res.status(200).json(addon);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
