import React, { useState, useEffect } from "react";
import { Carousel } from "@material-tailwind/react";
import productsData from "../assets/products.json";
const Home = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [query, setQuery] = useState("");
  const [products, setProducts] = useState([]);

  const images = [
    "https://images.unsplash.com/photo-1497436072909-60f360e1d4b1?auto=format&fit=crop&w=2560&q=80",
    "https://images.unsplash.com/photo-1493246507139-91e8fad9978e?auto=format&fit=crop&w=2940&q=80",
    "https://images.unsplash.com/photo-1518623489648-a173ef7824f3?auto=format&fit=crop&w=2762&q=80",
  ];

  useEffect(() => {
    setProducts(productsData); // Load products from JSON
    const interval = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    console.log("Search Query:", query);
  };

  return (
    <div>
      {/* Carousel Section */}
      <Carousel className="h-[600px]">
        {images.map((src, index) => (
          <img
            key={index}
            src={src}
            alt={`Slide ${index + 1}`}
            className="h-full w-full object-cover"
          />
        ))}
      </Carousel>

      {/* Search Bar */}
      <div className="flex justify-center items-center my-8">
        <form
          onSubmit={handleSearch}
          className="relative flex items-center w-full max-w-lg"
        >
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search for anything..."
            className="w-full px-6 py-3 rounded-full bg-white/30 backdrop-blur-md shadow-lg text-gray-900 placeholder-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="absolute right-3 p-2 rounded-full bg-blue-500 text-white hover:bg-blue-600 transition-all duration-200"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-white"
            >
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
          </button>
        </form>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-6 p-8">
        {products.map((product) => (
          <div
            key={product.id}
            className="w-full p-4 bg-white shadow-lg rounded-2xl aspect-[1/1] flex flex-col"
          >
            <img
              className="w-full h-1/2 object-cover rounded-t-xl"
              src={product.image}
              alt={product.name}
            />
            <div className="p-4 flex flex-col flex-grow">
              <h2 className="text-lg font-semibold">{product.name}</h2>
              <p className="text-gray-600 flex-grow">{product.description}</p>
              <div className="mt-auto flex flex-col sm:flex-row sm:items-center sm:justify-between">
                <span className="text-blue-600 font-bold">{product.price}</span>
                <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 w-full sm:w-auto mt-2 sm:mt-0">
                  Enquire
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
