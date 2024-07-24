const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    qty: { type: Number, required: true },
    rate: { type: Number, required: true },
    total: { type: Number, required: true },
});

const quotationSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    date: { type: Date, default: Date.now },
    products: [productSchema],
    totalAmount: { type: Number, required: true },
    gst: { type: Number, required: true },
    grandTotal: { type: Number, required: true },
    pdfPath: { type: String, required: true }
});

const Quotation = mongoose.model('Quotation', quotationSchema);

module.exports = Quotation;
