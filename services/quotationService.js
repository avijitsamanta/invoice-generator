const Quotation = require('../models/quotation');
const generatePdf = require('../utils/generatePdf');
const fs = require('fs');
const path = require('path');

const addQuotation = async (userId, userName, products) => {
    try {
        // Compute totals and GST
        let totalAmount = 0;
        products.forEach(product => {
            product.total = product.qty * product.rate;
            totalAmount += product.total;
        });
        const gst = totalAmount * 0.18;
        const grandTotal = totalAmount + gst;

        // Create Quotation
        const quotation = new Quotation({
            userId,
            products,
            totalAmount,
            gst,
            grandTotal
        });

        // Generate PDF
        const pdfBuffer = await generatePdf({
            invoiceNumber: quotation._id,
            customerName: userName,
            items: products,
            totalAmount,
            gst,
            grandTotal
        });

        // Save PDF to disk
        const pdfPath = path.join(__dirname, '..', 'pdfs', `${quotation._id}.pdf`);
        fs.writeFileSync(pdfPath, pdfBuffer);

        // Save PDF path to quotation
        quotation.pdfPath = pdfPath;
        await quotation.save();

        return pdfPath;
    } catch (error) {
        throw new Error('Error in creating quotation and generating PDF');
    }
};

const getQuotations = async (userId) => {
    try {
        const quotations = await Quotation.find({ userId });
        return quotations;
    } catch (error) {
        throw new Error('Error in fetching quotations');
    }
};

module.exports = {
    addQuotation,
    getQuotations
};
