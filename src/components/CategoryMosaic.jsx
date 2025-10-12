import React from 'react';
import { useNavigate } from 'react-router-dom';
import categoriesData from '../data/categories.json';

// 2x3 mosaic matching the provided layout
export default function CategoryMosaic() {
  const navigate = useNavigate();
  const sections = categoriesData.sections.slice(0, 5); // we have 5 main in JSON

  const goTo = (id) => navigate(`/filter?category=${id}`);

  return (
    <section className="bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-semibold text-gray-900">Explore Our Curated Collections</h2>
          <p className="text-xs md:text-sm text-gray-600 mt-1">Browse masterfully crafted sculptures, categorized to perfectly complement your unique taste, space, and occasions.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Left tall: God Statues */}
          <button onClick={() => goTo(sections[2]?.id || 'god-statues')} className="group relative rounded-xl overflow-hidden aspect-[4/3] md:row-span-2">
            <img src={sections[2]?.products[0]?.imageURL} alt={sections[2]?.title} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" />
            <div className="absolute inset-0 bg-black/20"></div>
            <div className="absolute bottom-3 left-3 text-white text-xs">
              <div className="font-semibold">{sections[2]?.title || 'God Statues'}</div>
              <div className="opacity-80">Divine sculptures for home and altar.</div>
            </div>
          </button>

          {/* Center square: Custom Orders */}
          <button onClick={() => goTo(sections[0]?.id || 'shivaji')} className="group relative rounded-xl overflow-hidden aspect-[4/3]">
            <img src={sections[0]?.products[0]?.imageURL} alt={sections[0]?.title} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" />
            <div className="absolute inset-0 bg-black/20"></div>
            <div className="absolute bottom-3 left-3 text-white text-xs">
              <div className="font-semibold">Custom Orders</div>
              <div className="opacity-80">Turn your vision into a personalized, one-of-a-kind sculpture.</div>
            </div>
          </button>

          {/* Right square: Motivational Art */}
          <button onClick={() => goTo(sections[3]?.id || 'motivational')} className="group relative rounded-xl overflow-hidden aspect-[4/3]">
            <img src={sections[3]?.products[0]?.imageURL} alt={sections[3]?.title} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" />
            <div className="absolute inset-0 bg-black/20"></div>
            <div className="absolute bottom-3 left-3 text-white text-xs">
              <div className="font-semibold">Motivational Art</div>
              <div className="opacity-80">Figures of ambition and timeless inspiration.</div>
            </div>
          </button>

          {/* Bottom left wide: Home Decor */}
          <button onClick={() => goTo(sections[4]?.id || 'home-decor')} className="group relative rounded-xl overflow-hidden aspect-[16/9] md:col-span-1">
            <img src={sections[4]?.products[0]?.imageURL} alt={sections[4]?.title} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" />
            <div className="absolute inset-0 bg-black/20"></div>
            <div className="absolute bottom-3 left-3 text-white text-xs">
              <div className="font-semibold">Home Decor</div>
              <div className="opacity-80">Art pieces to elevate any interior space.</div>
            </div>
          </button>

          {/* Bottom right wide: Corporate Gifts */}
          <button onClick={() => goTo(sections[1]?.id || 'mavale')} className="group relative rounded-xl overflow-hidden aspect-[16/9] md:col-span-2">
            <img src={sections[1]?.products[0]?.imageURL} alt={sections[1]?.title} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" />
            <div className="absolute inset-0 bg-black/20"></div>
            <div className="absolute bottom-3 left-3 text-white text-xs">
              <div className="font-semibold">Corporate Gifts</div>
              <div className="opacity-80">Premium and sophisticated sculptures for professional recognition and gifting.</div>
            </div>
          </button>
        </div>
      </div>
    </section>
  );
}
