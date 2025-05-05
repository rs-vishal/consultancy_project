import React, { useState, useEffect } from "react";
import { FaFilter } from "react-icons/fa";
import { AiOutlineSearch } from "react-icons/ai";
import productsData from "../assets/products.json";
import SelectedProductModal from "./SelectedProducts";
import Stats from "./Stats";

// Add debounce function definition at the top level
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
  const [currentIndex, setCurrentIndex] = useState(0);

  const [filteredProducts, setFilteredProducts] = useState(productsData);
  const [expanded, setExpanded] = useState({});
 
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
  };

  const [enquiryStats, setEnquiryStats] = useState({});

  useEffect(() => {
    // Load enquiry stats from localStorage
    const loadEnquiryStats = () => {
      const stats = JSON.parse(localStorage.getItem('enquiryStats') || '{}');
      setEnquiryStats(stats);
    };

    loadEnquiryStats();
    // Add event listener for storage changes
    window.addEventListener('storage', loadEnquiryStats);

    return () => {
      window.removeEventListener('storage', loadEnquiryStats);
    };
  }, []);

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
          <AiOutlineSearch
            size={24}
            className="absolute right-3 text-gray-700"
          />
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

      {/* Add Stats component before the product grid */}
      

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
                <div className="w-full h-54 sm:h-72  md:h-80 flex items-center justify-center">
                  <img
                    className="max-h-full w-auto object-contain rounded-t-xl"
                    src={product.images[0]}
                    alt={product.name}
                  />
                </div>
                <div className="p-4 flex flex-col flex-grow">
                  <h2 className="text-lg font-semibold mb-2">{product.name}</h2>
                  
                  <div className="mt-4 flex justify-between items-center">
                    <span className="text-blue-600 font-bold">
                      ₹ {product.price}
                    </span>
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
            <p className="text-gray-500 text-lg">
              No products found matching your criteria
            </p>
          </div>
        )}
      </div>

      {selectedProduct && (
        <SelectedProductModal product={selectedProduct} onClose={closeModal} />
      )}
    </div>
  );
};

export default Products;
