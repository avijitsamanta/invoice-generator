const { addQuotation, getQuotations } = require('../services/quotationService');

exports.addQuotation = async (req, res) => {
    const { products } = req.body;
    console.log(req.user);
    console.log("Received products:", products);

    try {
        const pdfPath = await addQuotation(req.user._id, req.user.name, products);
        console.log("PDF saved to:", pdfPath);

        res.status(201).json({ message: 'Quotation created and PDF generated', pdfPath });
    } catch (error) {
        console.error("Error in /add endpoint:", error);
        res.status(500).json({ message: 'Server error' });
    }
};

exports.viewQuotations = async (req, res) => {
    try {
        const quotations = await getQuotations(req.user.id);
        res.status(200).json(quotations);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};
