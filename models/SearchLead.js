const mongoose = require('mongoose');

const searchLeadSchema = new mongoose.Schema({
    userName: {
        type: String,
        default: null
    },
    customerMobile: {
        type: String,
        required: true
    },
    pickupLocation: {
        type: String,
        required: true
    },
    dropLocation: {
        type: String,
        required: true
    },
    journeyDate: {
        type: String,
        required: true
    },
    journeyTime: {
        type: String,
        required: true
    },
    isPetCab: {
        type: Boolean,
        default: false
    },
    petType: {
        type: String,
        default: null
    },
    searchDateTime: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('SearchLead', searchLeadSchema);
