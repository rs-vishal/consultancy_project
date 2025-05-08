import React, { useState, useRef } from "react";
import emailjs from "@emailjs/browser";

const SelectedProductModal = ({ product, onClose, onEnquirySubmit }) => {
  // State variables for form input and errors
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [loading, setLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [imageIndex, setImageIndex] = useState(0);
  const [emailError, setEmailError] = useState("");
  const [mobileError, setMobileError] = useState("");

  // Add null check to ensure product exists
  if (!product || !product.images) {
    return (
      <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
        <div className="bg-white rounded-lg p-4 text-center">
          <p className="text-red-600">Invalid product data</p>
          <button
            onClick={onClose}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Close
          </button>
        </div>
      </div>
    );
  }

  // Form submission handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    setEmailError("");
    setMobileError("");
    setShowSuccess(false);

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[6-9]\d{9}$/;
    let hasError = false;

    // Email validation
    if (!email) {
      setEmailError("Email is required.");
      hasError = true;
    } else if (!emailRegex.test(email)) {
      setEmailError("Please enter a valid email.");
      hasError = true;
    }

    // Mobile number validation
    if (!mobile) {
      setMobileError("Mobile number is required.");
      hasError = true;
    } else if (!phoneRegex.test(mobile)) {
      setMobileError("Enter a valid 10-digit mobile number starting with 6-9.");
      hasError = true;
    }

    if (hasError) return;

    const templateParams = {
      user_email: email,
      user_mobile: mobile,
      product_name: product.name,
    };

    setLoading(true);

    try {
      // Send email using emailjs
      await emailjs.send(
        "service_dfnjn8d",
        "template_vwbpbi8",
        templateParams,
        "dUDMhda0-3QM8nShA"
      );

      // Update enquiry stats with customer details
      try {
        const res = await fetch("http://localhost:4000/api/post_no_of_enquiry", { // Changed port to 4000
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ 
            category: product.category,
            email: email,
            mobile: mobile
          }),
        });

        if (!res.ok) throw new Error("Failed to update enquiry");

        const statsRes = await fetch("http://localhost:4000/api/get_no_of_enquiry"); // Changed port to 4000
        const statsData = await statsRes.json();
        const formattedStats = statsData.reduce((acc, curr) => {
          acc[curr.category] = curr.count;
          return acc;
        }, {});
      } catch (error) {
        console.error("Error updating enquiry:", error);
      }

      // Show success message
      setShowSuccess(true);
      setEmail("");
      setMobile("");
      setTimeout(() => {
        onClose();
      }, 2000);
    } catch (error) {
      console.error("Email sending failed:", error);
    } finally {
      setLoading(false);
    }
  };

  // Swipe functionality for image carousel
  const touchStartX = useRef(null);
  const touchEndX = useRef(null);

  const handleSwipeStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleSwipeMove = (e) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleSwipeEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;
    const diff = touchStartX.current - touchEndX.current;

    if (diff > 50) {
      nextImage(); // Swipe Left
    } else if (diff < -50) {
      prevImage(); // Swipe Right
    }

    touchStartX.current = null;
    touchEndX.current = null;
  };

  const nextImage = () => {
    setImageIndex((prev) => (prev + 1) % product.images.length);
  };

  const prevImage = () => {
    setImageIndex((prev) =>
      prev === 0 ? product.images.length - 1 : prev - 1
    );
  };

  return (
    <>
      {loading && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm z-50">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}

      {showSuccess && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm z-50">
          <div className="bg-green-100 border border-green-400 text-green-700 px-6 py-4 rounded-lg shadow-lg flex items-center gap-4">
            <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M24 4C12.96 4 4 12.96 4 24C4 35.04 12.96 44 24 44C35.04 44 44 35.04 44 24C44 12.96 35.04 4 24 4ZM18.58 32.58L11.4 25.4C10.62 24.62 10.62 23.36 11.4 22.58C12.18 21.8 13.44 21.8 14.22 22.58L20 28.34L33.76 14.58C34.54 13.8 35.8 13.8 36.58 14.58C37.36 15.36 37.36 16.62 36.58 17.4L21.4 32.58C20.64 33.36 19.36 33.36 18.58 32.58Z"
                fill="#00BA34"
              />
            </svg>
            <div>
              <span className="font-semibold text-lg">Request Sent..!</span>
              <p className="text-sm">
                Our Team will reach you as soon as possible
              </p>
            </div>
          </div>
        </div>
      )}

      <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
        <div className="relative bg-white rounded-lg p-4 sm:p-6 max-w-5xl w-full max-h-[90vh] overflow-y-auto shadow-lg">
          <button
            onClick={onClose}
            className="absolute top-3 right-3 text-gray-600 hover:text-red-500 text-xl font-bold"
          >
            &times;
          </button>

          <div className="flex flex-col lg:flex-row gap-6">
            {/* Image Carousel with Swipe */}
            <div className="w-full lg:w-1/2">
              <div
                className="relative w-full h-64 sm:h-80 flex justify-center items-center touch-pan-x"
                onTouchStart={handleSwipeStart}
                onTouchMove={handleSwipeMove}
                onTouchEnd={handleSwipeEnd}
              >
                <img
                  src={product.images[imageIndex]}
                  alt={product.name}
                  className="w-full h-full object-contain rounded"
                />
                <button
                  onClick={prevImage}
                  className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-gray-200 p-1 rounded-full"
                >
                  ‹
                </button>
                <button
                  onClick={nextImage}
                  className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-gray-200 p-1 rounded-full"
                >
                  ›
                </button>
              </div>
            </div>

            {/* Product Info and Form */}
            <div className="w-full lg:w-1/2">
              <h2 className="text-2xl font-semibold mb-2">{product.name}</h2>
              <p className="mb-4 text-gray-700">{product.description}</p>

              {/* Check if product.specs exists and render it conditionally */}
              {product.specs && product.specs.length > 0 ? (
                <div className="max-h-48 overflow-y-auto border border-gray-200 rounded mb-4">
                  <table className="w-full text-sm">
                    <tbody>
                      {product.specs.map((spec, idx) => (
                        <tr key={idx} className="border-t">
                          <td className="p-2 font-medium bg-gray-50">{spec.label}</td>
                          <td className="p-2">{spec.value}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <p className="text-gray-500">No specifications available for this product.</p>
              )}

              <form onSubmit={handleSubmit} className="space-y-3">
                <div>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Your email"
                    className={`w-full border px-3 py-2 rounded ${emailError ? 'border-red-500' : ''}`}
                  />
                  {emailError && <p className="text-red-500 text-xs">{emailError}</p>}
                </div>
                <div>
                  <input
                    type="text"
                    value={mobile}
                    onChange={(e) => setMobile(e.target.value)}
                    placeholder="Your mobile number"
                    className={`w-full border px-3 py-2 rounded ${mobileError ? 'border-red-500' : ''}`}
                  />
                  {mobileError && <p className="text-red-500 text-xs">{mobileError}</p>}
                </div>
                <button
                  type="submit"
                  className="w-full py-2 px-4 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
                  disabled={loading}
                >
                  {loading ? "Sending..." : "Send Enquiry"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SelectedProductModal;
