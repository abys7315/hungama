import React from "react";
import { Code, Github, Instagram, ExternalLink } from "lucide-react";

const Footer = ({ isDark = true }) => {
  const themeClasses = {
    bg: isDark
      ? "bg-black/90 backdrop-blur-lg border-gray-800"
      : "bg-white/90 backdrop-blur-lg border-gray-200",
    text: isDark ? "text-white" : "text-gray-900",
    textSecondary: isDark ? "text-gray-300" : "text-gray-600",
    textMuted: isDark ? "text-gray-400" : "text-gray-500",
    iconHover: isDark ? "hover:text-green-400" : "hover:text-green-500",
  };

  return (
    <>
      <link
        href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap"
        rel="stylesheet"
      />
      <footer
        className={`relative border-t ${themeClasses.bg} py-12 px-4 transition-all duration-700`}
        style={{ fontFamily: "Poppins, sans-serif" }}
      >
        {/* Background decoration */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 left-1/4 w-32 h-32 bg-green-400/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-1/4 w-24 h-24 bg-green-400/5 rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-6xl mx-auto relative z-10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            {/* Enhanced Logo and Copyright */}
            <div
              className="flex items-center space-x-4 group cursor-pointer"
              onClick={() => (window.location.href = "/")}
            >
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-green-400 to-green-500 rounded-xl blur-sm opacity-30 group-hover:opacity-50 transition-opacity duration-300"></div>
                <div className="relative w-12 h-12 bg-gradient-to-br from-green-400 to-green-500 rounded-xl flex items-center justify-center shadow-lg shadow-green-500/30 group-hover:scale-110 transition-transform duration-300">
                  <Code className="h-6 w-6 text-gray-900" />
                </div>
              </div>
              <div>
                <div
                  className={`text-lg font-bold ${themeClasses.text} group-hover:text-green-400 transition-colors duration-300`}
                >
                  Milestone Club VIT-AP
                  <p
                    className={`text-sm ${themeClasses.textMuted} text-center md:text-left`}
                  >
                    Create Collaborate Conquer 🚀
                  </p>
                </div>
                <div className={`text-sm ${themeClasses.textMuted}`}>
                  © 2025 All rights reserved
                </div>
              </div>
            </div>

            {/* Enhanced Social Media Icons */}
            <div className="flex items-center space-x-4">
              <a
                href="https://github.com/milestone-club"
                className={`group relative p-3 ${themeClasses.textMuted} ${themeClasses.iconHover} transition-all duration-300 rounded-xl hover:bg-green-400/10 hover:scale-110 active:scale-95`}
                aria-label="GitHub"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-green-400/20 to-green-500/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <Github className="w-5 h-5 relative z-10" />
              </a>

              <a
                href="https://www.instagram.com/milestone_club_vitap?igsh=aDBxdGpmazNlNHVz"
                className={`group relative p-3 ${themeClasses.textMuted} ${themeClasses.iconHover} transition-all duration-300 rounded-xl hover:bg-green-400/10 hover:scale-110 active:scale-95`}
                aria-label="Instagram"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-green-400/20 to-green-500/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <Instagram className="w-5 h-5 relative z-10" />
              </a>

              <a
                href="mailto:milestone.club@vitap.ac.in"
                target="_blank"
                rel="noopener noreferrer"
                className={`group relative p-3 ${themeClasses.textMuted} ${themeClasses.iconHover} transition-all duration-300 rounded-xl hover:bg-green-400/10 hover:scale-110 active:scale-95`}
                aria-label="Community"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-green-400/20 to-green-500/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <ExternalLink className="w-5 h-5 relative z-10" />
              </a>
            </div>
          </div>

          {/* Additional footer content */}
          {/* <div className="mt-8 pt-8 border-t border-green-400/20"> */}
          <div className="flex flex-col md:flex-row items-center justify-center gap-4"></div>
        </div>
        {/* </div> */}

        {/* Animated gradient line at the bottom */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-green-400 via-green-500 to-green-400 opacity-30">
          <div className="h-full bg-gradient-to-r from-transparent via-green-400 to-transparent animate-pulse"></div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
