import React from "react";
import SlideshowStripe from "../components/SlideshowStripe.jsx";
import Clippathgroup from "../assets/clip-path-group.svg"

function Home() {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="container mx-auto grid lg:grid-cols-2 gap-10 py-12 ">
        {/* Left Text Block */}
        <div className="flex flex-col 
min-height: 100dvh;">
          <h1 className="text-6xl font-bold leading-tight text-gray-900">
            Exquisite Statues for <br /> Every Space
          </h1>
          <p className="text-gray-600 max-w-sm text-sm">
            Discover our collection of handcrafted god statues, motivational
            sculptures, and custom artwork. Transform your space with timeless
            art.
          </p>
          <div className="flex flex-wrap gap-4 py-5">
            <button className="bg-purple-900 text-white py-1 px-2 rounded-lg font-medium hover:bg-purple-800 transition">
              Explore Collection
            </button>
            <button className="border-2 border-purple-700 text-purple-700  py-1 px-1 rounded-lg font-medium hover:bg-purple-50 transition">
              Custom Order
            </button>
          </div>
          <div className="flex items-center gap-3 mt-1 border rounded-lg px-3 py-1 w-fit shadow-sm">
            <img
              src={Clippathgroup}
              alt="Google"
              className="w-6 h-6"
            />
            <div>
              <p className="text-gray-800 text-sm font-medium">Google Rating</p>
              <p className="text-sm">
                4.0 <span className="text-yellow-500 text-sm font-semibold">★</span> <span className="text-gray-600">(105)</span>
              </p>
            </div>
          </div>
          {/* Stats Section */}
          <div className="container mx-auto grid py-10 sm:grid-cols-2 gap-6">
            <div className="relative rounded-2xl overflow-hidden w-full h-52 object-cover">
              <SlideshowStripe
              title= "Yash" />
            </div>
            <div className="relative rounded-2xl overflow-hidden w-full h-52 object-cover">
              <SlideshowStripe />
            </div>
          </div>
        </div>
        <div className="
min-height: 100dvh;">
          <SlideshowStripe />
        </div>
      </section>
    </div>
  );
}

export default Home;
