import React from "react";
import { Link } from "react-router-dom";

export const Nav = () => {
  return (
    <nav className="bg-gray-800 text-sky-50 shadow-md py-3">
      <div className="container flex items-center justify-between">
        {/* Left-aligned Logo */}
        <div className="flex items-center hover:scale-110 duration-300 mx-6">
          <Link to="/" className="font-bold text-lg">
            REJOICE TECHNICAL SOLUTION
          </Link>
        </div>

        {/* Centered Navigation Links */}
        <div className=" justify-center">
          <ul className="flex space-x-6">
            <li>
              <Link
                to="/"
                className="px-6 py-2 bg-cyan-600 rounded-3xl transition duration-300 transform hover:scale-110 hover:bg-cyan-500"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/about"
                className="px-6 py-2 bg-cyan-600 rounded-3xl transition duration-300 transform hover:scale-110 hover:bg-cyan-500"
              >
                About
              </Link>
            </li>
            <li>
              <Link
                to="/contact"
                className="px-6 py-2 bg-cyan-600 rounded-3xl transition duration-300 transform hover:scale-110 hover:bg-cyan-500"
              >
                Contact
              </Link>
            </li>
          </ul>
        </div>

        {/* Admin Link Fix */}
        <div className="flex items-center justify-end">
          <Link
            to="/invoice"
            className="px-6 py-2 bg-cyan-600 rounded-3xl transition duration-300 transform hover:scale-110 hover:bg-cyan-500 ml-6"
          >
            Admin
          </Link>
        </div>
      </div>
    </nav>
  );
};
