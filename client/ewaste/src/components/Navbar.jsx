import React from "react";
import { Link, useLocation } from "react-router-dom";
import heroImage from "../assets/recycle.svg"; // Imported image asset

const Navbar = () => {
  const location = useLocation();
  const active = (path) =>
    location.pathname === path
      ? "text-green-600 border-b-2 border-green-600 pb-1"
      : "text-gray-700 hover:text-green-600";

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-6xl mx-auto px-4 py-3 flex justify-between items-center">
        
        {/* Project Title with Logo */}
        <div className="flex items-center space-x-2">
          
          {/* ✅ USING THE IMPORTED ASSET as the logo image */}
          <img 
            src={heroImage}
            alt="E-Waste Recycling Logo"
            className="h-8 w-8" // Set a small size for the Navbar logo
          />
          
          <h1 className="text-2xl font-bold text-green-700">
            E-Waste Exchange
          </h1>
        </div>
        
        {/* Navigation Links */}
        <div className="space-x-6 text-lg font-medium">
          <Link to="/" className={active("/")}>Home</Link>
          <Link to="/view-products" className={active("/view-products")}>
            View Products
          </Link>
          <Link to="/about" className={active("/about")}>About</Link>
          <Link to="/contact" className={active("/contact")}>Contact</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;