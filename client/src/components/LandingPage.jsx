import React, { useState, useEffect } from "react";
import { Code, Users, Calendar, Sun, Moon } from "lucide-react";
import { Link } from "react-router-dom";

const LandingPage = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Generate random stars
  const generateStars = () => {
    const stars = [];
    for (let i = 0; i < 80; i++) {
      stars.push(
        <div
          key={i}
          className="absolute animate-pulse"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 3}s`,
            animationDuration: `${2 + Math.random() * 2}s`,
          }}
        >
          <div className="w-1 h-1 bg-green-400 rounded-full shadow-sm shadow-green-400/50"></div>
        </div>
      );
    }
    return stars;
  };

  const featuresData = [
    {
      icon: <Code className="w-8 h-8" />,
      title: "Learn & Code",
      description:
        "Master Android development through hands-on workshops, coding challenges, and collaborative projects with industry-standard tools and frameworks.",
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Community & Network",
      description:
        "Connect with like-minded developers, share knowledge, and build lasting professional relationships in our vibrant tech community.",
    },
    {
      icon: <Calendar className="w-8 h-8" />,
      title: "Events & Workshops",
      description:
        "Participate in regular hackathons, tech talks, and skill-building sessions led by industry experts and experienced developers.",
    },
  ];

  const themeClasses = {
    bg: isDark
      ? "bg-gradient-to-br from-gray-900 via-black to-gray-900"
      : "bg-gradient-to-br from-gray-50 via-white to-gray-100",
    text: isDark ? "text-white" : "text-gray-900",
    textSecondary: isDark ? "text-gray-300" : "text-gray-600",
    textMuted: isDark ? "text-gray-400" : "text-gray-500",
    card: isDark
      ? "bg-black/90 backdrop-blur-lg border-gray-900"
      : "bg-white/80 backdrop-blur-lg border-gray-200",
    featureCard: isDark
      ? "bg-gray-800/50 border-gray-700/50 hover:border-green-400/50"
      : "bg-gray-50/50 border-gray-200/50 hover:border-green-400/50",
  };

  return (
    <>
      <link
        href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap"
        rel="stylesheet"
      />
      <div
        className={`min-h-screen ${themeClasses.bg} overflow-x-hidden relative transition-all duration-700 ease-in-out`}
        style={{ fontFamily: "Poppins, sans-serif" }}
      >
        {/* Animated Stars Background */}
        {isDark && (
          <div className="fixed inset-0 overflow-hidden pointer-events-none">
            {generateStars()}
          </div>
        )}

        {/* Theme Toggle - MOVED TO BOTTOM RIGHT */}
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

        {/* Hero Section */}
        <section
          id="home"
          className="relative min-h-screen flex items-center justify-center px-4 pt-16"
        >
          <div className="max-w-4xl mx-auto text-center relative z-10">
            {/* Main Heading with gradient and glow effect */}
            <div className="animate-fade-in">
              <h1 className="text-5xl md:text-7xl font-bold mb-6 relative">
                <span
                  className={`${
                    isDark
                      ? "bg-gradient-to-r from-white via-slate-200 to-slate-300"
                      : "bg-gradient-to-r from-gray-900 via-gray-800 to-gray-700"
                  } bg-clip-text text-transparent drop-shadow-2xl`}
                >
                  MILESTONE CLUB
                </span>
                <div className="text-4xl md:text-6xl mt-2">
                  <span className="bg-gradient-to-r from-green-400 to-green-500 bg-clip-text text-transparent">
                    VIT-AP
                  </span>
                </div>
                {/* Enhanced Glow effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-green-400/20 to-green-500/20 blur-3xl -z-10 animate-pulse"></div>
              </h1>
            </div>

            {/* Tagline */}
            <p
              className={`text-lg md:text-xl ${themeClasses.textMuted} mb-12 max-w-2xl mx-auto leading-relaxed animate-slide-up`}
              style={{ animationDelay: "0.2s" }}
            >
              Since 2023, Milestone Club has been dedicated to professional
              growth and resume building through impactful, hands-on project
              teams. We engage, improve, and guide.
            </p>

            {/* Enhanced CTA Buttons */}
            <div
              className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-slide-up"
              style={{ animationDelay: "0.4s" }}
            >
              <Link
                to="/register"
                className="group relative px-8 py-4 bg-gradient-to-r from-green-400 to-green-500 text-gray-900 rounded-full font-semibold text-lg transition-all duration-300 hover:scale-105 shadow-lg shadow-green-500/30 hover:shadow-green-500/50 min-w-48 flex items-center justify-center"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-green-500 rounded-full blur-lg opacity-30 group-hover:opacity-50 transition-opacity duration-300"></div>
                <span className="relative z-10">Register for the Event</span>
              </Link>
            </div>
          </div>

          {/* Enhanced Scroll indicator */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
            <div className="w-6 h-10 border-2 border-green-400/50 rounded-full flex justify-center backdrop-blur-sm">
              <div className="w-1 h-3 bg-green-400 rounded-full mt-2 animate-pulse shadow-sm shadow-green-400/50"></div>
            </div>
          </div>
        </section>

        {/* Enhanced Features Section */}
        <section className="relative py-20 px-4">
          <div className="max-w-6xl mx-auto relative z-10">
            <div className="text-center mb-16 animate-slide-up">
              <h2
                className={`text-3xl md:text-4xl font-bold mb-4 ${themeClasses.text}`}
              >
                Why Join Our Community?
              </h2>
              <p
                className={`${themeClasses.textMuted} text-lg max-w-2xl mx-auto`}
              >
                Discover the opportunities that await you in our thriving
                developer ecosystem
              </p>
              <div className="w-24 h-1 bg-gradient-to-r from-green-400 to-green-500 mx-auto mt-4 rounded-full"></div>
            </div>

            {/* Enhanced Feature Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {featuresData.map((feature, index) => (
                <div
                  key={index}
                  className={`group relative p-8 ${themeClasses.featureCard} backdrop-blur-sm border rounded-3xl transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-green-400/10 animate-slide-up`}
                  style={{ animationDelay: `${0.2 + index * 0.1}s` }}
                >
                  {/* Enhanced Card glow effect on hover */}
                  <div className="absolute inset-0 bg-gradient-to-br from-green-400/5 to-green-500/5 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                  <div className="relative z-10">
                    {/* Enhanced Icon */}
                    <div className="w-16 h-16 bg-gradient-to-br from-green-400/20 to-green-500/20 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg shadow-green-400/10">
                      <div className="text-green-400">{feature.icon}</div>
                    </div>

                    {/* Title */}
                    <h3
                      className={`text-xl font-bold ${themeClasses.text} mb-4 group-hover:text-green-400 transition-colors duration-300`}
                    >
                      {feature.title}
                    </h3>

                    {/* Description */}
                    <p className={`${themeClasses.textMuted} leading-relaxed`}>
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Enhanced styles */}
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

export default LandingPage;