import React from "react";

const SuccessPage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-green-50 to-green-100 text-center p-6">
      <h1 className="text-4xl font-bold text-green-600 mb-4">
        🎉 Registration Successful! 🎉
      </h1>
      <p className="text-lg text-gray-700 mb-6">
        Your team has been successfully registered for <b>September Sprint</b>.
      </p>
      <a
        href="https://chat.whatsapp.com/EbUKOGHbkReFxD31qxUlli?mode=ems_wa_t" // <-- replace with real link later
        target="_blank"
        rel="noopener noreferrer"
        className="px-6 py-3 bg-green-500 text-white font-semibold rounded-xl shadow-lg hover:bg-green-600 transition"
      >
        Join WhatsApp Group
      </a>
    </div>
  );
};

export default SuccessPage;
