const SearchLead = require('../models/SearchLead');

// @desc    Create new search lead
// @route   POST /api/search-leads
exports.createSearchLead = async (req, res) => {
    try {
        const { userName, customerMobile, pickupLocation, dropLocation, journeyDate, journeyTime, isPetCab, petType } = req.body;
        
        if (!customerMobile || !pickupLocation || !dropLocation || !journeyDate || !journeyTime) {
            return res.status(400).json({ message: 'Missing required search fields' });
        }

        const lead = await SearchLead.create({
            userName: userName || 'Guest User',
            customerMobile,
            pickupLocation,
            dropLocation,
            journeyDate,
            journeyTime,
            isPetCab: !!isPetCab,
            petType: petType || null
        });

        res.status(201).json(lead);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// @desc    Get all search leads (filterable by isPetCab)
// @route   GET /api/search-leads
exports.getSearchLeads = async (req, res) => {
    try {
        const query = {};
        if (req.query.isPetCab !== undefined) {
            query.isPetCab = req.query.isPetCab === 'true';
        }
        
        const leads = await SearchLead.find(query).sort({ createdAt: -1 });
        res.status(200).json(leads);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
