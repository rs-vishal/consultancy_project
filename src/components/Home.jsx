import React, { useState, useEffect } from "react";
import { Carousel } from "@material-tailwind/react";
import { AiOutlineSearch } from "react-icons/ai";
import productsData from "../assets/products.json";
import emailjs from "@emailjs/browser";

const Home = () => {
  const [query, setQuery] = useState("");
  const [filteredProducts, setFilteredProducts] = useState(productsData);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [expanded, setExpanded] = useState({});
  const [showSuccess, setShowSuccess] = useState(false);
  const [currentProductIndex, setCurrentProductIndex] = useState(0);

  const carouselimages = [
    "https://images.unsplash.com/photo-1497436072909-60f360e1d4b1?auto=format&fit=crop&w=2560&q=80",
    "https://images.unsplash.com/photo-1493246507139-91e8fad9978e?auto=format&fit=crop&w=2940&q=80",
    "https://images.unsplash.com/photo-1518623489648-a173ef7824f3?auto=format&fit=crop&w=2762&q=80",
  ];

  useEffect(() => {
    let intervalId;
  
    if (selectedProduct && selectedProduct.images.length > 1) {
      let currentImageIndex = 0;
      intervalId = setInterval(() => {
        const carouselElement = document.getElementById("product-carousel");
        if (carouselElement && carouselElement.children.length > 0) {
          currentImageIndex = (currentImageIndex + 1) % selectedProduct.images.length;
          carouselElement.children[currentImageIndex]?.scrollIntoView({ behavior: "smooth", inline: "center" });
        }
      }, 2000);
    }
  
    return () => clearInterval(intervalId);
  }, [selectedProduct]);
  

  const openModal = (product) => {
    const productIndex = filteredProducts.findIndex((p) => p.id === product.id);
    setCurrentProductIndex(productIndex);
    setSelectedProduct(product);
    document.body.style.overflow = "hidden";
  };

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

  const closeModal = () => {
    setSelectedProduct(null);
    document.body.style.overflow = "";
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
      await emailjs.send(
        "service_dfnjn8d",
        "template_vwbpbi8",
        templateParams,
        "dUDMhda0-3QM8nShA"
      );
      closeModal();
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 1500);
    } catch (error) {
      console.error("Error sending email:", error);
      alert("Error sending request. Please try again.");
    }
  };

 

  return (
    <div>
      {/* Top Carousel */}
      <Carousel className="h-[500px]">
        {carouselimages.map((src, index) => (
          <img key={index} src={src} alt={`Slide ${index + 1}`} className="h-full w-full object-cover" />
        ))}
      </Carousel>

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
          <AiOutlineSearch size={24} className="absolute right-3 text-gray-700" />
        </div>
      </div>

      {/* Product Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-4 sm:p-8">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => {
            const words = product.description.split(" ");
            const isLong = words.length > 20;
            return (
              <div key={product.id} className="w-full p-4 bg-white shadow-lg rounded-2xl flex flex-col">
                <img className="w-full h-48 object-cover rounded-t-xl" src={product.images[0]} alt={product.name} />
                <div className="p-4 flex flex-col flex-grow">
                  <h2 className="text-lg font-semibold">{product.name}</h2>
                  <p className="text-gray-600 flex-grow">
                    {expanded[product.id] || !isLong
                      ? product.description
                      : words.slice(0, 30).join(" ") + "..."}
                  </p>
                  {isLong && (
                    <p onClick={() => toggleExpand(product.id)} className="text-blue-500 cursor-pointer">
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

      {/* Success Modal */}
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
              <p className="text-sm">Our Team will reach you as soon as possible</p>
            </div>
          </div>
        </div>
      )}

      {/* Product Modal */}
      {selectedProduct && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black/30 backdrop-blur z-50"
          onClick={closeModal}
        >
          <div
            className="bg-white w-11/12 md:w-3/4 max-h-[80vh] overflow-auto rounded-xl p-6 relative flex flex-col md:flex-row gap-4"
            onClick={(e) => e.stopPropagation()}
          >
            <button onClick={closeModal} className="absolute top-4 right-4 text-gray-600 text-2xl">
              &times;
            </button>

            {/* Image Carousel */}
            <div className="md:w-1/2">
              <Carousel className="rounded-lg h-72">
                {selectedProduct.images.map((image, index) => (
                  <img key={index} src={image} alt={selectedProduct.name} className="h-full w-full object-cover" />
                ))}
              </Carousel>
              
            </div>

            {/* Product Info and Form */}
            <div className="md:w-1/2 flex flex-col justify-between">
              <div>
                <h3 className="text-xl font-bold mb-2">{selectedProduct.name}</h3>
                <p className="text-gray-600 mb-4">{selectedProduct.description}</p>
                <span className="text-blue-600 font-bold text-lg">{selectedProduct.price}</span>
              </div>
              <form onSubmit={handleSubmit} className="mt-4 flex flex-col gap-3">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your Email"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  required
                />
                <input
                  type="tel"
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value)}
                  placeholder="Your Mobile Number"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
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

export default Home;
