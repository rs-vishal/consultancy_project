import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

const PdfGenerator = async (invoiceDetails) => {
  // Create a new jsPDF instance
  const pdf = new jsPDF('p', 'mm', 'a4'); // A4 size PDF
  const {
    companyName,
    gstNumber,
    buyerName,
    buyerGST,
    invoiceNumber,
    invoiceDate,
    products,
    currentDate,
  } = invoiceDetails;

  // Create a temporary div to hold the invoice content
  const invoiceDiv = document.createElement('div');
  invoiceDiv.style.position = 'absolute';
  invoiceDiv.style.left = '-9999px'; // Move off-screen to avoid flickering
  invoiceDiv.style.width = '210mm'; // A4 width
  invoiceDiv.style.padding = '20px';
  invoiceDiv.style.boxSizing = 'border-box';
  invoiceDiv.style.fontFamily = 'Arial, sans-serif';

  // Populate the invoice content
  invoiceDiv.innerHTML = `
    <div>
      <!-- Header Section -->
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
        <div>
          <img src="path/to/your/logo.png" style="height: 50px;" alt="Company Logo" />
        </div>
        <div style="text-align: right;">
          <p style="color: #666; margin: 0;">Date</p>
          <p style="font-weight: bold; margin: 0;">${currentDate}</p>
          <p style="color: #666; margin: 0;">Invoice #</p>
          <p style="font-weight: bold; margin: 0;">${invoiceNumber}</p>
        </div>
      </div>

      <!-- Supplier and Buyer Details -->
      <div style="background: #f5f5f5; padding: 10px; margin-bottom: 20px;">
        <div style="display: flex; justify-content: space-between;">
          <div>
            <p style="font-weight: bold; margin: 0;">${companyName}</p>
            <p style="margin: 0;">GST Number: ${gstNumber}</p>
            <p style="margin: 0;">6622 Abshire Mills</p>
            <p style="margin: 0;">Port Orlofurt, 05820</p>
            <p style="margin: 0;">United States</p>
          </div>
          <div style="text-align: right;">
            <p style="font-weight: bold; margin: 0;">${buyerName}</p>
            <p style="margin: 0;">GST Number: ${buyerGST}</p>
            <p style="margin: 0;">9552 Vandervort Spurs</p>
            <p style="margin: 0;">Paradise, 43325</p>
            <p style="margin: 0;">United States</p>
          </div>
        </div>
      </div>

      <!-- Product Details Table -->
      <div style="margin-bottom: 20px;">
        <table style="width: 100%; border-collapse: collapse;">
          <thead>
            <tr>
              <th style="border-bottom: 2px solid #000; padding: 10px; text-align: left;">#</th>
              <th style="border-bottom: 2px solid #000; padding: 10px; text-align: left;">Product details</th>
              <th style="border-bottom: 2px solid #000; padding: 10px; text-align: right;">Price</th>
              <th style="border-bottom: 2px solid #000; padding: 10px; text-align: center;">Qty.</th>
              <th style="border-bottom: 2px solid #000; padding: 10px; text-align: center;">VAT</th>
              <th style="border-bottom: 2px solid #000; padding: 10px; text-align: right;">Subtotal</th>
              <th style="border-bottom: 2px solid #000; padding: 10px; text-align: right;">Subtotal + VAT</th>
            </tr>
          </thead>
          <tbody>
            ${products
              .map(
                (product, index) => `
              <tr>
                <td style="border-bottom: 1px solid #ddd; padding: 10px;">${index + 1}.</td>
                <td style="border-bottom: 1px solid #ddd; padding: 10px;">${product.description}</td>
                <td style="border-bottom: 1px solid #ddd; padding: 10px; text-align: right;">$${product.price.toFixed(2)}</td>
                <td style="border-bottom: 1px solid #ddd; padding: 10px; text-align: center;">${product.quantity}</td>
                <td style="border-bottom: 1px solid #ddd; padding: 10px; text-align: center;">${product.vat}%</td>
                <td style="border-bottom: 1px solid #ddd; padding: 10px; text-align: right;">$${product.subtotal.toFixed(2)}</td>
                <td style="border-bottom: 1px solid #ddd; padding: 10px; text-align: right;">$${(
                  product.subtotal * (1 + product.vat / 100)
                ).toFixed(2)}</td>
              </tr>
            `
              )
              .join('')}
          </tbody>
        </table>
      </div>

      <!-- Payment Details -->
      <div style="margin-bottom: 20px;">
        <p style="font-weight: bold; color: #000;">PAYMENT DETAILS</p>
        <p>Banks of Banks</p>
        <p>Bank/Sort Code: 1234567</p>
        <p>Account Number: 123456678</p>
        <p>Payment Reference: ${invoiceNumber}</p>
      </div>

      <!-- Footer Notes -->
      <div style="margin-bottom: 20px;">
        <p style="font-style: italic;">We declare that this invoice shows the actual price of the goods described and that all particulars are true and correct.</p>
      </div>

      <div style="margin-bottom: 20px;">
        <p style="font-style: italic;">This is a computer-generated invoice.</p>
      </div>
    </div>
  `;

  // Append the invoice div to the body
  document.body.appendChild(invoiceDiv);

  // Use html2canvas to convert the div to an image
  const canvas = await html2canvas(invoiceDiv, { scale: 2 }); // Increase scale for better quality
  const imgData = canvas.toDataURL('image/png');

  // Add the image to the PDF
  const imgWidth = 210; // A4 width in mm
  const imgHeight = (canvas.height * imgWidth) / canvas.width; // Calculate height to maintain aspect ratio
  pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);

  // Remove the invoice div from the DOM
  document.body.removeChild(invoiceDiv);

  // Return the PDF as a blob
  return pdf.output('blob');
};

export default PdfGenerator;