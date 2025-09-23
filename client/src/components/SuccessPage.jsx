import React from "react";

const SuccessPage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-green-50 to-green-100 text-center p-6">
      <h1 className="text-4xl font-bold text-green-600 mb-4">
        🎉 Thank You for Registering! 🎉
      </h1>
      <p className="text-lg text-gray-700 mb-6 max-w-md">
        We've successfully received your team's registration for the <b>Hungama</b>. 
        Your spot is confirmed! Please join our WhatsApp group for all the latest updates.
      </p>
      <a
        href="https://chat.whatsapp.com/BWq5GEiYpheG3DzpvTFDz8?mode=ems_wa_t"
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