"use client"
import React from 'react';

function Hero() {
  return (
    <div className="relative bg-gradient-to-b from-purple-600 to-blue-500 text-white" id="home">
      <div className="absolute inset-0 opacity-30">
        <div className="blur-[80px] h-96 bg-gradient-to-br from-purple-400 to-blue-300"></div>
      </div>
      <div className="relative flex flex-col items-center justify-center min-h-screen px-4 py-16">
        <h1 className="text-6xl md:text-7xl font-extrabold leading-tight text-center">
          Welcome to <span className="text-black">4-Loop</span>
        </h1>
        <p className="mt-6 text-lg md:text-xl text-center max-w-2xl">
          A collaborative workspace for teams to create and work together seamlessly on projects, combining flexible pages with reusable components that sync across different apps.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <a
            href="/dashboard"
            className="px-8 py-3 bg-yellow-500 rounded-lg shadow-lg transition-transform transform hover:scale-105"
          >
            Get Started
          </a>
          <a
            href="#"
            className="px-8 py-3 border border-white rounded-lg bg-transparent transition-all hover:bg-white hover:text-blue-500"
          >
            Learn More
          </a>
        </div>
        <div className="hidden md:flex justify-between mt-12 w-full max-w-4xl">
          <div className="text-left">
            <h6 className="text-lg font-semibold">Affordable Pricing</h6>
            <p className="text-sm">Competitive rates for every project.</p>
          </div>
          <div className="text-left">
            <h6 className="text-lg font-semibold">Lightning Fast</h6>
            <p className="text-sm">Delivering results with speed and efficiency.</p>
          </div>
          <div className="text-left">
            <h6 className="text-lg font-semibold">User-Favorite</h6>
            <p className="text-sm">Join a growing community of happy users.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Hero;
