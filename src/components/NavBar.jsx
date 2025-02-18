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
          <Link to="/" className="text-gray-700 hover:text-blue-500 transition duration-300">
            Home
          </Link>
          <Link to="/about" className="text-gray-700 hover:text-blue-500 transition duration-300">
            About
          </Link>
          <Link to="/products" className="text-gray-700 hover:text-blue-500 transition duration-300">
            Products
          </Link>
          <Link to="/contact" className="text-gray-700 hover:text-blue-500 transition duration-300">
            Contact
          </Link>
        </div>

        {/* Login Button - Desktop */}
        <button
          className="hidden md:flex bg-blue-700 text-white px-5 py-2 rounded-lg flex items-center gap-2 transition-transform duration-300 hover:bg-blue-600 hover:scale-105"
          onClick={() => navigate("/login")}
        >
          Login <FontAwesomeIcon icon={faUserPlus} />
        </button>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-gray-700 focus:outline-none"
        >
          <FontAwesomeIcon icon={faBars} size="lg" />
        </button>
      </div>

      {/* Mobile Dropdown Menu - Small Sized */}
      {isOpen && (
        <div className="absolute top-14 right-6 w-48 bg-white shadow-lg rounded-lg border border-gray-200">
          {/* Close Button Inside Dropdown */}
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
            <button
              className="bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-transform duration-300 hover:bg-blue-600 hover:scale-105 w-full text-center"
              onClick={() => {
                setIsOpen(false);
                navigate("/login");
              }}
            >
              Login <FontAwesomeIcon icon={faUserPlus} />
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default NavBar;
