import React from "react";
import SlideshowStripe from "../components/SlideshowStripe.jsx";

function Home() {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="container mx-auto grid lg:grid-cols-2 gap-10 py-12 px-6">
        {/* Left Text Block */}
        <div className="flex flex-col justify-between space-y-6">
          <h1 className="text-4xl md:text-6xl font-bold leading-tight text-gray-900">
            Exquisite Statues for <br /> Every Space
          </h1>
          <p className="text-gray-600 text-lg max-w-sm">
            Discover our collection of handcrafted god statues, motivational
            sculptures, and custom artwork. Transform your space with timeless
            art.
          </p>
          <div className="flex flex-wrap gap-4">
            <button className="bg-purple-700 text-white px-6 py-3 rounded-lg font-medium hover:bg-purple-800 transition">
              Explore Collection
            </button>
            <button className="border-2 border-purple-700 text-purple-700 px-6 py-3 rounded-lg font-medium hover:bg-purple-50 transition">
              Custom Order
            </button>
          </div>
          <div className="flex items-center gap-3 mt-4 border rounded-lg px-3 py-2 w-fit shadow-sm">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
              alt="Google"
              className="w-6 h-6"
            />
            <div>
              <p className="text-gray-800 text-sm font-medium">Google Rating</p>
              <p className="text-yellow-500 text-sm font-semibold">
                4.0 ★ <span className="text-gray-600">(105)</span>
              </p>
            </div>
          </div>
          {/* Stats Section */}
          <div className="container mx-auto grid sm:grid-cols-2 gap-6">
            <div className="relative rounded-2xl overflow-hidden w-full h-52 object-cover">
              <SlideshowStripe />
            </div>
            <div className="relative rounded-2xl overflow-hidden w-full h-52 object-cover">
              <SlideshowStripe />
            </div>
          </div>
        </div>
        <div>
          <SlideshowStripe />
        </div>
      </section>
    </div>
  );
}

export default Home;
