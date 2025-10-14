import React from "react";
import categoryStory from "../data/categoryStory.json";

export default function CraftStory({ categoryId }) {
  const story = categoryStory[categoryId] || categoryStory.default;
  const imgSrc = new URL(`../assets/story/${categoryId || 'god-statues'}.jpg`, import.meta.url).href;

  return (
    <section className="my-10">
      <div className="container mx-auto rounded-2xl overflow-hidden border border-gray-200">
        <div className="grid grid-cols-1 lg:grid-cols-2">
          <div className="relative min-h-[240px] lg:min-h-[320px]">
            <img src={imgSrc} alt={story.title} className="absolute inset-0 w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/50 to-white" />
          </div>
          <div className="p-6 lg:p-10">
            <h3 className="text-3xl font-serif font-semibold mb-3">{story.title}</h3>
            <p className="text-sm text-gray-700 mb-2">{story.para1}</p>
            <p className="text-sm text-gray-700">{story.para2}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
