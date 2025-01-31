import React from 'react';
import heroImage from '../../assets/img1.png'; // Adjust the path based on your structure

const Hero = () => {
  return (
    <div className="bg-white">
      <section className="relative bg-blue-50 py-16">
        <div className="container mx-auto flex justify-between items-center px-4">
          <div>
            <h1 className="text-4xl font-bold text-gray-900">Make your travel plan with TravelTreck</h1>
            <p className="mt-4 text-gray-600">Plan your perfect trip to explore the wonders of Sri Lanka</p>
            <button className="mt-6 px-6 py-3 bg-blue-600 text-white font-bold rounded-md hover:bg-blue-700">
              Explore Destinations
            </button>
          </div>
          <img src={heroImage} alt="Hero" className="h-66 w-auto" />
        </div>
      </section>
    </div>
  );
};

export default Hero;
