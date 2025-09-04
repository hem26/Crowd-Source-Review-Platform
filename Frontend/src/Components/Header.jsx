import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="w-full bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 text-white ">
      <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col md:flex-row justify-between items-center">
        {/* Logo */}
        <span className="text-3xl font-bold text-blue-400 tracking-wide">
          ReviewMosaic
        </span>

        {/* Navigation */}
        <nav className="mt-4 md:mt-0">
          <ul className="flex gap-6 text-lg font-medium">
            <li className="hover:text-blue-400 transition duration-300 cursor-pointer"><Link to="/">Home</Link></li>
            <li className="hover:text-blue-400 transition duration-300 cursor-pointer">About Us</li>
            <li className="hover:text-blue-400 transition duration-300 cursor-pointer">Categories</li>
            <li className="hover:text-blue-400 transition duration-300 cursor-pointer"><Link to="/register">Register</Link></li>
            <li className="hover:text-blue-400 transition duration-300 cursor-pointer"><Link to="/login">Login</Link></li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
