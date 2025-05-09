import React, { useState } from "react";
import Lottie from "lottie-react";
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope, FaWhatsapp } from "react-icons/fa";
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import emailjs from "@emailjs/browser";
import contactus from "../assets/contactus.json";
import axios from "axios";
const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const [showSuccess, setShowSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // New state for loading

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, phone, message } = formData;
    console.log("Form Data:", formData);
    try {
     const res= axios.post("https://consultancy-project-server.onrender.com/api/contact/add",formData);
      console.log("Data in the backend",res);

    } catch (err) {
       console.log("Error at the frontend post method",err);
    }
    if (!email || !phone || !message || !name) {
      alert("Please fill all fields.");
      return;
    }

    const templateParams = {
      user_email: email,
      user_mobile: phone,
      user_name: name,
      user_message: message,
    };

    setIsLoading(true); // Show CircularProgress when submission starts

    try {
      await emailjs.send(
        "service_faea2jb", // ✅ Replace with your actual Service ID
        "template_krj1j0n", // ✅ Replace with your actual Template ID
        templateParams,
        "dUDMhda0-3QM8nShA" // ✅ Replace with your actual Public Key
      );
      setShowSuccess(true);
      setFormData({ name: "", email: "", phone: "", message: "" });
      setTimeout(() => setShowSuccess(false), 3000);
    } catch (error) {
      console.error("Error sending email:", error);
      alert("Error sending request. Please try again.");
    } finally {
      setIsLoading(false); // Hide CircularProgress after submission finishes
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-1 bg-gray-100 flex items-center justify-center">
        <div className="container mx-auto flex flex-col md:flex-row w-full max-w-6xl shadow-2xl rounded-lg overflow-hidden">
          <div className="md:w-1/2 w-full relative bg-blue-900 flex items-center justify-center p-8">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-blue-300 opacity-75 z-10" />
            <Lottie
              animationData={contactus}
              loop
              autoplay
              className="w-full max-w-md z-20 drop-shadow-xl"
            />
          </div>

          <div className="md:w-1/2 w-full flex items-center justify-center p-8 md:p-12 lg:p-20 bg-white">
            <div className="w-full max-w-md space-y-8">
              <div className="text-center">
                <h2 className="text-4xl font-extrabold text-gray-900 mb-3 relative pb-2">
                  CONTACT US
                  <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-20 h-1 bg-blue-500 rounded-full" />
                </h2>
                <p className="mt-2 text-sm text-gray-600">
                  Have questions? We're here to help!
                </p>
              </div>

              {showSuccess && (
                <div className="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm z-50">
                  <div className="bg-green-100 border border-green-400 text-green-700 px-6 py-4 rounded-lg shadow-lg flex items-center gap-4">
                    <svg
                      width="48"
                      height="48"
                      viewBox="0 0 48 48"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M24 4C12.96 4 4 12.96 4 24C4 35.04 12.96 44 24 44C35.04 44 44 35.04 44 24C44 12.96 35.04 4 24 4ZM18.58 32.58L11.4 25.4C10.62 24.62 10.62 23.36 11.4 22.58C12.18 21.8 13.44 21.8 14.22 22.58L20 28.34L33.76 14.58C34.54 13.8 35.8 13.8 36.58 14.58C37.36 15.36 37.36 16.62 36.58 17.4L21.4 32.58C20.64 33.36 19.36 33.36 18.58 32.58Z"
                        fill="#00BA34"
                      />
                    </svg>
                    <div>
                      <span className="font-semibold text-lg">Request Sent..!</span>
                      <p className="text-sm">Our Team will reach you as soon as possible</p>
                    </div>
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit} className="mt-8 space-y-6">
                <div className="space-y-4">
                  <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-200 placeholder-gray-400"
                    required
                  />
                  <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-200 placeholder-gray-400"
                    required
                  />
                  <input
                    type="tel"
                    name="phone"
                    placeholder="Phone Number"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-200 placeholder-gray-400"
                    required
                  />
                  <textarea
                    name="message"
                    placeholder="Message"
                    value={formData.message}
                    onChange={handleChange}
                    rows="4"
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-200 placeholder-gray-400 resize-none"
                    required
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-4 rounded-lg transition duration-300 hover:scale-105 shadow-lg"
                >
                  SEND MESSAGE
                </button>
              </form>

              {/* Show CircularProgress when submitting */}
              {isLoading && (
                <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
                  <CircularProgress />
                </Box>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Footer Section */}
      </div>
  );
};

export default Contact;
