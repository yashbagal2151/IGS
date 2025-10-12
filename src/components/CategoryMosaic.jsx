import React from 'react';
import { useNavigate } from 'react-router-dom';
import categoriesData from '../data/categories.json';

// Responsive 3-cards first row, 2-cards second row grid
export default function CategoryMosaic() {
  const navigate = useNavigate();
  const sections = categoriesData.sections || [];

  // Build rows following pattern [3, 2, 3, 2, ...]
  const pattern = [3, 2];
  const rows = [];
  let start = 0;
  let pIndex = 0;
  while (start < sections.length && rows.length < 2) { // exactly first 2 rows per spec
    const size = pattern[pIndex % pattern.length];
    rows.push(sections.slice(start, start + size));
    start += size;
    pIndex += 1;
  }

  const goTo = (id) => navigate(`/filter?category=${id}`);

  const Card = ({ section, overlay = 'top' }) => {
    const img = section?.products?.[0]?.imageURL;
    const title = section?.title || 'Collection';
    const subtitle = section?.subtitle || '';
    const posClass = overlay === 'bottom' ? 'bottom-3' : 'top-3';
    return (
      <button onClick={() => goTo(section?.id)} className="group relative rounded-xl overflow-hidden aspect-[4/3]">
        <img src={img} alt={title} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" />
        <div className="absolute inset-0 bg-black/20"></div>
        <div className={`absolute ${posClass} left-3 right-3 text-white text-xs md:text-sm`}> 
          <div className="font-semibold leading-tight">{title}</div>
          {subtitle && <div className="opacity-80 line-clamp-2">{subtitle}</div>}
        </div>
      </button>
    );
  };

  const row1 = rows[0] || [];
  const row2 = rows[1] || [];

  return (
    <section className="bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-semibold text-gray-900">Explore Our Curated Collections</h2>
          <p className="text-xs md:text-sm text-gray-600 mt-1">Browse masterfully crafted sculptures, categorized to perfectly complement your unique taste, space, and occasions.</p>
        </div>

        {/* First row: 3 cards with top, bottom, top overlays */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {row1[0] && <Card section={row1[0]} overlay="top" />}
          {row1[1] && <Card section={row1[1]} overlay="bottom" />}
          {row1[2] && <Card section={row1[2]} overlay="top" />}
        </div>

        {/* Second row: 2 cards, both top aligned */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          {row2[0] && <Card section={row2[0]} overlay="top" />}
          {row2[1] && <Card section={row2[1]} overlay="top" />}
        </div>
      </div>
    </section>
  );
}
