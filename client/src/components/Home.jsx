import React, { useState, useEffect } from "react";
import { Carousel } from "@material-tailwind/react";
import { AiOutlineSearch } from "react-icons/ai";
import productsData from "../assets/products.json";
import emailjs from "@emailjs/browser";
import SelectedProductModal from "./SelectedProducts";
import Stats from "./Stats";
import ErrorBoundary from "./ErrorBoundary";
const Home = () => {
  const [query, setQuery] = useState("");
  const [filteredProducts, setFilteredProducts] = useState(productsData);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [expanded, setExpanded] = useState({});
  const [showSuccess, setShowSuccess] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(false);
  const [topCurrentIndex, setTopCurrentIndex] = useState(0);
  const [enquiryStats, setEnquiryStats] = useState({});

  const carouselimages = [
    "https://images.unsplash.com/photo-1497436072909-60f360e1d4b1?auto=format&fit=crop&w=2560&q=80",
    "https://images.unsplash.com/photo-1493246507139-91e8fad9978e?auto=format&fit=crop&w=2940&q=80",
    "https://images.unsplash.com/photo-1518623489648-a173ef7824f3?auto=format&fit=crop&w=2762&q=80",
  ];

  const debounce = (func, delay) => {
    let timeoutId;
    return (...args) => {
      if (timeoutId) clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        func(...args);
      }, delay);
    };
  };

  const handleSearch = (e) => {
    const value = e.target.value;
    setQuery(value);
    debouncedFilterProducts(value);
  };

  const filterProducts = (searchQuery) => {
    const lowercasedQuery = searchQuery.toLowerCase();
    const filtered = productsData.filter((product) =>
      product.name.toLowerCase().includes(lowercasedQuery)
    );
    setFilteredProducts(filtered);
  };

  const debouncedFilterProducts = debounce(filterProducts, 300);

  const toggleExpand = (id) => {
    setExpanded((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const openModal = (product) => {
    setSelectedProduct(product);
    setCurrentIndex(0);
    document.body.style.overflow = "hidden";
  };
  const updateEnquiryStats = (category) => {
    const stats = JSON.parse(localStorage.getItem('enquiryStats') || '{}');
    stats[category] = (stats[category] || 0) + 1;
    localStorage.setItem('enquiryStats', JSON.stringify(stats));
    setEnquiryStats(stats);
  };
  const closeModal = () => {
    setSelectedProduct(null);
    setEmail("");
    setMobile("");
    document.body.style.overflow = "";
  };

  
  useEffect(() => {
    const interval = setInterval(() => {
      setTopCurrentIndex((prev) => (prev + 1) % carouselimages.length);
    }, 5000); // 5 seconds

    return () => clearInterval(interval);
  }, [carouselimages.length]);

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
    <div>
      {/* Top Carousel */}
      <div className="h-[500px] w-full overflow-hidden relative">
        {carouselimages.map((src, index) => (
          <img
            key={index}
            src={src}
            alt={`Slide ${index + 1}`}
            className={`h-full w-full object-cover transition-opacity duration-1000 ${
              index === topCurrentIndex
                ? "opacity-100"
                : "opacity-0 absolute top-0 left-0"
            }`}
          />
        ))}
      </div>

      {/* Search Bar */}
      <div className="flex justify-center items-center my-8">
        <div className="relative flex items-center w-full max-w-lg">
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

      {/* Stats component */}
      <Stats data={enquiryStats} />

      {/* Product Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-4 sm:p-8">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => {
            const words = product.description.split(" ");
            const isLong = words.length > 20;
            return (
              <div
                key={product.id}
                className="w-full p-4 bg-white shadow-lg rounded-2xl flex flex-col"
              >
                <div className="w-full h-54 sm:h-72 md:h-80 flex items-center justify-center">
                  <img
                    className="max-h-full w-auto object-contain rounded-t-xl"
                    src={product.images[0]}
                    alt={product.name}
                  />
                </div>
                <div className="p-4 flex flex-col flex-grow">
                  <h2 className="text-lg font-semibold"> {product.name}</h2>
                  <div className="mt-auto flex flex-col sm:flex-row sm:items-center sm:justify-between">
                    <span className="text-blue-600 font-bold">
                      ₹ {product.price}
                    </span>
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

      
      {/* Product Modal */}
      {selectedProduct && (
        <ErrorBoundary>
          <SelectedProductModal 
            product={selectedProduct} 
            onClose={closeModal}
            onEnquirySubmit={updateEnquiryStats}
          />
        </ErrorBoundary>
      )}
    </div>
  );
};

export default Home;

const updateEnquiryStats = (category) => {
  const stats = JSON.parse(localStorage.getItem('enquiryStats') || '{}');
  stats[category] = (stats[category] || 0) + 1;
  localStorage.setItem('enquiryStats', JSON.stringify(stats));
  setEnquiryStats(stats);
};