import React, { useState, useEffect } from "react";
import { Code, Menu, X } from "lucide-react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [scrollY, setScrollY] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrollY > 50
          ? "bg-slate-900/95 backdrop-blur-md shadow-lg"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-emerald-400 to-cyan-400 rounded-lg flex items-center justify-center">
                <Code className="w-6 h-6 text-slate-900" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
                Android Club VIT-AP
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8 text-[#7ab00e]">
            <Link
              to="/"
              className="hover:text-emerald-400 transition-colors duration-200 font-medium"
            >
              Home
            </Link>
            <Link
              to="/register"
              className="hover:text-emerald-400 transition-colors duration-200 font-medium"
            >
              Events
            </Link>
            <a
              href="https://d2ec9l5n40oyrl.cloudfront.net/"
              className="hover:text-emerald-400 transition-colors duration-200 font-medium"
            >
              Community
            </a>
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2 rounded-md text-[#7ab00e] hover:bg-slate-800 transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-slate-900/95 backdrop-blur-md border-t border-slate-800 text-[#7ab00e]">
          <div className="px-4 py-4 space-y-3">
            <a
              href="#home"
              className="block py-2 hover:text-emerald-400 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </a>
            <a
              href="#events"
              className="block py-2 hover:text-emerald-400 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Events
            </a>
            <a
              href="#community"
              className="block py-2 hover:text-emerald-400 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Community
            </a>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
