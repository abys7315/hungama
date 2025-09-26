import React from "react";
// We don't need Link from react-router-dom for a single page app
// import { Link } from "react-router-dom";
import {
  Calendar,
  Clock,
  MapPin,
  Ticket,
  Award,
} from "lucide-react";


// --- Static Background Image Component ---
const StaticBackgroundImage = ({ imageUrl, theme }) => {
  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: -1,
        backgroundImage: `url(${imageUrl})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        transition: 'opacity 0.7s ease-in-out',
      }}
    >
      {/* Overlay to ensure text readability */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundColor: 'rgba(10, 26, 20, 0.7)',
          transition: 'background-color 0.7s ease-in-out',
        }}
      ></div>
    </div>
  );
};


// Main App Component
const App = () => {

  // --- Event Details ---
  const eventData = {
    name: "Hungama",
    subtitle: "The Chaos For Hunt Is Real",
    posterUrl: "https://i.postimg.cc/W4BY9qNk/Hun-2.png",
    backgroundImageUrl: "https://i.postimg.cc/pVDL6c4r/hungama-background.jpg",
    date: "September 27, 2025",
    time: "2:00 PM - 6:00 PM",
    venue: "AB-2 214",
    description:
      "Milestone Club is thrilled to present 'Hungama,' a thrilling treasure hunt designed for the brave and the bold. Join us for a day of cryptic riddles, campus-wide challenges, and adrenaline-pumping rounds. It's the perfect opportunity to test your wits, work as a team, and claim the ultimate prize!",
    agenda: [
      { time: "02:00 PM", activity: "Registration & Briefing" },
      { time: "02:15 PM", activity: "The Hunt Begins!" },
      { time: "05:30 PM", activity: "Awards & Closing Ceremony" },
    ],
  };

  // --- Theme Definitions ---
  const darkTheme = {
    isDark: true,
    bg: "bg-transparent", // Changed to transparent
    card: "bg-black/60 backdrop-blur-lg border-gray-800",
    text: "text-[#d4c6a9]", // Weathered parchment
    textMuted: "text-gray-400",
    featureCard: "bg-gray-800/40 border-gray-700/50",
    accentColorText: "text-red-500",
    borderColor: "border-red-600/30",
    titleColor: "text-red-600",
    titleShadow: { textShadow: "2px 2px 0px #000, 0 0 15px #ff4800" },
    buttonBg: "bg-gradient-to-r from-red-600 to-red-800",
    buttonHoverBg: "hover:from-red-700 hover:to-red-900",
    buttonRing: "focus:ring-red-500/30",
    buttonShadow: "shadow-red-500/30",
  };
  
  const themeClasses = darkTheme;

  return (
    <>
      {/* Importing the new, more legible fonts */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
      <link
        href="https://fonts.googleapis.com/css2?family=Cinzel:wght@400;700&family=Cinzel+Decorative:wght@700&display=swap"
        rel="stylesheet"
      />

      <div
        className={`min-h-screen ${themeClasses.bg} py-12 px-4 relative overflow-x-hidden`}
        style={{ fontFamily: "'Cinzel', serif" }}
      >
        <StaticBackgroundImage imageUrl={eventData.backgroundImageUrl} theme={themeClasses} />

        <div className="max-w-4xl mx-auto relative z-10">
          {/* Page Header */}
          <div className="text-center mb-12 animate-fade-in">
            <h1
              className={`text-5xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl 2xl:text-9xl ${themeClasses.titleColor}`}
              style={{
                fontFamily: "'Cinzel Decorative', cursive",
                ...themeClasses.titleShadow,
                letterSpacing: '5px'
              }}
            >
              {eventData.name}
            </h1>
            <p className={`${themeClasses.text} text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl uppercase tracking-widest mt-2`}>
              {eventData.subtitle}
            </p>
          </div>

          {/* Main Content Card */}
          <div
            className={`${themeClasses.card} rounded-3xl p-6 md:p-8 border shadow-2xl shadow-black/10 transition-all duration-700 animate-slide-up`}
          >
            {/* Poster Image */}
            <div className="mb-8 rounded-2xl overflow-hidden shadow-lg shadow-black/30">
              <img
                src={eventData.posterUrl}
                alt={`${eventData.name} Poster`}
                className="w-full h-auto object-cover"
              />
            </div>

            {/* Event Info Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 text-center">
              <div className={`${themeClasses.featureCard} p-4 rounded-xl`}>
                <Calendar className={`w-7 h-7 ${themeClasses.accentColorText} mx-auto mb-2`} />
                <p className={`${themeClasses.text} font-semibold text-lg`}>
                  {eventData.date}
                </p>
              </div>
              <div className={`${themeClasses.featureCard} p-4 rounded-xl`}>
                <Clock className={`w-7 h-7 ${themeClasses.accentColorText} mx-auto mb-2`} />
                <p className={`${themeClasses.text} font-semibold text-lg`}>
                  {eventData.time}
                </p>
              </div>
              <div className={`${themeClasses.featureCard} p-4 rounded-xl`}>
                <MapPin className={`w-7 h-7 ${themeClasses.accentColorText} mx-auto mb-2`} />
                <p className={`${themeClasses.text} font-semibold text-lg`}>
                  {eventData.venue}
                </p>
              </div>
            </div>

            {/* About the Event */}
            <div className="mb-8">
              <h2 className={`text-3xl font-bold ${themeClasses.text} mb-4 border-b-2 ${themeClasses.borderColor} pb-2`}>
                About the Event
              </h2>
              <p className={`${themeClasses.textMuted} leading-relaxed text-lg`}>
                {eventData.description}
              </p>
            </div>

            {/* Agenda */}
            <div className="mb-10">
              <h2 className={`text-3xl font-bold ${themeClasses.text} mb-4 border-b-2 ${themeClasses.borderColor} pb-2`}>
                Event Agenda
              </h2>
              <ul className="space-y-3">
                {eventData.agenda.map((item, index) => (
                  <li
                    key={index}
                    className={`flex items-center p-3 rounded-lg ${themeClasses.featureCard}`}
                  >
                    <span className={`w-32 font-semibold ${themeClasses.accentColorText} text-lg`}>
                      {item.time}
                    </span>
                    <span className={`${themeClasses.text} text-lg`}>
                      {item.activity}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Call to Action Button */}
            <div className={`mt-8 pt-8 border-t ${themeClasses.borderColor}`}>
              <a
                href="/register"
                className={`group relative w-full block text-center py-4 ${themeClasses.buttonBg} text-white font-bold text-xl rounded-2xl ${themeClasses.buttonHoverBg} focus:ring-4 ${themeClasses.buttonRing} transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] shadow-lg ${themeClasses.buttonShadow} uppercase tracking-wider`}
              >
                <div className={`absolute inset-0 ${themeClasses.buttonBg} rounded-2xl blur-lg opacity-40 group-hover:opacity-60 transition-opacity duration-300`}></div>
                <span className="relative flex items-center justify-center gap-3">
                  <Ticket className="w-6 h-6" />
                  Register for Hungama
                </span>
              </a>
            </div>
          </div>
        </div>

        {/* Embedded CSS for animations */}
        <style jsx>{`
          @keyframes fade-in {
            from { opacity: 0; }
            to { opacity: 1; }
          }
          @keyframes slide-up {
            from { opacity: 0; transform: translateY(30px); }
            to { opacity: 1; transform: translateY(0); }
          }
          .animate-fade-in {
            animation: fade-in 0.8s ease-out forwards;
          }
          .animate-slide-up {
            opacity: 0;
            animation: slide-up 0.8s ease-out 0.2s forwards;
          }
        `}</style>
      </div>
    </>
  );
};

export default App;

