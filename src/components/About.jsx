import React from "react";
import about from "../assets/about.jpg";
import { Smile, Headset } from "lucide-react";
import CountUp from "react-countup";
import {
  FaHandHoldingUsd,
  FaBalanceScale,
  FaChartLine,
  FaBuilding,
  FaUsers,
  FaFileAlt,
} from "react-icons/fa";

//
const infoData = [
  {
    icon: <FaHandHoldingUsd className="text-gray-800 text-xl" />,
    label: "Nature of Business",
    value: "Service Provider and Others",
  },
  {
    icon: <FaBalanceScale className="text-gray-800 text-xl" />,
    label: "Legal Status of Firm",
    value: "Proprietorship",
  },

  {
    icon: <FaBuilding className="text-gray-800 text-xl" />,
    label: "GST Registration Date",
    value: "01-07-2017",
  },
  {
    icon: <FaUsers className="text-gray-800 text-xl" />,
    label: "Total Number of Employees",
    value: "Upto 10 People",
  },
  {
    icon: <FaFileAlt className="text-gray-800 text-xl" />,
    label: "GST Number",
    value: "33EZHPS2716B1ZL",
  },
];

const stats = [
  {
    icon: (
      <Smile className="text-gray-600 w-12 h-12" aria-label="Happy Clients" />
    ),
    count: 232,
    label: "Happy Clients",
  },
  {
    icon: (
      <Headset
        className="text-gray-600 w-12 h-12"
        aria-label="Hours Of Support"
      />
    ),
    count: 24,
    label: "Hours Of Support",
  },
];

const About = () => {
  return (
    <div className=" min-h-screen">
      <div className="flex items-start justify-baseline text-black bg-gray-100  rounded-lg max-w-xl mx-auto mt-10 ">
        <img
          src={about}
          alt="Rounded"
          className="w-60 h-60 object-cover rounded-xl border-2 border-gray-400 mr-10 left-10 "
        />
        <div className="mt-10">
          <h2 className="text-2xl font-bold">SENTHIL R</h2>
          <p className="mt-2">M.D</p>
          <p className="mt-2">ITI</p>
          <p className="mt-1">25 Year's Experience</p>
        </div>
      </div>

      <div className="container mx-auto flex flex-col items-center mt-10">
        {/* <h1 className="text-4xl font-bold text-center mb-6">About</h1> */}

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
            <h3 className="p-3 text-black">SINCE 2018</h3>
            <p className="mt-2 p-3 text-xl text-gray-600">
              Since our founding in 2018, Rejoice Technical Solutions has been
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

        {/* icons in the about section bottom */}
        <div className="flex flex-wrap justify-center gap-6 p-6">
          {infoData.map((item, index) => (
            <div
              key={index}
              className="w-full sm:w-[calc(33.333%-1rem)] max-w-[300px] flex items-start gap-4 bg-white shadow-sm rounded-xl p-4 "
            >
              <div className="bg-gray-100  p-3 rounded-full">{item.icon}</div>
              <div>
                <div className="text-sm text-gray-500">{item.label}</div>
                <div className="text-base font-semibold text-gray-900">
                  {item.value}
                </div>
              </div>
            </div>
          ))}
        </div>
        <hr className="border-t-2 border-gray-300 w-full " />
<div className="flex flex-col items-center justify-center">
        {/* Footer Section */}
        <footer className="footer footer-center bg-gradient-to-r  text-gray-900 py-6 mt-auto w-full">
  <aside>
    <p className="text-sm font-medium ">
      Copyright © {new Date().getFullYear()} - All rights reserved by
      <span className="font-semibold ml-1">
        Rejoice Technical Solutions
      </span>
    </p>
  </aside>
</footer>
</div>

      </div>
    </div>
  );
};

export default About;
