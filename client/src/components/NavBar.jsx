import { useState } from "react";
import Logo from "../assets/rts_logo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserPlus, faBars, faTimes } from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";

const NavBar = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white shadow-md py-3 fixed w-full z-50">
      <div className="container mx-auto flex items-center justify-between px-6">
        {/* Logo & Company Name */}
        <Link to="/" className="flex items-center gap-3">
          <img src={Logo} alt="Logo" className="w-12 h-12" />
          <p className="text-gray-800 font-semibold text-lg">Rejoice Technical Solutions</p>
        </Link>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex space-x-8">
          <Link to="/"               className="relative text-gray-700 hover:text-blue-500 transition duration-300 after:block after:content-[''] after:absolute after:left-0 after:bottom-[-3px] after:w-full after:h-[2px] after:bg-blue-500 after:scale-x-0 after:transition-transform after:duration-300 hover:after:scale-x-100"
          >
            Home
          </Link>
          <Link to="about"               className="relative text-gray-700 hover:text-blue-500 transition duration-300 after:block after:content-[''] after:absolute after:left-0 after:bottom-[-3px] after:w-full after:h-[2px] after:bg-blue-500 after:scale-x-0 after:transition-transform after:duration-300 hover:after:scale-x-100"
          >            About
          </Link>
          <Link to="products"               className="relative text-gray-700 hover:text-blue-500 transition duration-300 after:block after:content-[''] after:absolute after:left-0 after:bottom-[-3px] after:w-full after:h-[2px] after:bg-blue-500 after:scale-x-0 after:transition-transform after:duration-300 hover:after:scale-x-100"
          >            Products
          </Link>
          <Link to="contact"               className="relative text-gray-700 hover:text-blue-500 transition duration-300 after:block after:content-[''] after:absolute after:left-0 after:bottom-[-3px] after:w-full after:h-[2px] after:bg-blue-500 after:scale-x-0 after:transition-transform after:duration-300 hover:after:scale-x-100"
          >            Contact
          </Link>
          <Link
              to="/login"
              className="relative text-gray-700 hover:text-blue-500 transition duration-300 after:block after:content-[''] after:absolute after:left-0 after:bottom-[-3px] after:w-full after:h-[2px] after:bg-blue-500 after:scale-x-0 after:transition-transform after:duration-300 hover:after:scale-x-100"
              
            >
              Login
            </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-gray-700 focus:outline-none"
        >
          <FontAwesomeIcon icon={faBars} size="lg" />
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      {isOpen && (
        <div className="absolute top-14 right-6 w-48 bg-white shadow-lg rounded-lg border border-gray-200">
          {/* Close Button */}
          <div className="flex justify-end p-2">
            <button
              onClick={() => setIsOpen(false)}
              className="text-gray-700 focus:outline-none"
            >
              <FontAwesomeIcon icon={faTimes} />
            </button>
          </div>

          {/* Mobile Menu Links */}
          <div className="flex flex-col items-start px-4 py-2 space-y-3">
            <Link
              to="/"
              className="text-gray-700 hover:text-blue-500 transition duration-300 w-full"
              onClick={() => setIsOpen(false)}
            >
              Home
            </Link>
            <Link
              to="/about"
              className="text-gray-700 hover:text-blue-500 transition duration-300 w-full"
              onClick={() => setIsOpen(false)}
            >
              About
            </Link>
            <Link
              to="/products"
              className="text-gray-700 hover:text-blue-500 transition duration-300 w-full"
              onClick={() => setIsOpen(false)}
            >
              Products
            </Link>
            <Link
              to="/contact"
              className="text-gray-700 hover:text-blue-500 transition duration-300 w-full"
              onClick={() => setIsOpen(false)}
            >
              Contact
            </Link>
            <Link
              to="/login"
              className="text-gray-700 hover:text-blue-500 transition duration-300 w-full"
              onClick={() => setIsOpen(false)}
            >
              Login
            </Link>
            </div>
        </div>
      )}
    </nav>
  );
};

export default NavBar;
