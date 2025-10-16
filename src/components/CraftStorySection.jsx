import React from "react";
import storyCopy from "../data/categoryStory.json";

export default function CraftStorySection({ categoryId }) {
  const story = storyCopy[categoryId] || storyCopy.default;
  const img = new URL(`../assets/story/${categoryId || 'god-statues'}.jpg`, import.meta.url).href;
  return (
    <section className="my-12">
      <div className="container mx-auto rounded-2xl overflow-hidden border border-gray-200">
        <div className="grid grid-cols-1 lg:grid-cols-2">
          <div className="relative min-h-[240px] lg:min-h-[320px]">
            <img src={img} alt="Craft story" className="absolute inset-0 w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/60 to-white" />
          </div>
          <div className="p-6 lg:p-10">
            <h2 className="text-4xl md:text-5xl font-serif font-semibold mb-4">{story.title}</h2>
            <p className="text-base leading-7 text-gray-700 mb-2">{story.para1}</p>
            <p className="text-base leading-7 text-gray-700">{story.para2}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
