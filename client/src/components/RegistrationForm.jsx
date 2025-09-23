import React, { useState } from "react";
import {
  Plus,
  Minus,
  Users,
  Mail,
  Phone,
  User,
  Hash,
  Sun,
  Moon,
} from "lucide-react";

const RegistrationForm = () => {
  // State is initialized with the minimum of 1 member
  const [teamData, setTeamData] = useState({
    teamName: "",
    members: [
      { fullName: "", email: "", mobile: "", regNo: "", isLeader: true },
    ],
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isDark, setIsDark] = useState(true);

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
    // Allows removal only if the team size is greater than 1 and it's not the leader
    if (teamData.members.length > 1 && !teamData.members[index].isLeader) {
      setTeamData((prev) => ({
        ...prev,
        members: prev.members.filter((_, i) => i !== index),
      }));
    }
  };

  const validateForm = () => {
    setError(""); // Clear previous errors
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

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!validateForm()) return;

    setLoading(true);
    try {
      const response = await fetch("http://localhost:5000/api/teams", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(teamData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Registration failed");
      }

      setSuccess("Team registered successfully! Redirecting...");
      
      if (data.redirectUrl) {
          setTimeout(() => {
            window.location.href = data.redirectUrl;
          }, 1500); // Redirect after 1.5 seconds
      }

      // Reset form to the initial state
      setTeamData({
        teamName: "",
        members: [
          { fullName: "", email: "", mobile: "", regNo: "", isLeader: true },
        ],
      });
    } catch (err) {
      setError(err.message || "An unexpected error occurred.");
    }
    setLoading(false);
  };

  const generateStars = () => {
    const stars = [];
    for (let i = 0; i < 50; i++) {
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

  const themeClasses = {
    bg: isDark ? "bg-gradient-to-br from-gray-900 via-black to-gray-900" : "bg-gradient-to-br from-gray-50 via-white to-gray-100",
    card: isDark ? "bg-black/90 backdrop-blur-lg border-gray-900" : "bg-white/80 backdrop-blur-lg border-gray-200",
    text: isDark ? "text-white" : "text-gray-900",
    textSecondary: isDark ? "text-gray-300" : "text-gray-600",
    textMuted: isDark ? "text-gray-400" : "text-gray-500",
    input: isDark ? "bg-black/80 border-gray-800 text-white placeholder-gray-400" : "bg-gray-50/60 border-gray-300 text-gray-900 placeholder-gray-500",
    memberCard: isDark ? "bg-gray-800/40 border-gray-700/50" : "bg-gray-50/40 border-gray-200/50",
  };

  return (
    <>
      <link
        href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap"
        rel="stylesheet"
      />
      <div
        className={`min-h-screen ${themeClasses.bg} py-12 relative overflow-hidden transition-all duration-700 ease-in-out`}
        style={{ fontFamily: "Poppins, sans-serif" }}
      >
        {isDark && (
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
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

        <div className="max-w-4xl mx-auto px-6 relative z-10">
          <div className="text-center mb-12 animate-fade-in">
            <div className="relative inline-block mb-6">
              <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-green-500 rounded-3xl blur-lg opacity-30 animate-pulse"></div>
              <div className="relative w-20 h-20 bg-gradient-to-br from-green-400 to-green-500 rounded-3xl flex items-center justify-center shadow-lg shadow-green-500/30">
                <Users className="w-10 h-10 text-gray-900" />
              </div>
            </div>
            <h1 className={`text-5xl font-bold ${themeClasses.text} mb-3 animate-slide-up`}>
              Team Registration
            </h1>
            <p className={`${themeClasses.textMuted} text-lg animate-slide-up`} style={{ animationDelay: "0.2s" }}>
              Register for Hungama
            </p>
            <div className="w-24 h-1 bg-gradient-to-r from-green-400 to-green-500 mx-auto mt-4 rounded-full animate-slide-up" style={{ animationDelay: "0.4s" }}></div>
          </div>

          <form
            onSubmit={handleSubmit}
            className={`${themeClasses.card} rounded-3xl p-8 border shadow-2xl transition-all duration-700 animate-slide-up`}
            style={{ animationDelay: "0.6s" }}
            noValidate
          >
            {error && (
              <div className="mb-6 p-4 bg-red-500/10 border border-red-500/30 rounded-2xl text-red-400 animate-shake">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                  {error}
                </div>
              </div>
            )}

            {success && (
              <div className="mb-6 p-4 bg-green-500/10 border border-green-500/30 rounded-2xl text-green-400">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  {success}
                </div>
              </div>
            )}

            <div className="mb-10 animate-slide-up" style={{ animationDelay: "0.8s" }}>
              <label className={`block ${themeClasses.text} font-semibold mb-3 text-lg`}>
                Team Name *
              </label>
              <div className="relative group">
                <Users className={`absolute left-4 top-1/2 transform -translate-y-1/2 ${themeClasses.textMuted} w-5 h-5 transition-colors group-focus-within:text-green-400`} />
                <input
                  type="text"
                  value={teamData.teamName}
                  onChange={handleTeamNameChange}
                  className={`w-full pl-12 pr-4 py-4 ${themeClasses.input} border rounded-2xl focus:border-green-400 focus:ring-4 focus:ring-green-400/20 transition-all duration-300 hover:border-green-400/50`}
                  placeholder="Enter your team name"
                  required
                />
              </div>
            </div>

            <div className="space-y-8">
              <div className="flex items-center justify-between animate-slide-up" style={{ animationDelay: "1s" }}>
                <h2 className={`text-2xl font-semibold ${themeClasses.text} flex items-center gap-3`}>
                  <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                  Team Members
                </h2>
                <div className={`px-4 py-2 ${themeClasses.memberCard} rounded-full border ${themeClasses.textMuted} text-sm font-medium`}>
                  {teamData.members.length}/2 members
                </div>
              </div>

              {teamData.members.map((member, index) => (
                <div
                  key={index}
                  className={`${themeClasses.memberCard} rounded-2xl p-6 border shadow-lg shadow-green-400/5 transition-all duration-500 hover:shadow-lg hover:shadow-green-400/10 animate-slide-up`}
                  style={{ animationDelay: `${1.2 + index * 0.1}s` }}
                >
                  <div className="flex items-center justify-between mb-6">
                    <h3 className={`text-lg font-semibold ${themeClasses.text} flex items-center gap-3`}>
                      {member.isLeader ? (
                        <>
                          <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse shadow-sm shadow-green-400/50"></div>
                          <span>Team Leader</span>
                          <div className="px-3 py-1 bg-green-400/20 text-green-400 rounded-full text-xs font-medium">LEADER</div>
                        </>
                      ) : (
                        <>
                          <div className="w-3 h-3 bg-blue-400 rounded-full animate-pulse shadow-sm shadow-blue-400/50"></div>
                          <span>Member {index + 1}</span>
                        </>
                      )}
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
                        <User className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${themeClasses.textMuted} w-4 h-4 transition-colors group-focus-within:text-green-400`} />
                        <input
                          type="text"
                          value={member.fullName}
                          onChange={(e) => handleMemberChange(index, "fullName", e.target.value)}
                          className={`w-full pl-10 pr-4 py-3 ${themeClasses.input} border rounded-xl focus:border-green-400 focus:ring-2 focus:ring-green-400/20 transition-all duration-300 hover:border-green-400/50`}
                          placeholder="Enter full name"
                          required
                        />
                      </div>
                    </div>

                    <div className="group">
                      <label className={`block ${themeClasses.textSecondary} text-sm font-medium mb-2`}>
                        Email *{" "}
                        {member.isLeader && (
                          <span className="text-green-400 text-xs font-medium">(@vitapstudent.ac.in)</span>
                        )}
                      </label>
                      <div className="relative">
                        <Mail className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${themeClasses.textMuted} w-4 h-4 transition-colors group-focus-within:text-green-400`} />
                        <input
                          type="email"
                          value={member.email}
                          onChange={(e) => handleMemberChange(index, "email", e.target.value)}
                          className={`w-full pl-10 pr-4 py-3 ${themeClasses.input} border rounded-xl focus:border-green-400 focus:ring-2 focus:ring-green-400/20 transition-all duration-300 hover:border-green-400/50`}
                          placeholder="Enter email"
                          required
                        />
                      </div>
                    </div>

                    <div className="group">
                      <label className={`block ${themeClasses.textSecondary} text-sm font-medium mb-2`}>Mobile Number *</label>
                      <div className="relative">
                        <Phone className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${themeClasses.textMuted} w-4 h-4 transition-colors group-focus-within:text-green-400`} />
                        <input
                          type="tel"
                          value={member.mobile}
                          onChange={(e) => handleMemberChange(index, "mobile", e.target.value)}
                          className={`w-full pl-10 pr-4 py-3 ${themeClasses.input} border rounded-xl focus:border-green-400 focus:ring-2 focus:ring-green-400/20 transition-all duration-300 hover:border-green-400/50`}
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
                        <Hash className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${themeClasses.textMuted} w-4 h-4 transition-colors group-focus-within:text-green-400`} />
                        <input
                          type="text"
                          value={member.regNo}
                          onChange={(e) => handleMemberChange(index, "regNo", e.target.value)}
                          className={`w-full pl-10 pr-4 py-3 ${themeClasses.input} border rounded-xl focus:border-green-400 focus:ring-2 focus:ring-green-400/20 transition-all duration-300 hover:border-green-400/50`}
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
                  className={`w-full py-6 border-2 border-dashed border-gray-600 rounded-2xl ${themeClasses.textMuted} hover:border-green-400 hover:text-green-400 transition-all duration-300 flex items-center justify-center gap-3 hover:bg-green-400/5 animate-slide-up`}
                  style={{ animationDelay: `${1.5 + teamData.members.length * 0.1}s` }}
                >
                  <Plus className="w-5 h-5" />
                  <span className="font-medium">Add Team Member</span>
                </button>
              )}
            </div>

            <div
              className={`mt-10 pt-8 border-t ${isDark ? "border-gray-800" : "border-gray-200"} animate-slide-up`}
              style={{ animationDelay: "2s" }}
            >
              <button
                type="submit"
                disabled={loading}
                className="group relative w-full py-4 bg-gradient-to-r from-green-400 to-green-500 text-gray-900 font-semibold rounded-2xl hover:from-green-500 hover:to-green-600 focus:ring-4 focus:ring-green-400/30 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-green-500/30"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-green-500 rounded-2xl blur-lg opacity-30 group-hover:opacity-50 transition-opacity duration-300"></div>
                <span className="relative flex items-center justify-center gap-2">
                  {loading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-gray-900/30 border-t-gray-900 rounded-full animate-spin"></div>
                      Registering Team...
                    </>
                  ) : (
                    "Register Team"
                  )}
                </span>
              </button>
            </div>
          </form>
        </div>

        <style jsx>{`
          @keyframes fade-in { from { opacity: 0; } to { opacity: 1; } }
          @keyframes slide-up { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: translateY(0); } }
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