import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <section className="flex items-center min-h-screen px-4 py-12 sm:px-6 lg:px-8 bg-white text-gray-800">
      <div className="max-w-xl mx-auto text-center">
        <h2 className="mb-6 font-extrabold text-6xl sm:text-7xl md:text-8xl lg:text-9xl text-green-500">
          <span className="sr-only">Error</span>404
        </h2>
        <p className="text-xl sm:text-2xl md:text-3xl font-semibold">
          Sorry, we couldn't find this page.
        </p>
        <p className="mt-4 mb-8 text-sm sm:text-base md:text-lg text-gray-600">
          But don't worry, you can find plenty of other things on our homepage.
        </p>
        <Link
          to="/"
          className="inline-block px-6 py-3 text-sm sm:text-base font-semibold rounded bg-green-500 text-white hover:bg-green-600 transition"
        >
          Back to homepage
        </Link>
      </div>
    </section>
  );
};

export default NotFound;
