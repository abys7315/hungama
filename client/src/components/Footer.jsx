import React from "react";
import {
  Github,
  Instagram,
  ExternalLink,
  Compass, // Changed from Code to Compass to match the theme
} from "lucide-react";

const Footer = ({ isDark = true }) => {
  // --- Theme Definitions to match Event Page ---
  const darkTheme = {
    bg: "bg-black/80 backdrop-blur-lg border-red-600/30",
    text: "text-[#d4c6a9]",
    textMuted: "text-gray-400",
    iconHover: "hover:text-red-500",
    accentColor: "red",
  };
  
  const lightTheme = {
    bg: "bg-orange-50/80 backdrop-blur-lg border-red-800/30",
    text: "text-[#4f422b]",
    textMuted: "text-[#6f5e42]",
    iconHover: "hover:text-red-800",
    accentColor: "red",
  };
  
  const themeClasses = isDark ? darkTheme : lightTheme;
  const accentGradient = isDark ? "from-red-600 to-red-800" : "from-red-700 to-red-900";
  const accentShadow = isDark ? "shadow-red-500/30" : "shadow-red-500/30";

  return (
    <>
      {/* Importing the required fonts from the Event Page */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
      <link
        href="https://fonts.googleapis.com/css2?family=Cinzel:wght@400;700&family=Cinzel+Decorative:wght@700&display=swap"
        rel="stylesheet"
      />

      <footer
        className={`relative border-t ${themeClasses.bg} py-12 px-4 transition-all duration-700`}
        style={{ fontFamily: "'Cinzel', serif" }}
      >
        {/* Background decoration */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className={`absolute top-0 left-1/4 w-32 h-32 bg-${themeClasses.accentColor}-400/5 rounded-full blur-3xl`}></div>
          <div className={`absolute bottom-0 right-1/4 w-24 h-24 bg-${themeClasses.accentColor}-400/5 rounded-full blur-3xl`}></div>
        </div>

        <div className="max-w-6xl mx-auto relative z-10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            {/* Enhanced Logo and Copyright */}
            <div
              className="flex items-center space-x-4 group cursor-pointer"
              onClick={() => (window.location.href = "/")}
            >
              <div className="relative">
                <div className={`absolute inset-0 bg-gradient-to-br ${accentGradient} rounded-xl blur-sm opacity-30 group-hover:opacity-50 transition-opacity duration-300`}></div>
                <div className={`relative w-12 h-12 bg-gradient-to-br ${accentGradient} rounded-xl flex items-center justify-center shadow-lg ${accentShadow} group-hover:scale-110 transition-transform duration-300`}>
                  <Compass className="h-6 w-6 text-white" />
                </div>
              </div>
              <div>
                <div
                  className={`text-lg font-bold ${themeClasses.text} ${isDark ? 'group-hover:text-red-500' : 'group-hover:text-red-800'} transition-colors duration-300`}
                  style={{fontFamily: "'Cinzel Decorative', cursive"}}
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
                className={`group relative p-3 ${themeClasses.textMuted} ${themeClasses.iconHover} transition-all duration-300 rounded-xl hover:bg-${themeClasses.accentColor}-400/10 hover:scale-110 active:scale-95`}
                aria-label="GitHub"
              >
                <div className={`absolute inset-0 bg-gradient-to-r from-${themeClasses.accentColor}-400/20 to-${themeClasses.accentColor}-500/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300`}></div>
                <Github className="w-5 h-5 relative z-10" />
              </a>

              <a
                href="https://www.instagram.com/milestone_club_vitap?igsh=aDBxdGpmazNlNHVz"
                className={`group relative p-3 ${themeClasses.textMuted} ${themeClasses.iconHover} transition-all duration-300 rounded-xl hover:bg-${themeClasses.accentColor}-400/10 hover:scale-110 active:scale-95`}
                aria-label="Instagram"
              >
                <div className={`absolute inset-0 bg-gradient-to-r from-${themeClasses.accentColor}-400/20 to-${themeClasses.accentColor}-500/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300`}></div>
                <Instagram className="w-5 h-5 relative z-10" />
              </a>

              <a
                href="mailto:milestone.club@vitap.ac.in"
                target="_blank"
                rel="noopener noreferrer"
                className={`group relative p-3 ${themeClasses.textMuted} ${themeClasses.iconHover} transition-all duration-300 rounded-xl hover:bg-${themeClasses.accentColor}-400/10 hover:scale-110 active:scale-95`}
                aria-label="Community"
              >
                <div className={`absolute inset-0 bg-gradient-to-r from-${themeClasses.accentColor}-400/20 to-${themeClasses.accentColor}-500/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300`}></div>
                <ExternalLink className="w-5 h-5 relative z-10" />
              </a>
            </div>
          </div>
        </div>

        {/* Animated gradient line at the bottom */}
        <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-${themeClasses.accentColor}-400 via-${themeClasses.accentColor}-500 to-${themeClasses.accentColor}-400 opacity-30`}>
          <div className={`h-full bg-gradient-to-r from-transparent via-${themeClasses.accentColor}-400 to-transparent animate-pulse`}></div>
        </div>
      </footer>
    </>
  );
};

export default Footer;

