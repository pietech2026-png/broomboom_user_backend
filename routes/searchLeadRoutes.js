const express = require('express');
const router = express.Router();
const { createSearchLead, getSearchLeads } = require('../controllers/searchLeadController');

router.route('/')
    .post(createSearchLead)
    .get(getSearchLeads);

module.exports = router;
