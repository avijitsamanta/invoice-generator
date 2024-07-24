const express = require('express');
const router = express.Router();
const { addQuotation, viewQuotations } = require('../controllers/quotationController');
const auth = require('../middleware/auth');

// Add Products and Generate PDF
router.post('/add', auth, addQuotation);

// View Quotations
router.get('/view', auth, viewQuotations);

module.exports = router;
