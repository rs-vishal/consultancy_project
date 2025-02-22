import React, { useState } from "react";
import Lottie from "lottie-react";
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope } from "react-icons/fa";
import contactusAnimation from "../assets/contactusanimarion.json";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const {name, email, phone,message } = formData;
    if (!email || !phone || !message || !name) {
      alert("Please fill all fields.");
      return;
    }

    const templateParams = {
      user_email: email,
      user_mobile: phone,
        user_name: name,
        user_message : message,
    };

    try {
      await emailjs.send(
        "service_dfnjn8d", // Replace with your actual Service ID
        "template_vwbpbi8", // Replace with your actual Template ID
        templateParams,
        "dUDMhda0-3QM8nShA" // Replace with your actual Public Key
      );
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
      alert("Message Sent Successfully!");
    } catch (error) {
      console.error("Error sending email:", error);
      alert("Error sending request. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Contact Section */}
      <div className="flex-1 bg-gray-100 flex items-center justify-center">
        <div className="container mx-auto flex flex-col md:flex-row w-full max-w-6xl shadow-2xl rounded-lg overflow-hidden">
          {/* Left Animation Section */}
          <div className="md:w-1/2 w-full flex-1 relative bg-blue-900 flex items-center justify-center p-8">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-blue-300 opacity-75 z-10" />
            <Lottie
              animationData={contactusAnimation}
              loop={true}
              autoplay={true}
              className="w-full max-w-md z-20 drop-shadow-xl"
            />
          </div>

          {/* Right Form Section */}
          <div className="md:w-1/2 w-full flex-1 flex items-center justify-center p-8 md:p-12 lg:p-20 bg-white">
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

              <form onSubmit={handleSubmit} className="mt-8 space-y-6">
                <div className="space-y-4">
                  <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-200  focus:border-transparent transition-all placeholder-gray-400"
                    required
                  />
                  <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-200  focus:border-transparent transition-all placeholder-gray-400"
                    required
                  />
                  <input
                    type="tel"
                    name="phone"
                    placeholder="Phone Number"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-200  focus:border-transparent transition-all placeholder-gray-400"
                    required
                  />
                  <textarea
                    name="message"
                    placeholder="Message"
                    value={formData.message}
                    onChange={handleChange}
                    rows="4"
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-200 focus:border-transparent transition-all placeholder-gray-400 resize-none"
                    required
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2 shadow-lg"
                >
                  SEND MESSAGE
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Footer */}
      <footer className="bg-gray-900 text-white w-full mt-10">
        <div className="container mx-auto px-6 py-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {/* Location */}
            <div className="flex flex-col items-center text-center group">
              <div className="mb-4 p-4 bg-gray-800 rounded-full transition-all duration-300 ">
                <FaMapMarkerAlt className="text-3xl" />
              </div>
              <h4 className="text-lg font-semibold mb-2">Our Location</h4>
              <p className="text-gray-400 text-sm">
                24/32 1st Street Annaikadu<br />
                Tiruppur,TamilNadu
              </p>
            </div>

            {/* Phone */}
            <div className="flex flex-col items-center text-center group">
              <div className="mb-4 p-4 bg-gray-800 rounded-full transition-all duration-300 ">
                <FaPhoneAlt className="text-3xl" />
              </div>
              <h4 className="text-lg font-semibold mb-2">Call Us</h4>
              <a
                href="tel:+919629800900"
                className="text-gray-400 text-sm hover:text--400 transition-colors"
              >
                +91 9159800900
              </a>
            </div>

            {/* Email */}
            <div className="flex flex-col items-center text-center group">
              <div className="mb-4 p-4 bg-gray-800 rounded-full transition-all duration-300">
                <FaEnvelope className="text-3xl" />
              </div>
              <h4 className="text-lg font-semibold mb-2">Email Us</h4>
              <a
                href="mailto:rtssenthiltpr@gmail.com"
                className="text-gray-400 text-sm  transition-colors"
              >
rtssenthiltpr@gmail.com              </a>
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-gray-800 my-2"></div>

          {/* Bottom Section */}
          <div className="flex flex-col md:flex-row items-center justify-center
           pt-2">
           <aside>
            <p>Copyright © {new Date().getFullYear()} - All right reserved by Rejoice Technical Solutions</p>
          </aside>
            
            
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Contact;