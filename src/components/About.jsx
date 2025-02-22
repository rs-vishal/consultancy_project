import React from "react";
import about from "../assets/about.jpg";
import { Smile, Headset } from "lucide-react";
import CountUp from "react-countup";

const stats = [
  {
    icon: <Smile className="text-blue-300 w-12 h-12" aria-label="Happy Clients" />,
    count: 232,
    label: "Happy Clients",
  },
  {
    icon: <Headset className="text-blue-300 w-12 h-12" aria-label="Hours Of Support" />,
    count: 24,    
    label: "Hours Of Support",
  },
];

const About = () => {
  return (
    <div className="py-10">
      <div className="container mx-auto flex flex-col items-center">
        <h1 className="text-4xl font-bold text-center mb-6">About</h1>

        {/* About Section */}
        <div className="flex flex-col md:flex-row bg-gray-100 shadow-xl rounded-lg overflow-hidden">
          <figure className="md:w-1/2">
            <img
              src={about}
              alt="About Us"
              className="w-full h-full object-cover"
            />
          </figure>
          <div className="p-6 md:w-1/2">
            <h2 className="p-3 text-2xl font-semibold">
              Customer Satisfaction is Our Success
            </h2>
            <h3 className="p-3 text-black">SINCE 2015</h3>
            <p className="mt-2 p-3 text-xl text-gray-600">
              Since our founding in 2013, Rejoice Technical Solutions has been
              dedicated to innovating and revolutionizing the textile industry
              by manufacturing cutting-edge machinery for fabric production and
              processing. Our team travels across the globe, researching the
              latest advancements in automation, precision engineering, and
              smart technology to develop high-performance machines for weaving,
              dyeing, printing, and finishing. We offer a diverse range of
              high-quality textile machinery, exclusive designs, expert support,
              and exceptional customer service, empowering businesses to enhance
              efficiency and productivity in fabric manufacturing.
            </p>
          </div>
        </div>

        {/* Stats Section */}
        <section id="stats-counter" className="py-11 w-full mt-10">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {stats.map((stat, index) => (
                <div
                  key={index}
                  className="flex flex-col items-center bg-white p-6 rounded-lg shadow-lg"
                >
                  <div className="mb-2">{stat.icon}</div>
                  <CountUp
                    start={0}
                    end={stat.count}
                    duration={1}
                    className="text-3xl font-bold"
                  />
                  <p className="text-gray-600">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Footer Section */}
        <footer className="footer footer-center bg-base-300 text-base-content p-4">
          <aside>
            <p>Copyright © {new Date().getFullYear()} - All right reserved by Rejoice Technical Solutions</p>
          </aside>
        </footer>
      </div>
    </div>
  );
};

export default About;