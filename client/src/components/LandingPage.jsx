import React from "react";
import { Code, Users, Calendar } from "lucide-react";
// Assuming you are using react-router-dom for navigation
import { Link } from "react-router-dom";

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
          backgroundColor: 'rgba(0, 0, 0, 0.7)',
          transition: 'background-color 0.7s ease-in-out',
        }}
      ></div>
    </div>
  );
};

const LandingPage = () => {
  
  const backgroundImageUrl = "https://i.postimg.cc/pVDL6c4r/hungama-background.jpg";

  const featuresData = [
    {
      icon: <Code className="w-8 h-8" />,
      title: "Cryptic Riddles",
      description:
        "Test your wits against ancient puzzles and cryptic clues scattered throughout the hunt. Only the sharpest minds will prevail.",
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Team Collaboration",
      description:
        "Assemble your crew and work together to solve challenges. Teamwork and strategy are the keys to unlocking the treasure.",
    },
    {
      icon: <Calendar className="w-8 h-8" />,
      title: "An Epic Adventure",
      description:
        "Embark on an unforgettable journey filled with excitement, mystery, and the chance to claim ultimate glory and riches.",
    },
  ];

  // --- Theme Definitions from Navbar ---
  const darkTheme = {
    isDark: true,
    bg: "bg-transparent",
    text: "text-[#d4c6a9]",
    textSecondary: "text-gray-300",
    textMuted: "text-gray-400",
    featureCard: "bg-black/50 backdrop-blur-lg border-red-500/20 hover:border-red-500/50",
    accentColorText: "text-red-500",
  };



  const themeClasses = darkTheme;
  const accentGradient = "from-red-600 to-red-800";
  const accentShadow = "shadow-red-500/30";
  const titleTextGradient = "from-white via-red-100 to-red-200";

  return (
    <>
      <link
        href="https://fonts.googleapis.com/css2?family=Cinzel:wght@400;700&family=Cinzel+Decorative:wght@700&display=swap"
        rel="stylesheet"
      />
      <div
        className={`min-h-screen ${themeClasses.bg} overflow-x-hidden relative transition-all duration-700 ease-in-out`}
        style={{ fontFamily: "'Cinzel', serif" }}
      >
        <StaticBackgroundImage imageUrl={backgroundImageUrl} theme={themeClasses} />



        {/* Hero Section */}
        <section
          id="home"
          className="relative min-h-screen flex items-center justify-center px-4 pt-16"
        >
          <div className="max-w-4xl mx-auto text-center relative z-10">
            <div className="animate-fade-in">
              <h1 className="text-5xl md:text-7xl font-bold mb-6 relative" style={{ fontFamily: "'Cinzel Decorative', cursive" }}>
                <span className={`bg-gradient-to-r ${titleTextGradient} bg-clip-text text-transparent drop-shadow-2xl`}>
                  HUNGAMA
                </span>
                <div className="text-4xl md:text-6xl mt-2">
                  <span className={`bg-gradient-to-r ${accentGradient} bg-clip-text text-transparent`}>
                    The Hunt is On
                  </span>
                </div>
                <div className={`absolute inset-0 bg-gradient-to-r ${accentGradient} blur-xl -z-10 opacity-15`}></div>
              </h1>
            </div>

            <p
              className={`text-lg md:text-xl ${themeClasses.textMuted} mb-12 max-w-2xl mx-auto leading-relaxed animate-slide-up`}
              style={{ animationDelay: "0.2s" }}
            >
              Milestone Club invites you on a legendary quest for glory. Solve cryptic puzzles, overcome daring challenges, and unearth the treasure that awaits the victors.
            </p>

            <div
              className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-slide-up"
              style={{ animationDelay: "0.4s" }}
            >
              <Link
                to="/register"
                className={`group relative px-8 py-4 bg-gradient-to-r ${accentGradient} text-white rounded-full font-semibold text-lg transition-all duration-300 hover:scale-105 shadow-lg ${accentShadow} hover:shadow-xl min-w-48 flex items-center justify-center uppercase`}
              >
                <div className={`absolute inset-0 bg-gradient-to-r ${accentGradient} rounded-full blur-lg opacity-30 group-hover:opacity-50 transition-opacity duration-300`}></div>
                <span className="relative z-10">Join The Hunt</span>
              </Link>
            </div>
          </div>

          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
            <div className="w-6 h-10 border-2 border-red-400/50 rounded-full flex justify-center backdrop-blur-sm">
              <div className={`w-1 h-3 bg-gradient-to-b ${accentGradient} rounded-full mt-2 animate-pulse`}></div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="relative py-20 px-4">
          <div className="max-w-6xl mx-auto relative z-10">
            <div className="text-center mb-16 animate-slide-up">
              <h2
                className={`text-3xl md:text-4xl font-bold mb-4 ${themeClasses.text}`}
                style={{ fontFamily: "'Cinzel Decorative', cursive" }}
              >
                What Awaits You?
              </h2>
              <p className={`${themeClasses.textMuted} text-lg max-w-2xl mx-auto`}>
                Three trials to test your courage, wisdom, and teamwork.
              </p>
              <div className={`w-24 h-1 bg-gradient-to-r ${accentGradient} mx-auto mt-4 rounded-full`}></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {featuresData.map((feature, index) => (
                <div
                  key={index}
                  className={`group relative p-8 ${themeClasses.featureCard} border rounded-3xl transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-red-400/10 animate-slide-up`}
                  style={{ animationDelay: `${0.2 + index * 0.1}s` }}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-red-400/5 to-red-500/5 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                  <div className="relative z-10">
                    <div className="w-16 h-16 bg-gradient-to-br from-red-400/20 to-red-500/20 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg shadow-red-400/10">
                      <div className={themeClasses.accentColorText}>{feature.icon}</div>
                    </div>

                    <h3 className={`text-xl font-bold ${themeClasses.text} mb-4 group-hover:${themeClasses.accentColorText} transition-colors duration-300`}>
                      {feature.title}
                    </h3>

                    <p className={`${themeClasses.textMuted} leading-relaxed`}>
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <style>{`
          @keyframes fade-in { from { opacity: 0; } to { opacity: 1; } }
          @keyframes slide-up { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: translateY(0); } }
          .animate-fade-in { animation: fade-in 0.8s ease-out forwards; }
          .animate-slide-up { opacity: 0; animation: slide-up 0.8s ease-out forwards; }
        `}</style>
      </div>
    </>
  );
};

export default LandingPage;

