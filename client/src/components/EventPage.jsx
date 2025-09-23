import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Sun,
  Moon,
  Calendar,
  Clock,
  MapPin,
  Ticket,
  Award,
} from "lucide-react";

const EventPage = () => {
  const [isDark, setIsDark] = useState(true);

  // --- Event Details ---
  // You can easily change the event details here
  const eventData = {
    name: "Hungama",
    subtitle: "A Tech & Fun Extravaganza",
    posterUrl: "https://i.postimg.cc/rFMVCZyp/Hun-1.png", // <-- PASTE YOUR IMAGE LINK HERE
    date: "September 27, 2025",
    time: "2:00 PM - 6:00 PM IST",
    venue: "Central Block, G-20, VIT-AP University",
    description:
      "Milestone Club is thrilled to present 'Hungama,' an exciting blend of technology and entertainment designed for aspiring developers and tech enthusiasts. Join us for a full day of coding challenges, insightful tech talks from industry experts, and fun-filled activities. It's the perfect opportunity to learn, network, and showcase your skills!",
    agenda: [
      { time: "02:00 PM", activity: "Registration & Welcome" },
      { time: "02:15 PM", activity: "Event Started" },
      { time: "05:15 PM", activity: "Awards Ceremony & Closing Note" },
    ],
  };

  const themeClasses = {
    bg: isDark
      ? "bg-gradient-to-br from-gray-900 via-black to-gray-900"
      : "bg-gradient-to-br from-gray-50 via-white to-gray-100",
    card: isDark
      ? "bg-black/80 backdrop-blur-lg border-gray-800"
      : "bg-white/70 backdrop-blur-lg border-gray-200",
    text: isDark ? "text-white" : "text-gray-900",
    textMuted: isDark ? "text-gray-400" : "text-gray-500",
    featureCard: isDark
      ? "bg-gray-800/40 border-gray-700/50"
      : "bg-gray-50/40 border-gray-200/50",
  };

  return (
    <>
      <link
        href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap"
        rel="stylesheet"
      />
      <div
        className={`min-h-screen ${themeClasses.bg} py-12 px-4 relative overflow-hidden transition-all duration-700 ease-in-out`}
        style={{ fontFamily: "Poppins, sans-serif" }}
      >
        {/* Theme Toggle Button */}
        <div className="fixed bottom-6 right-6 z-50">
          <button
            onClick={() => setIsDark(!isDark)}
            className="group relative w-16 h-16 rounded-full bg-gradient-to-r from-green-400 to-green-500 shadow-lg shadow-green-500/30 hover:shadow-green-500/50 transition-all duration-300 hover:scale-110 active:scale-95"
          >
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-green-400 to-green-500 animate-pulse opacity-50"></div>
            <div className="relative flex items-center justify-center w-full h-full">
              {isDark ? (
                <Sun className="w-7 h-7 text-gray-900 transition-transform duration-300 group-hover:rotate-12" />
              ) : (
                <Moon className="w-7 h-7 text-gray-900 transition-transform duration-300 group-hover:rotate-12" />
              )}
            </div>
          </button>
        </div>

        <div className="max-w-4xl mx-auto relative z-10">
          {/* Page Header */}
          <div className="text-center mb-12 animate-fade-in">
            <h1
              className={`text-5xl md:text-7xl font-bold bg-gradient-to-r from-green-400 to-green-500 bg-clip-text text-transparent mb-3`}
            >
              {eventData.name}
            </h1>
            <p className={`${themeClasses.textMuted} text-lg md:text-xl`}>
              {eventData.subtitle}
            </p>
          </div>

          {/* Main Content Card */}
          <div
            className={`${themeClasses.card} rounded-3xl p-6 md:p-8 border shadow-2xl transition-all duration-700 animate-slide-up`}
          >
            {/* Poster Image */}
            <div className="mb-8 rounded-2xl overflow-hidden shadow-lg shadow-green-500/10">
              <img
                src={eventData.posterUrl}
                alt={`${eventData.name} Poster`}
                className="w-full h-auto object-cover"
              />
            </div>

            {/* Event Info Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 text-center">
              <div className={`${themeClasses.featureCard} p-4 rounded-xl`}>
                <Calendar className="w-7 h-7 text-green-400 mx-auto mb-2" />
                <p className={`${themeClasses.text} font-semibold`}>
                  {eventData.date}
                </p>
              </div>
              <div className={`${themeClasses.featureCard} p-4 rounded-xl`}>
                <Clock className="w-7 h-7 text-green-400 mx-auto mb-2" />
                <p className={`${themeClasses.text} font-semibold`}>
                  {eventData.time}
                </p>
              </div>
              <div className={`${themeClasses.featureCard} p-4 rounded-xl`}>
                <MapPin className="w-7 h-7 text-green-400 mx-auto mb-2" />
                <p className={`${themeClasses.text} font-semibold`}>
                  {eventData.venue}
                </p>
              </div>
            </div>

            {/* About the Event */}
            <div className="mb-8">
              <h2 className={`text-2xl font-bold ${themeClasses.text} mb-4`}>
                About the Event
              </h2>
              <p className={`${themeClasses.textMuted} leading-relaxed`}>
                {eventData.description}
              </p>
            </div>

            {/* Agenda */}
            <div className="mb-10">
              <h2 className={`text-2xl font-bold ${themeClasses.text} mb-4`}>
                Event Agenda
              </h2>
              <ul className="space-y-3">
                {eventData.agenda.map((item, index) => (
                  <li
                    key={index}
                    className={`flex items-center p-3 rounded-lg ${themeClasses.featureCard}`}
                  >
                    <span className="w-28 font-semibold text-green-400">
                      {item.time}
                    </span>
                    <span className={`${themeClasses.text}`}>
                      {item.activity}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Call to Action Button */}
            <div className="mt-8 pt-8 border-t border-green-400/20">
              <Link
                to="/register"
                className="group relative w-full block text-center py-4 bg-gradient-to-r from-green-400 to-green-500 text-gray-900 font-semibold rounded-2xl hover:from-green-500 hover:to-green-600 focus:ring-4 focus:ring-green-400/30 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-green-500/30"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-green-500 rounded-2xl blur-lg opacity-30 group-hover:opacity-50 transition-opacity duration-300"></div>
                <span className="relative flex items-center justify-center gap-2">
                  <Ticket className="w-5 h-5" />
                  Register for Hungama Now
                </span>
              </Link>
            </div>
          </div>
        </div>

        <style jsx>{`
          @keyframes fade-in {
            from {
              opacity: 0;
            }
            to {
              opacity: 1;
            }
          }
          @keyframes slide-up {
            from {
              opacity: 0;
              transform: translateY(30px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          .animate-fade-in {
            animation: fade-in 0.8s ease-out forwards;
          }
          .animate-slide-up {
            opacity: 0;
            animation: slide-up 0.8s ease-out forwards;
          }
        `}</style>
      </div>
    </>
  );
};

export default EventPage;