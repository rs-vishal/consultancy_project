import React, { useState } from "react";
import { FaFilter } from "react-icons/fa";
import { AiOutlineSearch } from "react-icons/ai";
import productsData from "../assets/products.json";
import emailjs from "@emailjs/browser";

const debounce = (func, delay) => {
  let timeoutId;
  return (...args) => {
    if (timeoutId) clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      func(...args);
    }, delay);
  };
};

const Products = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [query, setQuery] = useState("");
  const [filteredProducts, setFilteredProducts] = useState(productsData);
  const [showSuccess, setShowSuccess] = useState(false);
  const [expanded, setExpanded] = useState({});
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [selectedProduct, setSelectedProduct] = useState(null);

  const categories = [
    "All",
    ...new Set(productsData.map((product) => product.category)),
  ];

  const filterProducts = (searchQuery, category) => {
    const lowercasedQuery = searchQuery.toLowerCase();
    let filtered = productsData.filter((product) =>
      product.name.toLowerCase().includes(lowercasedQuery)
    );

    if (category !== "All") {
      filtered = filtered.filter((product) => product.category === category);
    }

    setFilteredProducts(filtered);
  };

  const debouncedFilterProducts = debounce(filterProducts, 300);

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
    filterProducts(query, event.target.value);
  };

  const handleSearch = (e) => {
    const value = e.target.value;
    setQuery(value);
    debouncedFilterProducts(value, selectedCategory);
  };

  const openModal = (product) => {
    setSelectedProduct(product);
    document.body.style.overflow = "hidden"; // Disable background scrolling
  };

  const closeModal = () => {
    setSelectedProduct(null);
    document.body.style.overflow = "";
    setEmail("");
    setMobile("");
  };

  const toggleExpand = (productId) => {
    setExpanded((prev) => ({
      ...prev,
      [productId]: !prev[productId],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !mobile || !selectedProduct) {
      alert("Please fill all fields.");
      return;
    }

    const templateParams = {
      user_email: email,
      user_mobile: mobile,
      product_name: selectedProduct.name,
    };

    try {
      await emailjs.send(
        "service_dfnjn8d", // Replace with actual Service ID
        "template_vwbpbi8", // Replace with actual Template ID
        templateParams,
        "dUDMhda0-3QM8nShA" // Replace with actual Public Key
      );

      closeModal();
      setShowSuccess(true);

      setTimeout(() => {
        setShowSuccess(false);
      }, 3000);
    } catch (error) {
      console.error("Error sending email:", error);
      alert("Error sending request. Please try again.");
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6">
      {/* Filter Section */}
      <div className="flex flex-col sm:flex-row items-center justify-between mb-4 gap-4">
        <h1 className="text-2xl font-bold">Products</h1>
        {/* Search Bar */}
        <div className="flex justify-center items-center w-full sm:w-auto">
          <div className="relative flex items-center w-full sm:w-96">
            <input
              type="text"
              value={query}
              onChange={handleSearch}
              placeholder="Search for anything..."
              className="w-full px-6 py-3 rounded-full bg-white/30 backdrop-blur-md shadow-lg text-gray-900 placeholder-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <AiOutlineSearch
              size={24}
              className="absolute right-3 text-gray-700"
            />
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <div className="flex items-center">
            <FaFilter className="mr-2" />
            <span>Filter by:</span>
          </div>
          {/* Category Filter */}
          <select
            value={selectedCategory}
            onChange={handleCategoryChange}
            className="border border-gray-300 rounded-md p-2"
          >
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 p-4 sm:p-8">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => {
            const words = product.description.split(" ");
            const isLong = words.length > 20;

            return (
              <div
              key={product.id}
              className="w-full p-4 bg-white shadow-lg rounded-2xl flex flex-col"
            >
              <div className="w-full h-48 sm:h-64 flex items-center justify-center overflow-hidden rounded-t-xl">
                <img
                  className="w-full h-auto object-contain"
                  src={product.image}
                  alt={product.name}
                />
              </div>
              <div className="p-4 flex flex-col flex-grow">
                <h2 className="text-lg font-semibold">{product.name}</h2>
                <p className="text-gray-600 flex-grow">
                  {expanded[product.id] || !isLong
                    ? product.description
                    : words.slice(0, 30).join(" ") + "..."}
                </p>
                {isLong && (
                  <p
                    onClick={() => toggleExpand(product.id)}
                    className="text-blue-500 cursor-pointer"
                  >
                    {expanded[product.id] ? "See less" : "See more..."}
                  </p>
                )}
                <div className="mt-auto flex flex-col sm:flex-row sm:items-center sm:justify-between">
                  <span className="text-blue-600 font-bold">{product.price}</span>
                  <button
                    onClick={() => openModal(product)}
                    className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 w-full sm:w-auto mt-2 sm:mt-0"
                  >
                    Enquire
                  </button>
                </div>
              </div>
            </div>
            );
          })
        ) : (
          <p className="text-gray-500">No products found</p>
        )}
      </div>

      {/* Success Message */}
      {showSuccess && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm z-50">
          <div className="bg-green-100 border border-green-400 text-green-700 px-6 py-4 rounded-lg shadow-lg flex items-center gap-4">
            <svg
              width="48"
              height="48"
              viewBox="0 0 48 48"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
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

      {/* Modal */}
      {selectedProduct && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-opacity-50 backdrop-blur-md z-50"
          onClick={closeModal}
        >
          <div
            className="bg-white max-h-[80vh] overflow-auto rounded-lg w-11/12 md:w-3/4 p-6 relative flex flex-col md:flex-row border-2 border-gray-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 text-gray-500 text-2xl"
            >
              &times;
            </button>

            {/* Product Image - Top on Mobile, Left on Desktop */}
            <div className="w-full md:w-1/2 p-2">
              <img
                src={selectedProduct.image}
                alt={selectedProduct.name}
                className="w-full h-auto object-cover rounded-xl"
              />
            </div>

            {/* Product Details and Form - Bottom on Mobile, Right on Desktop */}
            <div className="w-full md:w-1/2 p-2 flex flex-col justify-between">
              <div>
                <h2 className="text-xl font-semibold">{selectedProduct.name}</h2>
                <p className="text-gray-600 mt-2">{selectedProduct.description}</p>
                <p className="text-lg font-semibold mt-2">
                  Price: {selectedProduct.price}
                </p>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="mt-4">
                <label className="block text-sm">Email</label>
                <input
                  type="email"
                  className="w-full px-4 py-2 mt-2 rounded-lg border border-gray-300"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <label className="block text-sm mt-4">Mobile Number</label>
                <input
                  type="tel"
                  className="w-full px-4 py-2 mt-2 rounded-lg border border-gray-300"
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value)}
                  required
                />
                <div className="flex justify-end space-x-4 mt-6">
                  <button
                    onClick={closeModal}
                    className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg"
                  >
                    Close
                  </button>
                  <button
                    type="submit"
                    className="bg-blue-500 text-white px-6 py-2 rounded-lg"
                  >
                    Send Request
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
      
    </div>
  );
};

export default Products;