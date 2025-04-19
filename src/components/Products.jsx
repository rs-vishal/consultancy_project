import React, { useState } from "react";
import { FaFilter } from "react-icons/fa";
import { AiOutlineSearch } from "react-icons/ai";
import productsData from "../assets/products.json";
import emailjs from "@emailjs/browser";
import { Carousel } from "@material-tailwind/react";

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
  const [loading, setLoading] = useState(false);

  const categories = ["All", ...new Set(productsData.map((product) => product.category))];

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
    setQuery(e.target.value);
    debouncedFilterProducts(e.target.value, selectedCategory);
  };

  const toggleExpand = (productId) => {
    setExpanded((prev) => ({
      ...prev,
      [productId]: !prev[productId],
    }));
  };

  const openModal = (product) => {
    setSelectedProduct(product);
  };

  const closeModal = () => {
    setSelectedProduct(null);
    setEmail("");
    setMobile("");
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
      setLoading(true);
      closeModal();

      await emailjs.send(
        "service_dfnjn8d", // Replace with your EmailJS service ID
        "template_vwbpbi8", // Replace with your EmailJS template ID
        templateParams,
        "dUDMhda0-3QM8nShA" // Replace with your EmailJS public key
      );

      setShowSuccess(true);
      setTimeout(() => {
        setShowSuccess(false);
      }, 1500);
    } catch (error) {
      console.error("Error sending email:", error);
      alert("Error sending request. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6">
      {/* Filter Section */}
      <div className="flex flex-col sm:flex-row items-center justify-between mb-4 gap-4">
        <h1 className="text-2xl font-bold">Products</h1>
        <div className="relative flex items-center w-full sm:w-96">
          <input
            type="text"
            value={query}
            onChange={handleSearch}
            placeholder="Search for anything..."
            className="w-full px-6 py-3 rounded-full bg-white/30 backdrop-blur-md shadow-lg text-gray-900 placeholder-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <AiOutlineSearch size={24} className="absolute right-3 text-gray-700" />
        </div>
        <div className="flex items-center space-x-4">
          <FaFilter />
          <span>Filter by:</span>
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
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4 auto-rows-fr">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => {
            const description = product.description || "";
            const words = description.split(" ");
            const isLong = words.length > 20;
            const isExpanded = expanded[product.id];

            return (
              <div
                key={product.id}
                className="flex flex-col bg-white shadow-lg rounded-2xl overflow-hidden hover:shadow-xl transition-shadow duration-300"
              >
                <div className="w-full h-48 overflow-hidden">
                  <img
                    className="w-full h-full object-cover"
                    src={product.images?.[0] || "/placeholder.jpg"}
                    alt={product.name}
                  />
                </div>
                <div className="p-4 flex flex-col flex-grow">
                  <h2 className="text-lg font-semibold mb-2">{product.name}</h2>
                  <div className="flex-grow">
                    <div className={`text-gray-600 ${!isExpanded && isLong ? "line-clamp-3" : ""}`}>
                      {description}
                    </div>
                    {isLong && (
                      <button
                        onClick={() => toggleExpand(product.id)}
                        className="text-blue-500 hover:text-blue-700 mt-2 text-sm font-medium flex items-center"
                      >
                        {isExpanded ? (
                          <>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                            </svg>
                            Show less
                          </>
                        ) : (
                          <>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                            Read more
                          </>
                        )}
                      </button>
                    )}
                  </div>
                  <div className="mt-4 flex justify-between items-center">
                    <span className="text-blue-600 font-bold">{product.price}</span>
                    <button
                      onClick={() => openModal(product)}
                      className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors duration-200"
                    >
                      Enquire
                    </button>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <div className="col-span-full text-center py-10">
            <p className="text-gray-500 text-lg">No products found matching your criteria</p>
          </div>
        )}
      </div>

      {/* Loading Spinner */}
      {loading && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm z-50">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}

      {/* Success Message */}
      {showSuccess && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm z-50">
          <div className="bg-green-100 border border-green-400 text-green-700 px-6 py-4 rounded-lg shadow-lg flex items-center gap-4">
            <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" clipRule="evenodd" d="M24 4C12.96 4 4 12.96 4 24C4 35.04 12.96 44 24 44C35.04 44 44 35.04 44 24C44 12.96 35.04 4 24 4ZM18.58 32.58L11.4 25.4C10.62 24.62 10.62 23.36 11.4 22.58C12.18 21.8 13.44 21.8 14.22 22.58L20 28.34L33.76 14.58C34.54 13.8 35.8 13.8 36.58 14.58C37.36 15.36 37.36 16.62 36.58 17.4L21.4 32.58C20.64 33.36 19.36 33.36 18.58 32.58Z" fill="#00BA34" />
            </svg>
            <div>
              <span className="font-semibold text-lg">Request Sent..!</span>
              <p className="text-sm">Our team will reach out as soon as possible.</p>
            </div>
          </div>
        </div>
      )}

      {/* Modal */}
      {selectedProduct && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm z-50" onClick={closeModal}>
          <div className="bg-white max-h-[80vh] overflow-auto rounded-lg w-11/12 md:w-3/4 p-6 relative flex flex-col md:flex-row border-2 border-gray-200" onClick={(e) => e.stopPropagation()}>
            <button onClick={closeModal} className="absolute top-4 right-4 text-gray-500 text-2xl">
              &times;
            </button>

            <div className="md:w-1/2">
              <Carousel className="rounded-lg h-72">
                {selectedProduct.images.map((image, index) => (
                  <img key={index} src={image} alt={`Product ${index}`} className="w-full h-full object-cover" />
                ))}
              </Carousel>
            </div>

            <div className="md:w-1/2 p-4">
              <h2 className="text-xl font-semibold mb-2">{selectedProduct.name}</h2>
              <p className="text-gray-700 mb-4">{selectedProduct.description}</p>
              <p className="text-blue-600 font-bold text-lg mb-2">{selectedProduct.price}</p>

              <form onSubmit={handleSubmit} className="space-y-4">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your Email"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                />
                <input
                  type="tel"
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value)}
                  placeholder="Your Mobile"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
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
