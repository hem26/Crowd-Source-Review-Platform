// LandingPage.js
import React from "react";
import Header from "../Components/Header";
import SectionDescribe from "./SectionDescribe";
import Category from "./Category";
import Features from "./Features";

const LandingPage = () => {
  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <div className="relative min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-black text-white font-sans">
        <Header />

        {/* Blue Circles (Hero Background) */}
        <div className="absolute w-96 h-96 bg-blue-500 rounded-full blur-3xl opacity-20 top-[-100px] left-[-100px] z-0"></div>
        <div className="absolute w-72 h-72 bg-blue-600 rounded-full blur-3xl opacity-20 top-40 right-[-100px] z-0"></div>
        <div className="absolute w-80 h-80 bg-blue-400 rounded-full blur-2xl opacity-10 bottom-20 left-[40%] z-0 hidden md:block"></div>

        {/* Main Content */}
        <section className="relative z-10 flex flex-col items-center justify-center text-center mt-20 px-4">
          <h1 className="text-4xl md:text-7xl font-extrabold mb-4 animate-fade-in">
            Welcome to <span className="text-blue-500">ReviewMosaic</span>
          </h1>
          <p className="text-lg md:text-4xl max-w-2xl mb-9 text-gray-300 animate-fade-in-delay mt-12">
            Discover honest reviews from real people. Share your experience across multiple categories.
          </p>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-full shadow-lg transition-all duration-300 transform hover:scale-105">
            Get Started
          </button>
        </section>
      </div>

      {/* Section Describe */}
      <div className="relative min-h-screen bg-gradient-to-b from-black via-gray-800 to-gray-900 text-white font-sans">
        {/* Blue Circles (Describe Background) */}
        <div className="absolute w-80 h-80 bg-blue-500 rounded-full blur-3xl opacity-10 top-10 left-[30%] z-0 hidden md:block"></div>
        <div className="absolute w-96 h-96 bg-blue-600 rounded-full blur-3xl opacity-10 bottom-10 right-[-80px] z-0"></div>

        <div className="relative z-10">
          <SectionDescribe />
          
        </div>
        <div>
            <Category></Category>
            <h1 className="text-3xl text-center text-gray-300">...And Much More</h1>
        </div>
      </div>
      <div>
        <Features></Features>
      </div>
    </div>
  );
};

export default LandingPage;
