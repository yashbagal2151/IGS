import React from "react";
import { Link } from "react-router-dom";

export default function RelatedCategoryCarousel({ items }) {
  if (!Array.isArray(items) || items.length === 0) return null;
  const containerRef = React.useRef(null);
  const scrollBy = (dx) => containerRef.current?.scrollBy({ left: dx, behavior: "smooth" });

  return (
    <section className="my-12">
      <div className="container mx-auto">
        <h2 className="text-3xl font-serif font-semibold text-center mb-6">Statues You Might Also Like</h2>
        <div className="relative">
          <button type="button" className="absolute -left-4 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white rounded-full shadow px-3 py-1" onClick={() => scrollBy(-320)}>‹</button>
          <div ref={containerRef} className="overflow-x-auto no-scrollbar snap-x snap-mandatory flex gap-6 pb-3">
            {items.map((p) => (
              <div key={p.id} className="snap-start min-w-[300px]">
                <Link to={`/product/${p.id}`} className="block bg-white rounded-xl border border-gray-200 p-3">
                  <img src={p.imageURL || p.image} alt={p.name || p.title} className="h-56 w-full object-cover rounded-lg" />
                  <div className="mt-2 text-sm font-medium text-gray-900 truncate">{p.name || p.title}</div>
                  <div className="text-purple-700 font-semibold text-sm">₹{p.price}</div>
                </Link>
              </div>
            ))}
          </div>
          <button type="button" className="absolute -right-4 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white rounded-full shadow px-3 py-1" onClick={() => scrollBy(320)}>›</button>
        </div>
      </div>
    </section>
  );
}
