import React from 'react'
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope, FaWhatsapp } from "react-icons/fa";
const Footer = () => {
  return (
    <div>
      <footer className="bg-gray-900 text-white w-full mt-10">
              <div className="container mx-auto px-6 py-10">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
                  <div>
                    <a
                      href="https://maps.app.goo.gl/gRA8Nk5CbzfS4sut5"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex flex-col items-center text-center group hover:cursor-pointer"
                    >
                      <div className="mb-4 p-4 bg-gray-800 rounded-full">
                        <FaMapMarkerAlt className="text-3xl" />
                      </div>
                      <h4 className="text-lg font-semibold mb-2">Our Location</h4>
                      <p className="text-gray-400 text-sm">
                        24/32 1st Street Annaikadu
                        <br />
                        Tiruppur, TamilNadu
                      </p>
                    </a>
                  </div>

                  <div
                    className="flex flex-col items-center text-center group"
                    onClick={() => window.open("tel:+919629800900")}
                  >
                    <div className="mb-4 p-4 bg-gray-800 rounded-full">
                      <FaPhoneAlt className="text-3xl" />
                    </div>
                    <h4 className="text-lg font-semibold mb-2">Call Us</h4>
                    <div className="text-gray-400 text-sm hover:text-gray-300 transition-colors">
                      +91 9629800900
                    </div>
                  </div>

                  <div
                    className="flex flex-col items-center text-center group"
                    onClick={() => window.open("mailto:rtssenthiltpr@gmail.com")}
                  >
                    <div className="mb-4 p-4 bg-gray-800 rounded-full">
                      <FaEnvelope className="text-3xl" />
                    </div>
                    <h4 className="text-lg font-semibold mb-2">Email Us</h4>
                    <div className="text-gray-400 text-sm hover:text-gray-300 transition-colors">
                      rtssenthiltpr@gmail.com
                    </div>
                  </div>

                  <div
                    className="flex flex-col items-center text-center group"
                    onClick={() => window.open("https://wa.me/919629800900", "_blank")}
                  >
                    <div className="mb-4 p-4 bg-gray-800 rounded-full">
                      <FaWhatsapp className="text-3xl" />
                    </div>
                    <h4 className="text-lg font-semibold mb-2">WhatsApp</h4>
                    <div className="text-gray-400 text-sm hover:text-gray-300 transition-colors">
                      +91 9629800900
                    </div>
                  </div>
                </div>

                <div className="border-t border-gray-800 my-2"></div>
                <div className="flex justify-center text-sm text-gray-500 pt-4">
                  © 2025 Rejoice Technical Solutions Contact Team. All rights reserved.
                </div>
              </div>
            </footer>
          </div>

  )
}

export default Footer