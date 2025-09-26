import React, { useState } from "react";
import {
  Plus,
  Minus,
  Users,
  Mail,
  Phone,
  User,
  Hash,
} from "lucide-react";
import ReCAPTCHA from "react-google-recaptcha";

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

const RegistrationForm = () => {
  const [teamData, setTeamData] = useState({
    teamName: "",
    members: [
      { fullName: "", email: "", mobile: "", regNo: "", isLeader: true },
    ],
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [captchaToken, setCaptchaToken] = useState(null);

  
  const backgroundImageUrl = "https://i.postimg.cc/pVDL6c4r/hungama-background.jpg";

  const handleTeamNameChange = (e) => {
    setTeamData((prev) => ({
      ...prev,
      teamName: e.target.value,
    }));
  };

  const handleMemberChange = (index, field, value) => {
    setTeamData((prev) => ({
      ...prev,
      members: prev.members.map((member, i) =>
        i === index ? { ...member, [field]: value } : member
      ),
    }));
  };

  const addMember = () => {
    if (teamData.members.length < 2) {
      setTeamData((prev) => ({
        ...prev,
        members: [
          ...prev.members,
          { fullName: "", email: "", mobile: "", regNo: "", isLeader: false },
        ],
      }));
    }
  };

  const removeMember = (index) => {
    if (teamData.members.length > 1 && !teamData.members[index].isLeader) {
      setTeamData((prev) => ({
        ...prev,
        members: prev.members.filter((_, i) => i !== index),
      }));
    }
  };

  const validateForm = () => {
    setError("");
    if (!teamData.teamName.trim()) {
      setError("Team name is required");
      return false;
    }
    if (teamData.members.length < 1) {
      setError("A team must have at least 1 member.");
      return false;
    }
    const leader = teamData.members.find((m) => m.isLeader);
    if (!leader || !leader.email.endsWith("@vitapstudent.ac.in")) {
      setError("Team leader email must end with @vitapstudent.ac.in");
      return false;
    }
    for (let member of teamData.members) {
      if (
        !member.fullName.trim() ||
        !member.email.trim() ||
        !member.mobile.trim() ||
        !member.regNo.trim()
      ) {
        setError("All member fields are required for all members");
        return false;
      }
      if (!/^\d{10}$/.test(member.mobile)) {
        setError(`Invalid mobile number for ${member.fullName || 'a member'}. It must be 10 digits.`);
        return false;
      }
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(member.email)) {
        setError(`Please enter a valid email for ${member.fullName || 'a member'}.`);
        return false;
      }
    }
    if (!captchaToken) {
      setError("Please complete the CAPTCHA verification");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!validateForm()) return;

    setLoading(true);
    try {
      const apiUrl = `${import.meta.env.VITE_API_URL}/api/teams`;

      const response = await fetch(apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...teamData, captchaToken }),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "Registration failed");
      }
      setSuccess("Team registered successfully! Redirecting...");
      if (data.redirectUrl) {
        setTimeout(() => {
          window.location.href = data.redirectUrl;
        }, 1500);
      }
      setTeamData({
        teamName: "",
        members: [
          { fullName: "", email: "", mobile: "", regNo: "", isLeader: true },
        ],
      });
      setCaptchaToken(null);
    } catch (err) {
      setError(err.message || "An unexpected error occurred.");
    }
    setLoading(false);
  };
  
  // --- Theme Definitions from Event Page ---
  const darkTheme = {
    isDark: true,
    bg: "bg-transparent",
    card: "bg-black/60 backdrop-blur-lg border-gray-800",
    text: "text-[#d4c6a9]",
    textSecondary: "text-gray-400",
    textMuted: "text-gray-500",
    input: "bg-black/80 border-gray-700 text-white placeholder-gray-500",
    memberCard: "bg-gray-800/40 border-gray-700/50",
    accentColorText: "text-red-500",
    borderColor: "border-red-600/30",
    buttonBg: "bg-gradient-to-r from-red-600 to-red-800",
    buttonShadow: "shadow-red-500/30",
  };

  const themeClasses = darkTheme;
  const focusRing = "focus:ring-red-500/20";
  const focusBorder = "focus:border-red-500";
  const hoverBorder = "hover:border-red-500/50";
  const accentTextHover = "hover:text-red-500";

  return (
    <>
      <link
        href="https://fonts.googleapis.com/css2?family=Cinzel:wght@400;700&family=Cinzel+Decorative:wght@700&display=swap"
        rel="stylesheet"
      />
      <div
        className={`min-h-screen ${themeClasses.bg} py-6 sm:py-8 lg:py-12 relative overflow-hidden transition-all duration-700 ease-in-out`}
        style={{ fontFamily: "'Cinzel', serif" }}
      >
        <StaticBackgroundImage imageUrl={backgroundImageUrl} theme={themeClasses} />


        <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10">
          <div className="text-center mb-8 sm:mb-12 animate-fade-in">
            <div className="relative inline-block mb-4 sm:mb-6">
              <div className={`absolute inset-0 bg-gradient-to-r ${themeClasses.buttonBg} rounded-2xl sm:rounded-3xl blur-lg opacity-30 animate-pulse`}></div>
              <div className={`relative w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br ${themeClasses.buttonBg} rounded-2xl sm:rounded-3xl flex items-center justify-center shadow-lg ${themeClasses.buttonShadow}`}>
                <Users className="w-7 h-7 sm:w-10 sm:h-10 text-white" />
              </div>
            </div>
            <h1 className={`text-3xl sm:text-4xl lg:text-6xl font-bold ${themeClasses.text} mb-2 sm:mb-3 animate-slide-up`} style={{fontFamily: "'Cinzel Decorative', cursive"}}>
              Team Registration
            </h1>
            <p className={`${themeClasses.textMuted} text-base sm:text-lg animate-slide-up`} style={{ animationDelay: "0.2s" }}>
              Register for Hungama
            </p>
            <div className={`w-16 sm:w-24 h-1 bg-gradient-to-r ${themeClasses.buttonBg} mx-auto mt-3 sm:mt-4 rounded-full animate-slide-up`} style={{ animationDelay: "0.4s" }}></div>
          </div>

          <form
            onSubmit={handleSubmit}
            className={`${themeClasses.card} rounded-xl sm:rounded-2xl lg:rounded-3xl p-4 sm:p-6 lg:p-8 border shadow-2xl transition-all duration-700 animate-slide-up`}
            style={{ animationDelay: "0.6s" }}
            noValidate
          >
            <div className="mb-8 sm:mb-10 animate-slide-up" style={{ animationDelay: "0.8s" }}>
              <label className={`block ${themeClasses.text} font-semibold mb-3 text-base sm:text-lg`}>
                Team Name *
              </label>
              <div className="relative group">
                <Users className={`absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 ${themeClasses.textMuted} w-4 h-4 sm:w-5 sm:h-5 transition-colors group-focus-within:${themeClasses.accentColorText}`} />
                <input
                  type="text"
                  value={teamData.teamName}
                  onChange={handleTeamNameChange}
                  className={`w-full pl-10 sm:pl-12 pr-4 py-3 sm:py-4 ${themeClasses.input} border rounded-xl sm:rounded-2xl ${focusBorder} ${focusRing} transition-all duration-300 ${hoverBorder}`}
                  placeholder="Enter your team name"
                  required
                />
              </div>
            </div>

            <div className="space-y-6 sm:space-y-8">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-0 animate-slide-up" style={{ animationDelay: "1s" }}>
                <h2 className={`text-xl sm:text-2xl font-semibold ${themeClasses.text} flex items-center gap-3`}>
                  Team Members
                </h2>
                <div className={`px-3 sm:px-4 py-1.5 sm:py-2 ${themeClasses.memberCard} rounded-full border ${themeClasses.textMuted} text-xs sm:text-sm font-medium self-start sm:self-auto`}>
                  {teamData.members.length}/2 members
                </div>
              </div>

              {teamData.members.map((member, index) => (
                <div
                  key={index}
                  className={`${themeClasses.memberCard} rounded-xl sm:rounded-2xl p-4 sm:p-6 border shadow-lg shadow-red-500/5 transition-all duration-500 hover:shadow-red-500/10 animate-slide-up`}
                  style={{ animationDelay: `${1.2 + index * 0.1}s` }}
                >
                  <div className="flex items-center justify-between mb-6">
                    <h3 className={`text-lg font-semibold ${themeClasses.text}`}>
                      {member.isLeader ? "Team Leader" : `Member ${index + 1}`}
                    </h3>
                    {!member.isLeader && (
                      <button
                        type="button"
                        onClick={() => removeMember(index)}
                        className="text-red-400 hover:text-red-300 hover:bg-red-500/10 p-2 rounded-xl transition-all duration-200 hover:scale-110"
                      >
                        <Minus className="w-5 h-5" />
                      </button>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="group">
                      <label className={`block ${themeClasses.textSecondary} text-sm font-medium mb-2`}>Full Name *</label>
                      <div className="relative">
                        <User className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${themeClasses.textMuted} w-4 h-4 transition-colors group-focus-within:${themeClasses.accentColorText}`} />
                        <input
                          type="text"
                          value={member.fullName}
                          onChange={(e) => handleMemberChange(index, "fullName", e.target.value)}
                          className={`w-full pl-10 pr-4 py-3 ${themeClasses.input} border rounded-xl ${focusBorder} ${focusRing} transition-all duration-300 ${hoverBorder}`}
                          placeholder="Enter full name"
                          required
                        />
                      </div>
                    </div>

                    <div className="group">
                      <label className={`block ${themeClasses.textSecondary} text-sm font-medium mb-2`}>
                        Email *{" "}
                        {member.isLeader && (
                          <span className={`${themeClasses.accentColorText} text-xs font-medium`}>
                            (use college id)
                          </span>
                        )}
                      </label>
                      <div className="relative">
                        <Mail className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${themeClasses.textMuted} w-4 h-4 transition-colors group-focus-within:${themeClasses.accentColorText}`} />
                        <input
                          type="email"
                          value={member.email}
                          onChange={(e) => handleMemberChange(index, "email", e.target.value)}
                          className={`w-full pl-10 pr-4 py-3 ${themeClasses.input} border rounded-xl ${focusBorder} ${focusRing} transition-all duration-300 ${hoverBorder}`}
                          placeholder="Enter email"
                          required
                        />
                      </div>
                    </div>

                    <div className="group">
                      <label className={`block ${themeClasses.textSecondary} text-sm font-medium mb-2`}>Mobile Number *</label>
                      <div className="relative">
                        <Phone className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${themeClasses.textMuted} w-4 h-4 transition-colors group-focus-within:${themeClasses.accentColorText}`} />
                        <input
                          type="tel"
                          value={member.mobile}
                          onChange={(e) => handleMemberChange(index, "mobile", e.target.value)}
                          className={`w-full pl-10 pr-4 py-3 ${themeClasses.input} border rounded-xl ${focusBorder} ${focusRing} transition-all duration-300 ${hoverBorder}`}
                          placeholder="10 digit number"
                          pattern="[0-9]{10}"
                          maxLength="10"
                          required
                        />
                      </div>
                    </div>

                    <div className="group">
                      <label className={`block ${themeClasses.textSecondary} text-sm font-medium mb-2`}>Registration Number *</label>
                      <div className="relative">
                        <Hash className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${themeClasses.textMuted} w-4 h-4 transition-colors group-focus-within:${themeClasses.accentColorText}`} />
                        <input
                          type="text"
                          value={member.regNo}
                          onChange={(e) => handleMemberChange(index, "regNo", e.target.value)}
                          className={`w-full pl-10 pr-4 py-3 ${themeClasses.input} border rounded-xl ${focusBorder} ${focusRing} transition-all duration-300 ${hoverBorder}`}
                          placeholder="Enter reg number"
                          required
                        />
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {teamData.members.length < 2 && (
                <button
                  type="button"
                  onClick={addMember}
                  className={`w-full py-4 sm:py-6 border-2 border-dashed border-gray-600 rounded-xl sm:rounded-2xl ${themeClasses.textMuted} ${accentTextHover} transition-all duration-300 flex items-center justify-center gap-3 hover:border-red-500 hover:bg-red-500/5 animate-slide-up`}
                  style={{ animationDelay: `${1.5 + teamData.members.length * 0.1}s` }}
                >
                  <Plus className="w-4 h-4 sm:w-5 sm:h-5" />
                  <span className="font-medium text-sm sm:text-base">Add Team Member</span>
                </button>
              )}
            </div>

            <div className="mb-6 animate-slide-up" style={{ animationDelay: "1.8s" }}>
              <div className={`${themeClasses.card} p-4 rounded-xl border ${themeClasses.borderColor}`}>
                <label className={`block ${themeClasses.textSecondary} text-sm font-medium mb-3 text-center`}>
                  Verify you are human *
                </label>
                <div className="flex justify-center">
                  <ReCAPTCHA
                    sitekey={import.meta.env.VITE_RECAPTCHA_SITE_KEY || "your-site-key-here"}
                    onChange={setCaptchaToken}
                    theme="dark"
                  />
                </div>
              </div>
            </div>

            {error && (
              <div className="mb-4 sm:mb-6 p-3 sm:p-4 bg-red-500/10 border border-red-500/30 rounded-xl sm:rounded-2xl text-red-400 text-sm sm:text-base animate-shake">
                {error}
              </div>
            )}

            {success && (
              <div className="mb-4 sm:mb-6 p-3 sm:p-4 bg-green-500/10 border border-green-500/30 rounded-xl sm:rounded-2xl text-green-400 text-sm sm:text-base">
                {success}
              </div>
            )}

            <div
              className={`mt-8 sm:mt-10 pt-6 sm:pt-8 border-t ${themeClasses.borderColor} animate-slide-up`}
              style={{ animationDelay: "2s" }}
            >
              <button
                type="submit"
                disabled={loading}
                className={`group relative w-full py-3 sm:py-4 ${themeClasses.buttonBg} text-white font-bold rounded-xl sm:rounded-2xl hover:from-red-700 hover:to-red-900 focus:ring-4 ${focusRing} transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed hover:scale-[1.02] active:scale-[0.98] shadow-lg ${themeClasses.buttonShadow} uppercase text-sm sm:text-base`}
              >
                <div className={`absolute inset-0 ${themeClasses.buttonBg} rounded-xl sm:rounded-2xl blur-lg opacity-30 group-hover:opacity-50 transition-opacity duration-300`}></div>
                <span className="relative flex items-center justify-center gap-2">
                  {loading ? (
                    <>
                      <div className="w-4 h-4 sm:w-5 sm:h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      <span className="text-sm sm:text-base">Registering Team...It may take a min.</span>
                    </>
                  ) : (
                    "Register Team"
                  )}
                </span>
              </button>
            </div>
          </form>
        </div>

        <style>{`
          @keyframes fade-in { from { opacity: 0; } to { opacity: 1; } }
          @keyframes slide-up { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; translateY(0); } }
          @keyframes shake { 0%, 100% { transform: translateX(0); } 25% { transform: translateX(-5px); } 75% { transform: translateX(5px); } }
          .animate-fade-in { animation: fade-in 0.8s ease-out forwards; }
          .animate-slide-up { opacity: 0; animation: slide-up 0.8s ease-out forwards; }
          .animate-shake { animation: shake 0.5s ease-out; }
        `}</style>
      </div>
    </>
  );
};

export default RegistrationForm;

