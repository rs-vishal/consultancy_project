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
  const [currentIndex, setCurrentIndex] = useState(0);
    const [loading, setLoading] = useState(false);
  const [topCurrentIndex, setTopCurrentIndex] = useState(0);  

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

  const closeModal = () => {
    setSelectedProduct(null);
    setEmail("");
    setMobile("");
    document.body.style.overflow = "";
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
        "service_dfnjn8d",
        "template_vwbpbi8",
        templateParams,
        "dUDMhda0-3QM8nShA"
      );
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 1500);
    } catch (error) {
      console.error("Error sending email:", error);
      alert("Error sending request. Please try again.");
    }
    finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    const interval = setInterval(() => {
      setTopCurrentIndex(prev => (prev + 1) % carouselimages.length);
    }, 5000); // 5 seconds

    return () => clearInterval(interval); 
  }, [carouselimages.length]);
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
            index === topCurrentIndex ? "opacity-100" : "opacity-0 absolute top-0 left-0"
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

       {/* loading screen  */}
      {loading && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm z-50">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}
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
        <div className="fixed inset-0 flex items-center justify-center bg-black/30 backdrop-blur z-50" onClick={closeModal}>
          <div
            className="bg-white w-11/12 md:w-3/4 max-h-[80vh] overflow-auto rounded-xl p-6 relative flex flex-col md:flex-row gap-4"
            onClick={(e) => e.stopPropagation()}
          >
            <button onClick={closeModal} className="absolute top-4 right-4 text-gray-600 text-2xl">&times;</button>

            {/* Image Carousel */}
            <div className="md:w-1/2 relative">
              <div className="relative h-72 rounded-lg overflow-hidden">
                <img
                  src={selectedProduct.images[currentIndex]}
                  alt={selectedProduct.name}
                  className="h-full w-full object-cover"
                />
                <button
                  onClick={() =>
                    setCurrentIndex((prev) =>
                      prev === 0 ? selectedProduct.images.length - 1 : prev - 1
                    )
                  }
                  className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white/70 rounded-full p-2 shadow hover:bg-white"
                >
                  &#8592;
                </button>
                <button
                  onClick={() =>
                    setCurrentIndex((prev) =>
                      prev === selectedProduct.images.length - 1 ? 0 : prev + 1
                    )
                  }
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white/70 rounded-full p-2 shadow hover:bg-white"
                >
                  &#8594;
                </button>
              </div>

              {/* Dots */}
              <div className="flex justify-center gap-2 mt-2">
                {selectedProduct.images.map((_, index) => (
                  <div
                    key={index}
                    className={`w-3 h-3 rounded-full ${
                      index === currentIndex ? "bg-blue-500" : "bg-gray-300"
                    }`}
                  ></div>
                ))}
              </div>
            </div>

            {/* Product Info */}
            <div className="md:w-1/2">
              <h2 className="text-2xl font-bold">{selectedProduct.name}</h2>
              <p className="text-gray-600 my-2">{selectedProduct.description}</p>
              <p className="text-blue-600 text-lg font-semibold mb-4">{selectedProduct.price}</p>

              <form onSubmit={handleSubmit} className="space-y-4">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your Email"
                  className="w-full px-4 py-2 border rounded-lg"
                />
                <input
                  type="text"
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value)}
                  placeholder="Your Mobile Number"
                  className="w-full px-4 py-2 border rounded-lg"
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
