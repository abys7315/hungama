import React from "react";

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
          backgroundColor: 'rgba(10, 26, 20, 0.7)',
          transition: 'background-color 0.7s ease-in-out',
        }}
      ></div>
    </div>
  );
};

const SuccessPage = () => {
  const backgroundImageUrl = "https://i.postimg.cc/pVDL6c4r/hungama-background.jpg";

  return (
    <>
      <link
        href="https://fonts.googleapis.com/css2?family=Cinzel:wght@400;700&family=Cinzel+Decorative:wght@700&display=swap"
        rel="stylesheet"
      />
      <div
        className="min-h-screen flex flex-col items-center justify-center text-center p-6 relative overflow-hidden"
        style={{ fontFamily: "'Cinzel', serif" }}
      >
        <StaticBackgroundImage imageUrl={backgroundImageUrl} />

        <div className="relative z-10 max-w-2xl mx-auto">
          <div className="bg-black/60 backdrop-blur-lg rounded-3xl p-8 md:p-12 border border-gray-800 shadow-2xl shadow-black/10 transition-all duration-700 animate-slide-up">
            <div className="text-center">
              <div className="relative inline-block mb-6">
                <div className="absolute inset-0 bg-gradient-to-r from-green-600 to-green-800 rounded-3xl blur-lg opacity-30 animate-pulse"></div>
                <div className="relative w-20 h-20 bg-gradient-to-br from-green-600 to-green-800 rounded-3xl flex items-center justify-center shadow-lg">
                  <span className="text-3xl">🎉</span>
                </div>
              </div>

              <h1 className="text-4xl md:text-5xl font-bold text-green-400 mb-6 animate-fade-in" style={{fontFamily: "'Cinzel Decorative', cursive"}}>
                Thank You for Registering!
              </h1>

              <div className="space-y-4 mb-8">
                <p className="text-lg md:text-xl text-gray-300 animate-slide-up" style={{ animationDelay: "0.2s" }}>
                  We've successfully received your team's registration for the <b className="text-red-400">Hungama</b>.
                  Your spot is confirmed!
                </p>
                <p className="text-lg md:text-xl text-gray-300 animate-slide-up" style={{ animationDelay: "0.3s" }}>
                  If you wish to join this community, you can express your interest by joining the WhatsApp group.
                </p>
              </div>

              <a
                href="https://chat.whatsapp.com/BWq5GEiYpheG3DzpvTFDz8?mode=ems_wa_t"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative inline-block px-8 py-4 bg-gradient-to-r from-green-600 to-green-800 text-white font-bold text-lg rounded-2xl shadow-lg hover:from-green-700 hover:to-green-900 focus:ring-4 focus:ring-green-500/30 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] animate-slide-up uppercase tracking-wider"
                style={{ animationDelay: "0.4s" }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-green-600 to-green-800 rounded-2xl blur-lg opacity-40 group-hover:opacity-60 transition-opacity duration-300"></div>
                <span className="relative flex items-center gap-3">
                  Join WhatsApp Group
                </span>
              </a>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fade-in { from { opacity: 0; } to { opacity: 1; } }
        @keyframes slide-up { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; translateY(0); } }
        .animate-fade-in { animation: fade-in 0.8s ease-out forwards; }
        .animate-slide-up { opacity: 0; animation: slide-up 0.8s ease-out forwards; }
      `}</style>
    </>
  );
};

export default SuccessPage;