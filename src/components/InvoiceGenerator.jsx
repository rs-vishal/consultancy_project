import React, { useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import PdfGenerator from "./PdfGenerator";

// Ensure react-pdf can find the worker
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const InvoiceGenerator = () => {
  const [companyName, setCompanyName] = useState("Rejoice Technical Solutions");
  const [gstNumber, setGstNumber] = useState("33EZHPS2716B1ZL");
  const [buyerName, setBuyerName] = useState("");
  const [buyerGST, setBuyerGST] = useState("");
  const [invoiceNumber, setInvoiceNumber] = useState("");
  const [invoiceDate, setInvoiceDate] = useState(new Date().toISOString().split("T")[0]);
  const [products, setProducts] = useState([]);
  const [pdfBlob, setPdfBlob] = useState(null);

  // Add new product row
  const handleAddProduct = () => {
    setProducts([
      ...products,
      { description: "", hsn: "", quantity: 0, rate: 0, per: "", amount: 0 },
    ]);
  };

  // Update product fields dynamically
  const handleProductChange = (index, field, value) => {
    const updatedProducts = [...products];

    if (field === "quantity" || field === "rate") {
      updatedProducts[index][field] = parseFloat(value) || 0;
      updatedProducts[index].amount = updatedProducts[index].quantity * updatedProducts[index].rate;
    } else {
      updatedProducts[index][field] = value;
    }

    setProducts(updatedProducts);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const invoiceDetails = {
      companyName,
      gstNumber,
      buyerName,
      buyerGST,
      invoiceNumber,
      invoiceDate,
      products,
      currentDate: new Date().toISOString().split("T")[0],
    };

    try {
      const pdfBlob = await PdfGenerator(invoiceDetails);
      setPdfBlob(pdfBlob);
    } catch (error) {
      console.error("Error generating PDF:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
          Invoice Generator
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Buyer Information */}
          <div>
            <label className="block text-gray-700 font-semibold">Buyer Name</label>
            <input
              type="text"
              className="w-full p-2 border rounded"
              value={buyerName}
              onChange={(e) => setBuyerName(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 font-semibold">Buyer GST</label>
            <input
              type="text"
              className="w-full p-2 border rounded"
              value={buyerGST}
              onChange={(e) => setBuyerGST(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-gray-700 font-semibold">Invoice Number</label>
            <input
              type="text"
              className="w-full p-2 border rounded"
              value={invoiceNumber}
              onChange={(e) => setInvoiceNumber(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 font-semibold">Invoice Date</label>
            <input
              type="date"
              className="w-full p-2 border rounded"
              value={invoiceDate}
              onChange={(e) => setInvoiceDate(e.target.value)}
              required
            />
          </div>

          {/* Add Product Button */}
          <button type="button" onClick={handleAddProduct} className="bg-blue-500 text-white py-2 px-4 rounded">
            Add Product
          </button>

          {/* Product List */}
          {products.map((product, index) => (
            <div key={index} className="border p-4 rounded mt-4">
              <input
                type="text"
                placeholder="Description"
                className="w-full p-2 border rounded"
                value={product.description}
                onChange={(e) => handleProductChange(index, "description", e.target.value)}
                required
              />

              <input
                type="text"
                placeholder="HSN Code"
                className="w-full p-2 border rounded mt-2"
                value={product.hsn}
                onChange={(e) => handleProductChange(index, "hsn", e.target.value)}
              />

              <input
                type="number"
                placeholder="Quantity"
                className="w-full p-2 border rounded mt-2"
                value={product.quantity}
                onChange={(e) => handleProductChange(index, "quantity", e.target.value)}
              />

              <input
                type="number"
                placeholder="Rate"
                className="w-full p-2 border rounded mt-2"
                value={product.rate}
                onChange={(e) => handleProductChange(index, "rate", e.target.value)}
              />

              <input
                type="text"
                placeholder="Per"
                className="w-full p-2 border rounded mt-2"
                value={product.per}
                onChange={(e) => handleProductChange(index, "per", e.target.value)}
              />

              <input
                type="number"
                placeholder="Amount"
                className="w-full p-2 border rounded mt-2 bg-gray-100"
                value={product.amount}
                readOnly
              />
            </div>
          ))}

          {/* Submit Button */}
          <button type="submit" className="bg-green-500 text-white py-2 px-4 rounded">
            Generate Invoice
          </button>
        </form>

        {/* PDF Preview and Download */}
        {pdfBlob && (
          <div className="mt-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Invoice Preview</h2>
            <Document file={URL.createObjectURL(pdfBlob)}>
              <Page pageNumber={1} />
            </Document>
            <button
              onClick={() => {
                const link = document.createElement("a");
                link.href = URL.createObjectURL(pdfBlob);
                link.download = "invoice.pdf";
                link.click();
              }}
              className="mt-4 bg-purple-500 text-white py-2 px-4 rounded"
            >
              Download PDF
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default InvoiceGenerator;
