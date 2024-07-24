const puppeteer = require('puppeteer');

const generatePdf = async (invoiceData) => {
    let browser;
    try {
        browser = await puppeteer.launch({
            headless: true,
            args: ['--no-sandbox', '--disable-setuid-sandbox']
        });
        const page = await browser.newPage();
        
        await page.setContent(`
            <html>
            <head>
                <style>
                    body { font-family: Arial, sans-serif; }
                .invoice { margin: 20px; padding: 20px; border: 1px solid #ccc; }
                .invoice-header { font-size: 24px; margin-bottom: 20px; }
                .invoice-details { margin-bottom: 20px; }
                .invoice-items { width: 100%; border-collapse: collapse; margin-bottom: 20px; }
                .invoice-items th, .invoice-items td { border: 1px solid #ccc; padding: 8px; text-align: left; }
                .invoice-summary { margin-top: 20px; text-align: right; }
                </style>
            </head>
            <body>
                <div class="invoice">
                    <div class="invoice-header">Invoice</div>
                    <div class="invoice-details">
                        <p>Invoice Number: ${invoiceData.invoiceNumber}</p>
                        <p>Customer Name: ${invoiceData.customerName}</p>
                    </div>
                    <table class="invoice-items">
                        <thead>
                            <tr>
                                <th>Product</th>
                                <th>Qty</th>
                                <th>Rate</th>
                                <th>Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${invoiceData.items.map(item => `
                                <tr>
                                    <td>${item.name}</td>
                                    <td>${item.qty}</td>
                                    <td>${item.rate}</td>
                                    <td>${item.total}</td>
                                </tr>
                            `).join('')}
                        </tbody>
                    </table>
                    <div class="invoice-summary">
                        <p>Total: ${invoiceData.totalAmount}</p>
                        <p>GST (18%): ${invoiceData.gst}</p>
                        <p>Grand Total: ${invoiceData.grandTotal}</p>
                    </div>
                </div>
            </body>
            </html>
        `, { waitUntil: 'networkidle0', timeout: 60000 }); // Increase timeout if needed
        
        const pdfBuffer = await page.pdf({ format: 'A4', timeout: 60000 }); // Increase timeout if needed
        return pdfBuffer;
    } catch (error) {
        console.error("Error generating PDF:", error);
        throw error;
    } finally {
        if (browser) {
            await browser.close();
        }
    }
};

module.exports = generatePdf;
