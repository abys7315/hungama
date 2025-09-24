import React, { useState, useEffect } from "react";
import { Compass, Menu, X } from "lucide-react";
// Assuming you are using react-router-dom for navigation
// If not, you can replace <Link> with <a> tags
import { Link } from "react-router-dom";

const Navbar = ({ isDark = true }) => {
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

  // --- Theme Definitions from Event Page ---
  const darkTheme = {
    navBg: "bg-black/60 backdrop-blur-lg border-b border-gray-800",
    text: "text-[#d4c6a9]",
    accentText: "text-red-500",
    accentTextHover: "hover:text-red-400",
    logoGradient: "from-red-600 to-red-800",
    mobileMenuBg: "bg-black/80 backdrop-blur-lg",
  };

  const lightTheme = {
    navBg: "bg-orange-50/60 backdrop-blur-lg border-b border-orange-200",
    text: "text-[#4f422b]",
    accentText: "text-red-800",
    accentTextHover: "hover:text-red-600",
    logoGradient: "from-red-700 to-red-900",
    mobileMenuBg: "bg-orange-50/80 backdrop-blur-lg",
  };

  const themeClasses = isDark ? darkTheme : lightTheme;
  const isScrolled = scrollY > 50;

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? themeClasses.navBg : "bg-transparent border-b border-transparent"
      }`}
      style={{ fontFamily: "'Cinzel', serif" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 group">
            <div className={`w-10 h-10 bg-gradient-to-br ${themeClasses.logoGradient} rounded-lg flex items-center justify-center shadow-lg transition-transform duration-300 group-hover:scale-110`}>
              <Compass className="w-6 h-6 text-white" />
            </div>
            <span className={`text-xl font-bold ${themeClasses.text} transition-colors duration-300 group-hover:${themeClasses.accentText}`}>
              Milestone Club
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              to="/event" // This should link to your event page
              className={`font-medium ${themeClasses.text} ${themeClasses.accentTextHover} transition-colors duration-200`}
            >
              About Event
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            className={`md:hidden p-2 rounded-md ${themeClasses.text} ${themeClasses.accentTextHover} transition-colors`}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className={`md:hidden ${themeClasses.mobileMenuBg} border-t ${isDark ? 'border-gray-800' : 'border-orange-200'}`}>
          <div className="px-4 py-4 space-y-3">
            <Link
              to="/event"
              className={`block py-2 text-center font-medium ${themeClasses.text} ${themeClasses.accentTextHover} transition-colors`}
              onClick={() => setIsMenuOpen(false)}
            >
              About Event
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
