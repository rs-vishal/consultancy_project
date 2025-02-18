import React, { useState } from "react";
import { FaFilter } from "react-icons/fa";
import productsData from "../assets/products.json";

const Products = () => {
  const [filter, setFilter] = useState({ rate: 0, category: "" });
  const [categories] = useState(["Electronics", "Books", "Clothing", "Toys"]);
  const [products] = useState(productsData);

  const filteredProducts = products.filter(
    (product) =>
      product.rate >= filter.rate &&
      (filter.category === "" || product.category === filter.category)
  );

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Product Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-6 p-8">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
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
          ))
        ) : (
          <p className="text-gray-500">No products found</p>
        )}
      </div>
    </div>
  );
};

export default Products;
