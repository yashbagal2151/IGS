import React from "react";
import { Link } from "react-router-dom";
import CarouselHorizontal from "./CarouselHorizontal.jsx";

export default function RelatedCarousel({ items }) {
  if (!Array.isArray(items) || items.length === 0) return null;
  return (
    <section className="my-10">
      <div className="container mx-auto px-0">
        <h3 className="text-2xl font-serif font-semibold mb-3">Statues You Might Also Like</h3>
        <CarouselHorizontal
          items={items}
          renderItem={(p) => (
            <div className="bg-white rounded-xl border border-gray-200 p-3 w-[280px]">
              <Link to={`/product/${p.id}`} className="block">
                <img src={p.imageURL || p.image} alt={p.name || p.title} className="h-44 w-full object-cover rounded-lg" />
                <div className="mt-2 text-sm font-medium text-gray-900 truncate">{p.name || p.title}</div>
                <div className="text-purple-700 font-semibold text-sm">₹{p.price}</div>
              </Link>
            </div>
          )}
        />
      </div>
    </section>
  );
}
